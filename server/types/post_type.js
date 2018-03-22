const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

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
    images: { type: new GraphQLList(GraphQLString) },
    createdAt: {
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
    }
  })
})

module.exports = PostType
