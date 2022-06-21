import React from 'react'
import { GlobalContext } from '../context/GlobalContext';
import styles from '../styles/Cart.module.css'
import {   Card, Image, Avatar, Text, Title,  Divider,  Button, CloseButton, Box  } from "@mantine/core";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { showNotification } from '@mantine/notifications';



type Props = {}

export default function CartComponent({ }: Props) {

  const { cart, dispatch } = React.useContext(GlobalContext);  

  const router = useRouter();

  const handleRemoveFormCart = (event: React.MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();

    dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', data: event.currentTarget.id });

  }

  const handleCreateOrder = (event: React.MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();
    if (cart.totalSum === 0) {
      showNotification({
        title: 'Нет товаров в корзине!!',
        message: '',
      })
    } else {
      router.push({
        pathname: '/order',
      })
    }
  }

  return (
    <Box className={styles.Cart} sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Title order={4} pb={10}>
        Товари у корзині:
      </Title>
      <Divider />

      {
        cart.productsInCart.map((product) => {
          return <Card key={product.id + product.size} className={styles.CartList} p={10}>
            <div className={styles.Avatar_text}>
              <Avatar size={40} src={'/img/_' + product.code + '_large.jpg'} alt={product.id + product.size} />
              <Text p={5} >
                {product.name}
              </Text>
              <Text p={5}>
                {' Размер : ' + product.size + ' Цена: ' + product.price + ' грн. кво: ' + product.qty}
              </Text>
            </div>
            {/*<Button type="button" id={product.id} key={product.id} leftIcon={<ShoppingCartOff />} className={styles.deleteButton} onClick={handleRemoveFormCart}><Text>Удалить</Text></Button>*/}
            <CloseButton id={product.id + product.size} key={product.id} title="Удалить товар" size="xl" iconSize={20} onClick={handleRemoveFormCart} />
          </Card>


        }
        )}


      <Title order={6} p={10} className={styles.Total}>
        Итого товара на сумму : {cart.totalSum} грн.
      </Title>
      <Link href={'/'}>
        <Text underline p={10} style={{ textAlign: 'center', margin: '10px auto' }}>
          Вернуться к покупкам
        </Text>
      </Link>


      <Button style={{ display: 'block', margin: '10px auto' }} onClick={handleCreateOrder}>Створити заказ</Button>

    


    </Box >
  )
}