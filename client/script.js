// Local URL
const port = 8080;
const address = 'http://127.0.0.1:'+port+'/api';

let commentURL = null;

/*
const { json } = require("body-parser");

const fs = require('fs');
const submitIt = document.querySelector('#test_btn');
submitIt.addEventListener('click', doTest);
information
function doTest() {
    alert('weve gotten to here');
    let data = JSON.stringify([1, 2, 3]);
    fs.writeFileSync('./testfile.json', data);
    alert('did it work?');
}
*/

// Setup event listeners on page buttons
document.addEventListener('DOMContentLoaded', () => {
    // Add event listenters to button that loads dropzone entity information
    document.querySelector('#dz_selector').addEventListener('click', display_dropzone);

    // Add event listener for button that submits a new comment
    document.querySelector('#submit_btn').addEventListener('click', async () => {
        submit_comment(commentURL);
    });

    // Add event listener and function for button that removes text currently in comment input field
    document.querySelector('#remove_btn').addEventListener('click', remove_comment);

    // TEST, TO BE REMOVED
    document.querySelector('#test_btn').addEventListener('click', async () => {
        post_test_comment();
    });
})

// Displays either succsess or error message for attempted form submission
function display_submission_result(elemID, success) {
    message = document.getElementById(elemID);
    if (success) {
        message.innerHTML = "Submission successful!";
        message.style.color = "green";
        fade(message);
    } else {
        message.innerHTML = "Form submission error";
        message.style.color = "red";
        fade(message);
    }
    
}

// With thank to stack overflow user Ibu for use of fade function found here: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 200);
}

// Comments as a js object
let comments = {};

// With thanks to the MDN web docs page found here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON for an overview of how to implement this
function display_dropzone() {
    // Fetch value of dropzone name selected by user
    let requestURL = null;
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
            requestURL = '/JSONdropzones/egypt.json';
            commentURL = '/JSONcomments/egypt_comments.json';
            break;
        case selectedDz = 'skydive_belize':
            requestURL = '/JSONdropzones/belize.json';
            commentURL = '/JSONcomments/belize_comments.json';
            break;
        case selectedDz = 'skydive_maldives':
            requestURL = '/JSONdropzones/maldives.json';
            commentURL = '/JSONcomments/maldives_comments.json';
            break;
    }


    if (requestURL !== null) {
        //add_actions(requestURL);
        fetch_json(requestURL);
        populate_comments(commentURL);
    }
    
}

/*
// Add action field to forms for comment section
function add_actions() {
    // Local IP
    const address = 'http://127.0.0.1:8080/';

    // Concatenate address of relevant json file to local host
    const action_field = address + requestURL;
    return action_field;
}
*/

// Populate dropzone div with object content retrieved from JSON file
async function fetch_json(requestURL) {
    try {
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
        document.getElementById('contacts').innerHTML = retrievedDropzone.dz_contacts;

        
    } catch(e) {
        alert(e);
        /*
        response.statusCode = 404;
        response.end;
        */
    }
    
}

// Populate comment box using AJAX upon dropzone selection
function populate_comments(commentURL) {
    // With thanks to dcode at https://www.youtube.com/watch?v=W6NsAO08vmE for the tutorial on how to load data from a JSON file using AJAX
    const xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Convert returned JSON into a JS object
            comments = JSON.parse(this.responseText);

            // Iterate through each key:value pair in object and add to comment box
            for (const key in comments) {
                if (comments.hasOwnProperty(key)) {
                    let comment_list = document.getElementById("comment_list");
                    let next_comment = document.createElement("li");
                    comment_list.appendChild(next_comment);
                    next_comment.innerHTML = `${key}: ${comments[key]}`
                }
              }
        }
    }

    xhr.open("GET", commentURL, true);
    xhr.send();
}

async function post_test_comment() {
    const username = document.getElementById('testusername_input').value;
    const comment = document.getElementById('testcomment_input').value;
    if (comment !== "" && username !== "") {
        try {
            const res = await fetch(address, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, comment: comment})
            });

            
            
            // Update comment box if submission sucsessful
            if (res.status === 200) {
                populate_comments(commentURL);
                display_submission_result('test_submission_msg', true);
            } else {
                alert('Error Creating Comment', await response.text());
                display_submission_result('test_submission_msg', false);
            }

        } catch (e) {
            console.log('Error: sever connection not established');
        }

        document.getElementById('test_box').reset();
    }
    

    /*
        // Add username and comment as new key:value pair to comment object
        //comments.username = comment;
        // Update comment box     
        // Append new key:value pair to array and save as JSON
        // Read new JSON file into comment box 
    */
}


async function submit_comment(commentURL) {
    const username = document.getElementById('username_input').value;
    const comment = document.getElementById('comment_input').value;
    
    if (comment !== "" && username !== "") {
        try {
            alert("TESTING URL: " + address + commentURL);
            const res = await fetch(address + commentURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: comment})
            });

            if (response.status === 200) {
                // Post comment
            } else {
                showAlert('Error Creating Comment', await response.text());
            }

        } catch (e) {
            console.log('Error: sever connection not established');
        }
        
        
        // Add username and comment as new key:value pair to comment object
        //comments.username = comment;
        // Update comment box     
        // Append new key:value pair to array and save as JSON
        // Read new JSON file into comment box
    }
}

function remove_comment() {
    //document.getElementById('comment_field').value = "";
}

// Should display a (reusable) dissapearing error message
function display_error(title, msg) {

}