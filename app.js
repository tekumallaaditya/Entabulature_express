var express = require('express');
var chalk = require('chalk');
var db = require('./models/db.js');
var teamMemberDB = require('./models/teamMemberDB.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash-messages');



var routesAPI = require('./routes/route.js');
var teamMemberAPI = require('./routes/teamMember.js');

//creating an app from the express module
var app = express();

//using the ejs templating engine
app.set('view engine', 'ejs');
app.use(flash());
//using the public folder for static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

//port number to listen on
port = process.env.PORT || 8081;

app.get('/', routesAPI.home);
app.get('/adminLoginPage', routesAPI.adminLoginPage);
app.get('/adminLogout', routesAPI.logout);
app.get('/adminDashboard', routesAPI.adminDashboard);

app.post('/AdminLogin', routesAPI.adminLogin);
app.post('/createAdmin', routesAPI.adminCreate);

//post requests for adding and deleting team members
app.post('/addMember', teamMemberAPI.addMember);

app.listen(port, function(){
    console.log(chalk.green('server is up and running on port ' + port));
});