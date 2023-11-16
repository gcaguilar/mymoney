import { z } from "zod";

export const Title = "title";
export const Amount = "amount";
export const ExpenseDate = "date";
export const Category = "category";

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const formSchema = z.object({
  [Title]: z.string().min(2),
  [Amount]: z.coerce.number(),
  [ExpenseDate]: z.date(),
  [Category]: CategorySchema,
});
