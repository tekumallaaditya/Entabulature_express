var mongoose = require('mongoose');
var teamMember = mongoose.model('teamMember');
var routeMethods = require('./route');

exports.addMember = function(req, res){
    var member = new teamMember();
    member.name = req.body.memberName;
    member.designation = req.body.memberDesignation;
    member.description = req.body.memberText;

    console.log('new member name is ---> ' + member.name);

    member.save(function(err, newMember){
        if (err){
            console.log('seems to be an error while creating new member -->' + err);            
            //res.render('adminUser', {errorMessage: message});
            res.flash('error while saving the new member' + err);
            return;
        } else {            
            req.flash('notify','Successfully added the new team member');
            res.render('adminDashboard', {session: req.session, message: req.flash('notify') } );
        }
    })

}

exports.team = function(req, res){
    teamMember.find({}, function(err, members){
        if(err){
            req.flash('retrieveError', 'not able to retrieve team member info');
            res.render('team', {err: req.flash('retrieveError')});
        } else{
            console.log('In team page--> ' + members);
            res.render('team', {members: members, session: req.session});
        }
    });
    
}