var mongoose = require('mongoose');
var userTestimonial = mongoose.model('testimonialSchema');

exports.getTestimonials = function(req, res){
    console.log('inside the testimonials function');
    
    userTestimonial.find({}, function(err, testimonials){
        if(err){
            console.log('inside the testimonials find function' + err);
            res.render('testimonials', {session: req.session, errTestimonial:err});
        } else{
            console.log('found testimonials ->' + testimonials);
            res.render('testimonials',{session: req.session, testimonials : testimonials} );
        }
    })
    //res.render('testimonials', {session: req.session});
}

exports.newTestimonials = function(req, res){
    console.log('inside the newTestimonial function');
    var newTest = new userTestimonial();
    newTest.nameUser = req.body.userTestimonial;
    newTest.textUser = req.body.textTestimonial;
    console.log('extracted var are ' + newTest.nameUser + ' ' + newTest.textUser );
    newTest.save(function(err, savedText){
        if(err){
            console.log('error received while saving testimonial ->' + err);
            res.render('testimonials', {session : req.session, errorTestimonial: err})
        } else{
            console.log('new testimonial saved');
            res.render('testimonials', {session : req.session ,testimonials:  savedText})
        }
    })

}

exports.delTestimony = function(req, res){
    console.log('inside the function delTestimony');
    console.log(req.body.name);
    userTestimonial.findOneAndRemove({nameUser : req.body.name}, function(err, delUser){
        if(err != null){
            console.log('inside the err part in del testiomony');
            res.send('some error in deleting the testimony');
        } else{
            console.log('deleted the testimony');
            res.send('deleted the testimony');
        }
    })    
}

var getTestimonialInfo = function(cb){
    var ret;
    userTestimonial.find({}, function(err, info){
        if(err){
            req.flash('TestimonialRetError', 'not able to retrieve testimonial info');
            ret = {errorContactInfo: req.flash('TestimonialRetError')};
            cb(ret, true);
        }else {
            ret = info;
            console.log('inside the getTestimonialInfo -> ' + info);
            cb(ret, false);
        }
    })
}


exports.getTestimonialInfo = getTestimonialInfo;