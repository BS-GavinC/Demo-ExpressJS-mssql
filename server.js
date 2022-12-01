const express = require('express')
const sql = require('mssql')

const app = express()

const sqlConfig = {
    user : "sa",
    password : "Test123=",
    database : "DBSlide",
    server : "localhost\\SQLEXPRESS",
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

app.get('/', (req, res) => {

    sql.connect(sqlConfig, (err) => {
        if(err) console.log(err);
            
        const request = new sql.Request()

        request.query('SELECT * FROM student', (err, data) => {
            
            if(err) console.log(err);

            res.status(200).json(data.recordset)
        })
    })

})




app.listen(8080)