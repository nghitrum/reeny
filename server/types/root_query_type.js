const mongoose = require('mongoose')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt
} = graphql

const TagType = require('./tag_type')
const UserType = require('./user_type')
const PostType = require('./post_type')
const CommentType = require('./comment_type')

const UserModel = mongoose.model('user')
const PostModel = mongoose.model('post')
const TagModel = mongoose.model('tag')
const CommentModel = mongoose.model('comment')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return UserModel.find({})
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return UserModel.findById(id)
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return PostModel.find({})
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return PostModel.findById(id)
      }
    },
    tag: {
      type: TagType,
      resolve(parentValue, { id }) {
        return TagModel.findById(id)
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      args: { number: { type: GraphQLInt } },
      resolve(parentValue, { number }) {
        return TagModel.find({})
          .sort({ count: 'desc' })
          .limit(number)
      }
    },
    allTags: {
      type: new GraphQLList(TagType),
      resolve() {
        return TagModel.find({}).sort({ count: 'desc' })
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: {
        post: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { post }) {
        return CommentModel.find({ post })
      }
    }
  })
})

module.exports = RootQuery
