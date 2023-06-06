var mysql=require('mysql2')
var pool=require("./index");

function auth(Login,password){
    var sql = "SELECT * FROM user where Login = ? and password =? ";
  var con = mysql.createConnection(pool);
  con.connect(function (err) {
    con.query(sql,[Login,password], function (err, rows, metadata) {
      console.log(rows);
      con.end();
    });
  });
}
auth("abhishek@gmail.com","1234")
