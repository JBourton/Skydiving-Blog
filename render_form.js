// With thanks to codeofgeeks at https://codeofgeeks.com/how-to-post-html-form-data-to-node-express-server/ for instructions
const express = require('express');

// Send homepage from server to client on load
exports.form = (req, res) =>
{  
    res.sendFile('client/index.html', { root: '.' });
}

// Send sucsessful page content upon form submission
exports.formprocess = (req, res) =>
{  
   console.log(req.body);
   res.send('<h1>Sucsess</h1>');
}  