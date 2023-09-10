import FormSubmitButton from "@/app/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Añadir categoria - Mi dinero",
};

async function addCategory(formData: FormData) {
  "use server";

  const name = formData.get("title")?.toString();

  if (!name) {
    throw Error("Falta de rellenar algun campo");
  }

  await prisma.category.create({ data: { name } });
}

export default function AddCategoryPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Nueva categoria</h1>
      <form action={addCategory}>
        <input
          required
          name="title"
          placeholder="Supermercado"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-primary" type="submit">
          Añadir
        </FormSubmitButton>
      </form>
    </div>
  );
}
