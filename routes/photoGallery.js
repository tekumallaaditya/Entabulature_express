var constructionUploads = require('../models/picUploads');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');


var conn = constructionUploads.conn;
var gfs;
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('constructions')
  });

exports.constructionPic = function(req, res){
    res.json({file: req.file});
}

exports.getConstructionPics = function(req, res){
    gfs.files.find().toArray(function(err, files){
        if(!files || files.length === 0){
            res.render('construction', {session: req.session, files:false});
        } else {
            files.map(file => {
                if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
                    file.isImage = true;
                } else{
                    file.isImage = false;
                }
            });
            console.log('pics are --> ' + files[0].filename, files[1].isImage)
            res.render('construction', {session: req.session, files:files});
        }
    });
}

exports.getSingleConstructionPic = function(req, res){
    console.log('inside this single pic function');
    gfs.files.findOne({filename: req.params.filename}, function(err, file){
        if(!file || file.length === 0){
            return res.status(404).json({
                err: 'no such file exists'
            });
        }

        if(file.contentType === 'image/jpeg' || file.contentType === 'img/png'){
            var readStream = gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            res.status(404).json({
                err: 'it is not an image'
            });
        }
    })    
}

exports.delConstructionPic = function(req, res){
    console.log('inside the del pic function')
    gfs.remove({_id: req.params.id, root: 'constructions'}, function(err, gridStore){
        if(err){
            return res.status(404).json({
                err: err
            });
        }

        res.redirect('/constructionPics');
    });
}