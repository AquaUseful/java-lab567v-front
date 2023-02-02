import { createOrderCard } from "./cards/order.js";
import { HttpMethod, HttpResponse, fetchJsonWithToken } from "./form/fetch.js";
import { FormJson } from "./form/form.js";
import { Token } from "./form/token.js";
import { orderSelfListUrl } from "./utils/constants.js";
import { init_on_load } from "./utils/initializer.js";

Token.tokenGuard("login.html", true).then();
const token = Token.fromLocalStorage();

async function updateOrderList() {
    const response = await fetchJsonWithToken(HttpMethod.GET, orderSelfListUrl, null, token);
    if (response.status === HttpResponse.Ok) {
        const orders = await response.json();
        const orderCardContainer = document.getElementById("orderCardContainer")
        orders.forEach((order) => {
            const card = createOrderCard(order, addOrderCb, token);
            orderCardContainer.appendChild(card);
        });
    }
}

async function addOrderCb(response) {
    document.location.reload();
}

async function main() {
    const addOrderFormElement = document.getElementById("addOrderForm");
    const addOrderForm = new FormJson(addOrderFormElement, addOrderCb, token);
    await updateOrderList();
}

init_on_load(main);
