'use strict';



/* option 1 */
//const fs = require('fs');
//let rawdata = fs.readFileSync('photos.json');
//let photos = JSON.parse(rawdata);

/* option 2*/
let photos = require('./photos.json');



console.log(photos);