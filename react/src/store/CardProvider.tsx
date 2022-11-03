import React, { createContext, useEffect, useReducer } from "react";
import { Card } from "../typings/Card";
import { Product } from "../typings/Product";
import { cardReducer } from "./CardReducer";
import { CardState } from "./CardState";
import {
  ADD_TO_CART,
  CHANGE,
  CLEAR,
  DELETE_PRODUCT,
  SET_PRODUCTS,
} from "./constants";

const initialState: Card = { products: [], total: 0 };
type Props = {
  children?: React.ReactNode;
};
export const CardContext = createContext<any>({
  card: {},
  addProduct: (product: Product) => { },
});

export const CardProvider = ({ children }: Props) => {
  const [cardState, dispatch] = useReducer(cardReducer, initialState);
  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(cardState));
  }, [cardState]);

  function addProduct(product: Product) {
    dispatch({ type: ADD_TO_CART, product: product });
  }

  function deleteProduct(productId: number) {
    dispatch({ type: DELETE_PRODUCT, productId });
  }

  function clearCard() {
    dispatch({ type: CLEAR });
  }

  function changeQuantity(product: Product, amount: number) {
    product.quantity += amount;
    dispatch({ type: CHANGE, product: product });
  }
  const value1 = {
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    clearCard: clearCard,
    changeQuantity: changeQuantity,
    card: { products: cardState },
  };

  return <CardContext.Provider value={value1}>{children}</CardContext.Provider>;
};
