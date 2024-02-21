const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000; // Change this to your desired port

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'your-database-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// API endpoint to track workouts
app.post('/track-workout', (req, res) => {
  const { type, reps, weight } = req.body;

  // Insert the workout data into the database
  const sql = 'INSERT INTO workouts (type, reps, weight) VALUES (?, ?, ?)';
  db.query(sql, [type, reps, weight], (err, result) => {
    if (err) {
      console.error('Error tracking workout:', err);
      res.status(500).json({ error: 'Error tracking workout' });
    } else {
      console.log('Workout tracked successfully');
      res.json({ success: true });
    }
  });
});

// API endpoint to get all workout entries
app.get('/get-workouts', (req, res) => {
  // Retrieve all workout entries from the database
  const sql = 'SELECT * FROM workouts';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting workouts:', err);
      res.status(500).json({ error: 'Error getting workouts' });
    } else {
      console.log('Workouts retrieved successfully');
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});