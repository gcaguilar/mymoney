"use client"

import * as z from "zod";
import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import ExpenseForm from "../ExpenseForm";
import { formSchema } from "../Validations";

function EditExpensePage({ params }: { params: { id: string } }) {
  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useSWR<CategoryResponse>(`api/categories`, fetcher<CategoryResponse>);
  const {
    data: expense,
    error: expenseError,
    isLoading: isExpenseLoading,
  } = useSWR<ExpenseResponse>(`api/expenses/${params.id}`, fetcher<ExpenseResponse>);

  function onSubmit(values: z.infer<typeof formSchema>) {}

  if (categoriesError || expenseError) return <div>Failed to load</div>;
  if (isCategoriesLoading || isExpenseLoading) return <div>Loading...</div>;
  if (!categories || categories.data.length === 0 || !expense) return null;
 
  return (
    <ExpenseForm
      expenseProp={expense.data}
      categories={categories.data}
      onSubmit={onSubmit}
    />
  );
}

export default EditExpensePage;
