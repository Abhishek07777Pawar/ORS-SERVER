var express = require("express");
var router = express.Router();
var mysql = require('mysql2');
var pool = require("./index");
const {check, validationResult } = require("express-validator");
var jwt=require("jsonwebtoken")
var secretkey="secret@123"

function tokenRequired(req,res,next){
    console.log(req.header.authorization)
    const token=
    req.headers.authorization && req.headers.authorization.split('Bearer')[1];
    console.log(token)
    if(!token){
        return res.status(401).json({message:"Token is missing"});
    }
    try{
        const data=jwt.verify(token,secretkey)
        console.log(data)
        req.user=loginId;
        next();
        
    }catch (error){
        return res.status(401).json({message:"Token is invalid"});
    }
    }




router.post("/loginPage",[
    check('loginId',"loginId must not be empty").isEmail(),
    check('password',"password must not be empty").isLength({min:3,max:8})
    
], function (req, res) {
    var loginId = req.body.loginId;
    var password = req.body.password;
    // var token=jwt.sign()
    // console.log(login)
    const token= jwt.sign({loginId},secretkey,{expiresIn:"30m"})
    var sql = "select * from ors where loginId=? and password=?";
    var params = [loginId, password];
    var con = mysql.createConnection(pool);
    con.connect(function (err) {
        if (err) {
            console.log("Error is coming")
            res;
            console.log(err.code);
            console.log(err.fatal);
            console.log(err)
            return;
        }
        con.query(sql, params, function (err, rows, metadata) {
            // console.log(rows)
            // console.log(token)
            // res.json({rows,token})
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return res.json(errors);
            }else{
            let r = {};
            if (err) {
              console.log(err);
              r.status = "fail";
            } else {
              if (rows) {
                r.status = "success";
                r.message = `Data update for loginId :${loginId}`;
              } else {
                r.status = "fail";
                r.message = `Data not found  for loginId :${loginId}`;
              }
            }
            console.log(r);
            con.end();
            var data={result:rows,status:r}
            console.log(data)
            res.json({rows,token,r})
        } 
        });
    });

});
module.exports = router;