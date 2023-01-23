// Local IP
const adress = 'http://127.0.0.1:8080/';

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
    this.weather = weather;
    this.min_licence = licence;
    this.location_lbl = location_lbl;
    this.location_src = location_src;
    this.dz_contacts = contacts;
}

const skydiveMadrid = Dropzone('Skydive Madrid', '/client/assets/dz_images/SkydiveMadridJBourton', 'Me taking my AFF course at Skydive Madrid', 
"<ul><li>Almost always sunny! Jumping all day round, and usually you only have to wait a couple of loads until you can go up again.</li><li>Small DZ where people know each other well. Makes for chill vibes once the final load has landed and you crack open some beers to watch the last part of sunset.</li><li>They make some banging bocadillos in the kitchen (obviously important if you've got your priorities straight)</li></ul>", 
"<ul><li>Shop prices were a bit too high to be reasonable</li><li>Despite having Madrid in the name, you can barely see Madrid from the sky! So don't expect a sweeping view of the city as you climb to altitude, because you won't get it :/</li><li>Surrounding landscape is a bit dry and brown</li><li>Landing area outside of the astroturf is hardened mud - if you have a bad landing, it hurts!</li></ul>", 
"Yes. A parachute will set you back €21 per jump, and packing costs €5. There are also weight belts for you to borrow to assist you with your fall rate.", 
"€35 for a single ticket, €340 for 10, €825 for 25 or €1550 for 50.", "This is sunny spain after all, 9 times out of 10 cloud coverage will be insignifcant for at least some skydivers to jump. However, your jump experience may be impacted with high winds.", "The higher the windspeed the more experienced of a skydiver you will have to be to be allowed to jump. Exactly what these limits are is chosen by the Jumpmaster on the day.", 
"This dropzone is located just on the outskirts of Madrid, and is pretty difficult to get too without a car honsetly.", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.305347487577!2d-3.5021700851861133!3d39.9345590927473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd420a08b6812e09%3A0x2dd5f57993cb11d6!2sCentro%20de%20Paracaidismo%20Skydive%20MADRID!5e0!3m2!1sen!2suk!4v1673877570148!5m2!1sen!2suk", 
"<ul><li>https://www.skydivemadrid.es/en/</li><li>info@skydivemadrid.es</li><li>+34 911299376</li><li>https://www.instagram.com/skydive_madrid/</li></ul>")


const goSkydive = Dropzone('GoSkydive', '/client/assests/dz_images/GoSkydiveJBourton', 'Me on my first ever skydive, falling over sailsbury and with a very confused brain, trying to make sense of freefall', 
"<ul><li>You can see stonehenge once under canopy! How cool is that!<li>There are some incredibly experienced instructors working there (as of 2020) that are amazing to learn new skills from!</li><li>Next to an aviation museum with a wealth of history inside of it, that's free to enter as a customer of goskydive, and cheap for all other visitors. If you like planes, then you'll have an amazing time looking around the mueseum. In fact, the dropzone itself was used during WW2 for some critically important missions, which you can learn about on-site.</li><li>The surrounding area of Old Sarum is rich in English heritige, which you can explore after your skydive at your leisure. If you're interested in finding out more about Old Sarum, here's an interesting website: https://www.english-heritage.org.uk/visit/places/old-sarum/history/</li></ul>", 
"<ul><li>In our opinion, this DZ was poorly organised and extremley money-oriented</li><li>It's also very tandem-focused, so change your expectations if you're expecting to be given lots of attention and space throughout the day as a fun jumper.</li></ul>", 
"Back in 2021, gear rental was temporarilly free for AFF students. However, we are almost certain that this is no longer the case, so we cannot provide a price estimate for this dropzone unfortunately.", 
"Jump tickets cost £25 in 2021 but we consider it very likely that there will have been a change since then. However, this has not been updated on their website.", 
"yeahhhh... this is a grim one. GoSkydive IS is southern England after all, so what can we expect really, but this DZ has to call off a lot of planes due to poor weather conditions. Sailsbury only gets about 50 days of sun a year, and some of those days are too windy for jumping, so bear that in mind. Our only advice here is go expecting good vibes but not necessarily any jumps, because the people here are chill but the weather is most certainly not. We'll keep our fingers crossed for blue skies for you!", 
"We don't think that GoSkydive will be too receptive to A Licence holders here anymore unfortunately. Perhaps if you rock up with your squad, and all of you are realtively experienced sport jumpers, they'll allow you to jump (if you make them look cool ofc, which how could you not with drip like that??) but don't take our word for it.", 
"This dropzone is located in the culturally rich area of Old Sarum, Sailsbury", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.335006154199!2d-1.781935284761335!3d51.10227894806426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4873eeb44e2850a1%3A0xeee833e5e915ba2f!2sGoSkydive!5e0!3m2!1sen!2suk!4v1673877469446!5m2!1sen!2suk", 
"<ul><li>Website: https://www.goskydive.com/</li><li>info@goskydive.com</li><li>01722 568604</li><li>https://www.instagram.com/goskydiveuk/</li></ul>")


// Get request
app.get('/dropzone', function(req, resp){
    resp.send('hi')
})


// Listen on port 8080
app.listen(8080);