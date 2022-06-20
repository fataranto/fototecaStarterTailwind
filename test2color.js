const { getColorFromURL } = require('color-thief-node');
const { getPaletteFromURL } = require('color-thief-node');

const imageURL = "https://randomwordgenerator.com/img/picture-generator/50e6d1414c50b10ff3d8992cc12c30771037dbf85254784e77267ed09444_640.jpg";




  const myColor =  (async (imageURL) => {
        const dominantColor = await getColorFromURL(imageURL);
        console.log(dominantColor);
    });


    const myColorPallete = (async (imageURL) => {
        const colorPallete = await getPaletteFromURL(imageURL);
        console.log(colorPallete);
    });

    //myColor(imageURL);
    myColorPallete(imageURL);




