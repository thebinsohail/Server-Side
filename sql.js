const express = require('express');
const app = express();
const sql = require('mssql');

const bodyParser=require('body-parser');

const pool = new sql.ConnectionPool({
    user: '{your-username}',
    password: '{your-password}',
    server: 'localhost',
    database: '{your-database-name}',

    "options": {
        "encrypt": true,
        "enableArithAbort": true
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
