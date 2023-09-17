const express = require('express');
const {connectToDb, getDb} = require('./db');
const { ObjectId} = require('mongodb')
const app = express();

let db;
connectToDb((err) => {
    if(!err){
        app.listen(3001, () => {
            console.log("port 3001 작동중");
        })
        db = getDb();
    }
})

app.get('/books',(req,res) =>{
    let books = []

    db.collection('book')
    .find()
    .sort({author : 1})
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books)
    })
    .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
    })
})

// app.get('/books',(req,res) => {
//     res.json({msg: "welcome to the api"});
// })

// const express = require('express')

// const app = express()
// app.listen(3000,() => {
//     console.log("port 3000 작동중")
// });

// app.get("/books",(req,res) =>{
//     res.json({msg:"welcome to the api"});
// })
// 1개 문서를 가져올때
app.get('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
  
      db.collection('book')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
          res.status(200).json(doc)
        })
        .catch(err => {
          res.status(500).json({error: 'Could not fetch the document'})
        })
        
    } else {
      res.status(500).json({error: 'Could not fetch the document'})
    }
  
  })