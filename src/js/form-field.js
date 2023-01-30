import { Popover } from "bootstrap";

export class FormField {
    /** @type {Element} */
    #element;
    /** @type {Popover} */
    #popover;
    /** @type {string} */
    #message;

    static #errClass = "is-invalid";

    /**
     * @param {Element} element 
     */
    constructor(element) {
        this.#element = element;
        this.#popover = Popover.getOrCreateInstance(element);
    }

    showError() {
        this.#element.classList.add(FormField.#errClass);
        this.#popover.show();
    }

    hideError() {
        this.#element.classList.remove(FormField.#errClass);
        this.#popover.hide();
    }

    /**
     * @param {string} msg 
     */
    setMessageText(msg) {
        this.#popover.setContent(
            { ".popover-body": msg }
        );
    }
}
