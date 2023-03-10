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
    if (headers === null) {
        if (token !== null) {
            headers = {
                "Authorization": token.toString()
            };
        } else {
            headers = new Object();
        }
    } else if (token !== null) {
        headers["Authorization"] = token.toString();
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

/**
 * @param {String} method 
 * @param {URL | string} url 
 * @param {FormData} formData 
 * @param {Token} token 
 * @returns 
 */
export async function fetchFormDataMultipart(method, url, formData, token) {
    const response = await fetchWithToken(method, url, formData, null, token);
    return response;
}

/**
 * @param {string} method 
 * @param {URL | string} url 
 * @param {Token} token 
 * @param {number} success
 */
export async function fetchBlob(method, url, token, success = HttpResponse.Ok) {
    const response = await fetchWithToken(method, url, null, null, token);
    if (response.status === success) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        return blobUrl;
    } else {
        return null;
    }
}
