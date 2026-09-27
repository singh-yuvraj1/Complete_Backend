const ImageKit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
      privatekey : process.env.IMAGEKIT_API
})

async function uploadFile(buffer){
  const result = await imagekit.file.upload({
    file : buffer.toString("base64"),
    fileName : "image.jpg"
  });
  return result;
}
module.exports = uploadFile;