export interface Category {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  name: string;
  amount: string;
  date: string;
  category: Category
}

export interface ImportedExpense {
  name: string;
  amount: number;
  date: string,
  category: Category | null;
}