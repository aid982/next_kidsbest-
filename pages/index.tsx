import type { NextPage } from 'next'
import { HomePageProps } from '../utility/interfaces';
import { dehydrate, QueryClient } from 'react-query'
import HomeContainer from '../containers/HomeContainer';
import React from 'react';
import { fetchProductsSizes, useProductsSizes } from '../hooks/ProductsSizes';


export async function getStaticProps() {

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['homePage'], () => fetchProductsSizes())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}


const Home: NextPage<HomePageProps> = () => {
  const { data, isLoading } = useProductsSizes();


  return (
    <HomeContainer categories={data!.categories} sizes={data!.sizes} products={data!.products} />
  )
}

export default Home;
