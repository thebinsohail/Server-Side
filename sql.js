const express = require('express');
const app = express();
const sql = require('mssql');

const bodyParser=require('body-parser');

const pool = new sql.ConnectionPool({
    user: 'anas',
    password: 'admin',
    server: 'localhost',
    database: 'OCMS',

    "options": {
        "encrypt": false,
        "enableArithAbort": false
    }

})

pool.connect();

app.get('/', function(request, response){
    pool.query('select * from accounts', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
           res.render('index',{results:results});
            console.log(results.recordset[0].Username);
        }
    });
});

app.listen(3000, function () {
    console.log('Express server is listening on port 3000');
});
