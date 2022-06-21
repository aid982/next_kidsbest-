import { createContext, Dispatch, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducers/cartReducer";
import { Cart, productInCart } from "../utility/interfaces";


export type GlobalCtxInterface = {  
    mobileOpen: boolean;
    toggleMobileOpen: () => void;
    cart: Cart;
    dispatch: Dispatch<{ type: string; data: productInCart | productInCart[]|string }>;
  
}


export const GlobalContext = createContext<GlobalCtxInterface>({ mobileOpen: false, toggleMobileOpen: () => { }, cart: {totalSum:0,productsInCart:[]}, dispatch: () => { }});

interface GlobalContextProviderProps {
    children?: JSX.Element | JSX.Element[];
}

const GlobalContextProvider: React.FunctionComponent<GlobalContextProviderProps> = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false);    
    const [cart, dispatch] = useReducer(cartReducer, {totalSum:0,productsInCart:[]}, () => {
        return  {totalSum:0,productsInCart:[]};
    });


    const toggleMobileOpen = () => {
        console.log(mobileOpen);
        setMobileOpen(!mobileOpen);
    }

    useEffect(() => {        
        let localData = localStorage.getItem('cart');             
        console.log('cart',localData);
        if (localData) {
            localData = JSON.parse(localData || '');
            console.log('localData', localData);
            console.log('INIT',localData)
            if (localData) {
                dispatch({ type: 'INIT_CART', data: localData || [] });
            }
        }

    }, []);




    return (<GlobalContext.Provider value={{ mobileOpen, toggleMobileOpen, cart, dispatch }}>{props.children}</GlobalContext.Provider>);
};

export default GlobalContextProvider;
