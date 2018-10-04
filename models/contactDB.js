var mongoose = require('mongoose');
var chalk = require('chalk');

//var dbURL = 'mongodb://tekumallaaditya:Parasuram88@ds115613.mlab.com:15613/entabulature';
//var dbURL = 'mongodb://localhost/entabulature';
var dbURL = 'mongodb://entabulature:HarshaAllTheBest1983@ds115523.mlab.com:15523/entabulature';


mongoose.connect(dbURL);

var contactSchema = new mongoose.Schema({
    company: {type: String},
    street : {type: String},
    doorNo : {type: String},
    additionalLines: {type:String},
    phone : {type:String}
});

mongoose.model('contactAddressInfo', contactSchema);