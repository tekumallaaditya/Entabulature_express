
var mongoose = require('mongoose');
var contactAdd = mongoose.model('contactAddressInfo');

exports.getContact = function(req, res){
    var contactInfo;
    getContactInfo(function(info, err){
        if(err == false){
            contactInfo = info;
            console.log('inside the getContact cb function ' + ' ' + typeof(contactInfo), contactInfo);
            res.render('contactUs', {session: req.session, contactInfo : contactInfo});
        }
    });
    //res.render('contactUs', {session: req.session, contact:''});    
}

exports.postContact = function(req, res){
    var contactHandle = new contactAdd();
    contactHandle.company = req.body.companyName;
    contactHandle.street = req.body.contactStreet;
    contactHandle.doorNo = req.body.contactDoorNumber;
    contactHandle.additionalLines = req.body.contactAdditional;
    contactHandle.contactPhone = req.body.contactPhone;

    console.log('insode the contact postContact function ' + contactHandle.street + ' ' + contactHandle.company);

    contactAdd.findOneAndUpdate({company: req.body.companyName}, {$set: {company : req.body.companyName, street: req.body.contactStreet, doorNo : req.body.contactDoorNumber, additionalLines: req.body.contactAdditional, phone : req.body.contactPhone}}, function(error, Nameinfo){
        if(Nameinfo == null){
            console.log('company name  not found---------------------------------------------->>>>');
            contactHandle.save(function(err, newContact){
                if(err){
                    console.log('seems to be an error while creating new contact address -->' + err);            
                    //res.render('adminUser', {errorMessage: message});
                    req.flash('companyNameError', 'not able to retrieve company Name');
                    res.render('contactUS', {session: req.session, contactInfo: newContact , message: req.flash('companyNameError')});
                } else{
                    var contactInfo;
                    getContactInfo(function(info, err){
                    if(err == false){
                        contactInfo = info;
                        console.log('inside the getContact cb function ---->' + contactInfo[0].companyName + ' ' + typeof(contactInfo));
                        res.render('contactUs', {session: req.session, contactInfo : contactInfo});
                    } else {
                        console.log('inside the contact update method and it failed ' + err );
                        req.flash('contactUpdateError', 'failed to update the company address');
                        res.render('contactUs', {session: req.session,contactInfo : contactInfo, message: req.flash('contactUpdateError') });
                    }
                    });
                }
            });            
        } else{
            var contactInfo;
            getContactInfo(function(info, err){
            if(err == false){
                contactInfo = info;
                console.log('inside the getContact cb function ' + contactInfo[0].company + ' ' + typeof(contactInfo));
                res.render('contactUs', {session: req.session, contactInfo : contactInfo});
            } else {
                console.log('inside the contact update method and it failed ' + err );
                req.flash('contactUpdateError', 'failed to update the company address');
                res.render('contactUs', {session: req.session,contactInfo : contactInfo, message: req.flash('contactUpdateError') });
            }
    });
        }
    })
    /*
    contactHandle.save(function(err, savedContact){
        if(err){
            console.log('Could not save contact details, err -> ' + err);            
            return;
        } else {
            res.render('contactUs', {session: req.session, contact: savedContact});
        }
        
    }) */
}

var getContactInfo = function(cb){
    var ret;
    contactAdd.find({}, function(err, info){
        if(err){
            req.flash('contactRetError', 'not able to retrieve Contact info');
            ret = {errorContactInfo: req.flash('contactRetError')};
            cb(ret, true);
        }else {
            ret = info;
            console.log('inside the getContactInfo -> ' + info)
            cb(ret, false);
        }
    })
}

exports.getContactInfo = getContactInfo;

