/**
 * @param {String} uri - The src uri of the image for the size calculation
 * @description An async function for reader.readAsDataURL(file|blob)
 * @name asyncReadImageSize
 */
module.exports = function (uri) {
  return new Promise((resolve, reject) => {
    if(uri instanceof String ) {
      const image = new Image()
      image.onload = function() {
        resolve({
          height: this.height,
          width: this.width
        })
      }
      image.src = uri
    }
    else {
      reject({})
    }

  })
}