const graphql = require('graphql')
const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = graphql

const UploadType = new GraphQLInputObjectType({
  name: 'UploadType',
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    size: { type: GraphQLInt },
    path: { type: GraphQLString }
  })
})

module.exports = UploadType
