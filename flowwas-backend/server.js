const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Oracle DB connection details
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  connectString: 'your_connect_string'
};

// Route to fetch data from Oracle DB
app.get('/api/data', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM your_table');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
