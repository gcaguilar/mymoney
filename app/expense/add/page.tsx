"use client";

import { fetcher } from "@/app/fetcher";
import useSWR from "swr";
import * as z from "zod";
import ExpenseForm from "../ExpenseForm";
import { formSchema } from "../Validations";

function AddExpensePage() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("YEAHHHHH")
    console.log(values)
    /* fetcher(
      `api/expenses/add`,
      "POST",
      JSON.stringify({
        name: values.title,
        amount: values.amount,
        date: values.date,
        category: values.category.id,
      })
    )
      .then((response) => console.log(response))
      .catch((error) => console.log(error)); */
  }
  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useSWR<CategoryResponse>(`api/categories`, fetcher<CategoryResponse>);

  if (categoriesError) return <div>Failed to load</div>;
  if (isCategoriesLoading) return <div>Loading...</div>;
  if (!categories || categories.data.length === 0) return null;

  return <ExpenseForm categories={categories.data} onSubmit={onSubmit} />;
}

export default AddExpensePage;
