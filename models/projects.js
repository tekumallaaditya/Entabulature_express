var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: {type:String},
    description: {type: String}
});

mongoose.model('projectSchema', projectSchema);