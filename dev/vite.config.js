import { defineConfig } from "vite";
import path from "path";
import { globSync } from "glob";
import { mkdir, copyFile } from "fs/promises"; // Correct import

export default defineConfig(({ command }) => {
    const isDev = command === "serve";

    return {
        base: isDev ? "/src/" : "./",
        server: { host: "localhost", },
        build: {
            outDir: "dist",
            emptyOutDir: true,
            assetsDir: "assets",
            rollupOptions: {
                input: {
                    main: path.resolve("index.html"),
                    ...Object.fromEntries(
                        globSync("src/pages/**/*.html").map(file => [
                            file.replace(/^src\/pages\//, "").replace(/\.html$/, ""),
                            path.resolve(file),
                        ])
                    ),
                },
            },
        },
        // resolve: {
        //     alias: {
        //         "@": path.resolve(__dirname, "src"),
        //     },
        // },
        plugins: [
            {
                name: "copy-components",
                async writeBundle() {
                    const srcDir = "src/components";
                    const destDir = "dist/components";

                    try {
                        // Ensure destination directory exists
                        await mkdir(destDir, { recursive: true });

                        // Find and copy all HTML files
                        const files = globSync(`${srcDir}/*.html`);
                        await Promise.all(
                            files.map(async (file) => {
                                const fileName = path.basename(file);
                                await copyFile(file, path.join(destDir, fileName));
                                console.log(`✅ Copied: ${file} -> ${destDir}/${fileName}`);
                            })
                        );

                    } catch (error) {
                        console.error("❌ Error copying components:", error);
                    }
                },
            },
        ],
    };
});