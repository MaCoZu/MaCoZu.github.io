// scripts/verify-paths.mjs
import { readFileSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

function checkFile(filePath) {
    const content = readFileSync(filePath, 'utf8');
    const badPaths = [
        ...content.matchAll(/(href|src)="\/([^"]*)"/g),
        ...content.matchAll(/url\(\/([^)]*)\)/g)
    ];

    if (badPaths.length) {
        console.error(`Found absolute paths in ${filePath}:`);
        badPaths.forEach(match => console.error(`- ${match[0]}`));
        return false;
    }
    return true;
}

// Run verification
let hasErrors = false;
require('glob').sync('**/*.html', { cwd: distDir }).forEach(file => {
    if (!checkFile(join(distDir, file))) {
        hasErrors = true;
    }
});

process.exit(hasErrors ? 1 : 0);