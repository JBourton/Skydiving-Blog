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
            requestURL = '/JSONdropzones/madrid.json'
            break;
        case selectedDz = 'goskydive':
            requestURL = '/JSONdropzones/sailsbury.json'
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

// Populate dropzone div with object content retrieved from JSON file
async function fetch_json(requestURL) {
    // Gather details about selected dropzone from JSON file
    const request = new Request(requestURL)

    const response = await fetch(request);
    const retrievedDropzone = await response.json();


    // Populate title and image fields
    document.getElementById('title').innerHTML = retrievedDropzone.name;
    document.getElementById('dz_img').src = retrievedDropzone.img_url;
    document.getElementById('img_description').innerHTML = retrievedDropzone.img_description;

    // Populate likes / dislikes lists
    document.getElementById('likes').innerHTML = retrievedDropzone.likes;
    document.getElementById('dislikes').innerHTML = retrievedDropzone.dislikes;

    // Populate dz information
    document.getElementById('kit_rental').innerHTML = retrievedDropzone.kit_rental;
    document.getElementById('ticket_cost').innerHTML = retrievedDropzone.ticket_cost;
    document.getElementById('weather').innerHTML = retrievedDropzone.weather;
    document.getElementById('licence').innerHTML = retrievedDropzone.min_licence;

    // Populate location fields
    document.getElementById('location_lbl').innerHTML = 'Location: ' + retrievedDropzone.location_lbl;
    document.getElementById('location').src = retrievedDropzone.location_src;

    // Populate contacts list
    document.getElementById('contacts').innerHTML = retrievedDropzone.dz_contacts
}


// Add event listener and function for button that removes text currently in comment input field
const clear = document.querySelector('#remove_comment');
clear.addEventListener('click', remove_comment);

function remove_comment() {
    document.getElementById('comment_field').value = "";
}

// Add event listener for button that submits a new comment
const submit = document.querySelector('#submit_comment');
submit.addEventListener('click', submit_comment);

function submit_comment() {
    const comment = document.getElementById('comment_field').value;
    
    if (comment !== "") {
        // convert to key:value pair and add to comment box/json file
    }
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