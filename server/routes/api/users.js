const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get
router.get('/', async (req, res) => {
  const collection = await userCollection()
  res.send(await collection.find({
    "active": true
  }).sort({
    "lastName": 1
  }).toArray())
})

router.get('/athletes', async (req, res) => {
  const collection = await userCollection()
  res.send(await collection.find({
    "member": "athlete",
    "active": true
  }).sort({
    "lastName": 1
  }).toArray())
})

router.get('/coaches', async (req, res) => {
  const collection = await userCollection()
  res.send(await collection.find({
    "member": "coach",
    "active": true
  }).sort({
    "lastName": 1
  }).toArray())
})

// Add
router.post('/', async (req, res) => {
  const collection = await userCollection()
  await collection.insertOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    squad: req.body.squad,
    current: req.body.current,
    refLoad: req.body.refLoad,
    dofe: req.body.dofe,
    dob: req.body.dob,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update
router.put('/:id', async (req, res) => {
  const collection = await userCollection()
  await collection.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      squad: req.body.squad,
      current: req.body.current,
      refLoad: req.body.refLoad,
      dofe: req.body.dofe,
      dob: req.body.dob,
      updatedAt: new Date()
    }
  })
  res.status(201).send()
})

// Delete
router.delete('/:id', async (req, res) => {
  const collection = await userCollection()
  await collection.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function userCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://mk6488:Mk@136041@cluster0.yxttb.mongodb.net/athletes-book?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return client.db('athletes-book').collection('users')
}

module.exports = router