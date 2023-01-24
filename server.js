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
    requestURL = null
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
    }

    if (requestURL !== null) {
        fetch_json(requestURL)
    }
    
}

async function fetch_json(requestURL) {
    // Fill webpage with data from JSON file
    const request = new Request(requestURL)

    const response = await fetch(request);
    const retrievedDropzone = await response.json();

    populate_jumbotron(retrievedDropzone);
}

// Populate dropzone div with object content retrieved from JSON file
function populate_jumbotron(retreivedDropzone) {
    document.getElementById('title').innerHTML += retrievedDropzone.name;

    document.getElementById('dz_img').src = retrievedDropzone.img_url;

    // populate likes / dislikes list

    document.getElementById('kit_rental').innerHTML = retreivedDropzone.kit_rental;
    document.getElementById('ticket_cost').innerHTML = retrievedDropzone.ticket_cost;
    document.getElementById('weather').innerHTML = retrievedDropzone.weather;
    document.getElementById('licence').innerHTML = retrievedDropzone.min_licence;

    document.getElementById('location_lbl').innerHTML += retrievedDropzone.location_lbl;
    document.getElementById('location').src = retreivedDropzone.location_src;

    // populate contacts list
}


// Could remove <ul> part from json code

// As shown in the article, I now need some functions to call inside of fetch_json() that will populate the DOM with the relevant JSON object
// I may also need to define the data structure in the JSON object w/ the previously used JS code (in txt file)
// The object should actually have already been converted to js inside the fetch_json() function as retreivedDropzone