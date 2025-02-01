import '/src/styles/font.css';


// Initialize Tippy.js
tippy('[data-tippy-content]', {
    placement: 'right',
animation: 'scale',
theme: 'light',
arrow: true,
allowHTML: true, // Allow HTML content in tooltips
});

// Render KaTeX formulas in tooltips
document.querySelectorAll('[data-tippy-content]').forEach(el => {
        const content = el.getAttribute('data-tippy-content');
    el.setAttribute('data-tippy-content', katex.renderToString(content));
    });

/* 1. define variables */
var me = "marcozausch";
var place = "posteo.de";

// /* 2. find email link to replace */
// var elink = document.getElementById("mlink");

// /* 3. replace link href with variables  */
// elink.href = `mailto:${me}@${place}`;

document.addEventListener("DOMContentLoaded", function () {
    var elink = document.getElementById("mlink");
    if (elink) {
        elink.href = `mailto:${me}@${place}`;
    }
});

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