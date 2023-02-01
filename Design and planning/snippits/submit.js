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