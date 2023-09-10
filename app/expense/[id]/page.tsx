import prisma from "@/lib/db/prisma";
import FormSubmitButton from "../../components/FormSubmitButton";
import { Metadata } from "next";
import DateInput from "../../components/DateInput";
import SelectOption, { OptionProps } from "../../components/SelectOption";
import { Expense } from "@prisma/client";

export const metadata: Metadata = {
  title: "Editar Gasto - Mi dinero",
};

async function fetchExpense(id: string): Promise<Expense> {
  "use server";

  const expense = prisma.expense
    .findUniqueOrThrow({
      where: {
        id: id,
      },
    })
    .then((expense) => {
      return expense;
    });

  return expense;
}

async function fetchCategories(): Promise<OptionProps[]> {
  "use server";

  const categories = prisma.category.findMany({}).then((categories) => {
    return categories.map((key) => ({
      value: key.id,
      name: key.name,
    }));
  });

  return categories;
}

async function updateExpense(formData: FormData) {
  "use server";

  const id = formData.get("id")?.toString();
  const name = formData.get("title")?.toString();
  const amount = Number(formData.get("amount")?.toString());
  const date = formData.get("requireDate")?.toString();
  const type = formData.get("category")?.toString();

  if (!name || !amount || !date || !type) {
    throw Error("Falta de rellenar algun campo");
  }

  await prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      amount: amount,
      date: date,
      type: type,
    },
  });
}

async function EditExpensePage({ params }: { params: { id: string } }) {
  const categories = await fetchCategories();
  const expense = await fetchExpense(params.id);

  const selectedCategory = categories.find((category) => {
    category.name == expense.type;
  })?.value;
  const defaultValue = categories[0].value;

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Nuevo gasto</h1>
      <form action={updateExpense}>
      <input
          required
          name="id"
          value={params.id}
          type="hidden"
          readOnly
        />
        <input
          required
          defaultValue={expense.name}
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
          defaultValue={expense.amount.toString()}
          className="input-bordered input mb-3 w-full"
        />
        <DateInput
          name="requireDate"
          className="input-bordered input mb-3 w-full"
        />
        <SelectOption
          name="category"
          className="select mb-3 w-full"
          propSelectedOption={
            selectedCategory ? selectedCategory : defaultValue
          }
          options={categories}
        />
        <FormSubmitButton className="btn-primary" type="submit">
          Guardar
        </FormSubmitButton>
      </form>
    </div>
  );
}

export default EditExpensePage;
