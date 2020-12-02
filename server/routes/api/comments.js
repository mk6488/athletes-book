const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get 
router.get('/', async (req, res) => {
  const collection = await commentCollection()
  res.send(await collection.find({}).sort({
    "commentDate": -1
  }).toArray())
})

// Add
router.post('/', async (req, res) => {
  const collection = await commentCollection()
  await collection.insertOne({
    athleteId: req.body.athleteId,
    commentDate: req.body.commentDate,
    weekNumber: req.body.weekNumber,
    athleteName: req.body.athleteName,
    commentType: req.body.commentType,
    comment: req.body.comment,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update
router.put('/:id', async (req, res) => {
  const collection = await commentCollection()
  await collection.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      commentDate: req.body.commentDate,
      weekNumber: req.body.weekNumber,
      commentType: req.body.commentType,
      comment: req.body.comment,
      updatedAt: new Date()
    }
  })
  res.status(201).send()
})

// Delete
router.delete('/:id', async (req, res) => {
  const collection = await commentCollection()
  await collection.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function commentCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://mk6488:Mk@136041@cluster0.yxttb.mongodb.net/athletes-book?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return client.db('athletes-book').collection('comments')
}

module.exports = router