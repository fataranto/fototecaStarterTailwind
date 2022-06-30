var requestImageSize = require("request-image-size")

const options = {
  url: 'http://nodejs.org/images/logo.png',
  headers: {
    'User-Agent': 'request-image-size'
  }
};

requestImageSize(options)
.then(size => console.log(size))
.catch(err => console.error(err));