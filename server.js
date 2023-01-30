// Local URL
const port = 8080;
const address = 'http://127.0.0.1:'+port+'/';

// Server setup
const express = require('express');
const app = express();

// I want this line of code to connect button clicks to server-side code
// const myFunctionality = require(__dirname + '/client/app.js'); 
//const routing = require('./routes/routing');

// API middlewares
const path = require('path');
const fs = require('fs');
//const bodyParser = require('body-parser');

const fileName = './test_comments.json';
const mytestcomments = require(fileName);

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());            // Accept data in JSON format
app.use(express.urlencoded());      // Decode data sent through HTML form     

// routing.postComment(app);

app.post('/api', function (req, resp) {
  //  console.log(req.body);
  const username = req.body.username;
  const comment = req.body.comment;
  mytestcomments[username] = comment;

  console.log(mytestcomments);

  fs.writeFileSync(fileName, JSON.stringify(mytestcomments));
  resp.send(mytestcomments);
});


app.listen(8080, ()=> {
  console.log("listening on port 8080");
})

module.exports = app;