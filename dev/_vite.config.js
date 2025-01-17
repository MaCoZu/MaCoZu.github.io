import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs'; // Import fs
import { glob } from 'glob';
import { copyFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { index } from 'd3';


export default defineConfig(({ command }) => {
    const isDev = command === 'serve';
    return {
        base: isDev ? '/' : './',  
        // server: { open: true, },
        build: {
            outDir: 'docs',
            emptyOutDir: true,
            assetsInlineLimit: 0,
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, 'src/main.js'),
                    script: path.resolve(__dirname, 'src/script.js'),
                    ...Object.fromEntries(
                        glob.sync('public/**/*.html').map(file => [
                            path.parse(file).name,
                            path.resolve(__dirname, file)
                        ])
                    ),
                    index: path.resolve(__dirname, 'index.html'),
                },
                output: {
                    dir: 'docs',
                    entryFileNames: 'assets/[name].js',
                    chunkFileNames: 'assets/[name].js',
                    assetFileNames: ({ name }) => {
                        if (/\.css$/.test(name ?? '')) {
                            return 'assets/[name][extname]';
                        }
                        if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
                            return 'assets/fonts/[name][extname]';
                        }
                        if (/\.(png|jpe?g|gif|svg|ico)$/.test(name ?? '')) {
                            return 'assets/images/[name][extname]';
                        }
                        if (/\.js(on)?$/.test(name ?? '')) {
                            return 'assets/[name][extname]';
                        }
                        return 'assets/[name][extname]';
                    },
                },
            },
        },
        plugins: [
            {
                name: 'handle-html',
                transformIndexHtml: {
                    order: 'post',
                    handler(html, { filename }) {
                        // Clean up comments, old script/style tags, and fix paths
                        html = html
                            .replace(/<!-- Fonts -->\s*/g, '')
                            .replace(/<!-- css  -->\s*/g, '')
                            .replace(/<script[^>]*src=["'](?!https:\/\/cdn\.jsdelivr\.net\/npm\/alpinejs)[^"']*\.js["'][^>]*>\s*<\/script>\s*/g, '')
                            .replace(/<link[^>]*href=["'][^"']*\.css["'][^>]*>\s*/g, '')
                            .replace(/<\/script>\s*<\/script>\s*<\/script>\s*/g, '')
                            .replace(/\n\s*\n\s*\n/g, '\n\n')  // Reduce multiple empty lines to max two
                            .replace(/\.\.\/assets\//g, './assets/');  // Fix relative paths

                        let headInject = `
    <link rel="stylesheet" crossorigin href="./assets/style.css">
    <link rel="stylesheet" crossorigin href="./assets/main.css">
    <script type="module" crossorigin src="./assets/script.js"></script>
    <script type="module" crossorigin src="./assets/main.js"></script>`;

                        if (filename.includes('eco_footprint_hdi') || filename.includes('happy_sustainable')) {
                            headInject += `\n    <script crossorigin src="./assets/d3.v7.js"></script>`;
                        }

                        return html.replace('</head>', `${headInject}\n</head>`);
                    },
                },
            },
            {
                name: 'fix-asset-paths',
                enforce: 'post',
                writeBundle() {
                    const docsDir = 'docs';
                    const files = glob.sync(`${docsDir}/**/*.html`);
                    files.forEach(file => {
                        let content = fs.readFileSync(file, 'utf8');
                        content = content.replace(/\.\.\/assets\//g, './assets/');
                        fs.writeFileSync(file, content);
                    });
                }
            },
            {
                name: 'copy-assets',
                enforce: 'post',
                writeBundle() {
                    mkdirSync('docs/assets', { recursive: true });

                    try {
                        copyFileSync('./src/lib/d3.v7.js', 'docs/assets/d3.v7.js');
                    } catch (error) {
                        console.warn('d3.v7.js not found in the source directory.');
                    }

                    glob.sync('src/data/**/*.{json,csv}').forEach(file => {
                        const fileName = path.basename(file);
                        copyFileSync(file, `docs/assets/${fileName}`);
                    });
                },
            },
            {
                name: 'move-html',
                enforce: 'post',
                closeBundle() {
                    const publicDir = path.join('docs', 'public');
                    if (existsSync(publicDir)) {
                        const publicFiles = glob.sync(path.join(publicDir, '**/*.html'));
                        publicFiles.forEach(file => {
                            const fileName = path.basename(file);
                            copyFileSync(file, path.join('docs', fileName));
                        });
                        rmSync(publicDir, { recursive: true, force: true });
                    }
                }
            },
            {
                name: 'exclude-d3',
                enforce: 'pre',
                config() {
                    return {
                        optimizeDeps: {
                            exclude: ['d3'],
                        },
                    };
                },
            },
        ],
    };
});