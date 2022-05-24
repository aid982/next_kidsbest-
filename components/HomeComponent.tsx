import * as React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { HomePageProps } from '../utility/intrerfaces';
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import Link from 'next/link';


const drawerWidth = 240;
interface HomeComponentProps extends HomePageProps {
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
  handleCheckboxSizes: (event: React.ChangeEvent<HTMLInputElement>) => void;

}


export default function HomeComponent(props: HomeComponentProps) {
  const { window } = props;
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Typography align='center'>Розміри</Typography>
      <List>
        {props.sizes.map((size) => (
          <ListItem button key={size.title}>
            <FormControlLabel control={<Checkbox id={size.title} checked={size.checked} onChange={props.handleCheckboxSizes} />} label={size.title} />

          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.toggleMobileOpen}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
      >
        <div className={styles.ImageList}>
          {props.visible_products!.map((item) => (
            <Link href={'/product/' + item.id} key={item.code}>
              <ImageListItem key={item.code}>
                <div className={styles.Image}>
                  <Image src={'/../img/_' + item.code + '_.jpg'} alt={item.code} width={300} height={375} layout="fixed" />
                  <ImageListItemBar className={styles.ImageTitle}
                    title={item.name}
                    subtitle={<span>by: {item.price}</span>}
                    position="below"
                  />
                </div>

              </ImageListItem>
            </Link>

          ))}
        </div>



      </Box>
    </Box>
  );
}
