/**
 * @param {File|Blob} input - The file or blob to read
 * @description An async function for reader.readAsDataURL(file|blob)
 * @name asyncReadAsDataURL
 */
module.exports = function (input) {
  return new Promise((resolve, reject) => {
    if(input instanceof File || input instanceof Blob) {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve({
          uri: reader.result,
          type: input.type,
          name: input.name
        })
      }
      reader.readAsDataURL(input)
    }
    else {
      reject(null)
    }

  })
}