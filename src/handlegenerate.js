import $ from 'jquery';
import store from './store';
import api from './api';

$.fn.extend({
    serializeJson: function () {
        const formData = new FormData(this[0]);
        const o = {};
        formData.forEach((val, name) => o[name] = val);
        return JSON.stringify(o);
    }
});

const generateBookmarkElement = function (item) {
    let itemHtml = `
        <li class='item-list-element' data-item-id='${item.id}'>
            <div tabindex='0' class='bookmark-head'>
                <div class='bookmark-title'>${item.title}</div>
                <div class='bookmark-rating'>Rating: ${item.rating}</div>
        </div>    
        </li>`
    if (item.expanded) {
        itemHtml = `
        <li class='item-list-element' data-item-id='${item.id}'>
            <div tabindex='0' class='bookmark-head'>
                <div class='bookmark-title'>${item.title}</div>
                <div class='bookmark-rating'>Rating: ${item.rating}</div>
            </div>    
            <div>
                <form action='${item.url}' target='_blank'>
                    <button class='visit-button' type='submit'>Visit Site</button>
                </form>
                    <p>${item.desc}</p>
            </div>
            <button class='delete-button'>Delete Bookmark</button>
        </li>`
    }
    return itemHtml;
}

const generateBookmarkItemsString = function (bookmarks) {
    const items = bookmarks.map((item) => generateBookmarkElement(item));
    return items.join('');
}

const render = function () {
    let items = [...store.items];
    let rating = $('#rating-select').children('option:selected').val();
    const bookmarkItemsString = generateBookmarkItemsString(items.filter((item) => {
        return item.rating >= parseInt(rating);
    }));
    $('#bookmarks-list').html(bookmarkItemsString);
}

const generateAddBookmarkHtml = function () {
    $('header').html(`
        <h1>My Bookmarks</h1>
    </header>
    <main>
        <form id='create-bookmarks-form'>
            <fieldset>
                <legend>Bookmark Details</legend>
                <label class='details-label' for='title-entry'>Title</label>
                <input class='details-input' type='text' name='title' id='name-entry' placeholder='Name your bookmark' required />
                <label class='details-label' for='url-entry'>URL</label>
                <input class='details-input' type='text' name='url' id='url-entry' placeholder='eg. http://www.google.com' required />
                <label class='details-label' for='description-entry'>Description</label>
                <textarea class='details-input' id='description-entry' name='desc' rows='5' cols='20' placeholder='Add bookmark description...' required></textarea>
                <label class='details-label' for='rating-select'>Rating</label>
                <select class='details-input' id='rating-select' name='rating' required>
                        <option value=''>--Rating</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                    <button type='submit' class='add-submit'>Add</button>
                </fieldset>
            </form>
        </main>`);
}

const handleAddBookmarkClicked = function () {
    $('#add-bookmarks-form').on('click', '#add-bookmark-button', function (e) {
        e.preventDefault();
        console.log('`handleAddBookmarkClicked` ran');
        generateAddBookmarkHtml();
    });
};

const handleAddBookmarkSubmit = function () {
    $('#form-header').on('submit', '#create-bookmarks-form', function (e) {
        e.preventDefault();
        let newItem = $(e.target).serializeJson();
        console.log(newItem);
        api.createItem(newItem)
            .then(res => res.json())
            .then((item) => {
                store.addItem(item);
                render();
                location.reload();
            })
    });
};

const getItemIdFromElement = function (item) {
    return $(item).closest('.item-list-element').data('item-id');
}

const handleDeleteBookmarkClicked = function () {
    $('.bookmarks-list-main').on('click', '.delete-button', e => {
        e.preventDefault();
        console.log('listening');
        const id = getItemIdFromElement(e.currentTarget);
        let item = store.findById(id);
        api.deleteItem(item.id)
            .then(() => {
                store.deleteBookmark(id);
                render();
            })
    })
}

const handleToggleExpandedClicked = function () {
    $('#bookmarks-list').on('click', '.bookmark-head', e => {
        const id = getItemIdFromElement(e.currentTarget);
        let item = store.findById(id);
        store.toggleExpanded(item);
        render();
    })
    $('#bookmarks-list').on('keyup', '.bookmark-head', e => {
        if (e.keyCode === 13) {
            const id = getItemIdFromElement(e.currentTarget);
            let item = store.findById(id);
            store.toggleExpanded(item);
            render();
        }
    })
}

const handleFilterChoice = function () {
        $('#rating-select').change(e => {
        let selectedRating = $(e.currentTarget).val();
        console.log(selectedRating);
        render();
    })
}

const bindEventListeners = function () {
    handleAddBookmarkClicked();
    handleAddBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleToggleExpandedClicked();
    handleFilterChoice();
}

export default {
    render,
    bindEventListeners
}