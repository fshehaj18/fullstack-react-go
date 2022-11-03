import { Card } from "../typings/Card";
import { CardAction } from "./CardAction";
import { ADD_TO_CART, CHANGE, CLEAR, DELETE_PRODUCT } from "./constants";

export function cardReducer(state: Card, action: CardAction): Card {
  switch (action.type) {
    case ADD_TO_CART: {
      
      if (state.products === undefined) {
        state.products = [];
      }
      const updatedList = state;
      const checkProduct = state.products.find(
        (x) => x.id === action.product.id
      );
      if (!checkProduct) {
        updatedList.products?.push(action.product);
        return { ...state, products: updatedList.products, total: state.total+1 };
      } else {
        checkProduct.quantity++;
        const result = updatedList.products.map((item) =>
          item.id === checkProduct.id ? checkProduct : item
        );

        return { ...state, products: result, total: state.total+1 };
      }
    }
    case CLEAR: {
      return { ...state, products: [] };
    }
    case CHANGE: {
      const updatedList = state;
      
      return { ...state, products: updatedList.products };
    }
    case DELETE_PRODUCT: {
      const newList = state.products.filter(
        (p: any) => p.id !== action.productId
      );
      return { ...state, products: newList };
    }
    default: {
      return state;
    }
  }
}
