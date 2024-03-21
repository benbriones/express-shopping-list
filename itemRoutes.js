"use strict";

const express = require("express");

const router = new express.Router();
const Item = require('./items');
const { BadRequestError, NotFoundError } = require('./expressError');
const { items } = require("./fakeDb");


/** get list of items, reutrns JSON like
 *
 * { items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 }
]}
 *
 */
router.get('/', function (req, res) {

  let items = Item.getItems();
  return res.json({ items: items });

});

/** accept JSON body, add item, and return it
 * adds item to
 * {name: "popsicle", price: 1.45} =>
 * {added: {name: "popsicle", price: 1.45}}
 */

router.post('/', function (req, res) {
  const body = req.body;

  if (!(body)) {
    throw new BadRequestError();
  }

  let item = new Item(body.name, body.price);
  Item.addItem(item);
  console.log(items);

  return res.json({
    added: {
      name: item.name,
      price: item.price
    }
  });
});

/** Return an item given a name
 * e.g. {name: "popsicle", "price": 1.45}
 */
router.get('/:name', function (req, res) {
  const name = req.params.name;

  const foundItem = Item.getItem(name);

  if (foundItem) {
    return res.json(foundItem);
  } else {
    throw new NotFoundError("This item was not found");
  }

});

/** Update an item and returns
* e.g. {updated: {name: "new popsicle", price: 2.45}}
*/
router.patch('/:name', function (req, res) {
  const name = req.params.name;

  const foundItem = Item.getItem(name);

  if (foundItem) {
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
  } else {
    throw new NotFoundError("This item was not found");
  }

  return res.json({
    updated: {
      name: foundItem.name,
      price: foundItem.price
    }
  });

});


/**
 *
 */
router.delete('/:name', function (req, res) {
  const name = req.params.name;

  const foundItem = Item.getItem(name);

  if (foundItem) {
    Item.deleteItem(name);
  } else {
    throw new NotFoundError("This item was not found");
  }

  return res.json({ message: "Deleted" });

});


module.exports = router;
