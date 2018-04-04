const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql

const CommentModel = mongoose.model('comment')
const PostModel = mongoose.model('post')
const UserModel = mongoose.model('user')
const UserType = require('./user_type')
const PostType = require('./post_type')

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    upVote: { type: GraphQLInt },
    downVote: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parentValue) {
        return CommentModel.findOne(parentValue)
          .populate('user')
          .then(comment => {
            return comment.user
          })
      }
    },
    post: {
      type: PostType,
      resolve(parentValue) {
        return CommentModel.findOne(parentValue)
          .populate('post')
          .then(comment => {
            return comment.post
          })
      }
    }
  })
})

module.exports = CommentType
