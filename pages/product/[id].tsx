import { gql } from "@apollo/client";
import { NextPage } from "next";
import client from "../../apollo-client";
import ProductComponent from "../../components/ProductComponent";
import { ProductPageProps } from "../../utility/interfaces";

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`query HomeQuery {          
          products {
            data {
              id,
              attributes {               
                code                 
              }
            }
          }
        }`,
  });
  const tmp_products = data.products.data;

  const paths = tmp_products.map((product: any) => ({ params: { id: product.id.toString() } }));
  console.log('paths', paths)
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps = async (context: { params: { id: any } }) => {

  const { data } = await client.query({
    query: gql`query Product($id: ID) {
      product(id: $id) {
        data {
          id
          attributes {
            name
            price
            featured
            forBoys
            forGirls
            code
            product_sizes {
              data {
                id
                attributes {
                  size {
                    data {
                      attributes {
                        name
                      }
                    }
                  }
                  qty
                }
              }
            }
          }
        }
      }
    }
    `,
    variables: { id: context.params.id }
  });


  const tmp_products = data.product.data.attributes;  
  const tmp_sizes = data.product.data.attributes.product_sizes.data;
  tmp_sizes.map((el:any)=>{


  });

  console.log('Prod',tmp_products);


  return {
    props: { product: { ...tmp_products, id: data.product.data.id } }
  }

}


const Product: NextPage<ProductPageProps> = ({ product }) => {
  return (<ProductComponent product={product} />);
}

export default Product;