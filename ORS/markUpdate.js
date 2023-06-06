var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
var cors = require("cors");
router.put("/update/:studentId", function (req, res) {
  var data = req.body;
  var studentId = req.params.studentId;
  console.log(data)
  console.log(studentId);
  var sql =
    "update mark set Name=?, rollNo=?, physics=?, chemistry=?, maths=? where studentId = ?";
  var con = mysql.createConnection(pool);
  con.connect(function (err) {
    con.query(
      sql,
      [
        
        data.Name,
        data.rollNo,
        data.physics,
        data.chemistry,
        data.maths,
       data.studentId,
      ],
      function (err, rows, metadata) {
        console.log(rows)
        let r = {};
        if (err) {
          console.log(err);
          r.status = "fail";
        } else {
          if (rows.affectedRows > 0) {
            r.status = "success";
            r.message = `Data update for studentId :${studentId}`;
          } else {
            r.status = "fail";
            r.message = `Data not found  for studentId :${studentId}`;
          }
        }
        console.log(rows);
        var data = { list: rows };
        //  res.json(data);
        res.json(r);
      }
    );
  });
});

module.exports = router;