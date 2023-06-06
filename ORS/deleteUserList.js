var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
router.get("/delete/:empId", function (req, res) {
   var empId = req.params.empId;
  // var password = req.body.password;
  console.log(empId);
  var sql = "DELETE FROM ors where empId= " + empId;
  console.log(sql)
  var con = mysql.createConnection(pool);
  con.connect(function (err) {
    con.query(sql, function (err, rows, metadata) {
      console.log(rows);
      con.end();
      var data = {list : rows};
      res.json(data)
    });
  });
});

module.exports = router;