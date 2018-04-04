const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
  publicId: {
    type: String,
    required: true
  }
})

mongoose.model('image', ImageSchema)

module.exports = ImageSchema
