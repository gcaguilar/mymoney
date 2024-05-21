export type Category = {
  id: number;
  name: string;
}

export type CategoryWithKeywords = {
  id: number;
  name: string;
  associatesNames: string[];
};
