var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
router.get("/get/:collegeId", function (req, res) {
  var collegeId= req.params.collegeId;
//   var password = req.body.password;
  console.log(collegeId);
  var sql = "SELECT * FROM student where collegeId= " + collegeId;
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