import prisma from "@/lib/db/prisma";
import xlsx from "node-xlsx";
import FormSubmitButton from "../../components/FormSubmitButton";
import { ProcessedData } from "../../components/UploadExcel";
import { Metadata } from "next";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { redirect } from "next/dist/server/api-utils";

export const metadata: Metadata = {
  title: "Importar Gastos - Mi dinero",
};

async function upload(data: FormData): Promise<ProcessedData[]> {
  "use server";

  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const processedData = await processBuffer(buffer);

  return processedData;
}

async function processBuffer(params: Buffer): Promise<ProcessedData[]> {
  "use server";

  const workSheetsFromFile = xlsx.parse(params);
  const sheet: any[][] = workSheetsFromFile[0].data;

  let i = 8;
  const firstField = 1;
  const processedRowList: ProcessedData[] = [];
  dayjs.extend(customParseFormat);

  while (i < sheet.length) {
    const row: any[] = sheet[i].slice(firstField);
    const isEmptyRow = row.every(
      (cell) => cell === null || cell === undefined || cell === ""
    );

    if (isEmptyRow) {
      break;
    }

    const processedRow: ProcessedData = {
      concept: row[0].trim(),
      amount: -Number(row[2]),
      date: formatExpenseDate(row[1]),
      category: await setCategoryToRow(row[0]),
    };

    processedRowList.push(processedRow);

    i++;
  }

  return processedRowList;
}

async function setCategoryToRow(rowConcept: string): Promise<string> {
  "use server";
  let category = "";

  const conceptCategory = await prisma.conceptCategory.findFirst({
    select: {
      category: true,
    },
    where: {
      concept: {
        equals: rowConcept,
      },
    },
  });

  const defaultCategory = await prisma.category.findFirst({
    select: {
      name: true,
    },
  });

  if (conceptCategory) {
    category = conceptCategory.category;
  } else if (defaultCategory) {
    category = defaultCategory!.name;
  }

  return category;
}

function formatExpenseDate(date: string): string {
  return dayjs(date, "DD/MM/YYYY", "es", true).format("YYYY-MM-DD");
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
