// Local URL
const port = 8080;
const address = 'http://127.0.0.1:'+port+'/';

// Server setup
const express = require('express');
const app = express();

// I want this line of code to connect button clicks to server-side code
// const myFunctionality = require(__dirname + '/client/app.js'); 
const routes = require('./routes/routing');

// API middlewares
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// bodyParser setup information found at https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields-in-express
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());            // Accept data in JSON format
app.use(bodyParser.json());  
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded());      // Decode data sent through HTML form     

// using routes middleware - partial implementation used from https://codeofgeeks.com/how-to-post-html-form-data-to-node-express-server/
app.use('/', routes);








app.listen(8080, ()=> {
  console.log("listening on port 8080");
})

module.exports = app;