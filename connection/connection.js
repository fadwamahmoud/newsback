const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { DB_HOST, PORT } = require("../configuration/envChecker");
mongoose.connect(
  DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log("connected successfully");
    app.listen(PORT, () =>
      console.log(`listening at http://localhost:${PORT}`)
    );
  }
);
module.exports = { app };
