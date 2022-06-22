import * as React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import GlobalContextProvider from '../context/GlobalContext';
import { Hydrate, QueryClientProvider } from 'react-query';
import { queryClient } from '../graphql-client';
import { ReactQueryDevtools } from 'react-query/devtools'
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
interface MyAppProps extends AppProps {

}



const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, pageProps } = props;

  return (

    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalContextProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              breakpoints: {
                sm: 950,
              },
            }}
          >
            <NotificationsProvider position="bottom-center">
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </MantineProvider>
        </GlobalContextProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider >


  );
};

export default MyApp;