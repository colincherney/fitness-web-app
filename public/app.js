const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

// MySQL Connection
const db = mysql.createConnection({
  host: "107.180.1.16",
  user: "spring2024Cteam13",
  password: "spring2024Cteam13",
  database: "spring2024Cteam13",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM USERS WHERE email = ? AND password = ?`;

  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.sendFile(path.join(__dirname, "homepage.html"));
    } else {
      res.sendFile(path.join(__dirname, "login_error.html"));
    }
  });
});

// Signup route
app.post("/signup", (req, res) => {
  const { first_name, last_name, age, email, phone, password } = req.body;

  // Insert the form data into MySQL database
  const sql =
    "INSERT INTO USERS (first_name, last_name, age, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [first_name, last_name, age, email, phone, password],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error occurred while signing up");
      } else {
        console.log("Data inserted successfully");
        res.send("Sign up successful");
      }
    }
  );
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
