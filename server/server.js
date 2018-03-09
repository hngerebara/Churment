require('dotenv').config();
const express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config/main');
    router = require('./router');
    worker = require('./controllers/workers');
 
      
const app = express();
mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get('/', function(req, res) {
    res.send("I'll will put the home page here later.");
});

const server = app.listen(config.port);  
console.log('Your server is running on port ' + config.port + '.');  

router(app); 
