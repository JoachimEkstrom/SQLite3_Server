const express = require('express')
const app = express()
const port = 4000
var cors = require('cors')
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const sqlite3 = require('sqlite3').verbose();

app.get('/all', (req, res) => {
    let db = new sqlite3.Database('./db/myDb.db');
    let sql = `SELECT * FROM test`;
    let rows = []

        // first row only
        db.all(sql, [], (err, row) => {
            if (err) {
                res.send(err.message);
            } else{
                // for(let i =0; i<row.length; i++){
                //     rows.push(row)
                //     console.log(row)
                // }
            }
            res.json(row)
        });

    // close the database connection
    db.close();



})

app.post('/addrows', function (req, res) {
    let db = new sqlite3.Database('./db/myDb.db');
    console.log(req.body[1])
    let rows = req.body.map(()=> "(?, ?, ?, ?, ?, ?, ?, ?)").join(', ')
    //console.log(rows)
    const sqlQuery = `INSERT INTO test(sname, bisactive, bisacknowledged, salarmtext, tactivestarttime, tacktime, tclearedtime, uirepeatcount) VALUES ` + rows
    //console.log(req.body[0])

    let dbElement = []
    // fix incomming data.
    for (let i=0; i < req.body.length; i++){
        dbElement.push(req.body[i].sName)
        dbElement.push(req.body[i].bIsActive)
        dbElement.push(req.body[i].bIsAcknowledged)
        dbElement.push(req.body[i].sAlarmText)
        dbElement.push(req.body[i].tActiveStartTime)
        dbElement.push(req.body[i].tAcknowlegedTime)
        dbElement.push(req.body[i].tClearedTime)
        dbElement.push(req.body[i].uiRepeatCount)
    }

    //db.serialize(function(){
        db.run(sqlQuery, dbElement, function(err){
            if (err) {
                console.log(err.message);
                res.status(400).end()
            } else {
                res.status(204).end()
            }
        });
    //});

    // db.run(`INSERT INTO test(sname, bisactive, bisacknowledged, salarmtext, tactivestarttime, tacktime, tclearedtime, uirepeatcount) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, 
    // [req.body.sName, req.body.bIsActive, req.body.bIsAcknowledged, req.body.sAlarmText, req.body.tActiveStartTime, 
    //     req.body.tAcknowlegedTime, req.body.tClearedTime, req.body.uiRepeatCount], 
    //     function(err) {
    //         if (err) {
    //             console.log(err.message);
    //             res.status(400).end()
    //         } else {
    //             // get the last insert id
    //             //console.log(this.lastID);
    //             //console.log(`Added post with id ${this.lastID}\n`)
    //             res.status(204).end()
    //         }

    //     });
    //statement.finalize();
          // close the database connection
    db.close();
    
  })

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})