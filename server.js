const express = require('express');
const app = express();
app.use(express.static('client'));

const dropzone = {
    name: 'dz name',
    img_url: '/',
    img_description: 'description of img',
    likes: 'what we like',
    dislikes: 'what we dislike',
    kit_rental: true,
    ticket_cost: 'plane ticket cost',
    avg_weather: 'average weather conditions',
    min_licence: 'minimum licence requirements to jump',
    location_label: 'description of location',
    location_src: 'the src code for <iframe> to render location on google maps',
    dz_contacts: 'the dz contact details'
}

app.get('/dropzone', function(req, resp){
    resp.send('hi')
})

app.listen(8080);