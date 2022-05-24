import type { NextPage } from 'next'
import { HomePageProps,product_type,product_size } from '../utility/interfaces';
import HomeContainer from '../containers/HomeContainer';
import {graphQLClient,queryClient} from "../graphql-client";

import { getSdk, ProductEntity, SizeEntity} from "../src/generated/graphql";


export async function getStaticProps() {
  const { HomeQuery } = getSdk(graphQLClient);
  const data = await queryClient.fetchQuery(["data"],() => HomeQuery())

  console.log('data',data);

  const tmp_sizes = data.sizes?.data as SizeEntity[];
  const sizes = tmp_sizes.map((el: SizeEntity) => ({ title: el.attributes?.name, checked: false }));

  const tmp_products = data.products?.data as ProductEntity[];


  const products = tmp_products.map((el: any) => {
    const tmp_sizes = el.attributes.product_sizes.data;
    let sizesObjArray = tmp_sizes.map((el2: any) => {
      if (el2.attributes.size.data) {    
        return { name: el2.attributes.size.data[0].attributes.name,qty:el2.attributes.qty }
      } 
    }

    ) as product_size[];

   

    let sizes_array = sizesObjArray.reduce<product_size[]>((results, item) => {
      results.push(item) // modify is a fictitious function that would apply some change to the items in the array
      return results
    }, [])

    

    return {
      name:el.attributes.name, 
      price:el.attributes.price, 
      featured:el.attributes.featured, 
      forBoys:el.attributes.forBoys, 
      code:el.attributes.code, 
      forGirls:el.attributes.forGirls,
      id: el.id, 
      sizes: sizes_array
    }
  }) as product_type[];

  console.log('prod1',products);

  

  return {
    props: {
      sizes,
      products
    },   
  };
}


const Home: NextPage<HomePageProps> = ({ sizes, products }) => {
  return (
    <HomeContainer sizes={sizes} products={products} />

  )
}

export default Home;
