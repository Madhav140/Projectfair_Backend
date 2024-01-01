
   //import project model
    const projects = require('../Model/projectSchema')

exports.addproject = async(req,res)=>{
    console.log('inside the project controller');
    const userId = req.payload
  

    const projectImage = req.file.filename
    console.log(projectImage);

    const{title,language,github,website,overview} = req.body
    console.log(title,language,github,website,overview);

    try {
        const existinguser = await projects.findOne({github})

        if(existinguser){
            res.status(406).json('Project already uploaded')
        }
        else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            })
            await newProject.save()
            res.status(200).json(newProject)
           
        }
        
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}


// get Homeprojects

exports.gethomeProjects = async(req,res)=>{

   try {
    const homeProjects = await projects.find().limit(3)
    res.status(200).json(homeProjects)
   } catch (err) {
    res.status(401).json(`Request failed due to ${err}`)
   }
}


//get all project
exports.getallProjects = async(req,res)=>{
    //to get the value from query parameter = req.query.key
    const search = req.query.search
    console.log(search);
    //we are giving the search filter according to technologies  for that we are giving the condition to a variable and passs it on the find option.
    const query = {
        //the key in the collection which we want to sort
          language:{
            //and pass the value in regular expression and for it to be not case sensitive we set the options as i
            $regex:search,$options:'i'
          }
    }

    try {
     const allProjects = await projects.find(query)
     res.status(200).json(allProjects)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
 }

 //get userprojects
 exports.getuserProjects = async(req,res)=>{
   const userId = req.payload
    try {
     const userProjects = await projects.find({userId})
     res.status(200).json(userProjects)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
 }


 //edit project
 exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title,language,github,website,overview,projectimage} = req.body
    const uploadedProjectImage = req.file?req.file.filename:projectimage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadedProjectImage,userId},{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)
    } catch (error) {
        res.status(401).json(error)
    }
 }


 //delete project
 exports.deleteProject = async(req,res)=>{
    const {id} = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    } catch (error) {
        res.status(401).json(error)
    }
 }
