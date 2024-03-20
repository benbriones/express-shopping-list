"use strict";

const express = require("express");
const app = express();

const itemRoutes = require("./itemRoutes");


// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded());

app.use('/items', itemRoutes);

// app.use(checkBodyVals);

// function checkBodyVals(req, res, next) {
//   const body = req.body;
//   if (!(body)) {
//     throw new BadRequestError();
//   } else {
//     return next();
//   }
// }

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;