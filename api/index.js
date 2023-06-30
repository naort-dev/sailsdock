import express from 'express'
import cors from 'cors'

// Require API routes
import users from './routes/post/users/users'

// Import stripe
import stripe from './routes/post/stripe/stripe.js'

// Import Droplets
import zipFilter from './routes/post/filters/zip.js'

import cutAndRun from './routes/post/deployment/cut-and-run.js'
import gitAndPush from './routes/post/deployment/git-and-push.js'
import handOverFist from './routes/post/deployment/hand-over-fist.js'

// Create express instance
const app = express()
// Import API Routes
const bodyParser = require('body-parser')
// Tell the bodyparser middleware to accept more data
// app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// app.use(bodyParser.json()) // support json encoded bodies
app.use(users)
app.use(stripe)
app.use(handOverFist)
app.use(zipFilter)
app.use(cutAndRun)
app.use(gitAndPush)

app.use(
  cors({
    origin: process.env.BASE_URL
  })
)
// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
