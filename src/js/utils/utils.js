import { displayNoneClass } from "./constants";

/**
 * @param {Element} el 
 */
export function hideElement(el) {
    el.classList.add(displayNoneClass);
}

/**
 * @param {Element} el 
 */
export function showElement(el) {
    el.classList.remove(displayNoneClass);
}