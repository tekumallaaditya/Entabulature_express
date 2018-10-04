var mongoose = require('mongoose');


var testimonialSchema = new mongoose.Schema({
    nameUser: {type:String},
    textUser: {type:String}
})

mongoose.model('testimonialSchema', testimonialSchema);


