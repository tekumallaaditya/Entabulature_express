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
            var members;
            routeMethods.getMembers(function(members, err){
                if(err == false){
                    members = members;
                    //console.log('inside the addmember function -----> ' +members);
                    req.flash('notify','Successfully added the new team member'); 
                    res.status(201).render('team', {session: req.session, members: members, message: req.flash('notify')});
                } else {
                    req.flash('notify','Failed to add the new member'); 
                    res.render('team', {session: req.session, members: members, message: req.flash('notify')});                    
                }
            });       
            
            
        }
    });

}

exports.updateMember = function(req, res){
    var name = req.body.memberName;
    var designation = req.body.memberDesignation;
    var description = req.body.memberText;

    console.log('inside the update method -->> ' + name + designation + description);
    teamMember.findOneAndUpdate({name : name}, {$set: {name : name, designation: designation, description: description}}, function(err, mem){
        if (mem == null) {
            console.log('mem not found---------------------------------------------->>>>')
            req.flash('errorMember', 'not able to retrieve team member info');
            res.render('team', {session: req.session, members: members, message: req.flash('errorMember')}); 
        } else {
            var members;
            routeMethods.getMembers(function(members, error){
                if(error == false){
                    members = members;
                    console.log('inside the update function -----> ');
                    req.flash('notify','Successfully updated the new team member'); 
                    res.status(201).render('team', {session: req.session, members: members, message: req.flash('notify')});
                } else {
                    console.log('inside update with error');
                    req.flash('notify','Failed to update the new member'); 
                    res.render('team', {session: req.session, members: members, message: req.flash('notify')});                    
                }
            });
        }  
    })
    

}

exports.team = function(req, res){
    teamMember.find({}, function(err, members){
        if(err){
            req.flash('retrieveError', 'not able to retrieve team member info');
            res.render('team', {err: req.flash('retrieveError')});
        } else{
            console.log('In team page--> ');
            res.render('team', {members: members, session: req.session});
        }
    });
    
}

exports.delMember = function(req, res){
    console.log('inside the del function-------------------------');
    teamMember.findOneAndRemove({name : req.body.name}, function(error, mem){
        if (error != null) {
            req.flash('delError', 'error while deleting the member');
            //res.render('team', {members: members, session: req.session, err: req.flash('delError')});
            res.send('some error');
        } else {
            console.log('employee details deleted');
            req.flash('delsuccess', 'Member deleted');
            //res.render('team', {members: members, session: req.session, err: req.flash('delsuccess')});
            res.send('deleted successfully, please refresh the page');
        }
    })
}