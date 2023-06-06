var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
router.get("/get/:studentId", function (req, res) {
  var studentId= req.params.studentId;
//   var password = req.body.password;
  console.log(studentId);
  var sql = "SELECT * FROM mark where studentId= " + studentId;
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