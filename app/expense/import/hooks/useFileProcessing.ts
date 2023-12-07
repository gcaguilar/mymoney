import xlsx from "node-xlsx";
import { parse, format } from "date-fns";
import { useCategories } from "@/app/hooks";
import { useMemo, useState } from "react";
import { Category, Expense } from "@/app/models";
import { v4 as uuidv4 } from "uuid";

const PAGE_SIZE = 10;

const useFileProcessing = () => {
  const [processedData, setProcessedData] = useState<Expense[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
      id: uuidv4(),
      name: row[1].trim(),
      amount: row[3],
      date: format(date, "yyyy-MM-dd"),
      category: processCategory(row[1], category),
    };

    return expense;
  };

  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = currentPage * PAGE_SIZE;
    return processedData.slice(startIdx, endIdx);
  }, [processedData, currentPage]);

  const totalPages = Math.ceil(processedData.length / PAGE_SIZE);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onRemoveItem = (id: string) => {
    const newData = processedData.filter((item) => item.id !== id);
    setProcessedData(newData);
  };

  return {
    processFiles,
    paginatedData,
    currentPage,
    nextPage,
    prevPage,
    totalPages,
    onRemoveItem,
  };
};

export default useFileProcessing;
