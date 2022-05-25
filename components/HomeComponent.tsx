import * as React from 'react';
import { Grid, Card, Image, Text, Title, List, ListItem,Checkbox,Divider } from "@mantine/core";

import { HomePageProps } from '../utility/interfaces';

import styles from '../styles/Home.module.css'
import Link from 'next/link';


const drawerWidth = 240;
interface HomeComponentProps extends HomePageProps {
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
  handleCheckboxSizes: (event: React.ChangeEvent<HTMLInputElement>) => void;

}
const drawer = (props:any) => (
  <div>
    
    <Divider />
    <Text align='center'>Розміри</Text>
    <List>
      {props.sizes.map((size:any) => (
        <ListItem  key={size.title}>
          <Checkbox id={size.title} checked={size.checked} onChange={props.handleCheckboxSizes} />

        </ListItem>
      ))}
    </List>
    <Divider />
 
  </div>
);


export default function HomeComponent(props: HomeComponentProps) {  
  return (
    <div className={styles.ImageList}>      
      
        {props.visible_products!.map((item, i) => (
         /* <Grid.Col xs={12} md={6} lg={4} key={[item.id, i].join(":")} p={5}>*/
            <Link href={'/product/' + item.id} key={item.code}>
              <Card>
                <Card.Section>
                  <Image src={'/../img/_' + item.code + '_.jpg'} alt={item.name} />
                </Card.Section>
                <Title order={3}>{item.name}</Title>
                <Text>
                   {item.price}
                  
                </Text>
              </Card>
            </Link>
          //</Grid.Col>
        ))}
      
    </div>




  );
}
