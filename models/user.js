var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
        index:true,
		required: true,
		unique : true
	},
	password: {
        type: String,
        required: true
	},
	email: {
        type: String,
        required: true
	},
	name: {
		type: String
    },
    projects: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'project'}
    ],
    pic : { 
        data: Buffer, contentType: String 
    },
    phone : {
        type: String
    },
    role : {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);
//create user
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}
// delete user
module.exports.deleteUserById = function(id, callback){
	User.remove({ _id: id }, callback); 
};

// get user by username
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}
// get user by id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
// get user by email
module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

// get user by queryjson
module.exports.getUserByJson = function(query, callback){
	User.findOne(query, callback);
};

// modify user by id
module.exports.updateUserById = function(id, userAtt ,callback){
	var query = { _id: id };
    User.findOneAndUpdate(query, userAtt, callback)
};
// modify user by all 
module.exports.updateUserByAll = function(user, userAtt ,callback){
    User.findOneAndUpdate(user, userAtt, callback)
};
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

// putProjectInUser
module.exports.putProjectInUser = function(user_id,project_id,callback){
    var query = {_id:user_id};
    //Column.findOneAndUpdate(query,)
    User.update(query, { $push: { projects: project_id } }, callback)
};

// pullProjectInUser
module.exports.pullProjectInUser = function(user_id,project_id,callback){
    var query = {_id:user_id};
    //Column.findOneAndUpdate(query,)
    User.update(query, { $pull: { projects: project_id } }, callback)
};