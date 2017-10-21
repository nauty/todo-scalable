
var express = require('express');
var app = express(); 						
var mongoose = require('mongoose'); 				
var port = process.env.PORT || 8008; 				
var database = require('./config/database'); 			
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./app/routes');

mongoose.connect(database.mongodb); 	

app.use(express.static('./public')); 		
app.use(bodyParser.urlencoded({'extended': 'true'})); 
app.use(bodyParser.json()); 


// routes ======================================================================
app.use('/',router);


// load index.html 
app.get('*', function (req, res) {
     res.sendFile(__dirname + '/public/index.html'); 
 });

app.listen(port);
console.log("App listening on port " + port);
