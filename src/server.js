const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./models/db");
app.use(express.json());
app.listen(5000, () => console.log("Server running on port 5000"));
