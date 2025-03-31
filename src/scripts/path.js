// src/utils/paths.js
export function getRelativePath(from, to) {
    const segments = from.split('/').filter(Boolean);
    const backSteps = segments.length - 1;
    return '../'.repeat(backSteps) + to;
}