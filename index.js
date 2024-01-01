
//1.import dotenv
//config - Loads .env file contents into process.env by default
require('dotenv').config()

//2. Import express
const express = require('express')

//3. Import cors
const cors = require('cors')

//import router
const router = require('./Routers/router')

//import connection.js file
require('./DB/connections')

//4.create server
//The express() function is a top-level function exported by the express module.
const pfserver = express()

//Use of cors in server
pfserver.use(cors())


//6.Returns middleware that only parses json - to javascript object
pfserver.use(express.json())


//use of router by server
pfserver.use(router)

//use of uploads folder by server to get image
//first arg - the  way in which other application should use this folder
//second arg - export that folder using - express.static
pfserver.use('/uploads',express.static('./uploads'))


//7.port customize - bydefault server runs on 3000 
const PORT = 4000 || process.env

//8.to run server
pfserver.listen(PORT,()=>{
    console.log(`Server Running Successfully at port number ${PORT}`);
})

pfserver.get('/',(req,res)=>{
    res.send(`<h1 style="color:red">Project fair server running successfuly</h1>`)
})


