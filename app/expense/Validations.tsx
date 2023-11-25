import { z } from "zod";

export const Id = "id"
export const Title = "title";
export const Amount = "amount";
export const ExpenseDate = "date";
export const Category = "category";

export const formSchema = z.object({
  [Title]: z.string().min(2),
  [Amount]: z.coerce.number(),
  [ExpenseDate]: z.date(),
  [Category]: z.string(),
});
