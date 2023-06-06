var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
var cors = require("cors");
router.put("/update/:empId", function (req, res) {
  var data = req.body;
  var empId = req.params.empId;
  console.log(data)
  console.log(empId);
  var sql =
    "update ors set AdminId=?, empName=?, address=?, loginId=?, password=?, salary=? where empId = ?";
  var con = mysql.createConnection(pool);
  con.connect(function (err) {
    con.query(
      sql,
      [
        data.adminId,
        data.empName,
        data.Address,
        data.loginId,
        data.password,
        data.salary,
        empId,
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
            r.message = `Data update for empId :${empId}`;
          } else {
            r.status = "fail";
            r.message = `Data not found  for empId :${empId}`;
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