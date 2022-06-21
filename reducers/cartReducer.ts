import { graphQLClient, queryClient } from "../graphql-client";
import { CreateOrderDocument, getSdk } from "../src/generated/graphql";
import { Cart, productInCart, product_type } from "../utility/interfaces";



const totalSumm = (data: productInCart[]) => {
  let totalSum = 0;
  data.map((cartItem) => (totalSum += cartItem.price * cartItem.qty));
  return totalSum;
}

const updateLocalStorage = (cart: any) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export const cartReducer = (state: Cart, action: { type: string; data: productInCart | productInCart[] | string | Cart }) => {
  console.log('PrevState', state);
  console.log('Action', action);
  let productsInCart: productInCart[];
  let cart;

  switch (action.type) {
    case 'ORDER_CREATED':
      cart =  {
        productsInCart: [],
        totalSum: 0
      }
      updateLocalStorage(cart);
      return cart;
    case 'INIT_CART':      
      return {...action.data as Cart }
    case 'ADD_PRODUCT_TO_CART':
      let newValue = true;
      let cartItem = (action.data) as productInCart;
      let res = state.productsInCart.map((value) => {
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
      cart =  {
        productsInCart: res,
        totalSum: totalSumm(res)
      }
      updateLocalStorage(cart);
      return cart;
    case 'REMOVE_PRODUCT_FROM_CART':
      productsInCart = state.productsInCart.filter((product: productInCart) => product.id + product.size !== action.data)
      cart = {
        totalSum: totalSumm(productsInCart),
        productsInCart
      }
      updateLocalStorage(cart);
      return cart;
    default:
      return state;
  }
} 