// Local URL
const port = 8080;
const address = 'http://127.0.0.1:'+port+'/';

// Server setup
const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static('client')); // app.use(express.static(path.join(__dirname, 'client'))); - probably does the same thing
app.use(express.json());
app.use(bodyParser.json());


// Test file to be deleted
const fileNameForJSON = './testfile.json';
const test_dzs = require(fileNameForJSON);

app.get('/test_dzs', function (req, resp) {
  const dzkeys = Object.keys(test_dzs);
  resp.send(dzkeys);
});


app.post('/test_dzs/new', function (req, resp) {
  const key = req.body.key;
  const instructions = req.body.instructions;
  test_dzs[key] = instructions;
  fs.writeFileSync(fileNameForJSON, JSON.stringify(test_dzs));
  resp.send(test_dzs);
});

app.listen(8080, ()=> {
  console.log("listening on port 8080");
})

module.exports = app;





/*
const test = document.querySelector('#test_btn');
test.addEventListener('click', say_hi);

// Get request
app.get('/dropzone', function(req, resp){
    resp.send('hi')
})

app.get('/test_dzs/:test_dzs', function (req, resp) {
  const newdz = req.params.newdz;
  const set = test_dzs[newdz];

  resp.send(set);
});


function say_hi() {
  alert("Hello World!");
}


const cors = require('cors');

app.use(express.static('client'));
*/

/*
const test = document.querySelector('#test_btn');
test.addEventListener('click', say_hi);
*/
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

*/


/* With thanks to https://dev.to/gbudjeakp/how-to-connect-your-client-side-to-your-server-side-using-node-and-express-2i71 for information on how to user body parser and cors packages */

/*
// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true})); 
app.use(cors())

//You can use this to check if your server is working
app.get('/h', (req, res)=>{
  res.send("Welcome to your server")
})


//Route that handles login logic
app.post('/login', (req, res) =>{
  console.log(req.body.username); 
  console.log(req.body.password);
})

//Route that handles signup logic
app.post('/signup', (req, res) =>{
console.log(req.body.title);
console.log(req.body.username);
console.log(req.body.password); 
})

//Start your server on a specified port
app.listen(port, ()=>{
  console.log(`Server is runing on port ${port}`)
})
*/

