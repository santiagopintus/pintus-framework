# Pluto's Frontend Framework v1.0.0
## Starter template for development environment

## Technologies
- HTML5
- CSS3
- SASS
- JavaScript (ES6+)
- Bootstrap v4.6

## Dev dependencies
- [sass](https://www.npmjs.com/package/sass) (Watches changes in scss files, and compiles them into a css file: "main.min.css")

## Getting Started
1- Clone repo `git clone https://github.com/santiagopintus/pintus-framework`  
2- Run command `npm i`  
3- To start compiling your scss styles run the command `npm start` (Styles **will be minified immediately**)  
4- You're all set!  

## Directory Structure Explained
- **assets**<br>
  - data: Json data (until we have this data coming from the backend...)
  - icons: All icons (Generally in svg format)
  - images: Any image that's not a static icon
- **css**
  - All compiled styles (By default "main.min.css")
- **js**
  - main: Framework scripts that loads components
  - components: All your component's scripts (Not minified)
  - libraries: All external libraries (generally .min.js)
  - utils: All utility scripts (Not minified)
  - index.js: The main script (Where components are linked)
- **sass** (.scss format)
  - global: All global styles like styles that affects html, body, all headings elements, etc. (Files start with "\_")
  - layout: Specific styles that affects one specific component (Files start with "\_") Ideally **one** .scss file per component
  - main.scss: This file imports all styles in order to compiling them
- **.gitignore**
  - This file ignores "node_modules", "package-lock.json", and ".vscode"
- **package.json**
  - Contains description of the page, scripts and dev dependencies for development process
- **index.html**
  - The starter template for an html page (Change the placeholder data for yours)

## Adding a new component
1. Create html partial inside **partials**, (Ideally one per component). Example: `partials/breadcrumb.html`
2. Create a new .scss file inside **sass/layout**, (Ideally one per component). Example: `sass/layout/_breadcrumb.scss`
3. Link the new .scss file to the **sass/main.scss** file. Example: `@import "layout/breadcrumb";`
4. Just if you need, create a new .js file inside **js/components**, (Ideally one per component). Example: `js/components/breadcrumb.js`
5. Link your component scripts in **index.js** by adding the name of the js file inside **componentScripts** array. Example: `componentScripts: ["headerMenus", "breadcrumb"]` 
6. Add a parent container with a descriptive id or class in index.html where the component will be rendered. Example: `<div id="breadcrumb"></div>` or `<div class="breadcrumbContainer"></div>`
7. Add the component to the **js/index.js** file: You need to add it inside componentsToLoad array inside another array with the following: 
    1. Partial name (required)
    2. Container id or class (css selector for the html container ("#" or ".")) (required) 
    3. Callback function (When the component is loaded); (Optional)
    4. Callback arguments (Optional)
    5. Optional route to load component (When user navigates to a specific link) 
  Example: 
  ```
  export const componentsToLoad = [  
      ["footer", "#mainFooter"],  
      ["header", "#mainHeader", customFetchData, ["assets/data/userData.json",[buildHeaderFooter, menuHamburger]]],  
      ["breadcrumb", "#breadcrumb"],  
      ["custom-table", ".table-component-container", null, null, "user-table"],  
    ];  
  ```

## Updates log
- **v1.0.0**: Initial release