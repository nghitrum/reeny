const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLScalarType
} = graphql

const mongoose = require('mongoose')

const UserModel = mongoose.model('user')
const UserType = require('./../types/user_type')

const TagModel = mongoose.model('tag')
const TagType = require('./../types/tag_type')

const PostModel = mongoose.model('post')
const PostType = require('./../types/post_type')

const UploadType = require('./../types/upload_type')

const err = require('./../constants/error')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        let user = UserModel.findOne({ username: args.username })
        if (!user) {
          return new Error(2)
        }
        user = UserModel.findOne({ email: args.email })
        if (!user) {
          return new Error(3)
        }
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
          type: new GraphQLList(GraphQLID)
        },
        rating: {
          type: GraphQLInt
        },
        images: { type: new GraphQLList(GraphQLString) },
        user: {
          type: GraphQLID
        }
      },
      resolve(parentValue, args) {
        PostModel.plusTag(args.tags)
        return new PostModel(args).save()
      }
    },
    login: {
      type: UserType,
      args: {
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      async resolve(parentValue, args) {
        const user = await UserModel.findOne({ username: args.username })
        if (!user) {
          return new Error(0)
        }

        const check = await user.comparePassword(args.password)

        if (!check) {
          return new Error(1)
        }
        return user
      }
    }
  }
})

module.exports = mutation
