import { fetcher, useCategories } from "@/app/hooks";
import { Category, Expense } from "@/app/models";
import { v4 as uuidv4 } from "uuid";
import { format, parse } from "date-fns";
import useSWR from "swr";

const useRowProcessing = () => {
  const { data: categoryResponse } = useCategories();
  const categoryList: Category[] = categoryResponse?.data || [];
  const { data: useKeywords } = useSWR("keywords", fetcher);
  const keywords = useKeywords?.data.map((item: any) => item.name) || [];

  const processRow = (row: any): Expense => {
    const expense: Expense = {
      id: uuidv4(),
      name: processedName(row[1]),
      amount: processedAmount(row[3]),
      date: processedData(row[2]),
      category: processedCategory(row[1]),
    };
    return expense;
  };

  const processedData = (row: string): string => {
    const date = parse(row, "dd/MM/yyyy", new Date());
    return format(date, "yyyy-MM-dd");
  };

  const processedCategory = (category: string): Category => {
    const words = category.split(/\s/g);

    const foundCategory = categoryList.find((cat) =>
      words.some((word) => cat.associatesNames.includes(word))
    );

    return (
      foundCategory || {
        id: "",
        name: "Categoría por defecto",
        associatesNames: [],
      }
    );
  };

  const processedName = (name: string): string => {
    const words = name.split(/\s+/);
    const filteredWords = words.filter((word) => !keywords.includes(word));
    return filteredWords.join(" ");
  };

  const processedAmount = (amount: string): string =>
    Math.abs(Number(amount)).toString();
  return {
    processRow,
  };
};

export default useRowProcessing;
