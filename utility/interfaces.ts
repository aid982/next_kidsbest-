export type filter_type = {
    title: string,
    checked: boolean
}

export type product_size = {
    name: string,
    qty: number
}

export type product_type = {
    id: string,
    name: string,
    price: number,
    code: string,
    featured: boolean,
    forBoys: boolean,
    forGirls: boolean,
    description:string,
    description_meta:string,
    keyWords:string,        
    img: string,
    product_sizes: product_size[]

}
export type productInCart = {
    id: string,
    name: string,
    code: string,
    price: number,
    size: string,
    qty: number
}


export interface HomePageProps {
    paginationData: {
        total: number,
        page: number,
        pageCount: number
    },
    forBoys:boolean,
    forGirls:boolean,
    sizes: filter_type[]
    categories: filter_type[]
    products?: product_type[]
    visible_products?: product_type[]
}

export interface ProductPageProps {
    product: product_type
    id: string

}