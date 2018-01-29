var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/mydb.db');

var express = require('express');
var index = express();

index.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-width, Content-Type, Accept");
  next();
});

index.get('/data', function(req, res){
    results = [];
    db.all("SELECT * from question order by remark,description", function(err, rows){
        rows.map((row)=>{
        results.push({"id":row.id,
                  "description":row.description,
                  "answer":row.answer,
                  "A":row.A,
                  "B":row.B,
                  "C":row.C,
                  "D":row.D,
                  "E":row.E,
                  "remark":row.remark,})
        });
        res.json(results);
    });
});

index.listen(3000); // 在3000端口监听

console.log("Submit GET to http://localhost:3000/data");
