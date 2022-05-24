
import { NextPage } from "next";
import ProductComponent from "../../components/ProductComponent";
import { graphQLClient, queryClient } from "../../graphql-client";
import { getSdk, Product as ProductType, ProductEntity, ProductSizeEntity } from "../../src/generated/graphql";
import { ProductPageProps } from "../../utility/interfaces";

export const getStaticPaths = async () => {
  const { HomeQuery } = getSdk(graphQLClient);
  const data = await queryClient.fetchQuery(["data"],() => HomeQuery())

  const tmp_products = data.products?.data as ProductEntity[];

  const paths = tmp_products.map((product: any) => ({ params: { id: product.id.toString() } }));
  console.log('paths', paths)
  return {
    paths,
    fallback: 'blocking'
  }
}
export const getStaticProps = async (context: { params: { id: any } }) => {
  const { Product } = getSdk(graphQLClient);
  const data = await queryClient.fetchQuery(["data"],() => Product({ id: context.params.id }))

  const tmp_products = (data.product?.data?.attributes) as ProductType;  
  const tmp_sizes = data.product?.data?.attributes?.product_sizes?.data as ProductSizeEntity[];
  const sizes = tmp_sizes.map((el:ProductSizeEntity)=>{   
    return {
      name:el.attributes?.size?.data[0].attributes?.name,
      qty: el.attributes?.qty

    }
  });


  return {
    props: { product: { ...tmp_products, id: data.product?.data?.id,product_sizes:sizes } },
    revalidate: 10
  }

}


const Product: NextPage<ProductPageProps> = ({ product }) => {
  console.log("Product",product);
  return (<ProductComponent product={product} />);
}

export default Product;