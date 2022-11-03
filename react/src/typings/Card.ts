import { ProductState } from "../store/ProductState";
import { Product } from "./Product";

export interface Card {
  [x: string]: any;
  id?: number,
  products: Product[],
  total: number
}
