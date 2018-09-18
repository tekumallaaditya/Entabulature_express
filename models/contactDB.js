var mongoose = require('mongoose');
var chalk = require('chalk');

var dbURL = 'mongodb://localhost/Entabulature';

mongoose.connect(dbURL);

var contactSchema = new mongoose.Schema({
    company: {type: String},
    street : {type: String},
    doorNo : {type: String},
    additionalLines: {type:String},
    phone : {type:String}
});

mongoose.model('contactAddressInfo', contactSchema);