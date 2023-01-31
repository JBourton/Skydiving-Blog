// Local URL
const port = 8080;
const route = 'http://127.0.0.1:'+port;
const address = 'http://127.0.0.1:'+port+'/api';

let currentDropzoneID = null;
let commentEntity;
const dataURL = '/data/Dropzones.json';

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
    let requestURL;
    let postfix = null;
    let selectedDz = document.getElementById('dropdown').value;
    switch(selectedDz) {
        case selectedDz = 'skydive_madrid':
            postfix = 1;
            break;
        case selectedDz = 'goskydive':
            postfix = 2;
            break;
        case selectedDz = 'skyhigh':
            postfix = 3;
            break;
        case selectedDz = 'skydive_egypt':
            postfix = 4;
            break;
        case selectedDz = 'skydive_belize':
            postfix = 5;
            break;
        case selectedDz = 'skydive_maldives':
            postfix = 6;
            break;
    }

    requestURL = route + '/fetchDropzone/' + postfix;

    if (postfix !== null) {
        fetchEntities(requestURL);
    }
    
}

// Populate dropzone div with object content retrieved from JSON file
async function fetchEntities(requestURL) {
    try {
        // Send request for selected dropzone to server
        const data = await fetch(requestURL);
        const retrievedDropzone = await data.json();

        // Fill all fields in the Dropzone entity container
        fillDropzoneInfo(retrievedDropzone);

        // Fetch comments
        retrievedComments = retrievedDropzone.comments;

        // Populate comment box
        populateComments(retrievedComments);

    } catch(e) {
        alert(e);
        /*
        response.statusCode = 404;
        response.end;
        */
    }
    
}

/**
 * Populate the jumbotron with a particular instance of the Dropzone entity
 * @param {Object} dropzoneEntity The object containing all relvant fields pertaining to the Dropzone entity
 */
function fillDropzoneInfo(dropzoneEntity) {
     // Populate title and image fields
     document.getElementById('title').innerHTML = dropzoneEntity.name;
     document.getElementById('dz_img').src = dropzoneEntity.img_url;
     document.getElementById('img_description').innerHTML = dropzoneEntity.img_description;

     // Populate likes / dislikes lists
     document.getElementById('likes').innerHTML = dropzoneEntity.likes;
     document.getElementById('dislikes').innerHTML = dropzoneEntity.dislikes;

     // Populate dz information
     document.getElementById('kit_rental').innerHTML = dropzoneEntity.kit_rental;
     document.getElementById('ticket_cost').innerHTML = dropzoneEntity.ticket_cost;
     document.getElementById('weather').innerHTML = dropzoneEntity.weather;
     document.getElementById('licence').innerHTML = dropzoneEntity.min_licence;

     // Populate location fields
     document.getElementById('location_lbl').innerHTML = 'Location: ' + dropzoneEntity.location_lbl;
     document.getElementById('location').src = dropzoneEntity.location_src;

     // Populate contacts list
     document.getElementById('contacts').innerHTML = dropzoneEntity.dz_contacts;

}

// Populate comment box using AJAX upon dropzone selection
function populateComments(commentEntity) {
    // Iterate through each key:value pair in object and add to comment box
    for (const key in commentEntity) {
        if (commentEntity.hasOwnProperty(key)) {
            let comment_list = document.getElementById("comment_list");
            let next_comment = document.createElement("li");
            comment_list.appendChild(next_comment);
            next_comment.innerHTML = `${key}: ${commentEntity[key]}`
        }
    }
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