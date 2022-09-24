const mysql=require("mysql2");
const bodyParser=require('body-parser');
const express = require('express');
const { json } = require("body-parser");
const { JSON } = require("sequelize");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
 
const con=mysql.createConnection({
 host: 'localhost',
  user: 'root',
  password: 'pouriya1379A$',
  database: 'millad_mall' 
});
con.connect((err) => { 
    if (err) throw err;  
    console.log('Connected!');
  });

app.get('/', (req, res) => {
    res.send('<center><h1>Welcome to Edurekas REST API with Node.js Tutorial!!</h1></center> ');
});
app.get('/api/getStore', (req, res) => {
   const data= con.query('SELECT * FROM stores', (err,rows) => {
            if(err) throw err;
            console.log('Data received from Db:');
 res.send(rows)
})
})
app.get('/api/getStore/floor/:floor', (req, res) => {
   const data= con.query(`SELECT * FROM stores where floor = ${req.params.floor}`, (err,rows) => {
            if(err) throw err;
            console.log('Data received from Db:');
 res.send(rows)
})
}) 
app.get('/api/number-of-shops', (req, res) => {
   const data= con.query(`SELECT COUNT(store_name) as numberOfStore FROM stores`, (err,rows) => {
            if(err) throw err;
            console.log('Data received from Db:');
 res.send(rows)
})
})
app.post('/api/add-store', (req, res) => {
   const data= con.query(`INSERT INTO stores (category_id, store_name, phoneNumber, instagram_id, store_number, floor)
   VALUES (${parseInt (req.params.cid)}, ${req.params.storeName},${req.params.phoneNumber}, ${req.params.inId},${parseInt(req.params.storeNumber)}, ${parseInt(req.params.floor)});`, (err,rows) => {
            if(err) throw err;
            console.log('Data received from Db:');
 res.send(rows)
})
})



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));