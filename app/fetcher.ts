type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const fetcher = async <T>(
  url: string,
  method: HttpMethod = "GET",
  body?: string
): Promise<T> => {
  const options: RequestInit = { method };

  if (method === "POST" && body) {
    options.body = body;
    options.headers = {
      "Content-Type": "application/json"
    };
  }

  return fetch(`${process.env.PATH_URL_BACKEND}/${url}`, options).then((res) =>
    res.json()
  );
};
