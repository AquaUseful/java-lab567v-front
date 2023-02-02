import { HttpResponse } from "./form/fetch.js";
import { FormJson } from "./form/form.js";
import { Token } from "./form/token.js";
import { init_on_load } from "./utils/initializer.js";

Token.tokenGuard("profile.html", false).then();

/**
 * @param {Response} response 
 */
async function formCb(response) {
    const json = await response.json();
    const token = new Token(json.tokenType, json.token);
    console.log(token)
    Token.toLocalStorage(token);
    location.replace("profile.html");
}

async function main() {
    const formElement = document.getElementById("loginForm");
    const form = new FormJson(formElement, formCb, null);
}

init_on_load(main);
