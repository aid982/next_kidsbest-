
import { ShoppingCart } from "tabler-icons-react";

import React, { useState } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { product_type } from '../utility/interfaces'
import styles from '../styles/Product.module.css'
import Image from 'next/image';
import {
  Text,
  Button,
  RadioGroup,
  Radio,
  Center,
} from "@mantine/core";
import Head from "next/head";


type Props = {
  product: product_type;

}

export default function ProductComponent({ product }: Props) {
  const { dispatch, cart } = React.useContext(GlobalContext);


  const [size, setSize] = useState('');


  const handleAddToCart = () => {

    dispatch({ type: 'ADD_PRODUCT_TO_CART', data: { id: product.id, name: product.name, price: product.price, size: size, qty: 1, code: product.code } });

  }

  return (
    <div className={styles.Product}>
      <Head>
        <title>{product.name}</title>
        <meta name="keywords" content={product.keyWords} />
        <meta name="description" content={product.description_meta} />
      </Head>
      <div className={styles.Image}>
        <Image src={'/../img/_' + product.code + '_large.jpg'} alt={product.code}  layout="fill" />
      </div>
      <div className={styles.Data}>
        <Text size="md" weight="bold" >{product.name}</Text>
        <Text size="md" weight="bold" >Ціна : {product.price} грн.</Text>
        <Text dangerouslySetInnerHTML={{ __html: product.description }} />
        <Center>
        <RadioGroup
          value={size}
          onChange={setSize}
          label="Выбирите размер:"
          p={5}
          required
          style={{justifyContent:'center'}}
          
        >
          {product.product_sizes.map((size) =>
            (<Radio key={size.name}  value={size.name} label={size.name} />))
          }
        </RadioGroup>
        </Center>
        <h1>{/*product.sizes.map((size)=>(<div key={product.id+size}>{size}</div>))*/}</h1>
        <Button rightIcon={<ShoppingCart />} onClick={handleAddToCart}>
          Добавить
        </Button>
      </div>
    </div>
  )
}