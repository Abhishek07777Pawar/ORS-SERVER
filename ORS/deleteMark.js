var express = require("express");
var router=express.Router();
var mysql=require("mysql2");
var pool=require("./index.js");

router.get("/delete/:studentId",function(req,res){
    var studentId=req.params.studentId;
    var sql="DELETE FROM mark WHERE studentId="+studentId;
    var con =mysql.createConnection(pool);
    con.connect(function(err){
    con.query(sql,function(err,rows,metadata){
        
        console.log(rows);
        con.end();
        var data={list:rows}
        res.json(data)
    });
});
});
module.exports=router;