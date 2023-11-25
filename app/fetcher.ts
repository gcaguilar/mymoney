const HttpMethod = {
  GET: "GET" as const,
  POST: "POST" as const,
  PUT: "PUT" as const,
  DELETE: "DELETE" as const
}

type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];

const fetcher = async <T>(
  url: string,
  method: HttpMethod = HttpMethod.GET,
  body?: string
): Promise<T> => {
  const options: RequestInit = { method };

  if ((method !== HttpMethod.GET || HttpMethod.DELETE) && body) {
    options.body = body;
    options.headers = {
      "Content-Type": "application/json"
    };
  }

  return fetch(`${process.env.PATH_URL_BACKEND}/${url}`, options).then((res) =>
    res.json()
  );
};

export {
  HttpMethod,
  fetcher
}