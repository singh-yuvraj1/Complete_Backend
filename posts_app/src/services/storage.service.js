const { Image } = require('@imagekit/react');

const imagekit = new Image({
  privatekey : process.env.IMAGEKIT_API
})


async function uploadFile(buffer){
    
}