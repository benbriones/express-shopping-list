"use strict";

const request = require("supertest");
const app = require('./app');

let { items } = require('./fakeDb');

let popsicle = { name: "popsicle", price: 1.50 };

beforeEach(function () {
  items.push(popsicle);
});

afterEach(function () {
  items = [];
});

describe('test GET /items', function () {

  it('Gets a list of our current items', async function () {
    const resp = await request(app).get('/items');

    expect(resp.body).toEqual({
      items: [
        { name: "popsicle", price: 1.50 }
      ]
    });

    expect(resp.statusCode).toEqual(200);

  });
});

describe('test POST /items ', function() {

  it('Adds item and returns added item', async function() {
    let newFood = {name: "apples", price: 100}

    const resp = await request(app)
    .post('/items')
    .send(newFood)

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(
      {added: {name: "apples", price: 100}}
    )

  })
})

describe('test GET /items/name', function () {

  it('Gets a specific item', async function () {
    const resp = await request(app).get(`/items/${popsicle.name}`);

    expect(resp.body).toEqual(
      {name: "popsicle", "price": 1.50}
    );

    expect(resp.statusCode).toEqual(200);

  });
});

describe('test patch /items/name', function () {

  it('Changes specific item info', async function () {
    let newInfo = {name: "peanuts", price: 120}
    const resp = await request(app)
    .patch(`/items/${popsicle.name}`)
    .send(newInfo);

    expect(resp.body).toEqual(
      {updated: {name: "peanuts", price: 120}}
    );

    expect(resp.statusCode).toEqual(200);

  });
});