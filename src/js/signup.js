import { HttpResponse } from "./form/fetch.js";
import { FormJson } from "./form/form.js";
import { Token } from "./form/token.js";
import { init_on_load } from "./utils/initializer.js";

/**
 * @param {Response} response 
 */
async function formCb(response) {
    Token.resetLocalStorage();
    location.replace("login.html");
}

async function main() {
    const formElement = document.getElementById("signupForm");
    const form = new FormJson(formElement, formCb, null);
    console.log(form);
}

init_on_load(main);
