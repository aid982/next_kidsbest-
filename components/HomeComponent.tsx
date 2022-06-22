import * as React from 'react';
import { ScrollArea, Text, List, ListItem, Checkbox, Divider, Navbar, Pagination, Affix, Transition, Button, Select, MediaQuery } from "@mantine/core";
import Image from 'next/image';
import { HomePageProps } from '../utility/interfaces';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { GlobalContext } from '../context/GlobalContext';
import { ArrowUpIcon } from '@modulz/radix-icons';
import { useWindowScroll } from '@mantine/hooks';
import Head from 'next/head';




interface HomeComponentProps extends HomePageProps {
  sort: string,
  mobileOpen: boolean;
  forBoys: boolean,
  forGirls: boolean,
  setPage: (page: number) => void;
  currentPage: number;
  toggleMobileOpen: () => void;
  handleChangeSort: (value: string) => void;
  handleCheckboxSizes: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxforBoys: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxforGirls: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxCategories: (event: React.ChangeEvent<HTMLInputElement>) => void;

}


export default function HomeComponent(props: HomeComponentProps) {
  const { mobileOpen } = React.useContext(GlobalContext);
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <div>
       <Head>
        <title>Интернет магазин брендовой детской одежды Carters</title>
        <meta name="keywords" content="одежда,Oldnavy,Carters,0-7 лет,брендовая,детская,Киев,Украина,купить" />
        <meta name="description" content="Интернет магазин,kidsbest,предлагает купить брендовую детскую одежду Carters недорого в Киеве и Украине" />
      </Head>
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!mobileOpen}
        width={{ sm: 300 }}
      >
        <Checkbox p={5} label="Для мальчиков" title="Для мальчиков" checked={props.forBoys} onChange={props.handleCheckboxforBoys} />
        <Checkbox p={5} pb={10} label="Для девочек" title="Для девочек" checked={props.forGirls} onChange={props.handleCheckboxforGirls} />
        <Divider />
        <Text p={5}>Размеры : </Text>
        <Navbar.Section mt="xs" grow component={ScrollArea}>
          {props.sizes && props.sizes.map((size: any) => (
            <Checkbox p={5} key={size.title} id={size.title} label={size.title} title={size.title} checked={size.checked} onChange={props.handleCheckboxSizes} />
          ))}
        </Navbar.Section>
        <Divider />
        <Text p={5}>Категории : </Text>
        <Navbar.Section grow component={ScrollArea}>

          {props.categories && props.categories.map((categorie: any) => (

            <Checkbox p={5} key={categorie.title} id={categorie.title} label={categorie.title} title={categorie.title} checked={categorie.checked} onChange={props.handleCheckboxCategories} />


          ))}
        </Navbar.Section>
        <Divider />
      </Navbar>
      <div className={styles.layout}>
        <div className={styles.sortPagination}>
          <Text size='md'>Всього товарів: {props.paginationData.total}</Text>
          <Select className={styles.sort} size='md'
            label="Сортировать :"
            placeholder=""
            value={props.sort}
            onChange={props.handleChangeSort}
            styles={{ label: { paddingRight: '10px', marginTop: '5px' } }}
            data={[
              { value: 'price:asc', label: 'Цена возр.' },
              { value: 'price:desc', label: 'Цена убыв.' },
              { value: 'popularity:desc', label: 'По популярности' },
            ]}
          />
        </div>

        <div className={styles.ImageList}>
          {props.visible_products!.map((item, i) => (
            <Link href={'/product/' + item.id} key={item.code}>
              <div className={styles.Card}>
                <div className={styles.Image}>                  
                    <Image  src={'/img/_' + item.code + '_large.jpg'} alt={item.name} layout='fill' objectFit='cover' />                    
                </div>
                <div className={styles.Title}>{item.name}</div>
                <div className={styles.Price}>
                  Цена {item.price} грн.
                </div>
              </div>
            </Link>

          ))}

        </div>
        <div className={styles.Pagination}>
          <Pagination page={props.currentPage} onChange={props.setPage} total={props.paginationData.pageCount} />
        </div>

        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftIcon={<ArrowUpIcon />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Подняться вверх
              </Button>
            )}
          </Transition>
        </Affix>
      </div>
    </div>





  );
}
