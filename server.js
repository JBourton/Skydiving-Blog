/*
// Local IP
const address = 'http://127.0.0.1:8080/';

// Server setup
const express = require('express');
const app = express(); 
app.use(express.static('client'));



// Get request
app.get('/dropzone', function(req, resp){
    resp.send('hi')
})

// Listen on port 8080
app.listen(8080);
*/



const express = require('express')
const app = express()

app.use(express.static('client'));


/*
let testList = ['1', '2'];

app.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(testList);
}).listen(8080);


app.get('/', (req, resp) => {
  resp.send('hiiiii worlddd!');
  resp.writeHead(200, {'Content-Type': 'text/html'});
  resp.end('Hello World!');
})


app.listen(8080, ()=> {
  console.log("listening on port 8080");
})
*/
