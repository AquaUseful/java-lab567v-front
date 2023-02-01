import { HttpMethod, HttpResponse, fetchWithToken } from "./fetch.js";

export class Token {
    static #localStorageKey = "JWTToken";
    static #validationUrl = "/api/auth/validate";

    /**
     * @param {string} tokenType 
     * @param {string} token 
     */
    constructor(tokenType, token) {
        this.tokenType = tokenType;
        this.token = token;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.tokenType} ${this.token}`;
    }

    async validate() {
        const tokenString = this.toString();
        const resp = await fetchWithToken(HttpMethod.GET,
            Token.#validationUrl,
            null,
            null,
            this);
        return resp.status === HttpResponse.Ok;
    }

    /**
     * @param {Token} token 
     */
    static toLocalStorage(token) {
        const stringified = JSON.stringify(token);
        console.log(stringified)
        localStorage.setItem(Token.#localStorageKey, stringified);
    }

    /**
     * @param {Token} token 
     */
    static fromLocalStorage(token) {
        let stringified = localStorage.getItem(Token.#localStorageKey);
        if (stringified != null) {
            let obj = JSON.parse(stringified);
            return new Token(obj.tokenType, obj.token);
        } else {
            return null;
        }
    }

    static resetLocalStorage() {
        localStorage.removeItem(Token.#localStorageKey);
    }

    /**
    * @param {string | URL} redirectUrl 
    * @param {boolean} needToken
    */
    static async tokenGuard(redirectUrl, needToken) {
        if (needToken) {
            const token = Token.fromLocalStorage();
            if ((token == null) || !(await token.validate())) {
                Token.resetLocalStorage();
                document.location.replace(redirectUrl);
            }
        } else if ((!needToken) && (Token.fromLocalStorage() != null)) {
            document.location.replace(redirectUrl);
        }
    }
}
