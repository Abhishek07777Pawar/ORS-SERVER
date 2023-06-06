var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
var cors = require("cors");

// var CorsOption = {
//     origin:'http://example.com',
//     optionSuccessStatus:200
// }
router.post("/save", function (req, res) {
  var rollNo = req.body.rollNo;   
  var Name = req.body.Name;
  var physics = req.body.physics;
  var chemistry= req.body.chemistry;
  var maths = req.body.maths;
   var studentId= req.body.studentId;
 

//   console.log(loginId);
  var sql =
    "insert into mark(rollNo,Name,physics,chemistry,maths,studentId) values(?, ?, ?, ?,?,?)";

  var params = [rollNo,Name,physics,chemistry,maths,studentId];
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