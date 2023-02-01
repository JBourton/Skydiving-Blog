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

// Send back a comment if keyword is found
app.get('/searchWord/:keyword/:dzNum', function(req, resp) {
  const dzNum = req.params.dzNum;
  const searchWord = req.params.keyword;
  const dz = dropzoneFile.entities[dzNum];
  let matchingComments = [];

  // Get comments for dzNum and search them for relevant comments
  let commentSection = dropzoneFile.entities[dzNum].comments;

  // Search comments of relevant dropzone and return if match in any key or value
  for (const key in commentSection) {
    if (commentSection.hasOwnProperty(key)) {
        if (key.includes(searchWord) || commentSection[key].includes(searchWord)) {        
          matchingComments.push(`${key}: ${commentSection[key]}`);
        }      
    }
  }

  // Send back list of matching comments, or empty list if none found
  resp.send(matchingComments);
})


app.post('/postComment/:dzNum', function (req, resp) {
  //  console.log(req.body);
  const dzNum = req.params.dzNum;
  const username = req.body.username;
  const comment = req.body.comment;
  
  // Update value of comment object with new comment
  let commentSection = dropzoneFile.entities[dzNum].comments;
  commentSection[username] = comment;
  dropzoneFile.entities[dzNum].comments = commentSection;

  // With thanks to stack overflow user Seth for information on how to create the writeJSON function https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
  fs.writeFile(fileName, JSON.stringify(dropzoneFile, null, 4), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing ' + dropzoneFile.entities[dzNum].comments + ' to: ' + fileName);
  });

  resp.send(dropzoneFile.entities[dzNum].comments);
});


app.listen(8080, ()=> {
  console.log("listening on port 8080");
})

module.exports = app;