import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import { GlobalContext } from '../context/GlobalContext';
import styles from '../styles/Cart.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {}

export default function CartComponent({ }: Props) {
  const { productsInCart,dispatch } = React.useContext(GlobalContext);

  const handleRemoveFormCart = (event: React.MouseEvent<HTMLButtonElement>) =>{
    console.log('id',event.target.id);
    console.log(event);
    event.preventDefault();
    dispatch({type:'REMOVE_PRODUCT_FROM_CART',data:event.target.id});

  }

  return (
    <Box className={styles.Cart} sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Товари у корзині:
        </Typography>
        <List dense={true} >
          {productsInCart.map((product) =>
            <ListItem key={product.id+product.size}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleRemoveFormCart} id={product.code}>
                  <DeleteIcon />
                </IconButton>

              }
            >
              <ListItemAvatar>
                <Avatar><Image src={'/img/_' + product.code + '_.jpg'} alt={product.code} width={30} height={30} layout="fill" /> </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={product.name + ' ' + product.price + ' ' + product.qty} />
            </ListItem>



          )}
        </List>
      </Grid>
    </Box >
  )
}