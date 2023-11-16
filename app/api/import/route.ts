import xlsx from "node-xlsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export interface ProcessedData {
  concept: string;
  amount: number;
  date: string;
  category: string;
}

export async function POST(req: Request, res: NextResponse) {
  try {
    const file: File | null = (await req.formData()).get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileArrayBuffer: ArrayBuffer = await file.arrayBuffer();
    const importedData: ProcessedData[] = await processBuffer(fileArrayBuffer);
    
    const expenseId = await createTempExpenses(importedData);

    return NextResponse.json({ redirect: `${expenseId}` });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

async function createTempExpenses(importedData: ProcessedData[]): Promise<string> {
  const jsonImportedData = importedData.map((object) => {
    return {
      concept: object.concept,
      amount: object.amount,
      date: object.date,
      type: object.category,
    };
  });

  const expense = await prisma.temporalExpenses.create({
    data: {
      expenseList: { set: jsonImportedData },
    },
  });

  return expense.id;
}

async function processBuffer(arrayBuffer: ArrayBuffer): Promise<ProcessedData[]> {
  const buffer = Buffer.from(arrayBuffer);

  const workSheetsFromFile = xlsx.parse(buffer);
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
