import { z } from "zod";
import { Expense, ExpenseWithTags } from "../types/Expense";

const Id = "id";
const Title = "title";
const Amount = "amount";
const ExpenseDate = "date";
const CategoryName = "category";

const formSchema = z.object({
  [Id]: z.number(),
  [Title]: z.string().min(2),
  [Amount]: z.coerce.number(),
  [ExpenseDate]: z.date(),
  category: z.number().nonnegative(),
});

const getDefaultValues = ({
  id,
  name,
  amount,
  transactionDate,
  category,
}: Expense): Record<string, any> => {
  return {
    [Id]: id || -1,
    [Title]: name || "",
    [Amount]: Number(amount) || 0,
    [ExpenseDate]: transactionDate ? new Date(transactionDate) : new Date(),
    [CategoryName]: {
      id: category?.id || "",
      name: category?.name || "",
    },
  };
};

const formListSchema = z.object({
  fields: z.array(formSchema),
});

export {
  Id,
  Title,
  Amount,
  ExpenseDate,
  CategoryName,
  formSchema,
  formListSchema,
  getDefaultValues,
};
