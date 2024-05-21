"use client";

import * as z from "zod";
import ExpenseForm from "@/app/expense/components/ExpenseForm";
import { formSchema } from "../validations";
import { useCategories, useExpense } from "@/app/hooks/hooks";

async function EditExpensePage({ params }: { params: { id: number } }) {
  const categories = await useCategories();
  const expense = await useExpense(params.id);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { data: values };
    const jsonData = JSON.stringify(data);
    fetch(`${process.env.PATH_URL_BACKEND}expenses/${params.id}`, {
      method: "PUT",
      body: jsonData,
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  if (!categories || categories.data.length === 0 || !expense) return null;

  return (
    <ExpenseForm
      expense={expense.data}
      categories={categories.data}
      onSubmit={onSubmit}
    />
  );
}

export default EditExpensePage;
