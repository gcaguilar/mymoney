'use client'

import xlsx from "node-xlsx";
import { useMemo, useState } from "react";
import { Expense } from "@/app/types/Expense";
import useRowProcessing from "./useRowProcessing";

const PAGE_SIZE = 10;

const useFileProcessing = async () => {
  const [processedData, setProcessedData] = useState<Expense[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { processRow } = await useRowProcessing();

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
            const processedRow = processRow(row);
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

  const onRemoveItem = (id: number) => {
    const newData = processedData.filter((item) => item.id !== id);
    setProcessedData(newData);
  };

  const onUpdateItem = (expense: Expense) => {
    const index = processedData.findIndex((item) => item.id === expense.id);
    if (index !== -1) {
      const newData = [...processedData];
      newData[index] = expense;
      setProcessedData(newData);
    }
  };

  const submitFile = () => {
    const data = { data: processedData };
    const jsonData = JSON.stringify(data);
    fetch(`${process.env.PATH_URL_BACKEND}expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
  };

  return {
    processFiles,
    paginatedData,
    currentPage,
    nextPage,
    prevPage,
    totalPages,
    onRemoveItem,
    onUpdateItem,
    submitFile,
  };
};

export default useFileProcessing;
