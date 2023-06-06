
var mysql=require('mysql2')
var pool=require("./index");



function get(id){
    var sql="SELECT * FROM user WHERE id= " +id;
    var con=mysql.createConnection(pool);
    con.connect(function(err){
        if (err){
            throw err;
        }
        con.query(sql,(err,rows,metadata)=>{
            if(err){
                throw err;
            }
            console.log(rows)
            con.end()
        })
    })
  
}

get(1)