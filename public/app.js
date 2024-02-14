const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

// Database connection configuration
const dbConfig = {
  host: "107.180.1.16",
  user: "spring2024Cteam13",
  password: "spring2024Cteam13",
  database: "spring2024Cteam13",
};

// Function to create a new database connection
function createConnection() {
  return mysql.createConnection(dbConfig);
}

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));

// Login route
app.post("/login", (req, res) => {
  const db = createConnection(); // Create a new database connection

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySQL Connected...");

    const { email, password } = req.body;
    const sql = `SELECT user_id FROM USERS WHERE email = ? AND password = ?`;

    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (result.length > 0) {
        const user_id = result[0].user_id;
        res.redirect(`/homepage.html?user_id=${user_id}`);
      } else {
        res.sendFile(path.join(__dirname, "login_error.html"));
      }

      db.end((err) => {
        if (err) {
          throw err;
        }
        console.log("MySQL Connection Closed...");
      });
    });
  });
});

// Signup route
app.post("/signup", (req, res) => {
  const db = createConnection(); // Create a new database connection

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySQL Connected...");

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
          return;
        }
        console.log("Data inserted successfully");
        res.send("Sign up successful");

        db.end((err) => {
          if (err) {
            throw err;
          }
          console.log("MySQL Connection Closed...");
        });
      }
    );
  });
});

app.get("/user/:userId", (req, res) => {
  const db = createConnection(); // Create a new database connection

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("MySQL Connected...");

    const userId = req.params.userId;
    db.query(
      "SELECT * FROM USERS WHERE user_id = ?",
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error fetching data:", error);
          res.status(500).send("Internal Server Error");
          return;
        }
        res.json(results);
      }
    );

    db.end((err) => {
      if (err) {
        console.error("Error closing MySQL connection:", err);
        return;
      }
      console.log("MySQL Connection Closed...");
    });
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});