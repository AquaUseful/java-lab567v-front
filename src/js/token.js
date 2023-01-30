export class Token {
    static localStorageKey = "JWTToken";

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

    /**
     * @param {Token} token 
     */
    static toLocalStorage(token) {
        let stringified = JSON.stringify(token);
        localStorage.setItem(Token.localStorageKey, stringified);
    }

    /**
     * @param {Token} token 
     */
    static fromLocalStorage(token) {
        let stringified = localStorage.getItem(Token.localStorageKey);
        let obj = JSON.parse(stringified);
        return new Token(obj.tokenType, obj.token);
    }

}