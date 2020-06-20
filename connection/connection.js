const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { DB_HOST } = require("../configuration/envChecker");
mongoose.connect(
  DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log("connected successfully");
    console.log(process.env.PORT);
    app.listen(process.env.PORT || 5000, () =>
      console.log(`listening at http://localhost:${process.env.PORT}`)
    );
  }
);
module.exports = { app };
