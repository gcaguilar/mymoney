export const fetcher = (url: string) =>
  fetch(`${process.env.PATH_URL_BACKEND}${url}`).then((res) => res.json());
