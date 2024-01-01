//import mongoose
const mongoose = require('mongoose')

//access connection string of mongodb
const connectionString = process.env.DATABASE

//connect server with the mongodb
  //use connect method of mongoose and connection string as arguments
mongoose.connect(connectionString).then(()=>{console.log('mongodb connected successfully');}).catch((err)=>{console.log(`mongodb connection failed due to ${err}`);})