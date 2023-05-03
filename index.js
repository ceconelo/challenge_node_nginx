const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 3000

const connection = mysql.createConnection({
    host: 'db',
    user: 'challenge',
    password: 'challenge',
    database: 'challenge'
});

connection.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected!')

    const sql = "CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)"
    connection.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        console.log("Table created")
    })
});

app.get('/', (req, res) => {
    let name = req.query.name || 'Thiago Oliveira';
    connection.query(`INSERT INTO people (name)
                      VALUES ("${name}")`, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("1 record inserted");
    });

    connection.query("SELECT * FROM people", function (err, result, fields) {
        if (err) {
            throw err;
        }
        let tableHtml = "<table>";
        tableHtml += "<tr><th>ID</th><th>Nome</th></tr>";
        result.forEach(function (row) {
            tableHtml += "<tr><td>" + row.id + "</td><td>" + row.name + "</td></tr>";
        });
        tableHtml += "</table>";

        res.send(`
      <html>
        <head>
          <title>Full Cycle Rocks!</title>
        </head>
        <body>
          <h1>Full Cycle Rocks!</h1>
          ${tableHtml}
        </body>
      </html>
    `);
    });
});

app.get('/close-connection', (req, res) => {
    connection.end();
    res.send('Connection closed!');
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
