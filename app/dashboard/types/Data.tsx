export type Response = {
  data: Data;
};

export type Data = {
  totalByMonth: TotalByMonth[];
  totalByCategory: TotalByCategory[];
};

export type TotalByMonth = {
  totalAmount: number;
  categoryName: string;
  date: string;
};

export type TotalByCategory = {
  name: string;
  value: string;
};