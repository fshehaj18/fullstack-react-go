import { ADD_PRODUCT, DELETE_PRODUCTS, EDIT_PRODUCT, ORDER, SET_DATA } from "./constants";
import { ProductAction } from "./ProductAction";
import { ProductState } from "./ProductState";

export function productReducer(state: ProductState, action: ProductAction): ProductState {

  switch (action.type) {
    case ADD_PRODUCT: {
      const updatedList = state
      updatedList.products.push(action.product)
      return {...state, products: updatedList.products};
    }

    case SET_DATA: {
      return {...state, products: action.products};
    }
    case DELETE_PRODUCTS: {
      const tempCart = state.products.filter((item) => item.id !== action.deleteProductId)
      
      return {...state, products: tempCart};
    }

    case ORDER: {
      
    }
    default: {
      return state;
    }
  }
}
