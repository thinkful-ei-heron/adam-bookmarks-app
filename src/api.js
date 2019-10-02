const BASE_URL = 'https://thinkful-list-api.herokuapp.com/adam';

const getItems = function () {
    return fetch(`${BASE_URL}/bookmarks`);
};

const createItem = function (newItem) {
    return fetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newItem
    });
}

const deleteItem = function (id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
};


export default {
    getItems,
    createItem,
    deleteItem
};