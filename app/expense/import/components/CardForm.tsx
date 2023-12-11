import FormDateField from "@/app/components/FormDateField";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
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
} from "../../validations";
import { v4 as uuidv4 } from "uuid";
import FormInputField from "@/app/components/FormInputField";
import FormCombox from "@/app/components/FormCombox";

interface CardFormProps {
  expenses: Expense[];
  categories: Category[];
  onSubmit: (values: z.infer<typeof formListSchema>) => void;
  onRemove: (id: string) => void;
  onUpdateItem: (expense: Expense) => void;
}

const CardForm: React.FC<CardFormProps> = ({
  expenses,
  categories,
  onSubmit,
  onRemove,
  onUpdateItem,
}) => {
  const values = expenses.map((expense) => ({
    [Title]: expense.name,
    [Amount]: Number(expense.amount),
    [ExpenseDate]: new Date(expense.date),
    [CategoryName]: expense.category.id,
    [Id]: uuidv4(),
  }));

  const form = useForm<z.infer<typeof formListSchema>>({
    resolver: zodResolver(formListSchema),
    defaultValues: {
      fields: values,
    },
  });

  const sortedOptions = categories
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

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
                          onFieldChange={(name) => {
                            const newData = { ...value, name: name as string };
                            onUpdateItem(newData);
                          }}
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
                          onFieldChange={(number) => {
                            const newData = {
                              ...value,
                              amount: number as string,
                            };
                            onUpdateItem(newData);
                          }}
                          field={field}
                          placeholder=""
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`fields.${index}.${ExpenseDate}`}
                      render={({ field }) => (
                        <FormDateField
                          title="Fecha"
                          onFieldChange={(date) => {
                            const newData = {
                              ...value,
                              date: date!.toISOString(),
                            };
                            onUpdateItem(newData);
                          }}
                          field={field}
                        />
                      )}
                    />
                    <FormItem>
                      <FormField
                        control={form.control}
                        name={`fields.${index}.${CategoryName}`}
                        render={({ field }) => {
                          return (
                            <FormCombox
                              onFieldChange={(id, name) => {
                                const newData = {
                                  ...value,
                                  category: {
                                    id: id,
                                    name: name,
                                    associatesNames: [],
                                  },
                                };
                                onUpdateItem(newData);
                              }}
                              options={sortedOptions}
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
