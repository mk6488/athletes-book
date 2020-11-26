const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get 
router.get('/', async (req, res) => {
  const collection = await wellnessCollection()
  res.send(await collection.find({}).toArray())
})

// Add
router.post('/', async (req, res) => {
  const collection = await wellnessCollection()
  await collection.insertOne({
    athlete: req.body.athlete,
    sleep: req.body.sleep,
    stress: req.body.stress,
    fatigue: req.body.fatigue,
    soreness: req.body.soreness,
    nutrition: req.body.nutrition,
    average: req.body.average,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update
router.put('/:id', async (req, res) => {
  const collection = await wellnessCollection()
  await collection.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      sleep: req.body.sleep,
      stress: req.body.stress,
      fatigue: req.body.fatigue,
      soreness: req.body.soreness,
      nutrition: req.body.nutrition,
      average: req.body.average,
      updatedAt: new Date()
    }
  })
  res.status(201).send()
})

// Delete
router.delete('/:id', async (req, res) => {
  const collection = await wellnessCollection()
  await collection.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function wellnessCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://mk6488:Mk@136041@cluster0.yxttb.mongodb.net/athletes-book?retryWrites=true&w=majority', {
    useNewUrlParser: true
  })

  return client.db('athletes-book').collection('wellness')
}

module.exports = router