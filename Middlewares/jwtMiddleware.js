
  //import jwt 
  const jwt = require('jsonwebtoken')

 const jwtmiddleware = (req,res,next)=>{
     console.log('inside jwt middlewares');
     

      //Here we take the token from the headers in request section it is passed in the authorization key here the a is in small letter and it return a string and we use split to seperate bearer from the token and then we get array and the token will be on 1 index
     const token = req.headers['authorization'].split(' ')[1]
     console.log(token);

     try{
      const jwtresponse = jwt.verify(token,"secretkey")
      console.log(jwtresponse);
      req.payload = jwtresponse.userid
      next()
     }catch(err){
        res.status(401).json('Authorization failed....Please Login')

     }


     //put the next  after all the logic
   
 }

 module.exports = jwtmiddleware