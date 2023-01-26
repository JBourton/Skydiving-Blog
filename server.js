// Local IP
const address = 'http://127.0.0.1:8080/';

// Server setup
const express = require('express');
const app = express(); 
app.use(express.static('client'));


/*
// Get request
app.get('/dropzone', function(req, resp){
    resp.send('hi')
})

// Listen on port 8080
app.listen(8080);
*/