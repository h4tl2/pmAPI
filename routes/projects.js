var express = require('express');
var router = express.Router();

var Project = require('../models/project');


// get by id
router.get('/id/:_id',function(req,res){
    Project.getProjectById(req.params._id,function(err,project){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.json(project);
		}
	})
});

// get by name
router.get('/project/:projectName',function(req,res){
    Project.getProjectByName(req.params.projectName,function(err,project){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.json(project);
		}
	})
});

//create project
router.post('/createProject',function(req,res){
    var projectTemp = new Project({
        projectName : req.body.projectName,
        desc : req.body.desc,
        pic : req.body.pic,
        dueDate: req.body.dueDate,
        client : req.body.client
    });
    Project.createProject(projectTemp,function(err,project){
        if(err) {console.log(err); res.send({code:0,message:err})}
        else {
            res.json(project);
        }
    })
})


// update project
router.post('/updateProject',function(req,res){
    projectAtt = req.body;
	Project.updateProjectById(req.body._id,projectAtt,function(err,project){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.json(project);
		}
	})
});

//delete project
router.delete('/:_id',function(req,res){
    Project.deleteProjectById(req.params._id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"delete success"})
		}
    })
})

// push columns
router.post('/pushColumn',function(req,res){
    data = req.body;
    project_id = data.project_id;
    column_id = data.column_id;
    Project.putColumnInProject(project_id,column_id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"push success"})
		}
    })
})
// pull columns
router.post('/pullColumn',function(req,res){
    data = req.body;
    project_id = data.project_id;
    column_id = data.column_id;
    Project.pullColumnInProject(project_id,column_id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"pull success"})
		}
    })
})

module.exports = router;