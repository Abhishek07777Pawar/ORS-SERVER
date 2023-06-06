
// 8669090430
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
var pool = require("./index");
var cors = require("cors");
var jwt = require("jsonwebtoken")
var secretkey ="secret@123"
function tokenRequired(req,res,next){

  const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1]; 
  console.log(req.headers.authorization)
  if(!token){
    return res.status(401).json({message:"Token is missing"});
  }else{
    const data = jwt.verify(token,secretkey);
    // req.user = data.loginId
    next()
  }
}
router.post("/save",tokenRequired, function (req, res) {
  var firstName = req.body.firstName;   
  var lastName = req.body.lastName;
  var collegeId = req.body.collegeId;
  var mobileNo = req.body.mobileNo;
  var emailId = req.body.emailId;
  

//   console.log(loginId);
  var sql =
    "insert into student(firstName, lastName, collegeId,  mobileNo, emailId) values(?, ?, ?, ?,?)";

  var params = [firstName,lastName,collegeId,mobileNo, emailId];
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