const express = require('express');
//const path = require('path');
const fs = require('fs');
const url = require('url');  
const app = express();

const {
    getPaletteFromURL
} = require('color-thief-node');


const pictures = JSON.parse(fs.readFileSync('./photospallete.json'));

const isImageURL = require('image-url-validator').default;

let imgURL;


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

//creates an id number for a new image 
nextId = function () {
    const ids = pictures.map(obj => {
        return obj.id;
    });
    const nextId = Math.max(...ids) + 1;
    return nextId;
}

//creates a color pallete for every image
const myColorPallete = (async (imageURL) => {
    const colorPallete = await getPaletteFromURL(imageURL);
    //console.log(colorPallete);

    return colorPallete;

});


//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use(express.urlencoded({
    extended: false
})); //get data from form via POST

app.get("/", (req, res) => {
    sortPics();
    res.render("index", {
        numPics: pictures.length,
        pics: pictures,
        page_name: 'home'
    });
})

app.get("/upload", (req, res) => {

   // console.log(req.query);
    //let error = 0;
   let errorCode = req.query.error;
   let error = errorCode;
//   let message;

/*     if (errorCode){

        if(errorCode == 1){
            message = `Something went wrong. It seems that the URL ${imgURL} is not a valid image`;
        } else {
            message = `That's a very nice photo, but the URL: ${imgURL} is already in our database`;
        }

        console.log(message);
    }else{
        console.log("no query, body");
    } */


//console.log(error);
    res.render("form", {
        page_name: 'upload', //siempre tiene que ser un objeto, incluso si es solo una variable
        error: error,
        imgURL: imgURL
    });
})

/* app.get("/error", (req, res) => {
    res.render("404");
})
 */
app.get("/update", (req, res) => {
    //console.log(req.query);
    const q = req.query.q;
    const id = req.query.id;
    //res.send(id);

    if (q == "delete") {
        pictures.filter((obj, i) => {
            if (obj.id == id) {
                pictures.splice(i, 1)
            }
            return
        })
    }

    if (q == "update") {
        const title = req.query.title;
        const date = req.query.date;
        console.log(q,id,title,date);
        pictures.filter((obj, i) => {
            if (obj.id == id) {
                pictures[i].title = title;
                pictures[i].date = date;
            }
            return
        })
    }


    let data = JSON.stringify(pictures, null, 2);
    fs.writeFileSync('photospallete.json', data);

    res.redirect("/");

    //console.log(pictures);
})

app.post('/imgupload', async function (req, res) {

    let error = 0;
    imgURL = req.body.url

    let isImage = await isImageURL(imgURL).then(is_image => {
        if (!is_image) {
            error = 1;
        }
        return is_image
    });


    let notInDataBase = true;

//console.log("isImage", isImage);

    pictures.filter((obj, i) => {
        if (obj.URL == imgURL) {
            //console.log("imagen repetida: ", imgURL);
            notInDataBase = false
            error = 2;
        }

    })

    //console.log("notInDataBase", notInDataBase);

    if (isImage && notInDataBase) {
        let cPallete = await myColorPallete(imgURL);

        let myNewPic = {
            id: nextId(),
            title: req.body.title,
            URL: imgURL,
            date: req.body.date,
            pallete: cPallete
        }

        pictures.push(myNewPic);

        let data = JSON.stringify(pictures, null, 2);
        fs.writeFileSync('photospallete.json', data);

        res.redirect("/");
    } else {
        //res.redirect("/upload");
        res.redirect(url.format({
            pathname:"/upload",
            query: {
               "error":error
             }
          }));
    }

});






app.use((req, res) => {
    res.status(404).render('404');
})

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});