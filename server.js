console.log('May node be with you')

const bodyParser = require('body-parser')
const express = require('express')
const app = express ()
const MongoClient = require ('mongodb').MongoClient
const connectionString = 'mongodb+srv://nanape:B5NS5yzg9swOuSqi@cluster1.ikdhkok.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {useUnifiedTopology: true }) 
     .then(client => {
    console.log('Connected to Database')
    const db = client.db('Mango')
    const quotesCollection = db.collection('quotes')


    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.get('/', function (req, res){
        quotesCollection.find().toArray()    
         .then(quotes => {
            // console.log(results)
            res.render('index.ejs', {quotes: quotes})
         })
         .catch ( error => console.error(error))
        // res.sendFile(__dirname + '/index.html')
      
    })
    app.post ('/quotes', (req,res)=>{
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    app.put('/quotes', (req, res)=> {
        quotesCollection.findOneAndUpdate(
            {
                name: 'Mommy'
            },
            {
                $set: {
                    name: req.body.name,
                    quote:req.body.quote
                }
            },
            {
                upsert: true
            }
        )
        .then(result =>{
            console.log(result)
        })
        .catch(error => console.error(error))
    })


    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json('Deleted Mommy\'s quote')
          })
          .catch(error => console.error(error))
      })



      const isProduction = process.env.NODE_ENV === 'production'
      const port = isProduction ? 7500 : 3000
      app.listen(port, function () {
        console.log(`listening on ${port}`)
      })
    })
    .catch(console.error)
  




