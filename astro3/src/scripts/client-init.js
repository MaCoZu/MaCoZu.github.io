import renderMathInElement from 'katex/contrib/auto-render';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'katex/dist/katex.min.css';

export function initKaTeX() {
    document.addEventListener('DOMContentLoaded', () => {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true }, 
                { left: '$', right: '$', display: false }, 
            ],
            throwOnError: false,
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initKaTeX();
    tippy('[data-tippy-content]');
});