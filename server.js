// ALL IN ONE ACTIVITY 3 TO 7 BY TAN

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "user123",
  database: "test_db"
});

db.connect(err => {
  if (err) console.error(" DB connection failed:", err.message);
  else console.log(" Connected to MySQL database");
});

// ===== USERS =====

// GET all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Missing fields" });
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, email });
  });
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated successfully" });
  });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
});

// ===== PRODUCTS =====

// GET all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET product by ID
app.get("/products/:id", (req, res) => {
  db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create product
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: "Missing fields" });
  db.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, price });
  });
});

// PUT update product
app.put("/products/:id", (req, res) => {
  const { name, price } = req.body;
  db.query("UPDATE products SET name = ?, price = ? WHERE id = ?", [name, price, req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated successfully" });
  });
});

// DELETE product
app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id = ?", [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted successfully" });
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));