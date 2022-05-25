import React from 'react'
import { GlobalContext } from '../context/GlobalContext';
import styles from '../styles/Cart.module.css'
import { ShoppingCartOff } from "tabler-icons-react";
import { Grid, Box, Card, Image, Avatar, Text, Title, List, ListItem, Checkbox, Divider, Navbar, Button } from "@mantine/core";



type Props = {}

export default function CartComponent({ }: Props) {
  const { productsInCart, dispatch } = React.useContext(GlobalContext);

  const handleRemoveFormCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('id', event.target);
    console.log(event);
    event.preventDefault();
    dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', data: event.target.id });

  }

  return (
    <Box className={styles.Cart} sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid>
        <Text  component="div">
          Товари у корзині:
        </Text>
        <List  >
          {productsInCart.map((product) =>
            <Grid.Col key={product.id + product.size} xs={12} md={6} lg={4} p={5}>
              <List.Item >
                <Avatar size={30} src={'/img/_' + product.code + '_.jpg'} alt={product.id + product.size} />
                <Text>
                  {product.name + ' ' + product.price + ' ' + product.qty}
                </Text>
                <Button leftIcon={<ShoppingCartOff />}>Удалить</Button>
              </List.Item>
            </Grid.Col>



          )}
        </List>
      </Grid>
    </Box >
  )
}