const express = require('express');
//const path = require('path');
const fs = require('fs');

const app = express();

const { getPaletteFromURL } = require('color-thief-node');


const pictures = JSON.parse(fs.readFileSync('./photospallete.json'));

const isImageURL = require('image-url-validator').default;

//sort pictures by date

sortPics = function () {
    pictures.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        if (a.date > b.date) {
            return -1;
        }
        return 0;
    });
}


const myColorPallete = (async (imageURL) => {
    const colorPallete = await getPaletteFromURL(imageURL);
    console.log(colorPallete);

    return colorPallete;

});


//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use(express.urlencoded({
    extended: false
})); //get data from form vis POST

app.get("/", (req, res) => {
    sortPics();
    res.render("index", {
        numPics: pictures.length,
        pics: pictures,
        page_name: 'home'
    });
})

app.get("/upload", (req, res) => {
    res.render("form", {
        page_name: 'upload' //siempre tiene que ser un objeto, incluso si es solo una variable
    });
})

app.get("/error", (req, res) => {
    res.render("404");
})



app.post('/imguploaded', async function (req, res) {

let imgURL = req.body.url

let isImage = await isImageURL (imgURL).then(is_image => {
    return is_image
});

if (isImage) {
    let cPallete = await myColorPallete(imgURL);

    let myNewPic = {
        title: req.body.title,
        URL: imgURL,
        date: req.body.date,
        pallete: cPallete
    }

    pictures.push(myNewPic);
                
                    let data = JSON.stringify(pictures, null, 2);
                    fs.writeFileSync('photospallete.json', data); 

                    res.redirect("/");
}else{
    res.redirect("/error");
}








//isMyURL();



/*
if (isMyURL) {
    cPallete = await myColorPallete(req.body.url);

    let myNewPic = {
        title: req.body.title,
        URL: req.body.url,
        date: req.body.date,
        pallete: cPallete
    }

    pictures.push(myNewPic);
                
                    let data = JSON.stringify(pictures, null, 2);
                    fs.writeFileSync('photospallete.json', data); 

                    res.redirect("/");



} else {

    res.redirect("/error");

}
*/
});

                    
                    



app.use((req, res) => {
    res.status(404).render('404');
})

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});