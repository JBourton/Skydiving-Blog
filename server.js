// Server setup
const express = require('express');
const app = express();
app.use(express.static('client'));

// Object template to hold the necessary fields for filling in the information box central to website
function Dropzone(name, url, img_lbl, likes, dislikes, kit, ticket_cost, weather, licence, location_lbl, location_src, contacts) {
    this.name = name;
    this.img_url = url;
    this.img_description = this.img_description;
    this.likes = likes;
    this.dislikes = dislikes;
    this.kit_rental = kit;
    this.ticket_cost = ticket_cost;
    this.avg_weather = weather;
    this.min_licence = licence;
    this.location_lbl = location_lbl;
    this.location_src = location_src;
    this.dz_contacts = contacts;
}


// Get request
app.get('/dropzone', function(req, resp){
    resp.send('hi')
})


// Listen on port 8080
app.listen(8080);