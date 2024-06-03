export interface IBook {
  id: number;
  title: string;
  author: string;
  pages: number;
  publisher: string;
  year: number;
  cover: string;
}

export interface IBookResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: IBook[];
}
