import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  AppShell,
  Navbar,
  Header,
  Text, 
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
  const { mobileOpen, toggleMobileOpen, cart } = React.useContext(GlobalContext);

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
                  <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
                    <Text ml={20} size="xl">
                      Kidsbest   (096-209-01-51)
                    </Text>
                    </MediaQuery>
                  </div>
                </Link>
                <Link href={"/cart"}>
                  <Button className={styles.Cart}>
                    <ShoppingCart />
                    <Text>
                      {"(" + cart.totalSum + " грн.)"}
                    </Text>

                  </Button>
                </Link>
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