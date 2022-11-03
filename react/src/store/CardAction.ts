import { Card } from "../typings/Card";
import { Product } from "../typings/Product";
import { ADD_TO_CART, CHANGE, CLEAR, DELETE_PRODUCT, SET_PRODUCTS } from "./constants";

interface AddToCardAction {
  product: Product;
  type: typeof ADD_TO_CART;
}

interface ClearCardAction {
  type: typeof CLEAR;
}

interface SetCardAction {
  products: Product[];
  type: typeof SET_PRODUCTS;
}

interface DeleteProductInCardAction {
  productId: number;
  type: typeof DELETE_PRODUCT;
}

interface ChangeQuantity {
  product: Product,
  type: typeof CHANGE;
}

export type CardAction = AddToCardAction | ClearCardAction | SetCardAction | ChangeQuantity | DeleteProductInCardAction;
