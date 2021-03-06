import * as React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import GlobalContextProvider from '../context/GlobalContext';
import { Hydrate, QueryClientProvider } from 'react-query';
import { queryClient } from '../graphql-client';
import { ReactQueryDevtools } from 'react-query/devtools'
import { MantineProvider } from '@mantine/core';
interface MyAppProps extends AppProps {

}



const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, pageProps } = props;

  //const { dispatchSize } = React.useContext(GlobalContext);

  console.log('props', pageProps.sizes);

  //  dispatchSize({type:'INIT_SIZES',data:sizes});



  return (

    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalContextProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              breakpoints: {                
                md: 1500,
              },
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MantineProvider>
        </GlobalContextProvider>

      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider >


  );
};

export default MyApp;