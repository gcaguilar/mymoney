"use client";

import * as z from "zod";
import ExpenseForm from "@/app/expense/components/ExpenseForm";
import { formSchema } from "@/app/expense/validations";
import { Category, CategoryWithKeywords } from "@/app/types/Category";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

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

  type Tipo = {
    data: CategoryWithKeywords[];
  };

  const { data, error, isLoading } = useSWR<Tipo>(
    "categories",
    fetcher
  );

  if (isLoading) return <div>Loading</div>;
  if (!data) return <div>Error</div>;
  const value: Category[] = data.data.map((category) => {
    return {
      id: category.id,
      name: category.name,
    } as Category
  });

  return (
    <ExpenseForm categories={value} onSubmit={(values) => onSubmit(values)} />
  );
}

export default AddExpensePage;
