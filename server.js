// Add event listener to search button that displays information on selected dropzone
const search = document.querySelector('#dz_selector');
search.addEventListener('click', display_dropzone);

// With thanks to the MDN web docs page found here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON for an overview of how to implement this
function display_dropzone() {
    // Fetch value of dropzone name selected by user
    requestURL = null
    var selectedDz = document.getElementById('dropdown').value;
    switch(selectedDz) {
        case selectedDz = 'skydive_madrid':
            requestURL = '../JSONdropzones/madrid.json'
            break;
        case selectedDz = 'goskydive':
            requestURL = '../JSONdropzones/sailsbury.json'
            break;
        case selectedDz = 'skyhigh':
            requestURL = '../JSONdropzones/durham.json'
            break;
        case selectedDz = 'skydive_egypt':
            requestURL = '../JSONdropzones/egypt.json'
            break;
        case selectedDz = 'skydive_belize':
            requestURL = '../JSONdropzones/belize.json'
            break;
        case selectedDz = 'skydive_maldives':
            requestURL = '../JSONdropzones/maldives.json'
            break;
    }


    if (requestURL !== null) {
        fetch_json(requestURL)
    }
    
}

async function fetch_json(requestURL) {
    // Gather details about selected dropzone from JSON file
    const request = new Request(requestURL)

    const response = await fetch(request);
    const retrievedDropzone = await response.json();

    const title = 'Dropzone name: ' + retrievedDropzone.name;
    alert(title);
    // Fill webpage with data from JSON file
    populate_jumbotron(retrievedDropzone);

    alert('hi');
}

// Populate dropzone div with object content retrieved from JSON file
function populate_jumbotron(retrievedDropzone) {
    // Problem with this line; working in upper function
    alert(retrievedDropzone);
    alert(retrievedDropzone.name);
    alert('hi');


    // Populate name and image fields
    const title = 'Dropzone name: ' + retrievedDropzone.name;
    alert(title);

    document.getElementById('title').innerHTML = title
    document.getElementById('dz_img').src = retrievedDropzone.img_url;

    // Populate likes / dislikes lists
    document.getElementById('likes').innerHTML = retrievedDropzone.likes;
    document.getElementById('dislikes').innerHTML = obj.dislikes

    // Populate dz information
    document.getElementById('kit_rental').innerHTML = obj.kit_rental;
    document.getElementById('ticket_cost').innerHTML = retrievedDropzone.ticket_cost;
    document.getElementById('weather').innerHTML = retrievedDropzone.weather;
    document.getElementById('licence').innerHTML = retrievedDropzone.min_licence;

    // Populate location fields
    document.getElementById('location_lbl').innerHTML = 'Location: ' + retrievedDropzone.location_lbl;
    document.getElementById('location').src = obj.location_src;

    // Populate contacts list
    document.getElementById('contacts').innerHTML = obj.dz_contacts
}

/*
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
*/