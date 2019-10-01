
const generateBookmarkElement = function (item) {
    let itemHtml = `
        <li class='item-list-element' item-id='${item.id}'>
            <div class='bookmark-title'>${item.title}</div>
            <div class='bookmark-rating'>${item.rating}</div>
        </li>`
    if (item.expanded) {
        itemHtml = `
        <li class='item-list-element' item-id='${item.id}'>
            <div class='bookmark-title'>${item.title}</div>
            <div class='bookmark-rating'>${item.rating}</div>
            <div>
                <form action='${item.url}'>
                    <button type='submit'>Visit Site</button>
                </form>
                    <p>${item.desc}</p>
            </div>
            <button class='bookmark-item-delete js-item-delete'>
                <span class='button-label'>Delete Bookmark</span>
            </button>
        </li>`
    }
    return itemHtml;
}

const generateBookmarkItemsString = function (bookmarks) {
    const items = boomarks.map((item) => generateBookmarkElement(item));
    return items.join('');
}

const render = function () {

}