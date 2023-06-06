var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
router.get("/search", function (req, res) {

  var sql = "select * from student";
  var con = mysql.createConnection(pool);
  con.connect((err) => {
    con.query(sql, (err, rows) => {
      console.log(rows);
      con.end();
      var data = {list : rows};
      res.json(data)
      console.log(data)
    });
  });
});
module.exports = router;