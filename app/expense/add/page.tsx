"use client";

import { HttpMethod, fetcher } from "@/app/fetcher";
import useSWR from "swr";
import * as z from "zod";
import ExpenseForm from "../ExpenseForm";
import { formSchema } from "../Validations";

function AddExpensePage() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { data: values };
    const jsonData = JSON.stringify(data);
    fetcher(`api/expenses`, HttpMethod.POST, jsonData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useSWR<CategoryResponse>(`api/categories`, fetcher<CategoryResponse>);

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
