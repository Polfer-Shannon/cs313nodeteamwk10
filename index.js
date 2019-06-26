const express = require("express");
const app = express();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgres://euxrqnzwzktvyq:62840ee4832e0d92234b46bc8a4b431aef1e2c8f705f946754001a699c9a9d2b@ec2-54-83-1-101.compute-1.amazonaws.com:5432/d6jgrnae1b8ne6'
const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));


app.get("/getPerson", getPerson )

app.listen(app.get("port"), function(){
    console.log("Now listening for connections on port: ", app.get("port"));
});


function getPerson(req, res){
    console.log("getting person info");
    
    var id = req.query.id;
    console.log("Retrieving person with id: ", id);
    
    getPersonFromDb(id, function(error, result){
        console.log("Back from  the getPerson db with result,", result);
    })
    
    var result = {id: 238, first: "John", last: "Smith", birthdate: "1969-06-28"}
        res.json(result)
};

function getPersonFromDb(id, callback){
    consol.log("get person from db called with id:", id);
    
    var sql = "SELLECT id, first_name, last_name, birthdate FROM person WHERE id = $1::int";
    var params = [id];
    
    pool.query(sql, params, function(err, result){
        if (err){
            console.log("an error occured");
            console.log(err);
            callback(err, null);
        }
        console.log("found db result:" + JSON.stringify(result.rows));
        
        callback(null, result.row);
    })
}