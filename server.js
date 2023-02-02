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

// Search for a keyword in a comment and return username pair if found
app.get('/searchWord/:keyword/:dzNum', function(req, resp) {
  const dzNum = req.params.dzNum;
  const searchWord = req.params.keyword;
  let matchingComments = {};

  // Get comments for dzNum and search them for relevant comments
  let commentSection = dropzoneFile.entities[dzNum].comments;
  
  // Search comments of relevant dropzone and return if match in any key or value
  for (const key in commentSection) {
    if (commentSection.hasOwnProperty(key)) {
        if (key.includes(searchWord) || commentSection[key].includes(searchWord)) {        
          matchingComments[key] = commentSection[key];
        }      
    }
  }
  resp.send(matchingComments);
});

// POST a comment to Dropzones.json and send back updated comment section
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

// GET all URLs and captions of images related to a particular dropzone
app.get('/getIMG/getAll/:dzNum', function (req, resp) {
  const dzNum = req.params.dzNum;
  resp.send(dropzoneFile.entities[dzNum].images);
});

// GET a specific URL and caption of a user-selected image related to a specific dropzone
app.get('/getIMG/:imgNum/:dzNum', function (req, resp) {
  const dzNum = req.params.dzNum;
  const imgNum = req.params.imgNum;
  let returnIMG = {};

  // Get images for dzNum and search for matching description
  let imageSection = dropzoneFile.entities[dzNum].images;

  // Get key:value pair for matching image, then send to client
  value = Object.values(imageSection)[imgNum];
  key = Object.keys(imageSection)[imgNum];
  returnIMG[key] = value;
  
  resp.send(returnIMG);
});

// POST details of a new image to Dropzones.json
app.post('/postIMG/:dzNum', function(req, resp) {
  const dzNum = req.params.dzNum;
  const imgURL = req.body.imgURL;
  const imgDescription = req.body.imgDescription;

  console.log("imgURL & imgDescription: " + imgURL + ' , ' + imgDescription);

  // Update .images object with new key:value pair
  let retrievedImages = dropzoneFile.entities[dzNum].images;
  retrievedImages[imgDescription] = imgURL;
  dropzoneFile.entities[dzNum].images = retrievedImages;

  console.log("retrievedImages" + retrievedImages);

  fs.writeFile(fileName, JSON.stringify(dropzoneFile, null, 4), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing ' + dropzoneFile.entities[dzNum].images + ' to: ' + fileName);
  });

  resp.send(dropzoneFile.entities[dzNum].images);
})


app.listen(8080, ()=> {
  console.log("listening on port 8080");
});

module.exports = app;