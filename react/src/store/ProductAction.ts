import { Product } from "../typings/Product";
import { ADD_PRODUCT, DELETE_PRODUCTS, EDIT_PRODUCT, ORDER, SET_DATA } from "./constants";

interface AddProductAction {
  product: Product;
  type: typeof ADD_PRODUCT;
}

interface EditProductAction {
  editProduct: Product[];
  type: typeof EDIT_PRODUCT;
}

interface DeleteProductAction {
  deleteProductId: number;
  type: typeof DELETE_PRODUCTS;
}

interface SetDataAction {
  products: Product[];
  type: typeof SET_DATA;
}
interface ProceedOrder {
  products: Product[];
  type: typeof ORDER;
}
export type ProductAction =
  | AddProductAction
  | EditProductAction
  | DeleteProductAction
  | SetDataAction
  | ProceedOrder;
