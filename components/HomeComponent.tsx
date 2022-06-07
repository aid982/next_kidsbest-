import * as React from 'react';
import { Grid, Card, Text, Title, List, ListItem, Checkbox, Divider, Navbar, Collapse, Button } from "@mantine/core";
import Image from 'next/image';
import { HomePageProps } from '../utility/interfaces';

import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { GlobalContext } from '../context/GlobalContext';
import { endpoint } from '../graphql-client';



const drawerWidth = 240;
interface HomeComponentProps extends HomePageProps {
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
  handleCheckboxSizes: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxCategories: (event: React.ChangeEvent<HTMLInputElement>) => void;

}
const drawer = (props: any) => (
  <div>

    <Divider />
    <Text align='center'>Розміри</Text>
    <List>
      {props.sizes.map((size: any) => (
        <ListItem key={size.title}>
          <Checkbox id={size.title} checked={size.checked} onChange={props.handleCheckboxSizes} />

        </ListItem>
      ))}
    </List>
    <Divider />

  </div>
);


export default function HomeComponent(props: HomeComponentProps) {
  const { mobileOpen } = React.useContext(GlobalContext);
  const [openedSize, setOpenSize] = React.useState(false);
  const [openedCategories, setCategories] = React.useState(false);
  return (
    <div>
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!mobileOpen}
        width={{ sm: 200 }}
      >        
        <Button variant='outline' onClick={() => setOpenSize((o) => !o)}>
          + Розміри:
        </Button>
        <Collapse in={openedSize}>
          {props.sizes && props.sizes.map((size: any) => (

            <Checkbox p={5} key={size.title} id={size.title} label={size.title} title={size.title} checked={size.checked} onChange={props.handleCheckboxSizes} />


          ))}
        </Collapse>

        <Button variant='outline' onClick={() => setCategories((o) => !o)}>
          + Категорії:
        </Button>
        <Collapse in={openedCategories}>
          {props.categories && props.categories.map((categorie: any) => (

            <Checkbox p={5} key={categorie.title} id={categorie.title} label={categorie.title} title={categorie.title} checked={categorie.checked} onChange={props.handleCheckboxCategories} />


          ))}
        </Collapse>

      </Navbar>
      <div className={styles.ImageList}>
        {props.visible_products!.map((item, i) => (
          <Link href={'/product/' + item.id} key={item.code}>
            <div className={styles.Card}>
              <div className={styles.Image}>
                <Image src={'/../img/_' + item.code + '_.jpg'} alt={item.name} width={300} height={375} />
                { /* <Image src={endpoint+item.img} alt={item.name} width={300} height={375}  />*/}

              </div>
              <div className={styles.Title}>{item.name}</div>
              <div className={styles.Price}>
                Ціна {item.price} грн.
              </div>
            </div>
          </Link>

        ))}

      </div>
    </div>





  );
}
