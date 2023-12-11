"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/app/components/ui/form";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

function KeywordsPage() {
  const formSchema = z.object({
    keyword: z
      .string()
      .min(1)
      .transform((val) => val.split(",").map((item) => item.trim())),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: [],
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    const data = { data: value };
    const jsonData = JSON.stringify(data);
    fetch(`${process.env.PATH_URL_BACKEND}keywords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Textarea {...form.register("keyword", { required: true })} />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </>
  );
}

export default KeywordsPage;
