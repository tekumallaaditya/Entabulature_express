var mongoose = require('mongoose');
var chalk = require('chalk');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var dbURL = 'mongodb://entabulature:HarshaAllTheBest1983@ds115523.mlab.com:15523/entabulature';
//var dbURL = 'mongodb://127.0.0.1:27017/Entabulature';
//var dbURL = 'mongodb://Entabulature:HarshaAllTheBest1983@ds115613.mlab.com:15613/entabulature';

mongoose.connect(dbURL);

mongoose.connection.on('connected', function(){
    console.log(chalk.green('DB connected'));
});
mongoose.connection.on('disconnected', function(){
    console.log(chalk.red('DB connected'));
});
mongoose.connection.on('error', function(e){
    console.log(chalk.red('DB connected' + e));
});

var adminSchema = new mongoose.Schema({
    userName: {type: String},
    userEmail: {type: String, unique: true},
    userPassword: {type: String}
});

adminSchema.pre('save', function(next){
    var user = this;
    console.log('inside the pre-save function');

    if(!user.isModified('userPassword')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        console.log('inside the genSalt funstion')
        console.log(salt)
        if(err) return next(err);
        console.log(salt)
        bcrypt.hash(user.userPassword, salt, function(err, hash){
            console.log('inside the hash function')
            console.log(hash)
            if(err) return next(err);

            user.userPassword = hash;
            next();
        });
    });
});

adminSchema.methods.comparePassword = function(candidatePassword, cb){
    console.log(candidatePassword, this.userPassword)
    bcrypt.compare(candidatePassword, this.userPassword, function(err, isMatch){
        if(err) return cb(err);

        cb(null, isMatch);
    });
}

mongoose.model('adminEntabulature', adminSchema);