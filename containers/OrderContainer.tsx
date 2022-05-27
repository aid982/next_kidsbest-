import React from 'react'
import { useMutation } from 'react-query';
import OrderComponent from '../components/OrderComponent'
import { GlobalContext } from '../context/GlobalContext';
import { graphQLClient, queryClient } from '../graphql-client';
import { getSdk } from '../src/generated/graphql';
import { productInCart } from '../utility/interfaces';

type Props = {}
type orderData = {
    date: Date, fio: string, client: string, address: string, phone: string, products: productInCart[]

}

export default function OrderContainer({ }: Props) {

    const postOrder = async (orderData: orderData) => {
        try {
            console.log("Order data", orderData);
            const data = await findClient({ phone: orderData.phone });
            console.log('Finding client', data);
            let clientID = "";
            if (data.clients!.data.length > 0) {
                clientID = data.clients!.data[0].id as string;
            }
            if (!clientID) {
                const data = await createClient({ ...orderData });
                console.log('creating client', data);
                clientID = data.createClient?.data?.id as string;

            } else {
                const data = await updateClient({ ID: clientID, name: orderData.fio });
                console.log('updating client', data);
                // clientID = data.createClient?.data?.id as string; 

            }
            const orderResultData = await createOrder({ ...orderData, client: clientID });
            console.log('creating order', orderResultData);
        } catch (error) {
            throw error;
        }

    }
    const { productsInCart, dispatch } = React.useContext(GlobalContext);
    const { createOrder, findClient, updateClient, createClient } = getSdk(graphQLClient);
    const { mutate, isLoading, error } = useMutation(postOrder, {
        onSuccess: (data: any) => {
            console.log('Mut success', data);
            //  dispatch({ type: 'CREATE_ORDER', data: "" });

        }
    });
    const handleSubmit = (values: orderData) => {       
        console.log('Form values', values);
        mutate({ ...values, date: new Date(), products: productsInCart});

    }

    return (
        <OrderComponent onSubmit={handleSubmit} />
    )
}