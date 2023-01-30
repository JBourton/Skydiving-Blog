const express = require('express');
//const router = express.Router();
const controller = require('../load_content/render_form.js');

const mytestcomments = require('../JSONcomments/test_comments.json');
const { use } = require('../server.js');


function postComment(app) {
    console.log("Hi guys!");
    app.post('/api', function (req, resp) {
        const username = req.body.username;
        const comment = req.body.comment;
        // console.log("username: " + username + ", comment: " + comment);
        mytestcomments[username] = comment;
    
        fs.writeFileSync(fileNameForJSON, JSON.stringify(mytestcomments));
        resp.send(mytestcomments);
    });
}

exports.postComment = postComment;

//module.exports = router;

/*
// Send HTML 
// router.get('/api', controller.page_content);
// router.post('/', controller.form_content_sent);

const controller = require('../containers/form');
router.get('/', controller.form);
router.post('/', controller.formprocess);
*/ 
