/**
 * @param {Function} exec
 */
export function init_on_load(exec) {
    document.addEventListener("DOMContentLoaded",
        exec);
}
