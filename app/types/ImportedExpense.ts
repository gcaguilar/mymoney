import { Category } from "./Category"

export type ImportedExpense = {
  name: string;
  amount: number;
  transactionDate: string;
  category: Category | null;
}
