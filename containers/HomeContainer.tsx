import * as React from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { HomePageProps, filter_type, product_type } from '../utility/interfaces';
import { useRouter } from 'next/router';
import HomeComponent from '../components/HomeComponent';


export default function HomeContainer(props: HomePageProps) {
  const { mobileOpen, toggleMobileOpen } = React.useContext(GlobalContext);
  const [sizes, setSizes] = React.useState(props.sizes);
  const [categories, setCategories] = React.useState(props.categories);
  const [visible_products, setVisible_products] = React.useState(props.products);
  const [pageFirstLoaded, setPageFirstLoaded] = React.useState(true);
  const router = useRouter();


  const setFiltersFromQueryRoute = (queryObject: string[] | string, prevState: filter_type[], setStateFunction: Function) => {
    console.log('State', prevState, queryObject, queryObject.length);
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
    console.log('newState', result);
    setStateFunction(result);
  }

  // set filters from routes 
  React.useEffect(() => {
    const { query } = router;
    if (query.sizes && pageFirstLoaded) {
      console.log('pageFirstLoaded', pageFirstLoaded);
      setFiltersFromQueryRoute(query.sizes, sizes, setSizes);
      setPageFirstLoaded(false);
    }

  }, [router, pageFirstLoaded, sizes]);

  // set filters from routes 
  React.useEffect(() => {
    console.log('filter porducts', props.products);
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



  }, [sizes, props.products]);


  const handleCheckboxSizes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSizes(sizes.map((el: any) => {
      if (el.title === event.target.id) {
        el.checked = event.target.checked
      }
      return el;
    }));
    updateRoutes();

  }

  const handleCheckboxCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories(categories.map((el: any) => {
      if (el.title === event.target.id) {
        el.checked = event.target.checked
      }
      return el;
    }));
    updateRoutes();

  }

  const updateRoutes = () => {
    var size_route = sizes.reduce<string[]>((results, item) => {
      if (item.checked) results.push(item.title) // modify is a fictitious function that would apply some change to the items in the array
      return results
    }, [])

    var categorie_route = categories.reduce<string[]>((results, item) => {
      if (item.checked) results.push(item.title) // modify is a fictitious function that would apply some change to the items in the array
      return results
    }, [])

    router.push({
      pathname: '/',
      query: {
        sizes: size_route,
        categories: categorie_route
      }
    }, undefined, { shallow: true })

  }


  return (
    <HomeComponent categories={categories} sizes={sizes} mobileOpen={mobileOpen} toggleMobileOpen={toggleMobileOpen} handleCheckboxSizes={handleCheckboxSizes} visible_products={visible_products} handleCheckboxCategories={handleCheckboxCategories} />
  );
}
