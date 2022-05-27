import { useQuery } from "react-query";
import { graphQLClient } from "../graphql-client";
import { getSdk, ProductSizeEntity } from "../src/generated/graphql";
import { product_type } from "../utility/interfaces";

export const fetchProduct = async (id: string) => {
    const { Product } = getSdk(graphQLClient);
    const data = await Product({ id: id });  

    const tmp_products = {...data.product!.data!.attributes,id: data.product!.data!.id as string} ;
    const tmp_sizes = data.product!.data!.attributes!.product_sizes!.data as ProductSizeEntity[];
    const sizes = tmp_sizes.map((el: ProductSizeEntity) => {
        return {
            name: el.attributes!.size!.data[0].attributes!.name as string,
            qty: el.attributes!.qty as number

        }
    });


    return {
        product: { ...tmp_products, product_sizes: sizes } as product_type

    }
}

export const useProduct = (id: string) => {
    return useQuery(['product',id], () => fetchProduct(id))
}