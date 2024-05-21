import { useKeywords } from "@/app/hooks/hooks";
import { format, parse } from "date-fns";
import { Expense } from "@/app/types/Expense";
import { Category, CategoryWithKeywords } from "@/app/types/Category";

const useRowProcessing = async () => {
  // const categoryList: Category[] = await useCategories();
  const categoryWithKeywords: CategoryWithKeywords[] = await useKeywords();

  const processRow = (row: any): Expense => {
    const expense: Expense = {
      id: 1,
      name: row[1],
      amount: processedAmount(row[3]),
      transactionDate: processedData(row[2]),
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

    const foundCategory = categoryWithKeywords.find((cat) =>
      words.some((word) => cat.expensesNames.includes(word))
    );

    return (
      foundCategory || {
        id: -1,
        name: "Categoría por defecto",
      }
    );
  };

  // const processedName = (name: string): string => {
  //   const words = name.split(/\s+/);
  //   const filteredWords = words.filter((word) => !categoryWithKeywords.includes(word));
  //   return filteredWords.join(" ");
  // };

  const processedAmount = (amount: string): string =>
    Math.abs(Number(amount)).toString();

  return { processRow };
};

export default useRowProcessing;
