var mongoose = require('mongoose');
var projectSchema = mongoose.model('projectSchema');

exports.getProjects = function(req, res){
    projectSchema.find({}, function(error, projects){
        if(error){
            res.render('projects', {session: req.session, error: error});
        } else{
            res.render('projects', {session: req.session, projects: projects})
        }
    });
    
}

exports.newProject = function(req, res){
    var newProject = new projectSchema();
    newProject.title = req.body.projectTitle;
    newProject.description = req.body.projectDescription;

    newProject.save(function(err, savedProject){
        if(err){
           return res.status(404).send('could not save the new project')
        }

        //project has been created successfully 
        projectSchema.find({}, function(error, projects){
            if(error){
                res.render('projects', {session: req.session, error: error});
            } else{
                res.render('projects', {session: req.session, projects: projects})
            }
        });
    })

}

exports.delProject = function(req, res){
    console.log('inside the delete project function');
    projectSchema.remove({title: req.params.title}, function(err, deletedProject){
        if(err){
            return res.status(404).json({
                err: err
            });
        }

        res.redirect('/projects');
        
    })
}