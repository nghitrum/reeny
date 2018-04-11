const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag',
      required: true
    }
  ],
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5
  },
  upVote: {
    type: Number,
    default: 0
  },
  downVote: {
    type: Number,
    default: 0
  },
  images: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
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

PostSchema.statics.upVote = function(args) {
  const PostModel = mongoose.model('post')
  return PostModel.findById(args.post).then(post => {
    // ++post.upVote
    post.upVotedBy.push(args.user)
    post.upVote = post.upVotedBy.length

    var index = post.downVotedBy.indexOf(args.user)
    if (index > -1) {
      post.downVotedBy.splice(index, 1)
      post.downVote = post.downVotedBy.length
    }

    return post.save()
  })
}

PostSchema.statics.downVote = function(args) {
  const PostModel = mongoose.model('post')
  return PostModel.findById(args.post).then(post => {
    // ++post.downVote
    post.downVotedBy.push(args.user)
    post.downVote = post.downVotedBy.length

    var index = post.upVotedBy.indexOf(args.user)
    if (index > -1) {
      post.upVotedBy.splice(index, 1)
      post.upVote = post.upVotedBy.length
    }

    return post.save()
  })
}

PostSchema.statics.plusTag = function(tags) {
  const TagModel = mongoose.model('tag')

  tags.forEach(element => {
    return TagModel.findById(element).then(tag => {
      tag.count++
      return tag.save()
    })
  })
}

mongoose.model('post', PostSchema)

module.exports = PostSchema
