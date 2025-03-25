import { defineConfig } from 'vite';
import path from 'path';
import { globSync } from 'glob';
import { mkdir, copyFile } from 'fs/promises';

export default defineConfig(({ command }) => {
    const isDev = command === 'serve';

    return {
        base: isDev ? '/src/' : './',
        server: { host: 'localhost', port: 3000, },
        build: {
            outDir: 'dist',
            emptyOutDir: true,
            assetsDir: 'assets',
            rollupOptions: {
                input: {
                    main: path.resolve('index.html'),
                    ...Object.fromEntries(
                        globSync('src/pages/**/*.html').map(file => [
                            file.replace(/^src\/pages\//, 'pages/').replace(/\.html$/, ''),
                            path.resolve(file),
                        ])
                    ),
                },
            },
        },
        resolve: { alias: { '@': path.resolve(__dirname, './src'), }, }, 
        publicDir: 'public', // Explicitly define public directory
        plugins: [ // Temporarily disable plugins
            // Pages({
            //     dirs: 'src/pages',
            // }),
            {
                name: 'copy-pages',
                async writeBundle() {
                    const srcDir = 'src/pages';
                    const destDir = 'dist/pages';
                    try {
                        await mkdir(destDir, { recursive: true });
                        const files = globSync(`${srcDir}/**/*.html`);
                        await Promise.all(
                            files.map(async (file) => {
                                const fileName = path.basename(file);
                                await copyFile(file, path.join(destDir, fileName));
                                console.log(`✅ Copied: ${file} -> ${destDir}/${fileName}`);
                            })
                        );
                    } catch (error) {
                        console.error('❌ Error copying pages:', error);
                    }
                },
            },
        ],
    };
});