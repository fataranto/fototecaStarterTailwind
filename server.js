/*   APP SETTINGS        */
const express = require('express');
//const path = require('path');
const fs = require('fs');
const url = require('url');
const app = express();

const {
    getPaletteFromURL
} = require('color-thief-node');


const pictures = JSON.parse(fs.readFileSync('./photos.json'));
const isImageURL = require('image-url-validator').default;

const probe = require('probe-image-size');

let imgURL, error, imgData;


app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(express.urlencoded({
    extended: false
})); //get data from form via POST



/* sort pictures by date */
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

/* creates an id number for a new image  */
nextId = function () {
    const ids = pictures.map(obj => {
        return obj.id;
    });

    let nextId;

    if (ids.length == 0) {
        nextId = 1
    } else {
        nextId = Math.max(...ids) + 1;
    };
    return nextId;

}

/* check if new image URL already exists*/
/* let existsURL = function (imgURL) {
    let result;
    // console.log(imgURL);
    pictures.filter((obj) => {
        //   console.log(pictures);
        if (obj.URL == imgURL) {
            //console.log(obj.URL);
            result = true;
            error = 1
            return
        }
        result = false;
        error = 0;
    })
    return result;
} */


function checkURL(pics) {
    //console.log("pics = ", pics.URL);
    //console.log("url = ", imgURL);
    return pics.URL == imgURL;
}

//validate if url refers to an image
/* async function isValidImage() {
    let isImage = await isImageURL(imgURL).then(is_image => {

        //console.log("isImage: ", isImage); 
        return is_image
    });

} */


/* creates a color pallete for every image */
const myColorPallete = (async (imageURL) => {
    const colorPallete = await getPaletteFromURL(imageURL);
    return colorPallete;
});




/*      ENDPOINTS      */
/* index */
app.get("/", (req, res) => {
    if (pictures.length == 0) {
        res.render("nodata");
    } else {
        sortPics();
        res.render("index", {
            numPics: pictures.length,
            pics: pictures,
            page_name: 'home'
        });
    }
})

/* add picture section */
app.get("/upload", (req, res) => {

    let errorCode = req.query.error;
    let error = errorCode;

    res.render("form", {
        page_name: 'upload',
        error: error,
        imgURL: imgURL
    });
})


/* upload a new image */
app.post('/imgupload', async function (req, res) {

    imgURL = req.body.url
    error = 0;


    //validate if url is already in our "database"


    //let isInDataBase = existsURL(imgURL);

    let isInDataBase = pictures.some(checkURL);

    console.log("isInDataBase: ", isInDataBase);

    if (isInDataBase) {
        error = 1;
    } else {
        //validate if url refers to an image
        let isImage = await isImageURL(imgURL).then(is_image => {
            return is_image
        });
        console.log("isImage: ", isImage);
        if (!isImage) {
            error = 2;
        } else {
            //validate if image size is not too big
            imgData = await probe(imgURL);

            if (imgData.length > 1000000) {
                error = 3;
            }
        }
    }

    console.log("error después de validaciones: ", error);


    if (error == 0) {
        let cPallete = await myColorPallete(imgURL);

        let myNewPic = {
            id: nextId(),
            title: req.body.title,
            URL: imgURL,
            date: req.body.date,
            pallete: cPallete,
            size: imgData.length,
            width: imgData.width,
            height: imgData.height
        }

        pictures.push(myNewPic);

        let data = JSON.stringify(pictures, null, 2);
        fs.writeFileSync('photos.json', data);

        res.redirect("/");
    } else {
        console.log("error before redirect: ", error);
        res.redirect(url.format({
            pathname: "/upload",
            query: {
                "error": error
            }
        }));
    }
});


/* modify (title o date) or delete an image */
app.get("/update", (req, res) => {
    const q = req.query.q;
    const id = req.query.id;

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
        pictures.filter((obj, i) => {
            if (obj.id == id) {
                pictures[i].title = title;
                pictures[i].date = date;
            }
            return
        })
    }

    let data = JSON.stringify(pictures, null, 2);
    fs.writeFileSync('photos.json', data);

    res.redirect("/");
})

app.use((req, res) => {
    res.status(404).render('404');
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});