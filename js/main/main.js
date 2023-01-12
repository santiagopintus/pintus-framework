import { loadComponent, loadScript, throwError, getCurrentWindowLocation } from "../utils/utils.js";
import { componentScripts, componentsToLoad } from "../index.js";
/***********************************************************************************/
/* FRAMEWORK SCRIPTS SHOULD BE IGNORED :D */
/***********************************************************************************/

const masterLoad = () => { 
  /******  LOAD ALL COMPONENTS HTML  ******/
  loadAllComponents();
  /******  LOAD ALL COMPONENTS' SCRIPTS  ******/
  loadAllScripts();
};

const loadAllComponents = () => {
  let lastComponentLoaded;

  /******  LOAD ALL COMPONENTS HTML AND ITS CALLBACKS ******/
  //Load all components in componentsToLoad array
  componentsToLoad.forEach(component => {

    //If component has route specified
    if (component[4] != null) {
      //First load update
      lastComponentLoaded = updateCurrentRouteComponent(component, lastComponentLoaded);
      
      // If the user navigates to another route
      window.addEventListener("hashchange", () => {
        //If current window location is the same as the component route
        lastComponentLoaded = updateCurrentRouteComponent(component, lastComponentLoaded);
      });

    } else {
      //If component has no route specified
      loadOneComponent(component);
    }
  });
};

const updateCurrentRouteComponent = (component, lastComponentLoaded) => { 
  /******  UPDATE CURRENT COMPONENT ACCORDING TO ROUTE ******/
  let thisComponent = lastComponentLoaded;

  if (getCurrentWindowLocation() === component[4]) {
    //Check not to load the same component twice
    if (lastComponentLoaded != component) {
      thisComponent = component;
      loadOneComponent(component);
    }
  } else {
    //If component exists in DOM
    if (document.getElementById(component[1])) {
      //Removes the component if it's not its route
      removeOneComponent(component);
    }
  }

  //If loaded, returns the component, else returns the previous component
  return thisComponent;
};

const loadOneComponent = (component) => {
  /******  LOAD ONE Component HTML AND ITS CALLBACKS ******/
  //If component has callback
  if (component[2] != null) {
    loadComponent(component[0], component[1])
      //If it has callback arguments, it calls it
      .then(res => {
        if (res) {
          try {

            //If callback has no arguments
            if (component[3] === null) {
            component[2]();

            //If callback has more than one params in an array
            } else if (typeof (component[3]) == 'object' && component[3].length > 1) {
              component[2].apply(null, component[3]);
            //If callback has one param that is an array
            } else if (typeof (component[3]) == 'object' && component[3].length == 1) {
              component[2](component[3][0]);
              //If callback has only one argument which is not an array
            } else {
              component[2](component[3]);
            }
          } catch (error) {
            throwError(`at callback of component: ${component[0]}`);
            console.log(error);
          }
        }
      })
      //Catches errors
      .catch(error => {
        throwError(`at loading ${component[0]}. Container "${component[1]}" not found`); 
        console.log(error);
      });
    } else {
      loadComponent(component[0], component[1])
      //Catches errors
      .catch(error => {
        throwError(`at loading ${component[0]}. Container "${component[1]}" not found`);
        console.log(error);
    });
  }
}

const removeOneComponent = (component) => { 
  /******  REMOVE ONE COMPONENT  ******/
  document.getElementById(component[1]).innerHTML = "";
};

const loadAllScripts = () => { 
  /******  LOAD ALL COMPONENTS' SCRIPTS  ******/

  //Load all component scripts in componentScripts array
  componentScripts.forEach((script) => {
    loadScript(`js/components/${script}.js`);
  });
}

//Call masterLoad function when DOM is loaded
document.addEventListener("DOMContentLoaded", masterLoad);
