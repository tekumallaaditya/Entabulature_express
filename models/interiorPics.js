var mongoose = require('mongoose');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var methodOverride = require('method-override');

var mongoConfig = require('./configDB');
dbURL = mongoConfig.dbURL;
//dbURL = 'mongodb://entabulature:HarshaAllTheBest1983@ds115523.mlab.com:15523/entabulature';
console.log('dbURL is -<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>' + dbURL);

var conn = mongoose.createConnection(dbURL);
var gfs;
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);   
    gfs.collection('interiors');    
  });

  var storage = new GridFsStorage({
    url: dbURL,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'interiors'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  var uploadInteriorPics = multer({ storage });

exports.uploadInteriorPics = uploadInteriorPics;
exports.conn = conn;
