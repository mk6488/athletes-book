const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get 
router.get('/', async (req, res) => {
  const collection = await scSessionCollection()
  res.send(await collection.find({}).sort({
    "sessionDate": -1
  }).toArray())
})

// router.get('/:name', async (req, res) => {
//   const collection = await scSessionCollection()
//   res.send(await collection.find({
//     athleteId: req.params.name
//   }).toArray())
// })

// Add
router.post('/', async (req, res) => {
  const collection = await scSessionCollection()
  await collection.insertOne({
    sessionDate: req.body.sessionDate,
    weekNumber: req.body.weekNumber,
    cancelled: req.body.cancelled,
    weather: req.body.weather,
    attendees: req.body.attendees,
    trainingPlan: req.body.trainingPlan,
    trainingResults: req.body.trainingResults,
    incident: req.body.incident,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update
router.put('/:id', async (req, res) => {
  const collection = await scSessionCollection()
  await collection.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      sessionDate: req.body.sessionDate,
      weekNumber: req.body.weekNumber,
      cancelled: req.body.cancelled,
      weather: req.body.weather,
      attendees: req.body.attendees,
      trainingPlan: req.body.trainingPlan,
      trainingResults: req.body.trainingResults,
      incident: req.body.incident,
      updatedAt: new Date()
    }
  })
  res.status(201).send()
})

// Delete
router.delete('/:id', async (req, res) => {
  const collection = await scSessionCollection()
  await collection.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function scSessionCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://mk6488:Mk@136041@cluster0.yxttb.mongodb.net/athletes-book?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return client.db('athletes-book').collection('sc_sessions')
}

module.exports = router