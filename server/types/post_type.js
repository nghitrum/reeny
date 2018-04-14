const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql

const PostModel = mongoose.model('post')
const UserModel = mongoose.model('user')
const TagModel = mongoose.model('tag')
const UserType = require('./user_type')
const TagType = require('./tag_type')

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parentValue) {
        return TagModel.find({ _id: parentValue.tags }, (err, res) => {
          return res
        })
      }
    },
    rating: { type: GraphQLInt },
    upVote: { type: GraphQLInt },
    downVote: { type: GraphQLInt },
    images: { type: new GraphQLList(GraphQLString) },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve(parentValue) {
        return PostModel.findOne(parentValue)
          .populate('user')
          .then(post => {
            return post.user
          })
      }
    },
    upVotedBy: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return UserModel.find({ _id: parentValue.upVotedBy }, (err, res) => {
          return res
        })
      }
    },
    downVotedBy: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return UserModel.find({ _id: parentValue.downVotedBy }, (err, res) => {
          return res
        })
      }
    }
  })
})

module.exports = PostType
