const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql

const TagModel = mongoose.model('tag')

const TagType = new GraphQLObjectType({
  name: 'TagType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    count: { type: GraphQLInt }
  })
})

module.exports = TagType
