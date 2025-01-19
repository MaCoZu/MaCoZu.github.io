// Function to load a component
async function loadComponent(componentName, targetElementId) {
    try {
        const response = await fetch(`/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName}.html`);
        }
        const html = await response.text();
        document.getElementById(targetElementId).innerHTML = html;
    } catch (error) {
        console.error(error);
        document.getElementById(targetElementId).innerHTML = `<p>Error loading ${componentName}.</p>`;
    }
}

// Load navbar and footer
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar", "navbar");
    loadComponent("footer", "footer"); 
});