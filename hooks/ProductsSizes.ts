import { graphQLClient } from "../graphql-client";
import { product_size } from '../utility/interfaces';
import { getSdk, ProductEntity, ProductSizeEntity, SizeEntity } from "../src/generated/graphql";
import { useQuery } from "react-query";

export const fetchProductsSizes = async () => {
  const { HomeQuery } = getSdk(graphQLClient);
  const data = await HomeQuery();
 // console.log('data', data);
  const tmp_sizes = data.sizes!.data as SizeEntity[];
  const sizes = tmp_sizes.map((el: SizeEntity) => ({ title: el.attributes!.name, checked: false }));

  const tmp_products = data.products!.data as ProductEntity[];

  const products = tmp_products.map((el: ProductEntity) => {
    const tmp_sizes = el.attributes!.product_sizes!.data;
    let sizesObjArray = tmp_sizes.map((el2: ProductSizeEntity) => {
      if (el2.attributes!.size!.data) {
        return { name: el2.attributes!.size!.data[0].attributes!.name, qty: el2!.attributes!.qty }
      }
    }
    );

    let sizes_array = sizesObjArray.reduce<product_size[]>((results, item) => {
      results.push(item as product_size)  // modify is a fictitious function that would apply some change to the items in the array
      return results
    }, [])

    return {
      name: el.attributes!.name,
      price: el.attributes!.price as number,
      featured: el.attributes!.featured,
      forBoys: el.attributes!.forBoys as boolean,
      code: el.attributes!.code,
      forGirls: el.attributes!.forGirls,
      id: el.id as string,
      product_sizes: sizes_array
    }
  });

  //console.log('prod1', products);
  return {
    sizes,
    products
  }
}

export const useProductsSizes = () => {
  return useQuery(['homePage'], () => fetchProductsSizes())
}