const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { app } = require("./connection/connection");
const userAPI = require("./APIs/userAPI");
const headlinesAPI = require("./APIs/headlinesAPI");

app.use(helmet());
app.use(cors());
// body parsing

app.use(express.json());
app.use("/user", userAPI);
app.use("/headlines", headlinesAPI);
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

  return res.status(500).json({
    status: "error",
    statusCode: err.status,
    details: err.details,
    message: err.message,
  });
});
