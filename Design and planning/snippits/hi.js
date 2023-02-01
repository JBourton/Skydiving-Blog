// Implementation adapted from https://www.google.com/search?q=writing+json+to+a+file+with+fs&rlz=1C1GCEA_enGB1039GB1039&sxsrf=AJOqlzVOunRAXTwy1N7paGFqYBrhoI--CQ:1675015189475&source=lnms&tbm=vid&sa=X&ved=2ahUKEwi3ufLqre38AhVeTEEAHepeCG8Q_AUoAXoECAEQAw#fpstate=ive&vld=cid:cbd5d4c5,vid:EXx-t9CRKeo
//const { json } = require('body-parser');
const fs = require('fs');

// Return contents of JSON file
function loadJSON(filename = '') {
    return JSON.parse(
        fs.existsSync(filename) ? fs.readFileSync(filename).toString() : 'null'
    );
}

// Write new key:value pair to JSON file
function saveJSON(filename = '', json = '""') {
    return fs.writeFileSync(filename, JSON.stringify(json));
}

// console.log(JSON.parse(fs.readFileSync('testfile.json').toString()));
data = loadJSON('testfile.json')
data.second = "try";

saveJSON('testfile.json', data);

console.log(data);


/*
;['one','two','three'].forEach(element => {
    data.files.push(element);
});
*/



