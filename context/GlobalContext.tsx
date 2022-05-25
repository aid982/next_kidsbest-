import { createContext, Dispatch, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducers/cartReducer";

import { productInCart } from "../utility/interfaces";


export type GlobalCtxInterface = {

    mobileOpen: boolean;
    toggleMobileOpen: () => void;
    productsInCart: productInCart[];
    dispatch: Dispatch<{ type: any; data: productInCart | productInCart[]|string }>;
  
}


export const GlobalContext = createContext<GlobalCtxInterface>({ mobileOpen: false, toggleMobileOpen: () => { }, productsInCart: [], dispatch: () => { }});

interface GlobalContextProviderProps {
    children?: JSX.Element | JSX.Element[];
}

const GlobalContextProvider: React.FunctionComponent<GlobalContextProviderProps> = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [productsInCart, dispatch] = useReducer(cartReducer, [], () => {
        return [];
    });


    const toggleMobileOpen = () => {
        setMobileOpen(!mobileOpen);
    }

    useEffect(() => {
        let localData = localStorage.getItem('cart');
        if (localData) {
            localData = JSON.parse(localData || '');
            console.log('localData', localData);
            if ((localData) && (localData.length > 0)) {
                dispatch({ type: 'INIT_CART', data: localData || [] });
            }
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(productsInCart));
    }, [productsInCart]);


    return (<GlobalContext.Provider value={{ mobileOpen, toggleMobileOpen, productsInCart, dispatch }}>{props.children}</GlobalContext.Provider>);
};

export default GlobalContextProvider;
