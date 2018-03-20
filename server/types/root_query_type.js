const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql

const UserType = require('./user_type')

const UserModel = mongoose.model('user')

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
    }
  })
})

module.exports = RootQuery
