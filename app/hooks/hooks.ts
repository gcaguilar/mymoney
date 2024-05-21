interface Response<T> {
  data: T;
}

export const useCategories = async () => {
  const response = await fetch("http://localhost:3000/api/categories", {
    method: "GET",
  });
  const { data } = await response.json();
  return data;
};

export const useExpenses = async () => {
  const response = await fetch("http://localhost:3000/api/expenses", {
    method: "GET",
  });
  const { data } = await response.json();
  return data;
};

export const useExpense = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/expense/${id}`, {
    method: "GET",
  });
  const { data } = await response.json();
  return data;
};

export const useKeywords = async () => {
  const response = await fetch(`http://localhost:3000/api/keywords`, {
    method: "GET",
  });
  const { data } = await response.json();
  return data;
};
