interface Data<T> {
  data: T;
}


interface ExpenseDTOUpdate {
  id: string;
  name: string;
  amount: string;
  date: string;
  category: string;
}

export type { Data, ExpenseDTOUpdate };
