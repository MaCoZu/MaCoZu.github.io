# how to setup a tailwindscss project 
## with vite and deploy on github pages


### vite and tailwindscss setup
go to a new folder for the project run this command - choose `'vanilla'`

`npm create vite@latest`


run these commands

`npm install -D tailwindcss postcss autoprefixer`

`npx tailwindcss init`

change the postcss.config.js & tailwind.config.js to .cjs

`postcss.config.cjs`

`tailwind.config.cjs`

add this in your postcss.config.cjs
```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```


update the contents to be scanned in your tailwind.config.cjs <br>
because index.html stays in root/ the path to scan is ./ other ressource go to public/

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [ ],
}
```

delete everthing in the main.css and replace with the following

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```


link the .css file in your index.html 
`<link rel="stylesheet" href="main.css" />`



### Build your website
- start with a simple index.html 
- explore tailwindscss: https://tailwindcss.com/docs/installation
- copy/paste some ready made components into your website: https://merakiui.com/components
- add interactivity with  javascript: https://alpinejs.dev/


Run your build process with:

 `npm run dev` 

or whatever command is configured in your package.json file.<br>
this should open the index page and live update your changes on the html code<br>

you may wanna check out the '**Five Server**' add-on for VSCode to if the live update does not work for you



### additional packages
additional package for layout <br>
https://tailwindcss.com/docs/typography-plugin <br>

`npm install -D @tailwindcss/typography`


after installing put the plugin and path in your tailwind.config.cjs file

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
    ],
}
```


also clean your main.js file and put only these imports


```
import '@tailwindcss/typography';
import './style.css';
```


also include main.js and addition module path in the .html files before the closing of the </body>

```
  <script type="module" src="main.js"></script>
</body>

```


put all additional ressources (images, .html etc.) for your webpages in a <br>
public/ folder and add this folder to the tailwind.config.cjs file

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,js}",
    "./public/*",
  
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```


### compile
compile the project with this command

`npm run build`


this will create a dist/ folder with the bundled .html and additional files <br>
as well as a asset/ folder with compiled .js and .css files <br>
they are automatically linked in the .html files but may miss the correct path <br>
make sure to set the right releative path by putting a `./` in front `src="./..." and href="./..."`

 ```
 <script type="module" crossorigin src="./assets/index-MRkK_-iZ.js"></script>
  <link rel="stylesheet" crossorigin href="./assets/index-NwK-2QfP.css">
```

### update all links
the compile process throws all the `.html` files in the main folder dist/ <br>
thus update the links in the dist/ folder before they may have looked like this <br>
`<a href="public/privacy_policy.html">`
change them according to the file structure in the dist/ folder <br>

### open the compiled website
open the `index.html` with right click open with Five Server 

if something is not working check the `./` from the last point <br>
check the `tailwind.config.cjs` file if all folders that need to be scanned are in the content:[...] <br>
also check `main.js` if you imported the `main.css`


### deploy to git hub pages 
If you build your page in a seperate repo now create a github page repo like this:

https://pages.github.com/


In the repo go to >Settings (Cog wheel) >Pages (Left Menu) >Build and deployment(Heading 2) <br>
and choose main branch and /docs folder

rename the dist/ folder from before into docs/ and copy it into the main branch of your github page repo <br>
your page should be online shortly after under

https://your_github_name.github.io

