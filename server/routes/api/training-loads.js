const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get 
router.get('/', async (req, res) => {
  const collection = await loadCollection()
  res.send(await collection.find({}).sort({
    "trainingDate": -1
  }).toArray())
})

// Add
router.post('/', async (req, res) => {
  const collection = await loadCollection()
  await collection.insertOne({
    athleteId: req.body.athleteId,
    trainingDate: req.body.trainingDate,
    weekNumber: req.body.weekNumber,
    athleteName: req.body.athleteName,
    type: req.body.type,
    duration: req.body.duration,
    rpe: req.body.rpe,
    load: req.body.load,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update
router.put('/:id', async (req, res) => {
  const collection = await loadCollection()
  await collection.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      trainingDate: req.body.trainingDate,
      weekNumber: req.body.weekNumber,
      type: req.body.type,
      duration: req.body.duration,
      rpe: req.body.rpe,
      load: req.body.load,
      updatedAt: new Date()
    }
  })
  res.status(201).send()
})

// Delete
router.delete('/:id', async (req, res) => {
  const collection = await loadCollection()
  await collection.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function loadCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://mk6488:Mk@136041@cluster0.yxttb.mongodb.net/athletes-book?retryWrites=true&w=majority', {
    useNewUrlParser: true
  })

  return client.db('athletes-book').collection('training-loads')
}

module.exports = router