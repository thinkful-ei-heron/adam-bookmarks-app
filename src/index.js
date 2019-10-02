import $ from 'jquery';

import api from './api';
import store from './store';
import 'normalize.css';
import './index.css';
import handlegenerate from  './handlegenerate';

function main() {
    api.getItems()
        .then(res => res.json())
        .then((items) => {
            items.forEach((item) => {
                item.expanded = false;
                store.addItem(item);
                handlegenerate.render();
            });
        });
    handlegenerate.bindEventListeners();
    handlegenerate.render();
}

$(main);
