//setup path to resolve request

//1.import express module
const express = require('express')

   //import user controller
   const usercontroller = require('../controllers/usercontroller')

   //import project controller
   const projectcontroller = require('../controllers/projectController')

   //import jwt middlewares
   const jwtmiddleware = require('../Middlewares/jwtMiddleware')

   //import multer middleware
   const multerConfig = require("../Middlewares/multerMiddleware")

//2.create an object for router class inside express module
const router = new express.Router()

//3.set path to resolve request
//syntax - router.httprequest('where to resolve',()=>{how to resolve})
    //a.register path
    router.post('/user/register',usercontroller.register)
    //b.login path
    router.post('/user/login',usercontroller.login)
    //c.add project
    router.post('/projects/add',jwtmiddleware,multerConfig.single('projectimage'),projectcontroller.addproject)

    //d.homeproject
    router.get('/project/home-project',projectcontroller.gethomeProjects)
    //d.allproject
    router.get('/project/all-project',jwtmiddleware,projectcontroller.getallProjects)
    //d.userproject
    router.get('/user/all-project',jwtmiddleware,projectcontroller.getuserProjects)

    //edit project
    router.put('/project/edit/:id',jwtmiddleware,multerConfig.single('projectImage'),projectcontroller.editUserProject)

    //delete project
    router.delete('/project/remove/:id',jwtmiddleware,projectcontroller.deleteProject)

    //edit profile
    router.put('/user/edit/:id',jwtmiddleware,multerConfig.single('photo'),usercontroller.editProfile)

    //d.get userprofile
    router.get('/user/profile',jwtmiddleware,usercontroller.getUserProfile)

//4.export router
module.exports = router