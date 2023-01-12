export const customFetchData = (path, customFunctions) => {
  /* FETCHES JSON DATA IN PATH */
  fetch(path)
    .then((response) => response.json())
    .then((data) => {
      //If customFunctions is an array of custom functions (at least one)
      if (typeof (customFunctions) == 'object') {
        for (let customFunction of customFunctions) {
          customFunction(data);
        }
      } else {
        //If there is only one custom function
        customFunctions(data);
      }
    })
    .catch((error) => {
      console.log(error)
    });
}

export const getCurrentWindowLocation = () => { 
  /******  GET CURRENT WINDOW LOCATION WITHOUT QUERY PARAMS ******/
  return window.location.hash.substring(1);
};

export const capitalize = str => { 
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toCamelCase = str => {
  let newStr = "";
  if (str) {
    //Convert to lower case
    str = str.toLowerCase();
    //Splits words by spaces, "-", "_" and "."
    let wordArray = str.split(/[-_ .,'/()]/g);
    for (let i in wordArray){
      if (i > 0) {
        //Capitalize first letter of each word except the first one
        newStr += wordArray[i].charAt(0).toUpperCase() + wordArray[i].slice(1);
      } else {
        newStr += wordArray[i]
      }
      newStr = newStr.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    }
  } else {
    return newStr
  }
  return newStr;
}

const renderWithTemplate = (template, parent, data='', callback=false) => {
  const clone = template.content.cloneNode(true);
  const templateWithData = callback ? callback(clone, data) : clone;
  parent.appendChild(templateWithData);
}

const getTemplate = async path => {
  const html = await fetch(path)
    .then(res => convertToText(res, path)) //If response is ok, convert to text
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

//Throw custom errors
export const throwError = (message) => {
  let errorMessage = new Error(message);
  let errorStyles = "color: #EB3941; font-size: .9rem;";
  console.log(`%cFramework: ${errorMessage}`, errorStyles);
}

const convertToText = (res, path) =>{
  if (res.ok) {
    return res.text();
  } else {
    throwError(`At loading partial: ${path}`);
  }
}

export const loadScript = (src) => {
  const scriptTag = document.createElement("script");
  scriptTag.src = src;
  document.body.append(scriptTag);
};

/*
  Loads a component from a template file
  Parameters: 
    - fileName: name of the html file inside partials folder
    - containerId: id of the container where the component will be loaded
*/
export async function loadComponent(fileName, containerSelector) {
  //Gets the element template
  let htmlTemplate = await getTemplate(`partials/${fileName}.html`);
  //Gets the container elements
  if (containerSelector.startsWith("#")) {
    const $container = document.querySelector(containerSelector);
    //Renders the component
    renderWithTemplate(htmlTemplate, $container);
  } else {
    const $container = document.querySelectorAll(containerSelector);
    //Renders the component
    for (let $containerElement of $container) {
      renderWithTemplate(htmlTemplate, $containerElement);
    }
  }
  //Returns true
  return true;
}