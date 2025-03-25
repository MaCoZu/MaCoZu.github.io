const drawerToggle = document.getElementById('drawer-toggle');
const sidebar = document.getElementById('sidebar_model');
const drawerClose = document.getElementById('drawer-close');
let timeoutId;

// Open drawer on hover over the toggle
drawerToggle.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
    sidebar.classList.remove('translate-x-full');
});

// Close drawer on mouse leave with delay
sidebar.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => {
        sidebar.classList.add('translate-x-full');
    }, 300); // Delay before closing
});

// // Close drawer when clicking X on sidebar
// drawerClose.addEventListener('click', () => {
//     sidebar.classList.add('translate-x-full');
// });

// Close the drawer when clicking outside (on the main content)
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !drawerToggle.contains(e.target)) {
        sidebar.classList.add('translate-x-full');
    }
});

// Close the drawer when clicking on sidebar links
document.querySelectorAll('#sidebar_model a').forEach((link) => {
    link.addEventListener('click', () => {
        sidebar.classList.add('translate-x-full');
    });
});

// Close the drawer when interacting with iframes
document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.addEventListener('load', () => {
        iframe.contentWindow.addEventListener('click', () => {
            sidebar.classList.add('translate-x-full');
        });
    });
});

function resizeIframe(iframe) {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}