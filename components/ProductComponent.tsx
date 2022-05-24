import { ShoppingBasketRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { product_type } from '../utility/interfaces'
import styles from '../styles/Product.module.css'
import Image from 'next/image';


type Props = {
  product: product_type;

}

export default function ProductComponent({ product }: Props) {
  const { dispatch, productsInCart } = React.useContext(GlobalContext);
  console.log('Products', product);
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
      <div className={styles.Image}>
        <Image src={'/../img/_' + product.code + '_.jpg'} alt={product.code} width={300} height={375} layout="fixed" />

      </div>
      <div className={styles.Data}>
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
        <h1>{/*product.sizes.map((size)=>(<div key={product.id+size}>{size}</div>))*/}</h1>
        <Button variant="contained" endIcon={<ShoppingBasketRounded />} onClick={handleAddToCart}>
          Добавить
        </Button>
      </div>
    </div>
  )
}