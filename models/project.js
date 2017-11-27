var mongoose = require('mongoose');

// Project Schema
var ProjectSchema = mongoose.Schema({
    projectName: {
		type: String,
        index:true,
        required: true
	},
	desc: {
        type: String,
    },
    pic : { 
        data: Buffer, contentType: String 
    },
	sprint: {
		type: Number
    },
    dueDate:{
        type: Date
    },
    client:{
        client_name:{
            type: String
        },
        client_email:{
            type: String
        },
        client_phone:{
            type: String
        }
    },
	columns: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'column'}
    ]
});

var Project = module.exports = mongoose.model('Project', ProjectSchema);
//create project
module.exports.createProject = function(newProject, callback){
    newProject.save(callback);
};

// get project
module.exports.getProjectById = function(id, callback){
	var query = {_id: id};
	Project.findOne(query, callback);
};
// get project by nae
module.exports.getProjectByName = function(projectName, callback){
	var query = {projectName: projectName};
	Project.findOne(query, callback);
};
// get project by queryjson
module.exports.getProjectByJson = function(query, callback){
	Project.findOne(query, callback);
};

// delete project
module.exports.deleteProjectById = function(id, callback){
	Project.remove({ _id: id }, callback); 
};

// modify project
module.exports.updateProjectById = function(id, projectAtt ,callback){
	var query = { _id: id };
    Project.findOneAndUpdate(query, projectAtt, callback)
};

// putColumninproject
module.exports.putColumnInProject = function(project_id,column_id,callback){
    var query = {_id:project_id};
    //Column.findOneAndUpdate(query,)
    Project.update(query, { $push: { columns: column_id } }, callback)
};

// removeColumninproject
module.exports.pullColumnInProject = function(project_id,column_id,callback){
    var query = {_id:project_id};
    //Column.findOneAndUpdate(query,)
    Project.update(query, { $pull: { columns: column_id } }, callback)
};

