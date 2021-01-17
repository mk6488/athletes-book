const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

const trainingLoads = require('./routes/api/training-loads')
const athletes = require('./routes/api/athletes')
const users = require('./routes/api/users')
const wellness = require('./routes/api/wellness')
const tests = require('./routes/api/tests')
const comments = require('./routes/api/comments')
const waterSessions = require('./routes/api/water-sessions')
const ergSessions = require('./routes/api/erg-sessions')
const scSessions = require('./routes/api/sc-sessions')

app.use('/api/training-loads', trainingLoads)
app.use('/api/users', users)
app.use('/api/athletes', athletes)
app.use('/api/wellness', wellness)
app.use('/api/tests', tests)
app.use('/api/comments', comments)
app.use('/api/water-sessions', waterSessions)
app.use('/api/erg-sessions', ergSessions)
app.use('/api/sc-sessions', scSessions)

// Handle production
if (process.env.node_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'))

  // Handle SPA (single page application)
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))