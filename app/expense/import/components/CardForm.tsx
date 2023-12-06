import FormDateField from "@/app/components/FormDateField";
import FormInputField from "@/app/components/FormInputField";
import FormSelectField from "@/app/components/FormSelectField";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/app/components/ui/form";
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
import { v4 as uuidv4 } from "uuid";

interface CardFormProps {
  expenses: Expense[];
  categories: Category[];
  onSubmit: (values: z.infer<typeof formListSchema>) => void;
  onRemove: (id: string) => void;
}

const CardForm: React.FC<CardFormProps> = ({
  expenses,
  categories,
  onSubmit,
  onRemove,
}) => {
  const values = expenses.map((expense) => ({
    [Title]: expense.name,
    [Amount]: Number(expense.amount),
    [ExpenseDate]: new Date(expense.date),
    [CategoryName]: expense.category.id,
    [Id]: uuidv4(),
  }));

  const form = useForm<z.infer<typeof formListSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fields: values,
    },
  });

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {expenses.map((value, index) => (
            <React.Fragment key={`${index}.${value.id}`}>
              <Card className="w-full">
                <CardContent>
                  <div className="flex flex-col space-y-1">
                    <FormField
                      control={form.control}
                      name={`fields.${index}.${Title}`}
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
                      name={`fields.${index}.${Amount}`}
                      render={({ field }) => (
                        <FormInputField
                          title="Cantidad"
                          type="number"
                          field={field}
                          placeholder=""
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fields.${index}.${ExpenseDate}`}
                      render={({ field }) => (
                        <FormDateField title="Fecha" field={field} />
                      )}
                    />
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormField
                        control={form.control}
                        name={`fields.${index}.${CategoryName}`}
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
                    </FormItem>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => onRemove(expenses[index][Id])}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            </React.Fragment>
          ))}
          <div className="sticky bottom-0 flex justify-between px-4 bg-white dark:bg-gray-800 py-2 shadow z-50">
            <Button className="w-full py-2 px-4 rounded" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CardForm;
