var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
var cors = require("cors");
router.put("/update/:collegeId", function (req, res) {
  var data = req.body;
  var collegeId = req.params.collegeId;
  console.log(data)
  console.log(collegeId);
  var sql =
    "update student set firstName=?, lastName=?, mobileNo=?, emailId=? where collegeId = ?";
  var con = mysql.createConnection(pool);
  con.connect(function (err) {
    con.query(
      sql,
      [
        
        data.firstName,
        data.lastName,
        data.mobileNo,
        data.emailId,
        data.collegeId,
       
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
            r.message = `Data update for collegeId:${collegeId}`;
          } else {
            r.status = "fail";
            r.message = `Data not found  for collegeId :${collegeId}`;
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