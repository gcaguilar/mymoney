export const useMetrics = async () => {
  const response = await fetch("http://localhost:3000/api/metrics", {
    method: "GET",
  });
  const { data } = await response.json();
  return data;
};
