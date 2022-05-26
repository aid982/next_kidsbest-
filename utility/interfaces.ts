export type filter_type = {
    title: string,
    checked: boolean
}

export type product_size =  { name: string,
    qty:number }

export type product_type = {
    id:string,
    name: string,
    price:number,
    code:string,
    featured:boolean,
    forBoys:boolean,
    forGirls:boolean,
    product_sizes:product_size[]

}
export type productInCart = {
    id:string,
    name: string,
    code:string,
    price:number,
    size:string,
    qty:number
}


export interface HomePageProps {
    sizes: filter_type[]
    products?:product_type[]
    visible_products?:product_type[]
    window?: () => Window
}

export interface ProductPageProps {
    product:product_type
   
}