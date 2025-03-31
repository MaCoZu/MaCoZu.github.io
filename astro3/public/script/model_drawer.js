function setupDrawer() {
    const drawerToggle = document.getElementById("drawer-toggle");
    const sidebar = document.getElementById("sidebar_model");

    if (!drawerToggle || !sidebar) return;

    let timeoutId;
    let isOpen = false;

    // Toggle function
    const toggleDrawer = (open) => {
        isOpen = open;
        sidebar.classList.toggle("translate-x-full", !isOpen);
        sidebar.setAttribute("aria-hidden", !isOpen);
    };

    // Open on hover
    drawerToggle.addEventListener("mouseenter", () => toggleDrawer(true));

    // Close with delay
    sidebar.addEventListener("mouseleave", () => {
        timeoutId = setTimeout(() => toggleDrawer(false), 300);
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (
            !sidebar.contains(e.target) &&
            !drawerToggle.contains(e.target)
        ) {
            toggleDrawer(false);
        }
    });

    // Prevent link clicks from propagating
    document.querySelectorAll("#sidebar_model a").forEach((link) => {
        link.addEventListener("click", (e) => e.stopPropagation());
    });
}

// Listen for page load and Astro page navigation events
document.addEventListener("astro:page-load", setupDrawer);
document.addEventListener("astro:after-swap", setupDrawer);
