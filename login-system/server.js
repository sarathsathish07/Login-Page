const express = require('express')
const app = express()
const path = require ('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const{v4:uuidv4} = require('uuid')
const router = require('./router')

const port = 3001

// setting body-parser middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//setting view engine
app.set('view engine','ejs')

//load static asset
app.use('/static',express.static(path.join(__dirname,'public')))


// setting express-session middleware
app.use(session({
  secret: uuidv4(),
  resave:false,
  saveUninitialized:true
}))

app.use('/',router)


app.listen(port,()=>{
  console.log('Listening to the server http://localhost:3001');
})