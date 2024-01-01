//logic to resolve the request

//import modal
const users = require('../Model/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//register request
exports.register = async (req,res)=>{
    console.log('inside the controller');
    //logic
    //destructure data from request body because the data has been already in js object because we used json() to parse the json file to js object in index.js.
    console.log(req.body);
    const {username,email,password} = req.body
     
    try{const existuser = await users.findOne({email}) //both key email and value email is same so we use only one email in findone
   
   if(existuser){
    //if document is present
    res.status(406).json("Account already exist.... please Login")  
   }
   else{
        //we have to register the data
        //1.create a object for modal
          const newUser = new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
          })
        //add to mongodb - use save method in mongoose
        await newUser.save()

         //response
    res.status(200).json(newUser) 
   }
}//runtime errors are resolved using try catch block
   catch(err){
    res.status(401).json(`Registration failed due to ${err}`)
   }

}


//login request
exports.login = async(req,res)=>{
  const {email,password} = req.body

 try{ const existuser = await users.findOne({email,password})

  if(existuser){
    //jwt token
    //sign method is used to create token - it expects two arguments
    //1.payload  - it is the information that is secretly transmitted 
    //2.secret or private key - key based on which the token is generated
      const token = jwt.sign({userid:existuser._id},"secretkey")
    //sending as an object because we are sending more than one data
    res.status(200).json({existuser,token})
  }
  else{
res.status(404).json('Invalid email or password')
  }}catch(err){
    res.status(401).json(`login failed due to ${err}`)
  }
}


//edit profile
exports.editProfile = async(req,res) =>{
  const {id} = req.params
  const {username,email,password,gitprofile,linkedin,photo} = req.body
  const image = req.file?req.file.filename:photo

  try {
    const updateProfile = await users.findByIdAndUpdate({_id:id},{username,email,password,github:gitprofile,linkedin,profile:image},{new:true})
    await updateProfile.save()
    res.status(200).json(updateProfile)
  } catch (error) {
    res.status(401).json(error)
  }
}


//get profile
exports.getUserProfile = async(req,res)=>{
  const userId = req.payload
    try {
     const userProfile = await users.find({_id:userId})
     res.status(200).json(userProfile)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
}

