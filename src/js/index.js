import { createIndexNewsCard } from "./cards/news";
import { fetchJsonWithToken } from "./form/fetch.js";
import { HttpMethod, HttpResponse } from "./form/fetch.js";
import { init_on_load } from "./utils/initializer.js";
import { newsListUrl } from "./utils/constants.js";

async function updateNewsList() {
    const response = await fetchJsonWithToken(HttpMethod.GET, newsListUrl, null, null);
    if (response.status === HttpResponse.Ok) {
        const news = await response.json();
        const newsCardContainer = document.getElementById("newsCardContainer")
        news.forEach(async (n) => {
            const card = await createIndexNewsCard(n, null);
            newsCardContainer.appendChild(card);
        });
    }
}

async function main() {
    await updateNewsList();
}

init_on_load(main);