import { createEditorNewsCard } from "./cards/news.js";
import { HttpMethod, HttpResponse, fetchJsonWithToken } from "./form/fetch.js";
import { FormMultipart } from "./form/form.js";
import { Token } from "./form/token.js";
import { newsListUrl } from "./utils/constants.js";
import { init_on_load } from "./utils/initializer.js";

Token.tokenGuard("login.html", true).then();
const token = Token.fromLocalStorage();

async function updateNewsList() {
    const response = await fetchJsonWithToken(HttpMethod.GET, newsListUrl, null, token);
    if (response.status === HttpResponse.Ok) {
        const news = await response.json();
        const newsCardContainer = document.getElementById("newsCardContainer")
        news.forEach(async (n) => {
            const card = await createEditorNewsCard(n, addOrderCb, token);
            newsCardContainer.appendChild(card);
        });
    }
}

async function addOrderCb(response) {
    document.location.reload();
}

async function main() {
    const addNewsFormElement = document.getElementById("addNewsForm");
    const addNewsForm = new FormMultipart(addNewsFormElement, addOrderCb, token);
    await updateNewsList();
}

init_on_load(main);
