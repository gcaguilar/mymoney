"use client";

import {
  Form,
  FormField,
} from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInputField from "@/app/components/FormInputField";

const formSchema = z.object({
  name: z.string().min(2),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  const data = { data: values };
  const jsonData = JSON.stringify(data);
  fetch(`api/categories`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export default function AddCategoryPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
          <Button type="submit">Añadir</Button>
        </form>
      </Form>
    </>
  );
}
