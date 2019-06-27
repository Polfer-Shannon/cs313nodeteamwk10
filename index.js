const express = require("express");
const app = express();
const {Pool} = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgres://mmiklejfloghmv:2265ae5272f63bb5439489026056a0c99bfc13eed61e9c1efdf7950bf87f1e1b@ec2-107-21-216-112.compute-1.amazonaws.com:5432/dddrg7ssm98msq?ssl=true'

const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));


app.get("/getPerson/:id", function (req, res) {
    getPersonFromDb(req.params.id, function (err, results) {
    res.status(200).json(results)
    })
})


    app.listen(app.get("port"), function(){
    console.log("Now listening for connections on port: ", app.get("port"));
});




function getPersonFromDb(id, callback) {

    var sql = "SELECT id, first_name, last_name, birthdate FROM person WHERE id = $1::int";
    var params = [id];

    pool.query(sql, params, function (err, result) {
        if (err) {
            console.log("an error occured");
            console.log(err);
            callback(err, null);
        }

        callback(null, result.rows);
    })
}