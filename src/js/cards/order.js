import { FormJson } from "../form/form.js";

/**
 * @param {Object} order 
 */
export function createOrderCard(order, callback, token) {
    const comment = ((order.comment === null) ? "" : order.comment);

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
        <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <h2 class="card-title me-auto">Заказ №${order.id}</h2>
                        <form method="delete" action="/api/order/${order.id}" id="deleteOrderForm${order.id}">
                            <button type="submit" class="btn btn-danger btn-small">Удалить</button>
                        </form>
                    </div>
                    <form method="put" action="/api/order/${order.id}" id="orderForm${order.id}" autocomplete="off">
                        <div class="mb-3">
                            <label for="orderProduct${order.id}" class="form-label fw-bold">
                                Наименование товара
                            </label>
                            <input class="form-control" type="text" id="orderProduct${order.id}" name="product" required value="${order.product}">
                        </div>
                        <div class="mb-3">
                            <label for="orderAddress${order.id}" class="form-label fw-bold">
                                Адрес доставки
                            </label>
                            <input class="form-control" type="text" id="orderAddress${order.id}" name="address" required value="${order.address}">
                        </div>
                        <div class="mb-3">
                            <label for="orderComment${order.id}" class="form-label fw-bold">
                                Комментарий
                            </label>
                            <textarea class="form-control" id="orderComment${order.id}" rows="5" name="comment">${comment}</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary btn-sm">Сохранить</button>
                    </form>
                </div>`;
    const formElement = cardElement.querySelector(`#orderForm${order.id}`);
    const form = new FormJson(formElement, callback, token);
    const deleteFormElement = cardElement.querySelector(`#deleteOrderForm${order.id}`);
    const deleteForm = new FormJson(deleteFormElement, callback, token);
    return cardElement;
}