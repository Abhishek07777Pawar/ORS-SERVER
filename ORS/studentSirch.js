var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
router.post("/search", function (req, res) {
  var firstName=req.body.firstName;
var collegeId=req.body.collegeId;
console.log(collegeId)

  var sql = "select * from student WHERE  collegeId=? or firstName=?" ;
  var params=[collegeId,firstName]
  var con = mysql.createConnection(pool);
  con.connect((err) => {
    console.log(err)
    con.query(sql,params, (err, rows) => {
      console.log(err)
      console.log(rows);
      con.end();
      var data = {list : rows};
      res.json(data)
      console.log(data)
    });
  });
});
module.exports = router;