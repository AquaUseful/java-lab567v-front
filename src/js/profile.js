import { HttpResponse, HttpMethod, fetchBlob, fetchJsonWithToken } from "./form/fetch.js";
import { FormMultipart } from "./form/form.js";
import { Token } from "./form/token.js";
import { init_on_load } from "./utils/initializer.js";
import { hideElement, showElement } from "./utils/utils.js";
import { userSelfAvatarUrl, userSelfUrl } from "./utils/constants.js";

Token.tokenGuard("login.html", true).then();
const token = Token.fromLocalStorage();

async function updateAvatar() {
    const avatarLocalUrl = await fetchBlob(HttpMethod.GET, userSelfAvatarUrl, token);
    const avatarImg = document.getElementById("avatarImg");
    const avatarPlaceholder = document.getElementById("avatarPlaceholder");
    if (avatarLocalUrl === null) {
        hideElement(avatarImg);
        showElement(avatarPlaceholder);
    } else {
        avatarImg.setAttribute("src", avatarLocalUrl);
        hideElement(avatarPlaceholder);
        showElement(avatarImg);
    }
}

async function updateProfile() {
    const response = await fetchJsonWithToken(HttpMethod.GET, userSelfUrl, null, token); {
        if (response.status === HttpResponse.Ok) {
            const json = await response.json();
            document.getElementById("userName").innerHTML = json.name;
            document.getElementById("userEmail").innerHTML = json.email;
            document.getElementById("userLoginCount").innerHTML = json.loginCount;
            const activeTabId = `${json.role.toLowerCase()}NavTab`;
            showElement(document.getElementById(activeTabId));
        }
    }
}

/**
 * @param {Response} response 
 */
async function formCb(response) {
    if (response.status === HttpResponse.Created) {
        document.location.reload();
    }
}

async function main() {
    await updateAvatar();
    await updateProfile();
    const formElement = document.getElementById("avatarForm");
    const form = new FormMultipart(formElement, formCb, Token.fromLocalStorage());
}

init_on_load(main);