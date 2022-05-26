import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Title,
  Box,
  List,
  ListItem,
  Checkbox,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { ShoppingCart, DogBowl } from "tabler-icons-react";
import { GlobalContext } from "../context/GlobalContext";

import styles from '../styles/Layout.module.css'

type Props = {
  children: JSX.Element,
};


export default function Layout({ children }: Props) {
  const theme = useMantineTheme();
  const { mobileOpen, toggleMobileOpen, productsInCart } = React.useContext(GlobalContext);

  return (
    <div>
      <Head>
        <title>Kidsbest</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        fixed


        header={
          <Header
            height={60}
            p="xs"
            sx={(theme) => ({
              backgroundColor: theme.colors.blue[9],
              color: "white",
            })}
          >
            <div >
              <div
                style={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={mobileOpen}
                    onClick={toggleMobileOpen}
                    size="sm"
                    color={theme.colors.gray[3]}
                    mr="xl"
                  />
                </MediaQuery>
                <Link href={'/'}>
                  <div className={styles.HeaderStyle}>
                    <DogBowl />
                    <Text ml={10} size="md">
                      Kidsbest
                    </Text>
                  </div>
                </Link>
                <Link href={"/cart"}>
                  <Button className={styles.Cart}>
                    <Text>
                      {"(" + productsInCart.length + ")"}
                    </Text>
                    <ShoppingCart />
                  </Button>
                </Link>
              </div>
              <div>


              </div>
            </div>

          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </div>
  );
}