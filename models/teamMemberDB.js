var mongoose = require('mongoose');
var chalk = require('chalk');

var dbURL = 'mongodb://entabulature:HarshaAllTheBest1983@ds115523.mlab.com:15523/entabulature';


//var dbURL = 'mongodb://localhost/entabulature';
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

var teamMemberSchema = new mongoose.Schema({
    name: {type: String},
    designation: {type: String},
    description: {type: String}
});

mongoose.model('teamMember', teamMemberSchema);