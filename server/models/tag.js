const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
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
