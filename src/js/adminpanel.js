import { createUserCard } from "./cards/user.js";
import { HttpMethod, HttpResponse, fetchJsonWithToken } from "./form/fetch.js";
import { FormJson } from "./form/form.js";
import { Token } from "./form/token.js";
import { userListUrl } from "./utils/constants.js";
import { init_on_load } from "./utils/initializer.js";

Token.tokenGuard("login.html", true).then();
const token = Token.fromLocalStorage();

async function updateUserList() {
    const response = await fetchJsonWithToken(HttpMethod.GET, userListUrl, null, token);
    if (response.status === HttpResponse.Ok) {
        const orders = await response.json();
        const userCardContainer = document.getElementById("userCardContainer")
        orders.forEach((order) => {
            const card = createUserCard(order, addUserCb, token);
            userCardContainer.appendChild(card);
        });
    }
}

async function addUserCb(response) {
    document.location.reload();
}

async function main() {
    const addUserFormElement = document.getElementById("addUserForm");
    const addUserForm = new FormJson(addUserFormElement, addUserCb, token);
    await updateUserList();
}

init_on_load(main);
