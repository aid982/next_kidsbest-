import { graphQLClient, queryClient } from "../graphql-client";
import { CreateOrderDocument, getSdk } from "../src/generated/graphql";
import { productInCart, product_type } from "../utility/interfaces";



export const cartReducer =  (state: productInCart[], action: { type: string; data: productInCart | productInCart[] | string }) => {
  console.log('PrevState', state);
  console.log('Action', action);

  switch (action.type) {
    case 'CREATE_ORDER':
      
      return state;
      
    case 'INIT_CART': return [...action.data as productInCart[]]
    case 'ADD_PRODUCT_TO_CART':
      let newValue = true;
      let cartItem= (action.data) as productInCart;
      let res = state.map((value) => {
        if (value.id === cartItem.id && value.size === cartItem.size) {
          newValue = false;
          return { ...value, qty: value.qty + cartItem.qty }
        } else {
          return value;
        }
      });
      if (newValue) {
        res.push(cartItem);
      }
      return res;    
    case 'REMOVE_PRODUCT_FROM_CART':
      return state.filter((product: productInCart) => product.id !== action.data);
    default:
      return state;
  }
} 