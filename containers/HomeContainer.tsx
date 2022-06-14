import * as React from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { HomePageProps, filter_type, product_type } from '../utility/interfaces';
import { useRouter } from 'next/router';
import HomeComponent from '../components/HomeComponent';


export default function HomeContainer(props: HomePageProps) {
  const { mobileOpen, toggleMobileOpen } = React.useContext(GlobalContext);
  const [sizes, setSizes] = React.useState(props.sizes);
  const [categories, setCategories] = React.useState(props.categories);
  const [pageFirstLoaded, setPageFirstLoaded] = React.useState(true);
  

  const router = useRouter();

  const setPage = (page: number) => {    
    updateRoutes(page,props.forGirls,props.forBoys);
  }

  const handleCheckboxforBoys=()=>{    
    updateRoutes(props.paginationData.page,props.forGirls,!props.forBoys);
    
  }

  const handleCheckboxforGirls=()=>{    
    updateRoutes(props.paginationData.page,!props.forGirls,props.forBoys);
  }
  
  

  const setFiltersFromQueryRoute = (queryObject: string[] | string, prevState: filter_type[], setStateFunction: Function) => {
    const result = prevState.map((state_el: filter_type) => {
      let filterActive = false;
      if (Array.isArray(queryObject)) {
        (queryObject as string[]).forEach((query_el) => {
          if (query_el === state_el.title) filterActive = true;
        });
      } else {
        if ((queryObject as string) === state_el.title) filterActive = true;
      }
      if (filterActive) state_el.checked = true;
      return { ...state_el };
    });

    setStateFunction(result);
  }

  // set filters from routes 
  React.useEffect(() => {
    const { query } = router;
    if (query.sizes && pageFirstLoaded) {
      setFiltersFromQueryRoute(query.sizes, sizes, setSizes);
      setPageFirstLoaded(false);
    }

    if (query.categories && pageFirstLoaded) {
      setFiltersFromQueryRoute(query.categories, categories, setCategories);
      setPageFirstLoaded(false);
    }   


  }, [router,pageFirstLoaded,categories, sizes]);

  // set filters from routes filters on client side
  /*React.useEffect(() => {
      if (props.products) {
      setVisible_products(props.products.filter((product_el: product_type) => {
        let outputElement = true;
        let wasSomeFilters = false;
        let someFiltersisActive = false;
        sizes.map((size_el: filter_type) => {
          if (size_el.checked) {
            wasSomeFilters = true;
            if (product_el.product_sizes.length > 0) {
              product_el.product_sizes.map((product_size: { name: string, qty: number }) => {
                if (product_size.name === size_el.title) someFiltersisActive = true;
              })
            }
          }

        });
        if (wasSomeFilters) {
          outputElement = someFiltersisActive;
        }

        if (outputElement) return { ...product_el }
      }));
    }



  }, [sizes, props.products]);*/


  const handleCheckboxSizes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSizes(sizes.map((el: any) => {
      if (el.title === event.target.id) {
        el.checked = event.target.checked
      }
      return el;
    }));
    updateRoutes(props.paginationData.page,props.forGirls,props.forBoys);

  }

  const handleCheckboxCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories(categories.map((el: any) => {
      if (el.title === event.target.id) {
        el.checked = event.target.checked
      }
      return el;
    }));
    updateRoutes(props.paginationData.page,props.forGirls,props.forBoys);
  }

  const updateRoutes = (page: number,forGirls:boolean,forBoys:boolean) => {
    var size_route = sizes.reduce<string[]>((results, item) => {
      if (item.checked) results.push(item.title) // modify is a fictitious function that would apply some change to the items in the array
      return results
    }, [])

    var categorie_route = categories.reduce<string[]>((results, item) => {
      if (item.checked) results.push(item.title) // modify is a fictitious function that would apply some change to the items in the array
      return results
    }, [])

    type queryType = {
      page?:number,
      sizes?: any,
      categories?: any,
      forBoys?:boolean,
      forGirls?:boolean

    }
    let query:queryType;

    query = {      
      sizes: size_route,
      categories: categorie_route,     
    } 
    if(page>1) {
      query.page = page;
    }
    if(forBoys) {
      query.forBoys = true;
    }
    if(forGirls) {
      query.forGirls = true;
    }

    

    router.push({
      pathname: '/',
      query,
     
    })

  }


  return (
    <HomeComponent 
    handleCheckboxforBoys={handleCheckboxforBoys}
    handleCheckboxforGirls={handleCheckboxforGirls}
    forBoys={props.forBoys} forGirls={props.forGirls} currentPage={props.paginationData.page} setPage={setPage} paginationData={props.paginationData} categories={categories} sizes={sizes} mobileOpen={mobileOpen} toggleMobileOpen={toggleMobileOpen} handleCheckboxSizes={handleCheckboxSizes} visible_products={props.products} handleCheckboxCategories={handleCheckboxCategories} />
  );
}
