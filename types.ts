export type Product = {
  name: string;
  icon: string;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  products: Product[];
};

export type Data = Category[];
