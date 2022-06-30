const sizeOf = require('image-size')
//const dimensions = sizeOf('cat.jpeg')
//console.log(dimensions)

const url = require('url')
const http = require('http')
//var imageSize = require("image-size")

const imgUrl = 'http://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_960_720.jpg'
const options = url.parse(imgUrl)
 
http.get(options, function (response) {
  const chunks = []
  response.on('data', function (chunk) {
    chunks.push(chunk)
  }).on('end', function() {
    const buffer = Buffer.concat(chunks)
    console.log(sizeOf(buffer))
    //console.log(buffer)
  })
})