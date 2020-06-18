const express = require("express");
const cors = require("cors");
const { app } = require("./connection/connection");
const userAPI = require("./APIs/userAPI");
const sourceAPI = require("./APIs/sourceAPI");

app.use(cors());
// body parsing
app.use(express.json());
app.use("/user", userAPI);
app.use("/source", sourceAPI);
