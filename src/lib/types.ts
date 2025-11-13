export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  seller: string;
  location: string;
  createdAt: Date;
}

export type Category = 
  | "Eletrônicos"
  | "Veículos"
  | "Imóveis"
  | "Moda"
  | "Casa e Jardim"
  | "Esportes"
  | "Outros";

export const CATEGORIES: Category[] = [
  "Eletrônicos",
  "Veículos",
  "Imóveis",
  "Moda",
  "Casa e Jardim",
  "Esportes",
  "Outros"
];
