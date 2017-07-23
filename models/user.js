
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
email:{
  type:String,
  required:true,
  unique:true,
  lowercase:true
},
username:{
  type:String,
  required:true,
  unique:true,
  lowercase:true
},
password:{
  type:String,
  required:true,

}
});

module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(User,callback){
    	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(User.password, salt, function(err, hash) {
	        User.password = hash;
	        User.save(callback);
	    });
	});

}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
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
