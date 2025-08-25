export type Product = {
  name: string;
  icon: string;
  description: string;
};

export type Category = {
  id: number;
  name: string;
  products: Product[];
};

export type Data = Category[];
