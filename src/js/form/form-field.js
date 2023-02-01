import { Popover } from "bootstrap";
import { popoverHiddenEventName, popoverShownEventName } from "../utils/constants";

export class FormField {
    /** @type {Element} */
    #element;
    /** @type {Popover} */
    #popover;
    /** @type {boolean} */
    #isPopoverShown;

    static #errClass = "is-invalid";
    static #popoverElementAttributes = {
        "data-bs-container": "body",
        "data-bs-toggle": "popover",
        "data-bs-placement": "right",
        "data-bs-content": " "
    };

    /**
     * @param {Element} element 
     */
    constructor(element) {
        this.#element = element;
        this.#popover = new Popover(this.#element,
            {
                container: "body",
                trigger: "manual",
                placement: "left",
                content: " "
            });
        this.#isPopoverShown = false;
        this.#element.addEventListener(popoverHiddenEventName, () => {
            if (this.#isPopoverShown) {
                this.#popover.show();
            }
        });
        this.#element.addEventListener(popoverShownEventName, () => {
            if (!this.#isPopoverShown) {
                this.#popover.hide();
            }
        })
    }

    showError() {
        this.#element.classList.add(FormField.#errClass);
        this.#isPopoverShown = true;
        this.#popover.show();

    }

    hideError() {
        this.#element.classList.remove(FormField.#errClass);
        this.#isPopoverShown = false;
        this.#popover.hide();
    }

    /**
     * @param {string} msg 
     */
    setErrorMessage(msg) {
        this.#popover.setContent(
            { ".popover-body": msg }
        );
    }
}
