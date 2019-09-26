var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index:true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    return User.findOne(query, callback); 

}

module.exports.getUserByEmail = function(email, callback){
    var query = {email : email};
    return User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.validateUser = function(data, cb){
    var message = {errors : 0};
    var valid = true;

    if(data.password !== data.password2){
        message.errors++;
        message.passwordMatch = "Passwords Do Not Match";
    }

    if(data.password.length < 6){
        message.errors++;
        message.passwordLength = "Password must be at least 6 characters long";
    }

    User.getUserByUsername(data.username, function(err, user){
        
        if(user !== null){
            message.userName = "User Already Exists"; 
            message.errors++
        }
        
        User.getUserByEmail(data.email, function(err, user){ 
            
            if(user !== null){
                message.Email = "Email Already Exists";
                message.errors++;
            }

            cb(message);
        });
    });
}