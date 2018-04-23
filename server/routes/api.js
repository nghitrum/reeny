var express = require('express')
var router = express.Router()
var multer = require('multer')
var fs = require('fs')

var cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'nghitrum',
  api_key: '976491879598353',
  api_secret: 'yJq3sRZJPfn5s2Sp3x1ixw9qzOk'
})

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

var upload = multer({
  storage: storage
})

router.post('/upload/image', upload.single('myFile'), function(req, res) {
  cloudinary.v2.uploader.upload(
    req.file.path,
    {
      folder: 'reeny'
    },
    function(error, result) {
      // console.log(result)
      fs.unlinkSync(req.file.path)
      res.status(201).json({
        result
      })
    }
  )
})

router.delete('/delete/image/reeny/:public_id', function(req, res) {
  const id = 'reeny/' + req.params.public_id
  cloudinary.v2.uploader.destroy(id, function(error, result) {
    console.log(result)
  })
})

module.exports = router
