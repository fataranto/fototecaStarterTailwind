const express = require('express');
const path = require('path');

const pictures = [ //luego lo sustituiré por un json para conservar el contenido
    {
        title: "Cactus",
        URL: "https://randomwordgenerator.com/img/picture-generator/50e6d1414c50b10ff3d8992cc12c30771037dbf85254784e77267ed09444_640.jpg",
        date: "10/01/22"
    },
    {
        title: "Windows",
        URL: "https://randomwordgenerator.com/img/picture-generator/53e3d54a4c57a814f1dc8460962e33791c3ad6e04e507440762e7ad39344c4_640.jpg",
        date: "18/11/20"
    },
    {
        title: "Buildings",
        URL: "https://randomwordgenerator.com/img/picture-generator/53e1d7444d53af14f1dc8460962e33791c3ad6e04e507440742a7ad19f4cc0_640.jpg",
        date: "25/09/18"
    },
    {
        title: "Hidden kitty",
        URL: "https://randomwordgenerator.com/img/picture-generator/57e3d3444a52ac14f1dc8460962e33791c3ad6e04e50744172297cdd9f45c7_640.jpg",
        date: "12/03/21"
    },
    {
        title: "Cactus",
        URL: "https://randomwordgenerator.com/img/picture-generator/50e6d1414c50b10ff3d8992cc12c30771037dbf85254784e77267ed09444_640.jpg",
        date: "10/01/22"
    },
    {
        title: "Windows",
        URL: "https://randomwordgenerator.com/img/picture-generator/53e3d54a4c57a814f1dc8460962e33791c3ad6e04e507440762e7ad39344c4_640.jpg",
        date: "18/11/20"
    },
    {
        title: "Buildings",
        URL: "https://randomwordgenerator.com/img/picture-generator/53e1d7444d53af14f1dc8460962e33791c3ad6e04e507440742a7ad19f4cc0_640.jpg",
        date: "25/09/18"
    },
    {
        title: "Hidden kitty",
        URL: "https://randomwordgenerator.com/img/picture-generator/57e3d3444a52ac14f1dc8460962e33791c3ad6e04e50744172297cdd9f45c7_640.jpg",
        date: "12/03/21"
    },
    {
        title: "Cactus",
        URL: "https://randomwordgenerator.com/img/picture-generator/50e6d1414c50b10ff3d8992cc12c30771037dbf85254784e77267ed09444_640.jpg",
        date: "10/01/22"
    },
    {
        title: "Windows",
        URL: "https://randomwordgenerator.com/img/picture-generator/53e3d54a4c57a814f1dc8460962e33791c3ad6e04e507440762e7ad39344c4_640.jpg",
        date: "18/11/20"
    },
    {
        title: "Buildings",
        URL: "https://randomwordgenerator.com/img/picture-generator/53e1d7444d53af14f1dc8460962e33791c3ad6e04e507440742a7ad19f4cc0_640.jpg",
        date: "25/09/18"
    },
    {
        title: "Hidden kitty",
        URL: "https://randomwordgenerator.com/img/picture-generator/57e3d3444a52ac14f1dc8460962e33791c3ad6e04e50744172297cdd9f45c7_640.jpg",
        date: "12/03/21"
    }
];

const app = express();

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
})); //para obtner datos del formulario via POST

app.get("/", (req, res) => {
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

    //console.log(pictures);

    res.render("index", {
        numPics: pictures.length,
        pics: pictures
    });

})


app.use((req, res) => {
    res.status(404).render('404');
})

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});