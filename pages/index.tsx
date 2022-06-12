import type { NextPage } from 'next'
import { HomePageProps } from '../utility/interfaces';
import { dehydrate, QueryClient } from 'react-query'
import HomeContainer from '../containers/HomeContainer';
import React from 'react';
import { fetchProductsSizes, useProductsSizes } from '../hooks/ProductsSizes';
import { PaginationArg, ProductFiltersInput } from '../src/generated/graphql';



export async function getServerSideProps({ query }:{query:any}) {
  console.log('Query', query)
  let categories, product_sizes;
  if (query["categories"]) {
    categories = {
      "title": {
        "in": query["categories"]
      }
    }
  }
  if (query["sizes"]) {
    product_sizes =
    {
      "size": {
        "name": {
          "in": query["sizes"]

        }
      }

    }
    
  };
  let filters = {
    categories:{},
    product_sizes:{}

  };
  if(categories) {
    filters["categories"] = categories;
  }
  if(product_sizes) {
    filters["product_sizes"] = product_sizes;
  }
  const queryClient = new QueryClient()
  let pagination = { pageSize: 1, page: 1 };
  if(query.page) {
    pagination.page = Number(query.page);
  }
  console.log('pag',pagination);  
  
  await queryClient.prefetchQuery(['homePage',pagination.page], () => fetchProductsSizes(pagination, filters))

  return {
    props: {
      filters,
      pagination,
      dehydratedState: dehydrate(queryClient),
    },
  };
}


const Home: NextPage<{ pagination: PaginationArg, filters: ProductFiltersInput }> = ({ pagination, filters }) => {
  const { data, isLoading } = useProductsSizes(pagination, filters);


  return (
    <HomeContainer paginationData={data!.paginationData} categories={data!.categories} sizes={data!.sizes} products={data!.products} />
  )
}

export default Home;
