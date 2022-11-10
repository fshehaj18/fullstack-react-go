import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { Product } from "../typings/Product";
import {
  ADD_PRODUCT,
  BASE_URL,
  DELETE_PRODUCTS,
  EDIT_PRODUCT,
  ORDER,
  SET_DATA,
} from "./constants";
import { ProductState } from "./ProductState";
import { productReducer } from "./ProductReducer";
import { Card } from "../typings/Card";

type Props = {
  children?: React.ReactNode;
};

const initialState: ProductState = { products: [] };
export const ProductContext = createContext<any>({
  products: [],
  addProduct: (product: Product) => {},
  setProducts: () => {},
  deleteProduct: (id: number) => {},
});

export const ProductsProvider = ({ children }: Props) => {
  const [productsState, dispatch] = useReducer(productReducer, initialState);
  useEffect(() => {
    setProducts();
  }, []);
  function addProduct(product: Product) {
    dispatch({ type: ADD_PRODUCT, product: product });
  }
  const setProducts = async () => {
    const response = await axios.get(BASE_URL);
    dispatch({ type: SET_DATA, products: response.data });
  };
  function deleteProduct(id: number) {
    dispatch({ type: DELETE_PRODUCTS, deleteProductId: id });
  }
  function order(card: Card){
    dispatch({ type: ORDER, products: card});
  }
  const value1 = {
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    setProducts: setProducts,
    order: order,
    products: productsState.products,
  };

  return (
    <ProductContext.Provider value={value1}>{children}</ProductContext.Provider>
  );
};
