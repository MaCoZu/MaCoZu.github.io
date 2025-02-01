import { defineConfig } from 'vite'; // Ensure this line is present


export default defineConfig({
    base: './',
    build: {
        outDir: 'docs',
        emptyOutDir: true,
        assetsDir: 'assets',
    },
    // plugins: [
    //     transformIndexHtml({
    //         transform: (html, { filename }) => {
    //             let headInject = `
    //       <script type="module" crossorigin src="./assets/script.js"></script>
    //       <script type="module" crossorigin src="./assets/main.js"></script>
    //       <link rel="stylesheet" crossorigin href="./assets/style.css">
    //       <link rel="stylesheet" crossorigin href="./assets/main.css">
    //     `;

    //             if (filename.includes('eco_footprint_hdi.html') ||
    //                 filename.includes('happy_sustainable.html') ||
    //                 // Add more page names here if needed
    //                 filename.includes('your_other_page_with_d3.html')) {
    //                 headInject += `
    //         <script src="./assets/d3.v7.js"></script>
    //       `;
    //             }

    //             return html.replace('</head>', headInject + '</head>');
    //         },
    //     }),
    // ],
});