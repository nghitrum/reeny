const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  upVote: {
    type: Number,
    default: 0
  },
  downVote: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    required: true
  }
})

CommentSchema.statics.upVote = function (args) {
  const CommentModel = mongoose.model('comment')
  return CommentModel.findById(args.comment).then(comment => {
    ++comment.upVote
    return comment.save()
  })
}

CommentSchema.statics.downVote = function (args) {
  const CommentModel = mongoose.model('comment')
  return CommentModel.findById(args.comment).then(comment => {
    ++comment.downVote
    return comment.save()
  })
}

mongoose.model('comment', CommentSchema)

module.exports = CommentSchema
