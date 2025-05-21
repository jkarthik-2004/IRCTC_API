const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role === "admin") {
    const apiKey = req.header("admin-api-key");
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ message: "Invalid or missing admin API key" });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role || "user"],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Error registering user" });
      res.json({ message: "User registered successfully" });
    }
  );
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }

      if (users.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = users[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
