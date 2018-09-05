var express = require('express');
var chalk = require('chalk');



var routesAPI = require('./routes/route.js');

//creating an app from the express module
var app = express();

//using the ejs templating engine
app.set('view engine', 'ejs');

//using the public folder for static files
app.use(express.static(__dirname + '/public'));

//port number to listen on
port = process.env.PORT || 8081;

app.get('/', routesAPI.main);

app.listen(port, function(){
    console.log(chalk.green('server is up and running on port ' + port));
});