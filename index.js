const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

const mysqlConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node-curd",
});

mysqlConn.connect((err) => {
  if (!err) console.log("DB Connect Success!");
  else console.log("DB connect error", err);
});

app.listen(5001, () => {
  console.log("server is runninng!");
});

app.get("/employees", (req, res) => {
  mysqlConn.query("SELECT * FROM employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    else res.send(err);
  });
});

app.get("/employees/:id", (req, res) => {
  mysqlConn.query(
    "SELECT * FROM employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else res.send(err);
    }
  );
});

app.delete("/employees/:id", (req, res) => {
  mysqlConn.query(
    "DELETE employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send('Deleted SUccess ! ');
      else res.send(err);
    }
  );
});
