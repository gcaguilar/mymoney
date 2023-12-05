import { z } from "zod";
import { Expense } from "../models";

const Id = "id";
const Title = "title";
const Amount = "amount";
const ExpenseDate = "date";
const CategoryName = "category";

const formSchema = z.object({
  [Id]: z.string().optional(),
  [Title]: z.string().min(2),
  [Amount]: z.coerce.number(),
  [ExpenseDate]: z.date(),
  [CategoryName]: z.string(),
});

const getDefaultValues = ({
  id,
  name,
  amount,
  date,
  category,
}: Expense): Record<string, any> => {
  return {
    Id: id || "",
    Title: name || "",
    Amount: Number(amount) || 0,
    ExpenseDate: date ? new Date(date) : new Date(),
    CategoryName: category?.id || "",
  };
};

const formListSchema = z.array(formSchema);

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
