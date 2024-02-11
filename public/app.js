const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// MySQL Connection
const db = mysql.createConnection({
  host: '107.180.1.16',
  user: 'spring2024Cteam13',
  password: 'spring2024Cteam13',
  database: 'spring2024Cteam13'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM USERS WHERE email = ? AND password = ?`;

  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send('Login Successful');
    } else {
      res.status(401).send('Invalid email or password');
    }
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
