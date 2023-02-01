import { Token } from "./token.js"

export const HttpMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH"
};

export const HttpResponse = {
    Ok: 200,
    Created: 201,
    BadRequest: 400,
    Forbidden: 403,
    Unauthorised: 401,
    NoContent: 204
}

/**
 * @param {string} method 
 * @param {URL | string} url 
 * @param {Object | string | null} body 
 * @param {Object | null} headers
 * @param {Token} token 
 */
export async function fetchWithToken(method, url, body, headers, token) {
    const tokenString = token.toString();
    if (headers == null) {
        headers = {
            "Authorization": tokenString
        }
    } else {
        headers["Authorization"] = tokenString;
    }
    let response = await fetch(
        url,
        {
            method: method,
            body: body,
            headers: headers
        }
    );
    return response;
}

/**
 * @param {string} method 
 * @param {URL | string} url 
 * @param {Object | null} body 
 * @param {Token} token 
 */
export async function fetchJsonWithToken(method, url, body, token) {
    const headers = {
        "Content-Type": "application/json;charset=utf8"
    }
    if (body !== null) {
        body = JSON.stringify(body);
    }
    const response = await fetchWithToken(method, url, body, headers, token);
    return response;
}

/**
 * @param {string} method 
 * @param {URL | String} url 
 * @param {FormData} formData 
 * @param {Token} token  
 */
export async function fetchFormDataJson(method, url, formData, token) {
    const formObject = Object.fromEntries(formData.entries());
    const response = await fetchJsonWithToken(method, url, formObject, token);
    return response;
}
