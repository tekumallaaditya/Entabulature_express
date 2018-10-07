var InteriorUploads = require('../models/interiorPics');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');


var conn = InteriorUploads.conn;
var gfs;
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('interiors');
  });

exports.interiorPic = function(req, res){
    //res.json({file: req.file});
    res.redirect('/interiorPics');
}

exports.getInteriorPics = function(req, res){
    gfs.files.find().toArray(function(err, files){
        if(!files || files.length === 0){
            res.render('interiors', {session: req.session, files:false});
        } else {
            files.map(file => {
                if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
                    file.isImage = true;
                } else{
                    file.isImage = false;
                }
            });
            
            res.render('interiors', {session: req.session, files:files});
        }
    });
}

exports.getSingleInteriorPic = function(req, res){
    console.log('inside this single interior pic function');
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

exports.delInteriorPic = function(req, res){
    console.log('inside the interior del pic function');
    gfs.remove({_id: req.params.id, root: 'interiors'}, function(err, gridStore){
        if(err){
            return res.status(404).json({
                err: err
            });
        }

        res.redirect('/interiorPics');
    });
}