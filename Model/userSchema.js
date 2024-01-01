//import mongoose
const mongoose = require('mongoose')

//create schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 characters but got only {value}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        //if the input value is not  a proper email id we can use validator 
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})


//create model
const users = mongoose.model("users",userSchema) //users is collection name in the database in which the model is based.

//export 
module.exports = users