var mongoose = require('mongoose');
var adminCreate = mongoose.model('adminEntabulature');
var teamMember = mongoose.model('teamMember');


exports.home = function(req, res){
    res.render('home', {session: req.session});
}
exports.adminLoginPage = function(req, res){
    res.render('adminLogin', {session: req.session});
}

exports.adminLogin = function(req, res){
    console.log('inside the login function');
    var adminEmail = req.body.email;
    var adminPassword = req.body.password;

    console.log('admin email and password are -> ' + adminEmail + ' ' + adminPassword);
    
    adminCreate.findOne({userEmail: adminEmail}, function(err, user){
        if(user == null){
            console.log('user does not exist');
            res.status(203).send('No such user exists');
            return;
        }
        console.log('user found', user.userEmail);

        user.comparePassword(adminPassword, function(err, isMatch){
            console.log('inside the function comparePassword', err, isMatch);
            if(isMatch && isMatch == true){
                console.log('login successfull')
                req.session.userName = adminCreate.userName;
                req.session.loggedIn = true; 
                var members;               
                getMembers(function(members, err){
                    if(err == false){
                        members = members;
                        console.log('insode the admin login -----> ' +members);               
                        res.status(201).render('adminDashboard', {session: req.session, members: members});
                    }
                });
                //while(typeof(members) == 'undefined' ){ /*do nothing */}
                
            } else {
                console.log('Password mismatch')
                var message = 'invalid email or password';
                res.status(203);
                return;
            }
        })
    })

    //res.render('dashboard')
}

exports.adminCreate = function(req, res){
    var adminNew = new adminCreate();
    adminNew.userName = req.body.userName;
    adminNew.userEmail = req.body.userEmail;
    adminNew.userPassword = req.body.userPassword;
    
    console.log('admin user email --------------->>>>>>> ' + adminNew.userEmail);

    adminNew.save(function(error, saveUser){
        if (err){
            console.log('user name or email already exists');
            var message = 'user name or email already exists';
            //res.render('adminUser', {errorMessage: message});
            return;
        } else {
            req.session.newUser = savedUser.userName;
            res.send('admin creation successfull');
            //res.flash('notify', 'You have registered successfully');
        }
    })
}

exports.logout = function(req, res){
    console.log('inside the logout function');
    var loggedoutUser = req.session.username;
    req.session.destroy();
    console.log('Logged out'+ loggedoutUser);
    res.render('adminLogin', {session: req.session});
}

exports.adminDashboard = function(req, res){
    console.log('inside the adminDashboard function');
    if (req.session.loggedIn == true){
        //var team = new teamMember();
        teamMember.find({}, function(err, members){
            if (err){
                req.flash('retrieveError', 'not able to retrieve team member info');
                res.render('adminDashboard',{session: req.session, errorMemberInfo: req.flash('retrieveError')} );
                return;
            }
            console.log('team members are --> ' + members.length + ' ' + members[0].name);
            res.render('adminDashboard', {session: req.session, members: members});
        });        
    }
    else{
        console.log('user not logged inso go go login');
        res.render('adminLogin', {session: req.session});
    }
    
}

var getMembers = function (cb){
    var ret;
    teamMember.find({}, function(err, members){
        if (err){
            req.flash('retrieveError', 'not able to retrieve team member info');
            ret = {errorMemberInfo: req.flash('retrieveError')};
            //res.render('adminDashboard',{session: req.session, errorMemberInfo: req.flash('retrieveError')} );
            //return ret;
            cb(ret, true);
        } else{
            console.log('team members are --> ' +  ' ' + members.length + ' ' + members[0].name);
            //res.render('adminDashboard', {session: req.session, members: members});
            ret = members;
            console.log('members are --> ' + ret[0].name    );
            //return ret; 
            cb(ret, false);
        }        
    }); 
   
    
}


