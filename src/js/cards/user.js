import { FormJson } from "../form/form.js";

/**
 * @param {Object} user 
 */
export function createUserCard(user, callback, token) {
    const comment = ((user.comment === null) ? "" : user.comment);

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `<div class="card-body">
<div class="d-flex align-items-center mb-3">
<h2 class="card-title me-auto">Пользователь №${user.id}</h2>
<form method="delete" action="/api/user/${user.id}" id="deleteUserForm${user.id}">
<button type="submit" class="btn btn-danger btn-small">Удалить</button>
</form>
</div>
<form method="put" action="/api/user/${user.id}" id="userForm${user.id}" autocomplete="off">
<div class="mb-3">
<label for="userName${user.id}" class="form-label fw-bold">Имя пользователя</label>
<input class="form-control" type="text" id="userName${user.id}" name="name" required value="${user.name}">
</div>
<div class="mb-3">
<label for="userEmail${user.id}" class="form-label fw-bold">Email</label>
<input class="form-control" type="text" id="userEmail${user.id}" name="email" required value="${user.email}">
</div>
<div class="mb-3">
<label for="userPassword${user.id}" class="form-label fw-bold">Пароль</label>
<input class="form-control" type="text" id="userPassword${user.id}" name="password" required value="${user.password}">
</div>
<div class="mb-3">
<p class="fw-bold mb-0">Роль</p>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="role" id="userRoleUser" value="USER" ${(user.role === "USER") ? "checked" : ""}>
<label for="userRoleUser">Пользователь</label>
</div>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="role" id="userRoleUser" value="EDITOR" ${(user.role === "EDITOR") ? "checked" : ""}>
<label for="userRoleUser">Редактор</label>
</div>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" name="role" id="userRoleUser" value="ADMIN"  ${(user.role === "ADMIN") ? "checked" : ""}>
<label for="userRoleUser">Администратор</label>
</div>
</div> 
<button type="submit" class="btn btn-primary btn-sm">Сохранить</button>
</form>
</div>`;
    const formElement = cardElement.querySelector(`#userForm${user.id}`);
    const form = new FormJson(formElement, callback, token);
    const deleteFormElement = cardElement.querySelector(`#deleteUserForm${user.id}`);
    const deleteForm = new FormJson(deleteFormElement, callback, token);
    return cardElement;
}