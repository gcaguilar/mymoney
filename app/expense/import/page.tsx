import prisma from "@/lib/db/prisma";
import FormSubmitButton from "../../components/FormSubmitButton";
import { Metadata } from "next";
import xlsx from "node-xlsx";

export const metadata: Metadata = {
  title: "Importar Gastos - Mi dinero",
};

async function upload(data: FormData) {
  "use server";

  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  readExcel(buffer);

  return { success: true };
}

async function readExcel(params: Buffer) {
  const workSheetsFromFile = xlsx.parse(params);
  const sheet: any[][] = workSheetsFromFile[0].data;

  let i = 8;
  const firstField = 1
  while (i < sheet.length) {
    const row: any[] = sheet[i].slice(firstField);
    const isEmptyRow = row.every(
      (cell) => cell === null || cell === undefined || cell === ""
    );
    if (isEmptyRow) {
      break;
    }
    console.log(`Fila ${i + 1}: ${row.join(", ")}`);
    i++;
  }
}

function ImportExpensePage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Nuevo gasto</h1>
      <form action={upload}>
        <input
          name="file"
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <FormSubmitButton className="btn-primary" type="submit">
          Guardar
        </FormSubmitButton>
      </form>
    </div>
  );
}

export default ImportExpensePage;
