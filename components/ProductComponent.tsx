
import { ShoppingCart } from "tabler-icons-react";

import React from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { product_type } from '../utility/interfaces'
import styles from '../styles/Product.module.css'
import Image from 'next/image';

import {
  AppShell,
  Navbar,
  Header,
  Text,
  Title,
  Box,
  List,
  ListItem,
  Checkbox,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  MultiSelect,
} from "@mantine/core";


type Props = {
  product: product_type;

}

export default function ProductComponent({ product }: Props) {
  const { dispatch, productsInCart } = React.useContext(GlobalContext);
  console.log('Products', product);
  const selectData = product.product_sizes.map((size) => ({ value: size.name, label: size.name, qty: size.qty }))

  const handleAddToCart = () => {

    dispatch({ type: 'ADD_PRODUCT_TO_CART', data: { id: product.id, name: product.name, price: product.price, size: '3t', qty: 1, code: product.code } });
    /* dispatch({ type: 'ADD_PRODUCT_TO_CART',
     {
         id: product.id,
         name: product.name,
         price: product.price,
         size: "2T",
         qty: 1
       }
     });*/
    console.log('Cart', productsInCart);
  }

  return (
    <div className={styles.Product}>

      <Image className={styles.Image} src={'/../img/_' + product.code + '_.jpg'} alt={product.code} width={300} height={375}  layout="fixed" />


      <div className={styles.Data}>
        <Text>{product.name}</Text>
        <Text>Ціна:{product.price}</Text>
        <MultiSelect
          data={selectData}
          label="Оберіть розмір:"
          placeholder="Оберіть розмір:"
        />

        <h1>{/*product.sizes.map((size)=>(<div key={product.id+size}>{size}</div>))*/}</h1>
        <Button rightIcon={<ShoppingCart />} onClick={handleAddToCart}>
          Добавить
        </Button>
      </div>
    </div>
  )
}