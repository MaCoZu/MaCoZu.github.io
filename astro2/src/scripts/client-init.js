import katex from 'katex';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'katex/dist/katex.min.css';

export function initKaTeX() {
    const elements = document.querySelectorAll('p, span, div, li, td'); // Select elements where inline math might be
    elements.forEach(element => {
        const text = element.innerHTML;
        const regex = /\$([^$]+)\$/g; // Regular expression to find inline math

        if (regex.test(text)) {
            const replacedText = text.replace(regex, (match, expression) => {
                let renderedHtml = '';
                try {
                    renderedHtml = katex.renderToString(expression, { throwOnError: false });
                } catch (error) {
                    renderedHtml = match; // If error, show the original
                }
                return renderedHtml;
            });
            element.innerHTML = replacedText;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initKaTeX();
    tippy('[data-tippy-content]');
});