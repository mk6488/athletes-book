const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

const trainingLoads = require('./routes/api/training-loads')

app.use('/api/training-loads', trainingLoads)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))