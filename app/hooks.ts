import useSWR from "swr";
import { Expense, Category } from "./models";
export const fetcher = (url: string) =>
  fetch(`${process.env.PATH_URL_BACKEND}${url}`).then((res) => res.json());

interface Response<T> {
  data: T;
}

const useCategories = () => useSWR<Response<Category[]>>(`categories`, fetcher);

const useExpenses = () => useSWR<Response<Expense[]>>(`expenses`, fetcher);

const useExpense = (id: string) =>
  useSWR<Response<Expense>>(`expenses/${id}`, fetcher);

export { useCategories, useExpenses, useExpense };
