const express = require("express");
const db = require("./database");
const app = express();

require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (_req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;