"use strict";

const express = require("express")

const router = new express.Router();
const Item = require('./items')
const { BadRequestError } = require('./expressError');
const { items } = require("./fakeDb");


/** get list of items, reutrns JSON like
 *
 * { items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 }
]}
 *
 */
router.get('/', function(req,res) {

  let items  = Item.getItems()
  return res.json({items: items})

})

/** accept JSON body, add item, and return it
 * adds item to
 * {name: "popsicle", price: 1.45} =>
 * {added: {name: "popsicle", price: 1.45}}
 */

router.post('/', function(req, res) {
  const body = req.body;

  if (!(body)) {
    throw new BadRequestError();
  }

  let item = new Item(body.name, body.price);
  Item.addItem(item)
  console.log(items)

  return res.json({added: {
    name: item.name,
    price: item.price
  }});


})

module.exports = router;
