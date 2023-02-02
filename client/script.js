// Local URL
const port = 8080;
const address = 'http://127.0.0.1:'+port;

// ID number of the currently selected dropzone
let postfix = null;
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

    // Add event listner for submit of search form
    document.querySelector('#searchForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        commentSearch();
    });

    // Add event listeners for image selection tool    
    document.getElementById('img_selector').addEventListener('click', requestSingleImg);
    document.getElementById('display_all_btn').addEventListener('click', requestAllImages);
    document.getElementById('add_img').addEventListener('submit', async (e) => {
        e.preventDefault();
        newImage();
        
    })
})

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
        const data = await fetch(requestURL);
        retrievedDropzone = await data.json();

        // Fill all fields in the Dropzone entity container
        fillDropzoneInfo(retrievedDropzone);

        // Fetch images and populate image gallery
        retrievedImages = retrievedDropzone.images;
        populateGallery(retrievedImages, true, true);

        // Fetch comments and populate comment box
        retrievedComments = retrievedDropzone.comments;
        populateComments(retrievedComments, 'comment_list');


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
     // Populate title
     document.getElementById('title').innerHTML = dropzoneEntity.name;

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

/**
 * 
 * @param {Object} imgEntity The object containing image url and description as key value pairs
 * @param {boolean} multiple Determine whether multiple images are to be displayed in gallery view
 * @param {boolean} load Determines whether image selection dropdown will be filled out
*/
function populateGallery(imgEntity, multiple = false, load = false) {
    // Populate image selection dropdown
    if (load) {
        let select = document.getElementById('img_dropdown');
        let pos = 0;
        for (const key in imgEntity) {
            if (imgEntity.hasOwnProperty(key)) {
                let newOption = new Option(key, pos);
                select.appendChild(newOption, undefined);
                pos += 1;
            }
        }
    }

    // Fetch gallery container div and reset   
    let img_gallery = document.getElementById('gallery');
    img_gallery.innerHTML = "";

    // Display either single image or gallery of images
    if (multiple) {
        for (const key in imgEntity) {
            if (imgEntity.hasOwnProperty(key)) {
                newImgContainer = createImage(imgEntity, key, img_gallery); 
            }
        }
    } else {
        newImgContainer = createImage(imgEntity, Object.keys(imgEntity)[0], img_gallery); 
    }
}

/**
 * 
 * @param {Object} imgEntity The object containg the image urls and their relevant descriptions
 * @param {string} key The image url
 * @param {HTML} gallery The HTML gallery element to be updated
 */
function createImage(imgEntity, key, gallery) {
    // Create container for image and description
    let newImgContainer = document.createElement("div");
    newImgContainer.className = 'gallery_img';

    // Create image and append to document
    let newImg = document.createElement("img");
    newImg.className = 'img-fluid';
    newImg.src = imgEntity[key];
    newImgContainer.appendChild(newImg);

    // Create description and append
    let newDescription = document.createElement("LABEL");
    newDescription.textContent = key;
    newImgContainer.appendChild(newDescription);

    // Add newly created image container to document
    gallery.appendChild(newImgContainer);
}

// Requests the url of a single image from the server
async function requestSingleImg() {
    try {
        // Fetch user-selected description ready for GET request
        let commentNum = document.getElementById('img_dropdown').value

        // Reset container div and reset
        let img_gallery = document.getElementById('gallery');
        img_gallery.innerHTML = "";

        // Fetch img description for given description
        let fetchedImg;

        const route = '/getIMG/' + commentNum + '/' + postfix;

        const res = await fetch(route);
        fetchedImg = await res.json();

        // Add retrieved image to document - note: need to parse an object as a param here
        createImage(fetchedImg, Object.keys(fetchedImg)[0], img_gallery)

        // Reset dropdown
       //document.getElementById('img_dropdown').innerHTML = null;
    } catch (e) {
        alert(e);
    }
    
}

async function requestAllImages() {
    try {
        // Reset container div and reset
        let img_gallery = document.getElementById('gallery');
        img_gallery.innerHTML = "";

        route = '/getIMG/getAll/' + postfix;

        const res = await fetch(route);
        fetchedImages = await res.json();

        populateGallery(fetchedImages, true, false);
    } catch (e) {
        alert(e);
    }
}

