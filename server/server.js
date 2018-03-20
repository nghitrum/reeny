//  register models
require('./models/db')

const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

// Set up mongolab database
const MONGO_URI = 'mongodb://admin:admin@ds219879.mlab.com:19879/reenydb'
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI')
}

mongoose.connect(MONGO_URI)
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

//  Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  '/graphql',
  expressGraphQL({
    graphiql: true,
    schema
  })
)

app.listen(4000, () => console.log('Express server is running on port 4000'))
