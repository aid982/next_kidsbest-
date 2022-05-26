import type { NextPage } from 'next'
import { HomePageProps,product_type,product_size } from '../utility/interfaces';
import HomeContainer from '../containers/HomeContainer';
import {graphQLClient,queryClient} from "../graphql-client";

import { getSdk, ProductEntity, ProductSizeEntity, SizeEntity} from "../src/generated/graphql";
import React from 'react';
import { GlobalContext } from '../context/GlobalContext';


export async function getStaticProps() {
  const { HomeQuery } = getSdk(graphQLClient);
  const data = await queryClient.fetchQuery(["data"],() => HomeQuery())

  console.log('data',data);

  const tmp_sizes = data.sizes?.data as SizeEntity[];
  const sizes = tmp_sizes.map((el: SizeEntity) => ({ title: el.attributes?.name, checked: false }));

  const tmp_products = data.products?.data as ProductEntity[];

  const products = tmp_products.map((el: ProductEntity) => {
    const tmp_sizes = el.attributes!.product_sizes!.data;
    let sizesObjArray = tmp_sizes.map((el2: ProductSizeEntity) => {
      if (el2.attributes!.size!.data) {    
        return { name: el2.attributes?.size?.data[0].attributes?.name,qty:el2?.attributes?.qty }
      } 
    }
    );

   

    let sizes_array = sizesObjArray.reduce<product_size[]>((results, item) => {
      results.push(item as product_size)  // modify is a fictitious function that would apply some change to the items in the array
      return results
    }, [])

    

    return {
      name:el.attributes?.name, 
      price:el.attributes?.price, 
      featured:el.attributes?.featured, 
      forBoys:el.attributes?.forBoys, 
      code:el.attributes?.code, 
      forGirls:el.attributes?.forGirls,
      id: el.id, 
      product_sizes: sizes_array
    }
  }) ;

  console.log('prod1',products);

  

  return {
    props: {
      sizes,
      products
    },   
  };
}


const Home: NextPage<HomePageProps> = ({ sizes, products }) => {

  //const { dispatchSize } = React.useContext(GlobalContext);

  //console.log(dispatchSize);

//  dispatchSize({type:'INIT_SIZES',data:sizes});

  return (
    <HomeContainer sizes={sizes} products={products} />
  )
}

export default Home;
