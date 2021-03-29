// Initializes the `users` service on path `/users`
const createModel = require('../../models/uploads.model')
const hooks = require('./uploads.hooks')
const blobService = require("feathers-blob");
const fs = require("fs-blob-store");
const blobStorage = fs("./assets/uploads");
const multer = require('multer');
const multipartMiddleware = multer();

module.exports = function (app) {
  const Model = createModel(app)


  
  // Initialize our service with any options it requires
  app.use(
    '/uploads',
    multipartMiddleware.single('uri'),
    function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    blobService({Model: blobStorage})
  )

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads')

  service.hooks(hooks)
}
