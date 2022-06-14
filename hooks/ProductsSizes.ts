import { graphQLClient } from "../graphql-client";
import { product_size } from '../utility/interfaces';
import { CategoryEntity, getSdk, PaginationArg, ProductEntity, ProductFiltersInput, ProductSizeEntity, SizeEntity } from "../src/generated/graphql";
import { useQuery } from "react-query";

export const fetchProductsSizes = async (pagination:PaginationArg,filters:ProductFiltersInput) => {
  const { HomeQuery } = getSdk(graphQLClient);
  const data = await HomeQuery({
    ProductPaginationArg:pagination,
    Filter:filters       
  });

  const tmp_sizes = data.sizes!.data as SizeEntity[];
  const sizes = tmp_sizes.map((el: SizeEntity) => ({ title: el.attributes!.name, checked: false }));

  const tmp_products = data.products!.data as ProductEntity[];

  const products = tmp_products.map((el: ProductEntity) => {
    const tmp_sizes = el.attributes!.product_sizes!.data;
    let sizesObjArray = tmp_sizes.map((el2: ProductSizeEntity) => {
      if (el2.attributes!.size!.data) {
        // name: el2.attributes!.size!.data[0].attributes!.name, qty: el2!.attributes!.qty
        return { name: el2.attributes!.size!.data.attributes!.name, qty: el2!.attributes!.qty }
      }
    }
    );

    

    let sizes_array = sizesObjArray.reduce<product_size[]>((results, item) => {
      results.push(item as product_size)  // modify is a fictitious function that would apply some change to the items in the array
      return results
    }, [])

    let img = el.attributes!.image!.data?.attributes?.url as string;
   
    if (!img) img = "";

    return {
      name: el.attributes!.name,
      price: el.attributes!.price as number,
      featured: el.attributes!.featured,
      forBoys: el.attributes!.forBoys as boolean,
      code: el.attributes!.code,
      img: img,
      forGirls: el.attributes!.forGirls,
      id: el.id as string,
      product_sizes: sizes_array,
      description:'',
      keyWords:'',
      description_meta:'',
    }
  });

  const tmp_categories = data.categories!.data as CategoryEntity[];
  const categories = tmp_categories.map((el: CategoryEntity) => {

    return {
      title: el.attributes!.title as string,
      checked: false

    }
  });
  let paginationData = data.products!.meta.pagination;

  
  return {
    paginationData,
    sizes,
    products,
    categories
  }
}

export const useProductsSizes = (pagination:PaginationArg,filters:ProductFiltersInput) => {
  return useQuery(['homePage',pagination.page], () => fetchProductsSizes(pagination,filters))
}

export const getProductsId =async () => {
  const {findIdForProduct} = getSdk(graphQLClient);

  const data = await findIdForProduct();

  let productsId =data.products!.data;

  return productsId;
}