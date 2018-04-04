const apolloUploadExpress = require('apollo-upload-server')
//  register models
require('./models/db')

const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const bodyParser = require('body-parser')

const path = require('path')
const http = require('http')

const cors = require('cors')

//  API
const api = require('./routes/api')

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

//  API location
app.use('/api', cors(), api)

app.use(
  '/graphql',
  cors(),
  apolloUploadExpress.apolloUploadExpress({ uploadDir: './upload' }),
  expressGraphQL({
    graphiql: true,
    schema
  })
)

app.listen(4000, () => console.log('Express server is running on port 4000'))
