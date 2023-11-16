import SelectOption, { OptionProps } from "@/app/components/SelectOption";
import prisma from "@/lib/db/prisma";

interface Expense {
  concept: string;
  amount: number;
  date: string;
  type: string;
}

async function fetchData(id: string) {
  const response = await fetch(`http://localhost:3000/api/temporal/${id}`);
  const data = await response.json();
  const expenseData: Expense[] = data.expense;

  return expenseData;
}

async function fetchCategories(): Promise<OptionProps[]> {
  const categories = await prisma.category.findMany({});
  const mappedCategories = categories.map((key) => ({
    value: key.id,
    name: key.name,
  }));

  return mappedCategories;
}

async function ImportedFile({ params }: { params: { id: string } }) {
  const data = await fetchData(params.id);
  const categories = await fetchCategories();
  return data.map((item, index) => (
    <div key={index} className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body">
        <input
          className="input input-bordered w-full max-w-xs"
          required
          type="text"
          name="concept"
          defaultValue={item.concept}
        />
        <input
          className="input input-bordered w-full max-w-xs"
          required
          type="number"
          name="amount"
          defaultValue={item.amount}
        />

        <input
          className="input input-bordered w-full max-w-xs"
          required
          type="date"
          name="date"
          defaultValue={item.date}
        />
        <SelectOption
          name="category"
          className="select mb-3 w-full"
          propSelectedOption={item.type}
          options={categories}
        />
      </div>
    </div>
  ));
}

export default ImportedFile;
