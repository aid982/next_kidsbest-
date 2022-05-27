import React from 'react'
import { GlobalContext } from '../context/GlobalContext';
import styles from '../styles/Cart.module.css'
import { ShoppingCartOff } from "tabler-icons-react";
import { Grid, Box, Card, Image, Avatar, Text, Title, List, ListItem, Checkbox, Divider, Navbar, Button } from "@mantine/core";
import { useRouter } from 'next/router';



type Props = {}

export default function CartComponent({ }: Props) {
  const { productsInCart, dispatch } = React.useContext(GlobalContext);
 
  const router = useRouter();

  const handleRemoveFormCart = (event: React.MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();
    dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', data: event.currentTarget.id });

  }

  const handleCreateOrder = (event: React.MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();
    router.push({
      pathname: '/order',
      })

   // mutate({ date: new Date(),client:"1",products:productsInCart});
   // dispatch({ type: 'CREATE_ORDER', data: "" });


  }

  return (
    <Box className={styles.Cart} sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Text component="div" weight={10}>
        Товари у корзині:
      </Text>

      {productsInCart.map((product) =>
        <Card key={product.id + product.size} className={styles.CartList} p={10}>
          <div className={styles.Avatar_text}>
            <Avatar size={40} src={'/img/_' + product.code + '_.jpg'} alt={product.id + product.size} />
            <Text p={5}>
              {product.name + ' ціна: ' + product.price + ' грн. к-сть: ' + product.qty}
            </Text>
          </div>
          <Button type="button" id={product.id} key={product.id} leftIcon={<ShoppingCartOff />} className={styles.deleteButton} onClick={handleRemoveFormCart}><Text>Удалить</Text></Button>
        </Card>
      )}

      <Button onClick={handleCreateOrder}>Створити заказ</Button>


    </Box >
  )
}