// Local IP
const adress = 'http://127.0.0.1:8080/';

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

// Add event listener to search button that displays information on selected dropzone
const search = document.getElementById("dz_selector");
search.addEventListener("click", display_dropzone);

// With thanks to the MDN web docs page found here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON for an overview of how to implement this
function display_dropzone() {
    // Fetch value of dropzone name selected by user
    requestURL = ''
    var selectedDz = document.getElementById('dropdown').value;
    switch(expression) {
        case selectedDz = 'skydive_madrid':
        requestURL = '/JSONdropzones/madrid.json'
        break;
        case selectedDz = 'goskydive':
            requestURL = '/JSONdropzones/sailsbury.json'
        break;
        case selectedDz = 'skyhigh':
            requestURL = '/JSONdropzones/durham.json'
            break;
        case selectedDz = 'skydive_egypt':
            requestURL = '/JSONdropzones/egypt.json'
            break;
        case selectedDz = 'skydive_belize':
            requestURL = '/JSONdropzones/belize.json'
            break;
        case selectedDz = 'skydive_maldives':
            requestURL = '/JSONdropzones/maldives.json'
            break;
        default:
            // No value has been selected
    }

    fetch_json(requestURL)
}

async function fetch_json(requestURL) {
    // Fill webpage with data from JSON file
    const request = new Request(requestURL)

    const response = await fetch(request);
    const retrievedDropzone = await response.json();
}

// As in the article, I now need some functions to call inside of fetch_json() that will populate the DOM with the relevant JSON object
// I may also need to define the data structure in the JSON object w/ the previously used JS code (in txt file)