import { FormMultipart, FormJson } from "../form/form.js";
import { fetchBlob } from "../form/fetch.js";
import { HttpMethod } from "../form/fetch.js";

export async function createNewsPictureHtml(news, token) {
    const pictureLocalUrl = await fetchBlob(HttpMethod.GET, `/api/news/${news.id}/picture`, token);
    if (pictureLocalUrl == null) {
        return `<div class="text-center text-bg-secondary rounded p-3 w-100" id="picturePlaceholder">
<i class="bi bi-camera" style="font-size: 5em;"></i>
<p>Нет фото</p>
</div>`
    } else {
        return `<img class="img-fluid img-thumbnail rounded" src="${pictureLocalUrl}">`
    }
}

export async function createEditorNewsCard(news, callback, token) {
    const pictureHtml = await createNewsPictureHtml(news, token);
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `<div class="card-body">
<div class="row">
<div class="col-md-4 mb-3 align-items-center d-flex" id="newsPictureContainer${news.id}">
${pictureHtml}
</div>
<div class="col-md-8">
<div class="row">
<div class="col">
<h1>Новость №${news.id}</h1>
</div>
<div class="col-auto">
<form id="deleteNewsForm${news.id}" method="delete" action="/api/news/${news.id}">
<button class="btn btn-danger btn-sm" type="submit">Удалить</button>
</form>
</div>
</div>
<div class="row">
<form id="newsForm${news.id}" method="PATCH" action="/api/news/${news.id}">
<div class="mb-3">
<label for="newsTitle${news.id}" class="form-label fw-bold">Заголовок новости</label>
<input class="form-control" id="newsTitle${news.id}" type="text" name="title" required value="${news.title}">
</div>
<div class="mb-3">
<label for="newsContent${news.id}" class="form-label fw-bold">Содержание новости</label>
<textarea class="form-control" name="content" id="newsContent${news.id}" rows="3" required>${news.content}</textarea>
</div>
<div class="mb-3">
<div class="row">
<label for="newsPicture${news.id}" class="col-md-3 col-form-label fw-bold">Новое изображение</label>
<div class="col col-md-9">
<input class="form-control" name="picture" id="formPicture${news.id}" type="file">
<div class="form-check">
<input type="checkbox" class="form-check-input" id="formRemovePicture" name="removePicture">
<label for="formRemovePicture" class="form-check-label">Удалить изображение</label>
</div>
</div>
</div>
</div>
</form>
</div>
</div>
</div>
<button form="newsForm${news.id}" type="submit" class="btn btn-primary btn-sm">Сохранить</button>
</div>`;
    const formElement = cardElement.querySelector(`#newsForm${news.id}`);
    const form = new FormMultipart(formElement, callback, token);
    const deleteFormElement = cardElement.querySelector(`#deleteNewsForm${news.id}`);
    const deleteForm = new FormJson(deleteFormElement, callback, token);
    return cardElement;
}
