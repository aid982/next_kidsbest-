import * as React from 'react';
import {  ScrollArea, Text,  List, ListItem, Checkbox, Divider, Navbar, Pagination } from "@mantine/core";
import Image from 'next/image';
import { HomePageProps } from '../utility/interfaces';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { GlobalContext } from '../context/GlobalContext';




interface HomeComponentProps extends HomePageProps {
  mobileOpen: boolean;
  forBoys:boolean,
  forGirls:boolean,
  setPage: (page: number) => void;
  currentPage: number;
  toggleMobileOpen: () => void;
  handleCheckboxSizes: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxforBoys: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxforGirls: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxCategories: (event: React.ChangeEvent<HTMLInputElement>) => void;

}


export default function HomeComponent(props: HomeComponentProps) {
  const { mobileOpen } = React.useContext(GlobalContext);  
  return (
    <div>
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!mobileOpen}
        width={{ sm: 300 }}
      >
        <Checkbox p={5} label="Для мальчиков" title="Для мальчиков" checked={props.forBoys} onChange={props.handleCheckboxforBoys} />
        <Checkbox p={5} label="Для девочек" title="Для девочек" checked={props.forGirls} onChange={props.handleCheckboxforGirls} />
        <Divider/>        
        <Text>Размеры : </Text>
        <Navbar.Section mt="xs" grow component={ScrollArea}>
          {props.sizes && props.sizes.map((size: any) => (

            <Checkbox p={5} key={size.title} id={size.title} label={size.title} title={size.title} checked={size.checked} onChange={props.handleCheckboxSizes} />
          ))}
        </Navbar.Section>
        <Divider/>
        <Text>Категории : </Text>
        <Navbar.Section grow component={ScrollArea}>


          {props.categories && props.categories.map((categorie: any) => (

            <Checkbox p={5} key={categorie.title} id={categorie.title} label={categorie.title} title={categorie.title} checked={categorie.checked} onChange={props.handleCheckboxCategories} />


          ))}
        </Navbar.Section>
        <Divider/>



      </Navbar>
      <div className={styles.layout}>
        <div className={styles.sortPagination}>
          <Text size='md'>Всього товарів:{props.paginationData.total}</Text>
        </div>

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
        <div className={styles.Pagination}>
          <Pagination page={props.currentPage} onChange={props.setPage} total={props.paginationData.pageCount} />
        </div>
      </div>
    </div>





  );
}
