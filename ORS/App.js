var express=require("express");
var cors=require("cors");
var app=express();
var bodyParser=require("body-parser");
var{check,validationResult}=require('express-validator');
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());
app.use("/au",require("./Auth2.js"));
app.use("/emp",require("./empData.js"));
app.use("/empData1",require("./userList.js"))
app.use("/registration",require("./searchById.js"));
app.use("/empData",require("./deleteUserList.js"))
app.use("/empSave",require("./updateData.js"))

app.use("/marksheet",require("./markData.js"))
app.use("/MarksheetById",require("./markSearchById.js"))
app.use("/MarksheetList",require("./markList.js"))
app.use("/Marksheetdel",require("./deleteMark.js"))
app.use("/MarkUpd",require("./markUpdate.js"))


app.use("/studentSave",require("./studenetData.js"))
app.use("/studentList",require("./studList.js"))  
app.use("/studentDel",require("./studDel.js"))
app.use("/studentById",require("./studSearchById.js"))
app.use("/studentUpdate",require("./studUpdate.js"))
app.use("/stdListSir",require("./studentSirch.js"))


app.use("/collegeSave",require("./collegeData.js"))
app.use("/collegeList",require("./collList.js"));
app.use("/collegeByName",require("./collegeSearchByName.js"))
app.use("/collegeUpd",require("./collegeUpdate.js"))
app.listen(8000,()=>{
    console.log("server is running on port 8000")
});