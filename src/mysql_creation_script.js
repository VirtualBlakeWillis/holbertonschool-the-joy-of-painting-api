const mysql = require('mysql2');
const fs = require('fs');
// Replace these with your MySQL credentials
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  multipleStatements: true,
  insecureAuth : true
});

// Read the SQL script file
const scriptFilePath = './sql/database_init_2.sql';
const sqlScript = fs.readFileSync(scriptFilePath, 'utf8');

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  // Execute the SQL script
  connection.query(sqlScript, (err, results, fields) => {
    if (err) {
      console.error('Error executing SQL script:', err);
      return;
    }

    console.log('SQL script executed successfully.');
  });

  // Close the database connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
      return;
    }
    console.log('MySQL connection closed.');
  });
});

