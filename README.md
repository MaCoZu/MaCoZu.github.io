
# run theses commands inside your folder
npm create vite@latest
    vanilla
    JavaScript


# run these commands
npm install
npm run dev

# Using PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init


# change the postcss.config.js & tailwind.config.js to .cjs
postcss.config.cjs
tailwind.config.cjs


# add this in your postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}


# update the contents to be scanned in your tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"], 
  theme: {
    extend: {},
  },
  plugins: [],
}

because index.html stays in root/ the path to scan is ./


# delete all in the main.css and put this instead
@tailwind base;
@tailwind components;
@tailwind utilities;


# link the .css file in your index.html 
  <link rel="stylesheet" href="style.css" />


# create your webpage with additional packages
npm install flowbite 
npm install -D @tailwindcss/typography


# after installing put the plugin and path in your tailwind.config.cjs file
...
 export default {
  content: [
    "./*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],
}
...



  


# also clean your main.js file and put only these imports
import '@tailwindcss/typography';
import 'flowbite';
import './style.css';


# also include main.js and addition module path in the .html files before the closing of the </body>
...
  <script type="module" src="./node_modules/flowbite/dist/flowbite.min.js"></script>
  <script type="module" src="main.js"></script>
</body>
...


# put all additional ressources (images, .html etc.) for your webpages in a 
# public/ folder and add this folder to the tailwind.config.cjs file
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,js}",
    "./public/*",
    "./node_modules/flowbite/**/*.js"
  
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],
}

# bundle the project for production
npm run build


# this will create a dist/ folder with the bundled .html and additional files 
# as well as a asset folder with compiled .js and .css files
# they are automatically linked in the .html files but may miss the correct path
# make sure to set the right releative path by putting a ./ in front src="./..." and href="./..."

  <script type="module" crossorigin src="./assets/index-MRkK_-iZ.js"></script>
  <link rel="stylesheet" crossorigin href="./assets/index-NwK-2QfP.css">


# you can now have a look at the compiled project with
npm run preview
# if something is not working check the ./ from the last point
# check the tailwind.config.cjs file if all folders that need to be scanned are in the content:[...]
# also check main.js if you imorted the main.css


# deploy to git hub pages


