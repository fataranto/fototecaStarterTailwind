pictures = [{
        title: "Death Valley",
        URL: "https://cdn.pixabay.com/photo/2017/08/01/02/03/mountain-2562806_960_720.jpg",
        date: "2015-06-20"
    },
    {
        title: "Big Cat",
        URL: "https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_960_720.jpg",
        date: "2020-08-25"
    }
]


let existsURL = function (imgURL) {
    let result;
    // console.log(imgURL);
    pictures.filter((obj) => {
        //   console.log(pictures);
        if (obj.URL == imgURL) {
            //console.log(obj.URL);
            result = false;
            return
        }
        result = true;
    })
    return result;
}


let imgURL1 = "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg";
let imgURL2 = "https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_960_720.jpg";

console.log(existsURL(imgURL1));
console.log(existsURL(imgURL2));