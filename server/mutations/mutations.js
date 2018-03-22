const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const mongoose = require('mongoose')

const UserModel = mongoose.model('user')
const UserType = require('./../types/user_type')

const TagModel = mongoose.model('tag')
const TagType = require('./../types/tag_type')

const PostModel = mongoose.model('post')
const PostType = require('./../types/post_type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return new UserModel(args).save()
      }
    },
    addTag: {
      type: TagType,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return new TagModel(args).save()
      }
    },
    addPost: {
      type: PostType,
      args: {
        title: {
          type: GraphQLString
        },
        content: {
          type: GraphQLString
        },
        tags: {
          type: new GraphQLList(GraphQLString)
        },
        images: { type: new GraphQLList(GraphQLString) },
        user: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        PostModel.plusTag(args.tags)
        return new PostModel(args).save()
      }
    }
  }
})

module.exports = mutation
