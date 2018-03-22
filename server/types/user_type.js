const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const UserModel = mongoose.model('user')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    birthday: { type: GraphQLString },
    address: { type: GraphQLString },
    phone: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    avatar: { type: GraphQLString },
    role: { type: GraphQLString }
  })
})

module.exports = UserType
