const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get 
router.get('/', async (req, res) => {
  const collection = await testCollection()
  res.send(await collection.find({}).sort({
    "testDate": -1
  }).toArray())
})

// Add
router.post('/', async (req, res) => {
  const collection = await testCollection()
  await collection.insertOne({
    athleteId: req.body.athleteId,
    testDate: req.body.testDate,
    weekNumber: req.body.weekNumber,
    athleteName: req.body.athleteName,
    test: req.body.test,
    result: req.body.result,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update
router.put('/:id', async (req, res) => {
  const collection = await testCollection()
  await collection.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      testDate: req.body.testDate,
      weekNumber: req.body.weekNumber,
      test: req.body.test,
      result: req.body.result,
      updatedAt: new Date()
    }
  })
  res.status(201).send()
})

// Delete
router.delete('/:id', async (req, res) => {
  const collection = await testCollection()
  await collection.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function testCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://mk6488:Mk@136041@cluster0.yxttb.mongodb.net/athletes-book?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return client.db('athletes-book').collection('tests')
}

module.exports = router