"use client";

import { Button } from "@/app/components/ui/button";
import { Form, FormField } from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInputField from "@/app/components/FormInputField";
import FormDateField from "@/app/components/FormDateField";
import { z } from "zod";
import {
  Amount,
  CategoryName,
  ExpenseDate,
  Title,
  formSchema,
  getDefaultValues,
} from "../validations";
import { Category, Expense } from "@/app/models";
import FormCombox from "@/app/components/FormCombox";

interface ExpenseFormProps {
  expense?: Expense,
  categories: Category[];
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
  categories,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues({
      id: expense? expense.id : "",
      name: expense ? expense.name : "",
      amount: expense ? expense.amount : "",
      date: expense ? expense.date : "",
      category: {
        id: expense ? expense.category.id : "",
        name: expense ? expense.category.name : "",
        associatesNames: []
      },
    }),
  });

  const sortedOptions = categories
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={Title}
          render={({ field }) => (
            <FormInputField
              title="Titulo"
              type="text"
              field={field}
              placeholder={form.getValues(Title)}
            />
          )}
        />
        <FormField
          control={form.control}
          name={Amount}
          render={({ field }) => (
            <FormInputField
              title="Cantidad"
              type="number"
              field={field}
              placeholder={form.getValues(Amount).toString()}
            />
          )}
        />
        <FormField
          control={form.control}
          name={ExpenseDate}
          render={({ field }) => <FormDateField title="Fecha" field={field} />}
        />
        <FormField
          control={form.control}
          name={CategoryName}
          render={({ field }) => {
            return (
              <FormCombox
              options={sortedOptions}
              field={field}
            />
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ExpenseForm;
