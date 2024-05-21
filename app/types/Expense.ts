import { Category, CategoryWithKeywords } from "./Category";

export interface Expense {
  id: number;
  name: string;
  amount: string;
  transactionDate: string;
  category: Category;
}

export interface ExpenseWithTags {
  id: number;
  name: string;
  amount: string;
  transactionDate: string;
  category: CategoryWithKeywords;
}