async function newImage() {
    const imgURL = document.getElementById('img_url').value;
    const caption = document.getElementById('img_reference').value;
    let success;

    if (comment !== "" && username !== "") { 
        route = address + '/postIMG/' + postfix;

        try {
            const res = await fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({caption: caption, imgURL: imgURL})
            });


        }
    }
}


function populateComments(commentEntity, box_id) {
    // Iterate through each key:value pair in object and add to comment box
    let comment_list = document.getElementById(box_id);
    // Clear comment box
    comment_list.innerHTML = '';

    // Populate comment box with message if there are no comments to display
    if (Object.keys(commentEntity).length === 0) {
        let no_comments = document.createElement("li");
        comment_list.appendChild(no_comments);
        no_comments.innerHTML = "No comments to display";
    }

    for (const key in commentEntity) {
        if (commentEntity.hasOwnProperty(key)) {         
            let next_comment = document.createElement("li");
            comment_list.appendChild(next_comment);
            next_comment.innerHTML = `${key}: ${commentEntity[key]}`
        }
    }
}

async function newComment() {
    const username = document.getElementById('username_input').value;
    const comment = document.getElementById('comment_input').value;
    let success;
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

            if (res.status === 200) {
                // Update comment box and inform user upon sucsessful post
                const returnedComments = await res.json();
                populateComments(returnedComments, 'comment_list');
                success = true;
                //displaySubmissionResult('commentSubmissionMsg', true);
            } else {
                // Inform user of unsucsessful post
                alert('Error Creating Comment', await response.text());
                success = false;
                //displaySubmissionResult('commentSubmissionMsg', false);
            }

            displaySubmissionResult('commentSubmissionMsg', success);
        } catch (e) {
            alert('Error: sever connection not established');
        }
       
        // Reset comment container content
        document.getElementById('submit_comment').reset();
    }
}

/**
 * Inform the user if their comment submission was sucsessful or not
 * @param {string} elemID The ID of the element that displays the message
 * @param {boolean} success Whether the POST request was sucsessful or not
 */
function displaySubmissionResult(elemID, success) {
    message = document.getElementById(elemID);
    
    if (success) {
        message.innerHTML = "Submission successful!";
        message.style.color = "green";
        fade(message);
    } else {
        message.innerHTML = "Submission unsuccessful, an error has occured";
        message.style.color = "red";
        fade(message);
    }
    
}

// Search for a user-defined pattern sequence in a comment box
async function commentSearch() {
    // Only send GET request if a dropzone has been selected
    if (postfix !== null) {     
        // Make GET request
        try {
            // Fetch key word input
            const keyWord = document.getElementById('lookup_field').value;
            // Sanitise input
            if (validateSearchInput(keyWord)) {
                let fetchedComments;
                route = address + '/searchWord/' + keyWord + '/' + postfix;

                const res = await fetch(route);
                fetchedComments = await res.json();

                populateComments(fetchedComments, 'search_comments');
            };

            
        } catch (e) {
            alert('Error: sever connection not established');
        }
        
        // Reset input field:
        document.getElementById('lookup_field').value = null;
    }   
}

/**
 * Check that the user input conforms to a set of predefined rules
 * @param {string} userInput The input to validate
 * @throws {userException} Inform the user of an error
 * @returns {boolean} True if user input is valid
 */
function validateSearchInput(userInput) {
    // Input can only be 1 word - thanks to simonberry on stack overflow for this code snippet (https://stackoverflow.com/questions/25344603/javascript-check-if-value-has-at-least-2-or-more-words) [Accessed 27/01/23]
    if (userInput.trim().indexOf(' ') != -1) {        //there is at least one space, excluding leading and training spaces
        throw new userException('Invalid input', 'More than 1 word');
    }

    // Input cannot contain HTML tag characters
    if (userInput.includes('>') || userInput.includes('<')) {
        throw new userException('Invalid input', "HTML tags not permitted");
    }

    return true;
}

// With thanks to stack overflow user Ibu for use of fade function found here: https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css [Accessed 31/01/23]
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

function clearComment() {
    document.getElementById('username_input').value = "";
    document.getElementById('comment_input').value = "";   
}

// Should display a (reusable) dissapearing error message
function userException(title = "Error", msg = "Undefined") {
    alert(title + ": " + msg);
}