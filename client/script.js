// Local URL
const port = 8080;
const address = 'http://127.0.0.1:'+port;

// ID number of the currently selected dropzone
let postfix;
let retrievedDropzone;

// Setup event listeners on page buttons
document.addEventListener('DOMContentLoaded', () => {
    // Add event listenters to button that loads dropzone entity information
    document.querySelector('#dz_selector').addEventListener('click', displayDropzone);

    // Add event listner for comment submission form
    document.querySelector('#submit_comment').addEventListener('submit', async (e) => {
        e.preventDefault();
        newComment();
    });

    // Add event listener and function for button that removes text currently in comment input field
    document.querySelector('#clear_btn').addEventListener('click', clearComment);
})

// Displays either succsess or error message for attempted form submission
function displaySubmissionResult(elemID, success) {
    message = document.getElementById(elemID);
    alert('Display the green sucsess message');
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

// With thanks to stack overflow user Ibu for use of fade function found here: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
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

// Display jumbotron data
function displayDropzone() {
    // Fetch value of dropzone name selected by user
    let requestURL;
    let selectedDz = document.getElementById('dropdown').value;
    switch(selectedDz) {
        case selectedDz = 'skydive_madrid':
            postfix = 0;
            break;
        case selectedDz = 'goskydive':
            postfix = 1;
            break;
        case selectedDz = 'skyhigh':
            postfix = 2;
            break;
        case selectedDz = 'skydive_egypt':
            postfix = 3;
            break;
        case selectedDz = 'skydive_belize':
            postfix = 4;
            break;
        case selectedDz = 'skydive_maldives':
            postfix = 5;
            break;
    }

    requestURL = address + '/fetchDropzone/' + postfix;

    if (postfix !== null) {
        fetchEntities(requestURL);
    }
    
}

/**
 * Populate dropzone div with Dropzone and Comment entities retrieved from JSON file
 * @param {string} requestURL is the URL used for a GET request for Dropzone entity
 */
async function fetchEntities(requestURL) {
    try {
        // Send request for selected dropzone to server
        const data = await fetch(requestURL);
        retrievedDropzone = await data.json();

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
    // Clear comment box
    document.getElementById('comment_list').innerHTML = "";

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

async function newComment() {
    const username = document.getElementById('username_input').value;
    const comment = document.getElementById('comment_input').value;
    if (comment !== "" && username !== "") { 
        route = address + '/postComment/' + postfix;
        try {          
            const res = await fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, comment: comment})
            });

            // Update comment box and display sucsess message if submission sucsessful
            if (res.status === 200) {
                const returnedComments = await res.json();
                populateComments(returnedComments);
                displaySubmissionResult('commentSubmissionMsg', true);
            } else {
                // Inform user of unsucsessful post
                alert('Error Creating Comment', await response.text());
                displaySubmissionResult('commentSubmissionMsg', false);
            }
        } catch (e) {
            alert('Error: sever connection not established');
        }

        // Reset jumbotron body content
        document.getElementById('submit_comment').reset();
    }
}

function clearComment() {
    document.getElementById('username_input').value = "";
    document.getElementById('comment_input').value = "";   
}

// Should display a (reusable) dissapearing error message
function display_error(title, msg) {

}