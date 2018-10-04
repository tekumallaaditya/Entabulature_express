var express = require('express');
var chalk = require('chalk');
var db = require('./models/db.js');
var confidDB = require('./models/configDB');
var testimonialDB = require('./models/testimonialsDB');
var teamMemberDB = require('./models/teamMemberDB.js');
var contactDB = require('./models/contactDB.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var constructionUploads = require('./models/picUploads');

//imports concerning the GridFs
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var methodOverride = require('method-override');




var routesAPI = require('./routes/route.js');
var teamMemberAPI = require('./routes/teamMember.js');
var getContactInfo = require('./routes/contactAdress');
var getTestimonials = require('./routes/testimonials');
var routePicUploads = require('./routes/photoGallery');

//creating an app from the express module
var app = express();

//using the ejs templating engine
app.set('view engine', 'ejs');
app.use(flash());
//using the public folder for static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

//port number to listen on
port = process.env.PORT || 8081;

app.get('/', routesAPI.home);
app.get('/adminLoginPage', routesAPI.adminLoginPage);
app.get('/adminLogout', routesAPI.logout);
app.get('/adminDashboard', routesAPI.adminDashboard);
app.get('/team', teamMemberAPI.team);
app.get('/contactUs', getContactInfo.getContact );
app.get('/testimonials', getTestimonials.getTestimonials);

app.post('/AdminLogin', routesAPI.adminLogin);
app.post('/createAdmin', routesAPI.adminCreate);
app.post('/updateMember',teamMemberAPI.updateMember);
app.post('/postContactInfo', getContactInfo.postContact);
app.post('/newTestimonial', getTestimonials.newTestimonials);

//post requests for adding photos
app.post('/constructionPic', constructionUploads.uploadConstrutionPics.single('file')  , routePicUploads.constructionPic);

//post requests for adding and deleting team members
app.post('/addMember', teamMemberAPI.addMember);
app.post('/delMember', teamMemberAPI.delMember);
app.post('/delTestimony', getTestimonials.delTestimony );

app.listen(port, function(){
    console.log(chalk.green('server is up and running on port ' + port));
});