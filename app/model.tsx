interface Category {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  name: string;
  amount: string;
  date: string;
  category: Category
}
