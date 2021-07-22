const express = require('express')
const app = express()
const port = 4000
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

app.post('/addrow', function (req, res) {
    let db = new sqlite3.Database('./db/myDb.db');

    // console.log(req.body.sName)
    // console.log(req.body.bIsActive)
    // console.log(req.body.bIsAcknowledged)
    // console.log(req.body.sAlarmText)
    // console.log(req.body.tActiveStartTime)
    // console.log(req.body.tAcknowlegedTime)
    // console.log(req.body.tClearedTime)
    // console.log(req.body.uiRepeatCount)

    db.run(`INSERT INTO test(sname, bisactive, bisacknowledged, salarmtext, tactivestarttime, tacktime, tclearedtime, uirepeatcount) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, 
    [req.body.sName, req.body.bIsActive, req.body.bIsAcknowledged, req.body.sAlarmText, req.body.tActiveStartTime, 
        req.body.tAcknowlegedTime, req.body.tClearedTime, req.body.uiRepeatCount], 
        function(err) {
            if (err) {
            return console.log(err.message);
            }
            // get the last insert id
            //console.log(this.lastID);
            console.log(`Added post with id ${this.lastID}\n`)
            res.json(`Added post with id ${this.lastID}`)
        });
          // close the database connection
    db.close();
    
  })

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})