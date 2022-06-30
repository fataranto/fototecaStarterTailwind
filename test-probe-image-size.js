const probe = require('probe-image-size');

// Get by URL



const imageURL = "https://randomwordgenerator.com/img/picture-generator/50e6d1414c50b10ff3d8992cc12c30771037dbf85254784e77267ed09444_640.jpg";



const myImageSize = (async (imageURL) => {
    let result = await probe(imageURL);
    if (result.length > 100000) {
        console.log("image is tooooo big");
        //console.log(result); 
    } else {
        console.log("image ok", result);
    }
});


myImageSize(imageURL)
// =>
/*
  {
    width: xx,
    height: yy,
    type: 'jpg',
    mime: 'image/jpeg',
    wUnits: 'px',
    hUnits: 'px',
    url: 'http://example.com/image.jpg'
  }
*/