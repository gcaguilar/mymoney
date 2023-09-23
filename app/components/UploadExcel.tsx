"use server";

import xlsx from "node-xlsx";

export interface ProcessedData {
  concept: string;
  amount: number;
  date: string;
  category: string;
}

async function upload(data: FormData): Promise<Buffer> {
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return buffer;
}

async function processBuffer(params: Buffer): Promise<ProcessedData[]> {
  const workSheetsFromFile = xlsx.parse(params);
  const sheet: any[][] = workSheetsFromFile[0].data;

  let i = 8;
  const firstField = 1;

  const processedData: ProcessedData[] = [];

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
