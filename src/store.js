let items = [];

const findById = function (id) {
    return this.items.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
    this.items.push(item);
};

const deleteBookmark= function (id) {
    this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const toggleExpanded = function (item) {
    item.expanded = !item.expanded;
};



export default {
    items,
    findById,
    addItem,
    deleteBookmark,
    toggleExpanded,
};