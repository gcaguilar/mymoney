export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string,
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}
