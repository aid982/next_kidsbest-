import type { NextPage } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import HomeContainer from '../containers/HomeContainer';
import React from 'react';
import { fetchProductsSizes, useProductsSizes } from '../hooks/ProductsSizes';
import { PaginationArg, ProductFiltersInput } from '../src/generated/graphql';



export async function getServerSideProps({ query }: { query: any }) {
  console.log('Query', query)
  let categories, product_sizes;
  let forBoys = false;
  let forGirls = false;
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
  type filter = {
    categories?: {},
    product_sizes?: {},
    forBoys?: {},
    forGirls?: {},
  }
  let filters: filter;
  filters = {};

  if (categories) {
    filters["categories"] = categories;
  }
  if (product_sizes) {
    filters["product_sizes"] = product_sizes;
  }

  if (query["forBoys"]) {
    forBoys = true;
    filters.forBoys = {
      "eq": true
    }
  }

  if (query["forGirls"]) {
    forGirls = true;
    filters.forGirls = {
      "eq": true
    }
  }

  const queryClient = new QueryClient()

  let pagination = { pageSize: 1, page: 1 };
  if (query.page) {
    pagination.page = Number(query.page);
  }

  await queryClient.prefetchQuery(['homePage', pagination.page], () => fetchProductsSizes(pagination, filters))

  return {
    props: {
      forBoys,
      forGirls,
      filters,
      pagination,
      dehydratedState: dehydrate(queryClient),
    },
  };
}


const Home: NextPage<{ pagination: PaginationArg, filters: ProductFiltersInput, forBoys: boolean, forGirls: boolean }> = ({ pagination, filters, forGirls, forBoys }) => {
  const { data, isLoading } = useProductsSizes(pagination, filters);


  return (
    <HomeContainer forBoys={forBoys} forGirls={forGirls} paginationData={data!.paginationData} categories={data!.categories} sizes={data!.sizes} products={data!.products} />
  )
}

export default Home;
