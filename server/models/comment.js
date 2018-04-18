const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    max: 500
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
  },
  upVotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  downVotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
})

CommentSchema.statics.upVote = function(args) {
  const CommentModel = mongoose.model('comment')
  return CommentModel.findById(args.comment).then(comment => {
    // ++comment.upVote
    comment.upVotedBy.push(args.user)
    comment.upVote = comment.upVotedBy.length

    var index = comment.downVotedBy.indexOf(args.user)
    if (index > -1) {
      comment.downVotedBy.splice(index, 1)
      comment.downVote = comment.downVotedBy.length
    }

    return comment.save()
  })
}

CommentSchema.statics.downVote = function(args) {
  const CommentModel = mongoose.model('comment')
  return CommentModel.findById(args.comment).then(comment => {
    // ++comment.downVote
    comment.downVotedBy.push(args.user)
    comment.downVote = comment.downVotedBy.length

    var index = comment.upVotedBy.indexOf(args.user)
    if (index > -1) {
      comment.upVotedBy.splice(index, 1)
      comment.upVote = comment.upVotedBy.length
    }

    return comment.save()
  })
}

mongoose.model('comment', CommentSchema)

module.exports = CommentSchema
