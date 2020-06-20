const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const { app } = require("./connection/connection");
const userAPI = require("./APIs/userAPI");
const sourceAPI = require("./APIs/sourceAPI");

app.use(cors());
// body parsing

app.use(express.json());
app.use("/user", userAPI);
app.use("/source", sourceAPI);
// error handler
app.use((err, req, res, next) => {
  if (err.message.startsWith("E11000")) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      details: "mongodb error: email is a duplicate value",
      message: "mongodb error",
    });
  }

  return res.status(err.status).json({
    status: "error",
    statusCode: err.status,
    details: err.details,
    message: err.message,
  });
});
