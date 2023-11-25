interface Data<T> {
  data: T;
}

interface ExpenseDTO {
  title: string;
  amount: string;
  date: string;
  category: string;
}

interface ExpenseDTOUpdate {
  id: string;
  title: string;
  amount: string;
  date: string;
  category: string;
}

export type { Data, ExpenseDTO, ExpenseDTOUpdate };
