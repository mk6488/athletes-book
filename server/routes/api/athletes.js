const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get 
router.get('/', async (req, res) => {
  const collection = await loadCollection()
  res.send(await collection.find({}).toArray())
})

// Add
router.post('/', async (req, res) => {
  const collection = await loadCollection()
  await collection.insertOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    createdAt: new Date()
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

  return client.db('athletes-book').collection('athletes')
}

module.exports = router