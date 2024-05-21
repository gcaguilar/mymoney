"use client";

import { Form, FormField } from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import { z } from "zod";
import FormInputField from "@/app/components/FormInputField";
import { Textarea } from "@/app/components/ui/textarea";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(2),
  associatesNames: z
    .string()
    .transform((val) => val.split(",").map((item) => item.trim()))
    .optional(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  const data = { data: values };
  const jsonData = JSON.stringify(data);
  fetch(`${process.env.PATH_URL_BACKEND}categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export default function AddCategoryPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      associatesNames: [],
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInputField
                title="Nombre"
                placeholder="Gastos comunes"
                field={field}
                type="text"
              />
            )}
          />
          <Textarea
            placeholder="Delivery, Bizum, Supermercado..."
            {...form.register("associatesNames")}
          />
          <Button type="submit">Añadir</Button>
        </form>
      </Form>
    </>
  );
}
