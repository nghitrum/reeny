const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  count: {
    type: Number,
    default: 1,
    min: 0
  }
})

TagSchema.statics.plus = function(id) {
  const TagModel = mongoose.model('tag')
  return TagModel.findById(id).then(tag => {
    ++tag.count
    return tag.save()
  })
}

mongoose.model('tag', TagSchema)

module.exports = TagSchema
