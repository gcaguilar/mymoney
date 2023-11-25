"use client";

import { Button } from "@/app/components/ui/button";
import { Form, FormField } from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInputField from "@/app/components/FormInputField";
import FormDateField from "@/app/components/FormDateField";
import FormSelectField from "@/app/components/FormSelectField";
import { z } from "zod";
import {
  Amount,
  Category,
  ExpenseDate,
  Title,
  formSchema,
} from "./Validations";

interface ExpenseFormProps {
  expenseProp?: Expense;
  categories: Category[];
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expenseProp,
  categories,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [Title]: expenseProp?.name || "",
      [Amount]: Number(expenseProp?.amount) || 0,
      [ExpenseDate]: expenseProp?.date
        ? new Date(expenseProp!.date)
        : new Date(),
      [Category]: expenseProp?.category.id || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
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
          name={Category}
          render={({ field }) => {
            return (
              <FormSelectField
                placeholder="Select a category"
                options={categories}
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
