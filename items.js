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

  /** Return an item if foind in items
   * Returns false if not found
   */
  static getItem(name) {
    const foundItem = items.find(item => item.name === name);

    return foundItem;
  }

  /** deletes an item given a name  */
  static deleteItem(name) {
    const itemIndex = items.findIndex(item => item.name === name);

    items.splice(itemIndex, 1);

  }

  /** */
  static updateInfo(name, req) {
    const item = items.find(item => item.name === name);

    item.name = req.name || item.name;
    item.price = req.price || item.price;
  }
}

module.exports = Item;