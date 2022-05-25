import * as React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import GlobalContextProvider from '../context/GlobalContext';
interface MyAppProps extends AppProps {
 
}



const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component,  pageProps } = props;

  return (

   
        <GlobalContextProvider>
          <Layout>
            <Component {...pageProps} />

          </Layout>
        </GlobalContextProvider>
    

  );
};

export default MyApp;