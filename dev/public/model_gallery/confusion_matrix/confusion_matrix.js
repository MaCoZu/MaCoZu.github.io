import * as d3 from "d3";


export function validateAndUpdateMatrix(input) {
    // Remove any non-digit characters
    input.value = input.value.replace(/\D/g, '');

    // Convert to number
    let value = Number(input.value);

    // Ensure non-negative integer
    value = Math.max(0, Math.floor(value));

    // Update the input value
    input.value = value;

    updateMetrics();
}

export function updateMetrics() {
    const tp = Number(document.getElementById('tp').value) || 0;
    const fn = Number(document.getElementById('fn').value) || 0;
    const fp = Number(document.getElementById('fp').value) || 0;
    const tn = Number(document.getElementById('tn').value) || 0;

    const precision = tp / (tp + fp) || 0;
    const accuracy = (tp + tn) / (tp + tn + fp + fn) || 0;
    const recall = tp / (tp + fn) || 0;
    const specificity = tn / (tn + fp) || 0;
    const f1 = 2 * (precision * recall) / (precision + recall) || 0;
    const youden = recall + specificity - 1;
    const mcc = (tp * tn - fp * fn) / Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn)) || 0;

    document.getElementById('precision').textContent = precision.toFixed(4);
    document.getElementById('accuracy').textContent = accuracy.toFixed(4);
    document.getElementById('recall').textContent = recall.toFixed(4);
    document.getElementById('specificity').textContent = specificity.toFixed(4);
    document.getElementById('f1').textContent = f1.toFixed(4);
    document.getElementById('youden').textContent = youden.toFixed(4);
    document.getElementById('mcc').textContent = mcc.toFixed(4);

    renderFormulas();
}

export function renderFormulas() {
    katex.render("Precision = \\frac{TP}{TP + FP} =", document.getElementById('precision-formula'));
    katex.render("Accuracy = \\frac{TP + TN}{TP + TN + FP + FN} =", document.getElementById('accuracy-formula'));
    katex.render("Recall = \\frac{TP}{TP + FN} =", document.getElementById('recall-formula'));
    katex.render("Specificity = \\frac{TN}{TN + FP} =", document.getElementById('specificity-formula'));
    katex.render("F1 = 2 \\cdot \\frac{Precision \\cdot Recall}{Precision + Recall} =", document.getElementById('f1-formula'));
    katex.render("Youden's\\ J =", document.getElementById('youden-formula'));
    katex.render("MCC =", document.getElementById('mcc-formula'));
}

document.addEventListener('DOMContentLoaded', function () {
    updateMetrics();
});