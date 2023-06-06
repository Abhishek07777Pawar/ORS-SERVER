var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
var cors = require("cors");
router.put("/update/:name", function (req, res) {
  var data = req.body;
  var name = req.params.name;
  console.log(data)
  console.log(name);
  var sql =
    "update college set address, city=?, State=?, phoneNo=? where name = ?";
  var con = mysql.createConnection(pool);
  con.connect(function (err) {
    con.query(
      sql,
      [
        
        data.name,
        data.address,
        data.city,
        data.State,
        data.PhoneNo,
       
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
            r.message = `Data update for name:${name}`;
          } else {
            r.status = "fail";
            r.message = `Data not found  for collegeId :${name}`;
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