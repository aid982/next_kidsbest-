import Link from 'next/link'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { GlobalContext } from '../context/GlobalContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const drawerWidth = 240;


interface Props {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  const { toggleMobileOpen, productsInCart } = React.useContext(GlobalContext);

  const handleDrawerToggle = () => {
    toggleMobileOpen();
    console.log('toggle');
  };

  return (
    <div className="layout">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

            </Typography>
            <Link href='/cart'>
            <Button color="inherit" startIcon={<ShoppingCartIcon />}>{'(' + productsInCart.length + ')'}</Button>
            </Link>
          </Toolbar>

        </AppBar>
      </Box>


      <div className="page-content">
        {props.children}
      </div>

      <footer>
        <p>Copyright 2022 kidsbest</p>
      </footer>
    </div>
  )
}