const express = require("express");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());
const db = require("./models/db");
app.use("/api/auth", authRoutes);
app.use(express.json());
app.listen(5000, () => console.log("Server running on port 5000"));
