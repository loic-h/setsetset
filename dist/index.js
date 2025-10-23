/**
 * Automatically set mode on preferred color change
 */
const detectMode = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)')) {
        setMode("dark");
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const mode = event.matches ? "dark" : "light";
        setMode(mode);
    });
}

/**
 * Set color mode
 */
const setMode = (mode) => {
    const dataset = document.querySelector("body").dataset;
    dataset.mode = mode;
};

/**
 * Run main code
 */
const init = () => {
    detectMode();
};

/**
 * Execute script on DOM ready
 */
document.addEventListener("DOMContentLoaded", init);