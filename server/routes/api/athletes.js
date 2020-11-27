const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get 
router.get('/', async (req, res) => {
  const collection = await athleteCollection()
  res.send(await collection.find({}).sort({
    "firstName": 1
  }).toArray())
})

// Add
router.post('/', async (req, res) => {
  const collection = await athleteCollection()
  await collection.insertOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update
router.put('/:id', async (req, res) => {
  const collection = await athleteCollection()
  await collection.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      updatedAt: new Date()
    }
  })
  res.status(201).send()
})

// Delete
router.delete('/:id', async (req, res) => {
  const collection = await athleteCollection()
  await collection.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function athleteCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://mk6488:Mk@136041@cluster0.yxttb.mongodb.net/athletes-book?retryWrites=true&w=majority', {
    useNewUrlParser: true
  })

  return client.db('athletes-book').collection('athletes')
}

module.exports = router