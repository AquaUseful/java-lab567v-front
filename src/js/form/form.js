import { FormField } from "./form-field.js";
import { Token } from "./token.js";
import { HttpResponse, fetchFormDataJson, fetchFormDataMultipart } from "./fetch.js";
import { displayNoneClass } from "../utils/constants.js";
import { hideElement, showElement } from "../utils/utils.js";

export class Form {
    /** @type {Element} */
    _formElement;
    /** @type {Map<string, FormField>} */
    _fields;
    /** @type {Element} */
    _errorElement;
    /** @type {string} */
    _method;
    /** @type {string} */
    _url;
    /** @type {Function} */
    _callback;
    /**@type {Token}*/
    _token;

    static #fieldSelectors = "input, textarea";
    static #errorSelector = "#globalError";
    static #successResponses = [HttpResponse.Ok, HttpResponse.Created];

    /**
     * @param {Element} element 
    * @param {Function} callback 
    */
    constructor(element, callback, token) {
        this._formElement = element;
        this._fields = new Map();
        element.querySelectorAll(Form.#fieldSelectors).forEach((element) => {
            this._fields.set(element.getAttribute("name"), new FormField(element));
        });
        this._errorElement = element.querySelector(Form.#errorSelector);
        this._method = this._formElement.getAttribute("method");
        this._url = this._formElement.getAttribute("action");
        this._callback = callback;
        this._token = token;
        this.#setSubmitHandler();
    }

    /**
     * @param {ValidationViolation} violation 
     */
    displayViolation(violation) {
        const field = this._fields.get(violation.fieldName)
        field.setErrorMessage(violation.message);
        field.showError();
    }

    hideViolations() {
        this._fields.forEach(async (field) => {
            field.hideError();
        })
    }

    /**
     * @param {string} error 
     */
    displayGlobalError(error) {
        if (this._errorElement !== null) {
            this._errorElement.innerHTML = error;
            showElement(this._errorElement);
        }
    }

    hideGlobalError() {
        if (this._errorElement !== null) {
            hideElement(this._errorElement);
        }
    }

    /**
     * @returns {Promise<Response>}
     */
    async _sendForm() {
        throw new Error("Not implemented");
    }

    /**
     * @param {Response} response 
     */
    async _displayErrors(response) {
        let json = (await response.json());
        console.log(json);
        if ("message" in json) {
            this.displayGlobalError(json.message);
        }
        if ("violations" in json) {
            json.violations.forEach(async (violation) => {
                this.displayViolation(violation);
            });
        }
    }

    #setSubmitHandler() {
        this._formElement.addEventListener("submit", async (event) => {
            await this.#submitHandler(event);
        });
    }

    /**
     * @param {Event} event 
     */
    async #submitHandler(event) {
        event.preventDefault();
        this.hideGlobalError();
        this.hideViolations();
        const response = await this._sendForm();
        console.log(this);
        if (!Form.#successResponses.includes(response.status)) {
            await this._displayErrors(response);
        } else {
            await this._callback(response);
        }

    }
}

export class FormJson extends Form {
    /**
    * @param { Element } element
    * @param {Function} callback
    */
    constructor(element, callback, token) {
        super(element, callback, token);
    }

    async _sendForm() {
        const formData = new FormData(this._formElement);
        const resp = await fetchFormDataJson(this._method, this._url, formData, this._token);
        return resp;
    }
}

export class FormMultipart extends Form {
    /**
       * @param { Element } element
       * @param {Function} callback
       */
    constructor(element, callback, token) {
        super(element, callback, token);
    }

    async _sendForm() {
        const formData = new FormData(this._formElement);
        const resp = await fetchFormDataMultipart(this._method, this._url, formData, this._token);
        return resp;
    }
}