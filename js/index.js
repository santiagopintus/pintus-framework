//For components that need for fetching data from a path or url
import { customFetchData} from "./utils/utils.js";
/* IMPORT CUSTOM CALLBACK FUNCTIONS HERE: */

/****  ADD YOUR COMPONENT SCRIPTS HERE: (js/components/fileName) ****/
export const componentScripts = [
  // "yourJsFileName"
];

/**** ADD YOUR COMPONENT HERE:  ****/
/* 
  Add an array per component containing:
    1- Partial file name
    2- Container id
    3- Callback function (When the component is loaded) (Optional));
    4- Callback arguments (Optional)
    5- URL route to load component (Optional)
*/
export const componentsToLoad = [
  /* EXAMPLE */
  // ["products", "#productsContainer", customFetchData, ["assets/data/products.json",[loadProducts, fetchImages]], "/products"],
];