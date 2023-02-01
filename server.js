// Local URL
const port = 8080;
const address = 'http://127.0.0.1:'+port+'/';

// Server setup
const express = require('express');
const app = express();

// API middlewares
const path = require('path');
const fs = require('fs');
// const entity = require('./entity.js');

const fileName = './Dropzones.json';
const dropzoneFile = require(fileName);

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());            // Accept data in JSON format
app.use(express.urlencoded());      // Decode data sent through HTML form


// Send back a dropzone object
app.get('/fetchDropzone/:dzNum', function (req, resp) {
  const dzNum = req.params.dzNum;
  const dz = dropzoneFile.entities[dzNum];
  resp.send(dz);
})


app.post('/postComment/:dzNum', function (req, resp) {
  //  console.log(req.body);
  const dzNum = req.params.dzNum;
  const username = req.body.username;
  const comment = req.body.comment;
  
  // Update value of comment object with new comment
  let commentSection = dropzoneFile.entities[dzNum].comments;
  
  
  // Just the . part for .username isn't working
  commentSection[username] = comment;
  

  dropzoneFile.entities[dzNum].comments = commentSection;

  console.log(dropzoneFile.entities[dzNum].comments);
 
  /*
  let comments = Object.values(commentSection);
  comments.username = comment;

  console.log("comments: " + comments);
  console.log("typeof comments: " + typeof(comments));
  */

  // With thanks to stack overflow user Seth for information on how to create the writeJSON function https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
  fs.writeFile(fileName, JSON.stringify(dropzoneFile, null, 4), function writeJSON(err) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(dropzoneFile));
    console.log('writing to ' + fileName);
  });

  resp.send(dropzoneFile.entities[dzNum].comments);
});


app.listen(8080, ()=> {
  console.log("listening on port 8080");
})

module.exports = app;