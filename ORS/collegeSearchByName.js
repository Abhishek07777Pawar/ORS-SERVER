// var express=require("express");
// var router=express.Router();
// var mysql =require("mysql2");
// var pool =require("./index.js")

// router.get("/get/:name",function(req,res){
// var name=req.params.name
// console.log(name)
// var sql="SELECT * FROM college WHERE name="+name;
// var con=mysql.createConnection(pool)
// con.connect(function (err){
//     con.query(sql,function(err,rows,metadata){
//         console.log(rows);
//         con.end()
//         var data ={list:rows};
//         res.json(data)
//     })
// })


// })
// module.exports = router;



var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index.js");
router.get("/get/:name", function (req, res) {
  var name = req.params.name;
//   var password = req.body.password;
  console.log(name); 
  var sql = "SELECT * FROM college where name= ?"
  var con = mysql.createConnection(pool);
  con.connect(function (err) {
    con.query(sql,[name], function (err, rows, metadata) {
      console.log(rows);
      con.end();
      var data = {list : rows};
      res.json(data)
    });
  });
});

module.exports = router;