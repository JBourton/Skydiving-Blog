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