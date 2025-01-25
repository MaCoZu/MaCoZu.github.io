// src/scripts/loadComponents.js
export async function loadComponent(componentName, targetElementId) {
    try {
        // Use the correct path for development and production
        const response = await fetch(`/src/components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName}.html`);
        }
        const html = await response.text();
        document.getElementById(targetElementId).innerHTML = html;

        // Load the script for the component if it exists
        if (componentName === "model_drawer") {
            const script = document.createElement("script");
            script.src = "/src/components/model_drawer.js"; // Path to the drawer script
            script.type = "module"; // Ensure the script is loaded as a module
            document.body.appendChild(script);
        }
    } catch (error) {
        console.error(error);
        document.getElementById(targetElementId).innerHTML = `<p>Error loading ${componentName}.</p>`;
    }
}

export async function loadComponents(components) {
    document.addEventListener("DOMContentLoaded", () => {
        components.forEach(({ name, targetId }) => {
            loadComponent(name, targetId);
        });
    });
}