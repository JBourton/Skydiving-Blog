// Add event listener to search button that displays information on selected dropzone
const search = document.querySelector('#dz_selector');
search.addEventListener('click', display_dropzone);


// With thanks to the MDN web docs page found here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON for an overview of how to implement this
function display_dropzone() {
    // Fetch value of dropzone name selected by user
    let requestURL = null
    let commentURL = null
    let selectedDz = document.getElementById('dropdown').value;
    switch(selectedDz) {
        case selectedDz = 'skydive_madrid':
            requestURL = '/JSONdropzones/madrid.json';
            commentURL = '/JSONcomments/madrid_comments.json';
            break;
        case selectedDz = 'goskydive':
            requestURL = '/JSONdropzones/sailsbury.json';
            commentURL = '/JSONcomments/sailsbury_comments.json';
            break;
        case selectedDz = 'skyhigh':
            requestURL = '../JSONdropzones/durham.json';
            commentURL = '/JSONcomments/durham_comments.json';
            break;
        case selectedDz = 'skydive_egypt':
            requestURL = '../JSONdropzones/egypt.json';
            commentURL = '/JSONcomments/egypt_comments.json';
            break;
        case selectedDz = 'skydive_belize':
            requestURL = '../JSONdropzones/belize.json';
            commentURL = '/JSONcomments/belize_comments.json';
            break;
        case selectedDz = 'skydive_maldives':
            requestURL = '../JSONdropzones/maldives.json';
            commentURL = '/JSONcomments/maldives_comments.json';
            break;
    }


    if (requestURL !== null) {
        fetch_json(requestURL);
        populate_comments(commentURL);
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

// Populate comment box upon dropzone selection
function populate_comments(commentURL) {

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
    const comment = document.getElementById('comment_input').value;
    const username = document.getElementById('username_input').value;
    
    if (comment !== "" && username !== "") {
        // Read relevant JSON comment file as an array of key:value pairs
        


        // Create key:value pair from username and comment inputs

        
        // Append new key:value pair to array and save as JSON


        // Read new JSON file into comment box
    }
}