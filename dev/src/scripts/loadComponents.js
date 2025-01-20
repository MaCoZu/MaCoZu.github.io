// Function to load a component
// async function loadComponent(componentName, targetElementId) {
//     try {
//         const response = await fetch(`/${componentName}.html`);
//         if (!response.ok) {
//             throw new Error(`Failed to load ${componentName}.html`);
//         }
//         const html = await response.text();
//         document.getElementById(targetElementId).innerHTML = html;
//     } catch (error) {
//         console.error(error);
//         document.getElementById(targetElementId).innerHTML = `<p>Error loading ${componentName}.</p>`;
//     }
// }

// // Load navbar and footer
// document.addEventListener("DOMContentLoaded", () => {
//     loadComponent("navbar", "navbar");
//     loadComponent("footer", "footer"); 
//     // loadComponent("model_drawer", "model_drawer"); 
// });


// _______


// Function to load a component
export async function loadComponent(componentName, targetElementId) {
    try {
        const response = await fetch(`/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName}.html`);
        }
        const html = await response.text();
        document.getElementById(targetElementId).innerHTML = html;

        // Load the script for the component if it exists
        if (componentName === "model_drawer") {
            const script = document.createElement("script");
            script.src = "/model_drawer.js"; // Path to the drawer script
            document.body.appendChild(script);
        }

    } catch (error) {
        console.error(error);
        document.getElementById(targetElementId).innerHTML = `<p>Error loading ${componentName}.</p>`;
    }
}

// Function to load components based on configuration
export function loadComponents(components) {
    document.addEventListener("DOMContentLoaded", () => {
        components.forEach(({ name, targetId }) => {
            loadComponent(name, targetId);
        });
    });
}