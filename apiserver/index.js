const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: '3307',
  password: "11444592",
  database: "shopdb"
});


connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the MySQL database!");
});

// Get products from the MySQL database
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Error fetching products from the database");
    } else {
      res.send(results);
    }
  });
});

// Cart logic stays the same
let cart = [];

app.post("/api/cart", (req, res) => {
  const { product_id, quantity, user_id } = req.body; // Assuming you send product_id, quantity, and user_id

  const query = "INSERT INTO cart (product_id, quantity, user_id) VALUES (?, ?, ?)";
  connection.query(query, [product_id, quantity, user_id], (err, result) => {
    if (err) {
      console.error("Error inserting into cart:", err);
      return res.status(500).send("Error inserting into cart");
    }
    res.status(201).send({ id: result.insertId }); // Send back the ID of the new cart item
  });
});

// Get all cart items from the database
app.get("/api/cart", (req, res) => {
  const query = "SELECT * FROM cart";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).send("Error fetching cart items");
    }
    res.send(results);
  });
});


// New endpoint to store contact form data
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  // Insert the data into the database
  const query = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  connection.query(query, [name, email, message], (err, results) => {
    if (err) {
      console.error("Error inserting contact data:", err);
      return res.status(500).send("Error saving contact data to the database");
    }
    res.status(201).send("Contact data saved successfully");
  });
});

// Start the server
app.listen(8085, () => console.log("API Server listening on port 8085!"));
