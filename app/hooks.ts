import useSWR from "swr";
import { Expense, Category } from "./models";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CategoryResponse {
  data: Category[];
}

interface ExpensesResponse {
  data: Expense[];
}

interface ExpenseResponse {
  data: Expense;
}

const useCategories = () =>
  useSWR<CategoryResponse>(
    `${process.env.PATH_URL_BACKEND}/categories`,
    fetcher
  );

const useExpenses = () =>
  useSWR<ExpensesResponse>(`${process.env.PATH_URL_BACKEND}/expenses`, fetcher);

const useExpense = (id: string) =>
  useSWR<ExpenseResponse>(
    `${process.env.PATH_URL_BACKEND}/expenses/${id}`,
    fetcher
  );

export { useCategories, useExpenses, useExpense };
