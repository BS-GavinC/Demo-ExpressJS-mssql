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

        request.input('id', sql.Int, 28);
        request.input('firstname', sql.VarChar, "Paul")
        request.input('lastname', sql.VarChar, "Briscard")
        request.input('birthdate', sql.Date, new Date())
        request.input('login', sql.VarChar, "pbriscard")
        request.input('section', sql.Int, 1010)
        request.input('result', sql.Int, 8)
        request.input('course', sql.VarChar, "EG2210")

        request.query('INSERT INTO student VALUES(@id, @firstname, @lastname, @birthdate, @login, @section, @result, @course)', (err, data) => {
            
            if(err) console.log(err);

            res.status(200).json(data.recordset)

            
        })
    })

})




app.listen(8080)