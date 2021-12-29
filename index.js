const express=require('express')
const app=express()
const bodyparser=require('body-parser')

const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/Clients', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
//Schema
const userSchema = new mongoose.Schema({
  name: String,
  subject: String,
  email: String,
  phone: Number,
  message: String
});

const Clients = mongoose.model('Clients',userSchema)

app.set('view engine','ejs')

app.use('/assets',express.static('assets'))

app.use(express.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(express.static('public') )

app.get('/',(req, res)=>{
  res.render('index')
})
app.get('*', (req, res)=>{
  res.send("Page not found")
})
//Post request to create a new data 
app.post('/add', (req, res)=> {
  Clients.create({
    name: req.body.name,
    subject:req.body.subject,
    email: req.body.email,
    phone: req.body.phone,
    message:req.body.message
  }, (err)=> {
    if(err){
      res.render('404')
    }else{
      res.render('success')
    }
  })
 })

app.listen(process.env.PORT || 4400, ()=>{
  console.log('Server is running')
})










//Assignment
/*const express= require('express')
const app=express()

app.set('view engine', 'ejs')

app.get('/',(req, res)=>{
  res.render('index')
})




*/
