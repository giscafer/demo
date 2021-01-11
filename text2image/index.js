const textToImage = require('text-to-image');
textToImage.generate('leekhub.com').then((dataUri) => {
  console.log(dataUri);
});
