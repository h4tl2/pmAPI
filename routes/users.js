var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// get /
router.get('/',function(req,res){
    res.send('please use /register and /login with POST')
});


// test route
router.post('/test',function(req,res){

	var username = req.body.username;
	User.getUserByUsername(username,function(err,user){
		if(err) console.log(err);
		if(!user) {
			console.log("no user")
		}else{
			res.json(user);
		}
		
	});

	
});

// register 
router.post('/register',function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();
	
	if(errors){
		res.send({
            code : 0,
            errors:errors
		});
	}else{
		User.getUserByUsername(username,function(err,user){
			if(err) console.log(err);
			if(!user) {
				var newUser = new User({
					name: name,
					email:email,
					username: username,
					password: password
				});
		
		
		
				User.createUser(newUser, function(err, user){
					if(err) throw err;
					console.log(user);
				});
				res.send({code : 1,message:"register success"});
				
			}else{
				res.send({code:0,message:"user already existed!"})
			}
			
		});
		
		
	}
});

// set passport and validate passport
passport.use(new LocalStrategy(
	function(username, password, done) {
	 User.getUserByUsername(username, function(err, user){
		 if(err) throw err;
		 if(!user){
			 return done(null, false, {message: 'Unknown User'});
		 }
  
		 User.comparePassword(password, user.password, function(err, isMatch){
			 if(err) throw err;
			 if(isMatch){
				 return done(null, user);
			 } else {
				 return done(null, false, {message: 'Invalid password'});
			 }
		 });
	 });
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
	  done(err, user);
	});
});


// login 
router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	  if (err) { console.log(err); res.send({code:0,message:"Unable to login"})}
	  if (!user) { res.send({code:0,message:"username or password invalid"}) }
	  req.logIn(user, function(err) {
		if (err) { console.log(err); res.send({code:0,message:"Unable to login"})}
		
		var usertemp = {
			_id:user._id,
			username:user.username,
			name:user.name,
			email:user.email,
			projects:user.projects,
			pic:user.pic,
			phone:user.phone,
			role:user.role
		}
		res.json(usertemp);
	  });
	})(req, res, next);
  });
  


// logout
router.get('/logout', function(req, res){
	req.logout();
	res.send({code : 1});
});

// get by id
router.get('/:_id',function(req,res){
    User.getUserById(req.params._id,function(err,user){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			var usertemp = {
				_id:user._id,
				username:user.username,
				name:user.name,
				email:user.email,
				projects:user.projects,
				pic:user.pic,
				phone:user.phone,
				role:user.role
			}
			res.json(usertemp);


		}
	})
});

// get by username
router.get('/username/:username',function(req,res){
    User.getUserByUsername(req.params.username,function(err,user){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			var usertemp = {
				_id:user._id,
				username:user.username,
				name:user.name,
				email:user.email,
				projects:user.projects,
				pic:user.pic,
				phone:user.phone,
				role:user.role
			}
			res.json(usertemp);
		}
	})
});
// get by email
router.get('/email/:email',function(req,res){
    User.getUserByEmail(req.params.email,function(err,user){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			var usertemp = {
				_id:user._id,
				username:user.username,
				name:user.name,
				email:user.email,
				projects:user.projects,
				pic:user.pic,
				phone:user.phone,
				role:user.role
			}
			res.json(usertemp);
		}
	});
});

// post to get all json
router.post('/getall',function(req,res){
	User.getUserByJson(req.body,function(err,user){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			var usertemp = {
				_id:user._id,
				username:user.username,
				name:user.name,
				email:user.email,
				projects:user.projects,
				pic:user.pic,
				phone:user.phone,
				role:user.role
			}
			res.json(usertemp);
		}

	});
});

// put to modify user
router.post('/updateUser',function(req,res){
	userAtt = req.body;
	User.updateUserById(req.body._id,userAtt,function(err,user){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			var usertemp = {
				_id:user._id,
				username:user.username,
				name:user.name,
				email:user.email,
				projects:user.projects,
				pic:user.pic,
				phone:user.phone,
				role:user.role
			}
			res.json(usertemp);
		}
	})
});

//delete user
router.delete('/:_id',function(req,res){
	User.deleteUserById(req.params._id,function(err){
		if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"delete success"})
		}
	})
})

// push projects 
router.post('/pushProject',function(req,res){
    data = req.body;
    user_id = data.user_id;
    project_id = data.project_id;
    User.putProjectInUser(user_id,project_id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"push success"})
		}
    })
})
// pull projects
router.post('/pullProject',function(req,res){
    data = req.body;
    user_id = data.user_id;
    project_id = data.project_id;
    User.pullProjectInUser(user_id,project_id,function(err){
        if(err) {console.log(err); res.send({code:0,message:err})}
		else{
			res.send({code:1,message:"push success"})
		}
    })
})

module.exports = router;

