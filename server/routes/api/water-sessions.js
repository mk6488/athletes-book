const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get 
router.get('/', async (req, res) => {
  const collection = await waterSessionCollection()
  res.send(await collection.find({}).sort({
    "sessionDate": -1
  }).toArray())
})

// router.get('/:name', async (req, res) => {
//   const collection = await waterSessionCollection()
//   res.send(await collection.find({
//     athleteId: req.params.name
//   }).toArray())
// })

// Add
router.post('/', async (req, res) => {
  const collection = await waterSessionCollection()
  await collection.insertOne({
    sessionDate: req.body.sessionDate,
    cancelled: req.body.cancelled,
    weather: req.body.weather,
    launch1: req.body.launch1,
    launch2: req.body.launch2,
    boat1: req.body.boat1,
    boat2: req.body.boat2,
    boat3: req.body.boat3,
    boat4: req.body.boat4,
    boat5: req.body.boat5,
    boat6: req.body.boat6,
    boat7: req.body.boat7,
    boat8: req.body.boat8,
    boat9: req.body.boat9,
    outingPlan: req.body.outingPlan,
    trainingResults: req.body.trainingResults,
    nextOuting: req.body.nextOuting,
    incident: req.body.incident,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update
router.put('/:id', async (req, res) => {
  const collection = await waterSessionCollection()
  await collection.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      sessionDate: req.body.sessionDate,
      cancelled: req.body.cancelled,
      weather: req.body.weather,
      launch1: req.body.launch1,
      launch2: req.body.launch2,
      boat1: req.body.boat1,
      boat2: req.body.boat2,
      boat3: req.body.boat3,
      boat4: req.body.boat4,
      boat5: req.body.boat5,
      boat6: req.body.boat6,
      boat7: req.body.boat7,
      boat8: req.body.boat8,
      boat9: req.body.boat9,
      outingPlan: req.body.outingPlan,
      trainingResults: req.body.trainingResults,
      nextOuting: req.body.nextOuting,
      incident: req.body.incident,
      updatedAt: new Date()
    }
  })
  res.status(201).send()
})

// Delete
router.delete('/:id', async (req, res) => {
  const collection = await waterSessionCollection()
  await collection.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function waterSessionCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://mk6488:Mk@136041@cluster0.yxttb.mongodb.net/athletes-book?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return client.db('athletes-book').collection('water_sessions')
}

module.exports = router