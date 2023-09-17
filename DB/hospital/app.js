var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user : "root",
    password:"123123",
    database:"hospital"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connectes!");
    var sql = "INSERT INTO dog (dog_id,size,name,weight) values ('123','mid','국현',25)";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log("DATA insert");
    });
});