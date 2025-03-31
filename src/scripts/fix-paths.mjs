// scripts/fix-paths.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

// Get correct project root directory
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, '../../dist'); // Now points to correct dist folder

function processDirectory(directory) {
    try {
        const items = readdirSync(directory);

        for (const item of items) {
            const fullPath = join(directory, item);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                processDirectory(fullPath);
            } else if (item.endsWith('.html')) {
                fixFilePaths(fullPath, directory);
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${directory}:`, error.message);
        process.exit(1);
    }
}

function fixFilePaths(filePath, baseDir) {
    try {
        const relativeDepth = relative(distDir, dirname(filePath));
        const depth = relativeDepth.split('/').filter(Boolean).length;
        const prefix = depth > 0 ? '../'.repeat(depth) : './';

        let content = readFileSync(filePath, 'utf8');

        content = content
            .replace(/(href|src)="\/([^"]*)"/g, `$1="${prefix}$2"`)
            .replace(/url\(\/([^)]*)\)/g, `url(${prefix}$1)`)
            .replace(/(href|src)="\/\.\//g, '$1="./');

        writeFileSync(filePath, content);
        console.log(`Fixed paths in: ${filePath}`);
    } catch (error) {
        console.error(`Error fixing paths in ${filePath}:`, error.message);
    }
}

// Verify dist directory exists before processing
try {
    statSync(distDir);
    console.log(`Processing dist folder at: ${distDir}`);
    processDirectory(distDir);
    console.log('Path fixing complete!');
} catch (error) {
    console.error(`Dist folder not found at ${distDir}. Run 'npm run build' first.`);
    process.exit(1);
}