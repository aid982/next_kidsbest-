
import { NextPage } from "next";
import ProductComponent from "../../components/ProductComponent";
import { graphQLClient } from "../../graphql-client";
import { getSdk, Product as ProductType, ProductEntity, ProductSizeEntity } from "../../src/generated/graphql";
import { ProductPageProps } from "../../utility/interfaces";
import { dehydrate, QueryClient } from 'react-query'
import { fetchProduct, useProduct } from "../../hooks/Product";
import { fetchProductsSizes, getProductsId } from "../../hooks/ProductsSizes";

const queryClient = new QueryClient()

export const getStaticPaths = async () => {
  const data = await queryClient.fetchQuery(['productsId'], () => getProductsId())
  const paths = data.map((product: any) => ({ params: { id: product.id.toString() } }));
  return {
    paths,
    fallback: 'blocking'
  }
}
export const getStaticProps = async (context: { params: { id: string } }) => {

  await queryClient.prefetchQuery(['product', context.params.id], () => fetchProduct(context.params.id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: context.params.id
    },
    revalidate: 10
  }

}


const Product: NextPage<ProductPageProps> = ({ id }) => {
  console.log("Productid", id);

  const { data, isLoading } = useProduct(id);

  return (<ProductComponent product={data!.product} />);
}

export default Product;