const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

/* const {
    getColorFromURL
} = require('color-thief-node'); */
/* const {
    getPaletteFromURL
} = require('color-thief-node');
 */

const pictures = JSON.parse(fs.readFileSync('./photos.json'));

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



/* (async () => {
    const dominantColor = await getColorFromURL(pictures[0].URL);
})(); */

//console.log(pictures[0].URL);

//const addPallete = pictures => {

  //  for (let picture of pictures) {
        // (async () => {
        //     const colorPallete = await getColorFromURL(picture.URL);
        // })();
        //picture.pallete = colorPallete;
    //    console.log(picture.URL);
      //  (async () => {
        //const dominantColor = await getColorFromURL(picture.URL);
        //})
        //console.log(dominantColor);
    //}

    //return console.log(pictures);

//};

//addPallete(pictures);



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
        pics: pictures
    });
})

app.get("/upload", (req, res) => {
    res.render("form");
})

app.post('/imguploaded', function (req, res) {

    let myNewPic = {
        title: req.body.title,
        URL: req.body.url,
        date: req.body.date
    }

    pictures.push(myNewPic);

    let data = JSON.stringify(pictures, null, 2);
    fs.writeFileSync('photos.json', data);

    //console.log(pictures);

    res.redirect("/");

    /* res.render("index", {
        numPics: pictures.length,
        pics: pictures
    }); */

})


app.use((req, res) => {
    res.status(404).render('404');
})

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});