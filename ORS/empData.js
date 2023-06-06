var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index");
var cors = require("cors");
var r
// var CorsOption = {
//     origin:'http://example.com',
//     optionSuccessStatus:200
// }
router.post("/save", function (req, res) {
  var loginId = req.body.loginId;   
  var empName = req.body.empName;
  var password = req.body.password;
  var empId = req.body.empId;
  var Address = req.body.Address;
   var salary = req.body.salary;
  var adminId = req.body.adminId;

//   console.log(loginId);
  var sql =
    "insert into ors(empId,  adminId,empName,  loginId, password,Address,salary) values(?, ?, ?, ?,?,?,?)";

  var params = [empId,adminId,empName,loginId, password,Address,salary];
  var con = mysql.createConnection(pool);
  con.connect(function (err) {
    con.query(sql, params, function (err, rows, metadata) {
      console.log(rows);
      
      con.end();
      var data={result:rows};
      res.json(data);
     });
  });
});

module.exports = router;