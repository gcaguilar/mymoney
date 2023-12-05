import xlsx from "node-xlsx";
import { parse, format } from "date-fns";
import { useCategories } from "@/app/hooks";
import { useState } from "react";
import { Category, Expense } from "@/app/models";

const useFileProcessing = () => {
  const [processedData, setProcessedData] = useState<Expense[]>();
  const { data: categories } = useCategories();

  const processFiles = async (files: File[]) => {
    const processedRowList: Expense[] = [];

    for (let i = 0; i < files.length; i++) {
      const arrayBuffer = await files[i].arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const workSheetsFromFile = xlsx.parse(buffer);

      workSheetsFromFile.forEach((workSheet) => {
        let foundEmptyRow = false;
        let rowIndex = 5;
        while (!foundEmptyRow && rowIndex < workSheet.data.length) {
          const row = workSheet.data[rowIndex];

          const columnsToRead = row.slice(2, 5);
          const isEmptyRow = columnsToRead.every(
            (cell) => cell === undefined || cell === ""
          );

          if (!isEmptyRow) {
            const processedRow = proccessRow(row, categories!.data);
            processedRowList.push(processedRow);
          } else {
            foundEmptyRow = true;
          }
          rowIndex++;
        }
      });
    }

    setProcessedData(processedRowList);
  };

  const processCategory = (
    category: string,
    categories: Category[]
  ): Category => {
    const words = category.split(/\s/g);
    let defaultCategory = { id: "", name: "" };
    for (const word of words) {
      const tempCategory = categories.find((cat) => cat.name === word);
      if (tempCategory) {
        defaultCategory = tempCategory;
      } else {
        defaultCategory;
      }
    }

    return defaultCategory;
  };

  const proccessRow = (row: any, category: Category[]): Expense => {
    const date = parse(row[2], "dd/MM/yyyy", new Date());
    const expense: Expense = {
      id: "",
      name: row[1].trim(),
      amount: row[3],
      date: format(date, "yyyy-MM-dd"),
      category: processCategory(row[1], category),
    };

    return expense;
  };

  return { processedData, processFiles };
};

export default useFileProcessing;
