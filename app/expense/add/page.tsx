"use client";

import * as z from "zod";
import ExpenseForm from "@/app/expense/components/ExpenseForm";
import { formSchema } from "@/app/expense/validations";
import { useCategories } from "@/app/hooks";

function AddExpensePage() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { data: values };
    const jsonData = JSON.stringify(data);
    fetch(`${process.env.PATH_URL_BACKEND}expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useCategories()

  if (categoriesError) return <div>Failed to load</div>;
  if (isCategoriesLoading) return <div>Loading...</div>;
  if (!categories || categories.data.length === 0) return null;

  return (
    <ExpenseForm
      categories={categories.data}
      onSubmit={(values) => onSubmit(values)}
    />
  );
}

export default AddExpensePage;
