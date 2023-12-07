import { useCategories } from "@/app/hooks";
import { Category } from "@/app/models";

const useCategoryProcessing = () => {
  const { data: categories } = useCategories();

  const processCategory = (category: string): Category => {
    const words = category.split(/\s/g);
    let defaultCategory = { id: "", name: "" };
    for (const word of words) {
      const tempCategory = categories?.data.find((cat) => cat.name === word);
      if (tempCategory) {
        defaultCategory = tempCategory;
      } else {
        defaultCategory;
      }
    }

    return defaultCategory;
  };

  return {
    processCategory,
  };
};

export default useCategoryProcessing;
