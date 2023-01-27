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


const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8080;

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

/* With thanks to https://dev.to/gbudjeakp/how-to-connect-your-client-side-to-your-server-side-using-node-and-express-2i71 for information on how to user body parser and cors packages */

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
