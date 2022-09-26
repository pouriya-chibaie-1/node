const mysql=require("mysql2");
const bodyParser=require('body-parser');
const express = require('express');

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
    res.status(200).send('<center><h1>Welcome to Edurekas REST API with Node.js Tutorial!!</h1></center> ');
});


app.get('/api/getStore', (req, res) => {
    con.query('SELECT * FROM stores', (err,rows) => {
            if(err) throw err;
 res.status(200).send(rows)
})})

app.get('/api/get-store/floor/:floor', (req, res) => {
    con.query(`SELECT * FROM stores where floor = ${req.params.floor}`, (err,rows) => {
            if(err) throw err;
 res.status(200).send(rows)
})}) 
app.get('/api/get-store/:id', (req, res) => {
    con.query(`SELECT * FROM stores where id = ${req.params.id}`, (err,rows) => {
            if(err) throw err;
 res.status(200).send(rows)
})}) 
app.get('/api/search-store/:name', (req, res) => {
    con.query(`select * from stores where store_name like '%${req.params.name}%'`, (err,rows) => {
            if(err) throw err;
 res.status(200).send(rows)
})}) 
app.get('/api/delete-store/:id', (req, res) => {
    con.query(`delete from stores where id = ${req.params.id}`, (err,rows) => {
            if(err) throw err; 
 res.status(200).send(rows)
})}) 
app.post('/api/update-store/:id', (req, res) => {
    con.query(`UPDATE stores
    SET category_id = ?,store_name=? , phoneNumber=?,instagram_id=? ,store_number=?,floor=?
    WHERE id = ?; `,[
      parseInt( req.query.cid),
      req.query.storeName,     
      req.query.phoneNumber,
      req.query.inId,
       parseInt( req.query.storeNumber),
      parseInt(  req.query.floor),
   req.params.id]
    , (err,rows) => {
            if(err) throw err;
 res.status(200).send(rows)
})}) 


app.get('/api/number-of-shops', (req, res) => {
    con.query(`SELECT COUNT(store_name) as numberOfStore FROM stores`, (err,rows) => {
            if(err) throw err;
 res.status(200).send(rows)
})})



app.post('/api/add-store', (req, res) => {

const sql = `INSERT INTO stores (category_id, store_name, phoneNumber, instagram_id, store_number, floor) VALUES ?`
const values = [[
 parseInt( req.query.cid),
  req.query.storeName,     
  req.query.phoneNumber,
  req.query.inId,
 parseInt( req.query.storeNumber),
parseInt(  req.query.floor)]]

con.query(sql,[values],function(err,result){
if(err) throw err;
res.status(201).send({isSuccess:true})
})})


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));