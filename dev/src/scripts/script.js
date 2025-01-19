import '../styles/font.css';


/* 1. define variables */
var me = "marcozausch";
var place = "posteo.de";

/* 2. find email link to replace */
var elink = document.getElementById("mlink");

/* 3. replace link href with variables  */
elink.href = `mailto:${me}@${place}`;


// Function to check if dark mode is enabled
function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Function to update the logo and external link icons based on dark mode
function updateElementsColor() {
    const elementIds = ['logo', 'logo2'];
    const elementClasses = ['external-link-icon'];

    for (const elementId of elementIds) {
        const element = document.getElementById(elementId);
        if (element) {
            if (isDarkMode()) {
                element.classList.add('filter-white');
            } else {
                element.classList.remove('filter-white');
            }
        }
    }

    for (const className of elementClasses) {
        const elements = document.getElementsByClassName(className);
        for (const element of elements) {
            if (isDarkMode()) {
                element.classList.add('filter-white');
            } else {
                element.classList.remove('filter-white');
            }
        }
    }
}

// Call the function initially
updateElementsColor();

// Listen for changes in color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    updateElementsColor();
});



let height = window.innerHeight - 85;

// document.getElementById("chevron-up").addEventListener('click', function () {
//         window.scrollBy({
//             top: -height,
//             behavior: 'smooth'
//         });
//     })


// document.getElementById("chevron-down").addEventListener('click', function () {
//     window.scrollBy({
//         top: height,
//         behavior: 'smooth'
//     });
// })


//  font cycler
const fonts = ['font-roboto', 'font-pop', 'font-signika', 'font-merri',  'font-lora', 'font-ledger']; // Array of font classes
let currentFontIndex = 0; // Start from the first font

// document.getElementById('font-select').addEventListener('click', function () {
//     currentFontIndex = (currentFontIndex + 1) % fonts.length; // Cycle through font classes

//     const articleElement = document.getElementById('article');
//     const fontName = fonts[currentFontIndex];

//     articleElement.classList.remove(...fonts); // Remove all font classes
//     articleElement.classList.add(fontName); // Apply the next font class

//     // Update data-font attribute for tooltip
//     document.getElementById('font-select').setAttribute('data-font', getFontDisplayName(fontName));

//     // Change font color to black if light mode is active
//     if (!isDarkMode()) {
//         document.getElementById('font-select').style.color = '#FFFFFF';
//     } else {
//         document.getElementById('font-select').style.color = '#000000'; // Reset to default color if dark mode is active
//     }
// });


// Helper function to get a more user-friendly display name for the font
function getFontDisplayName(fontClass) {
    switch (fontClass) {
        case 'font-roboto':
            return 'Roboto';
        case 'font-merri':
            return 'Merriweather';
        case 'font-pop':
            return 'Poppins';
        case 'font-lora':
            return 'Lora';
        case 'font-ledger':
            return 'Ledger';
        case 'font-signika':
            return 'Signika';
        default:
            return 'Unknown';
    }
}


