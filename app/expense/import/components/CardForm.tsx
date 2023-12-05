import FormDateField from "@/app/components/FormDateField";
import FormInputField from "@/app/components/FormInputField";
import FormSelectField from "@/app/components/FormSelectField";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Form, FormField } from "@/app/components/ui/form";
import { Category, Expense } from "@/app/models";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Amount,
  CategoryName,
  ExpenseDate,
  Id,
  Title,
  formListSchema,
  formSchema,
} from "../../Validations";

interface CardFormProps {
  expenses: Expense[];
  categories: Category[];
  onSubmit: (values: z.infer<typeof formListSchema>) => void;
}

const CardForm: React.FC<CardFormProps> = ({
  expenses,
  categories,
  onSubmit,
}) => {
  const values = expenses.map((expense, index) => ({
    [Title]: expense.name,
    [Amount]: Number(expense.amount),
    [ExpenseDate]: new Date(expense.date),
    [CategoryName]: expense.category.id,
    [Id]: Math.random().toString() 
  }));

  const form = useForm<z.infer<typeof formListSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg">
        {expenses.map((value, index) => (
          <React.Fragment key={value[Id]}>
            <Card>
              <CardContent>
                <FormField
                  control={form.control}
                  name={`${index}.${Title}`}
                  render={({ field }) => (
                    <FormInputField
                      title="Titulo"
                      type="text"
                      field={field}
                      placeholder=""
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${index}.${Amount}`}
                  render={({ field }) => (
                    <FormInputField
                      key={`${index}${Amount}`}
                      title="Cantidad"
                      type="number"
                      field={field}
                      placeholder=""
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${index}.${ExpenseDate}`}
                  render={({ field }) => (
                    <FormDateField title="Fecha" field={field} />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${index}.${CategoryName}`}
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
                <Button>Remove</Button>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CardForm;
