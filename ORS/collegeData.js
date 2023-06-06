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
  var name = req.body.name;   
  var address = req.body.address;
  var city = req.body.city;
  var state= req.body.state;
  var phoneNo = req.body.phoneNo;
   
 

//   console.log(loginId);
  var sql =
    "insert into college(name,address,city,state,phoneNo) values(?, ?, ?, ?,?)";

  var params = [name,address,city,state,phoneNo];
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