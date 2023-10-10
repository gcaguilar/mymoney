import prisma from "@/lib/db/prisma";
import FormSubmitButton from "../../components/FormSubmitButton";
import { Metadata } from "next";
import DateInput from "../../components/DateInput";
import SelectOption, { OptionProps } from "../../components/SelectOption";
import { Expense } from "@prisma/client";

export const metadata: Metadata = {
  title: "Añadir Gasto - Mi dinero",
};

async function fetchCategories(): Promise<OptionProps[]> {
  "use server";

  const categories = await prisma.category.findMany({});
  const mappedCategories = categories.map((key) => ({
    value: key.id,
    name: key.name,
  }));
  return mappedCategories;
}

async function addExpense(formData: FormData) {
  "use server";

  const name = formData.get("title")?.toString();
  const amount = Number(formData.get("amount")?.toString());
  const date = formData.get("requireDate")?.toString();
  const type = formData.get("category")?.toString();

  if (!name || !amount || !date || !type) {
    throw Error("Falta de rellenar algun campo");
  }

  await prisma.expense.create({ data: { name, amount, date, type } });
}

export default async function AddExpensePage() {
  const categories = await fetchCategories();
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Nuevo gasto</h1>
      <form action={addExpense}>
        <input
          required
          name="title"
          placeholder="Supermercado"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="amount"
          placeholder="1.00€"
          type="number"
          step="0.01"
          className="input-bordered input mb-3 w-full"
        />
        <DateInput
          name="requireDate"
          className="input-bordered input mb-3 w-full"
        />
        <SelectOption
          name="category"
          options={categories}
          propSelectedOption=""
        />
        <FormSubmitButton className="btn-block" type="submit">
          Añadir
        </FormSubmitButton>
      </form>
    </div>
  );
}
