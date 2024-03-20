"use strict";

const { items } = require('./fakeDb');


class Item {

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  /** returns items array */
  static getItems() {
    return items;
  }

  /** adds a new item to items array */
  static addItem(item) {
    items.push(item);
  }




}

module.exports = Item;