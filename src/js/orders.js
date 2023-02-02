import { FormJson } from "./form/form.js";
import { Token } from "./form/token.js";
import { init_on_load } from "./utils/initializer.js";

Token.tokenGuard("login.html", true).then();
const token = Token.fromLocalStorage();

async function updateOrderList() {

}

async function addOrderCb(response) {
    document.location.reload();
}

async function main() {
    const addOrderFormElement = document.getElementById("addOrderForm");
    const addOrderForm = new FormJson(addOrderFormElement, addOrderCb, token);
}

init_on_load(main);
