//require('dotenv').config()

// server
const express = require('express')
const app = express()

// middleware
app.use(express.json({ limit: '3mb' }))

// initialize DB connection
const connDB = require('./db/connection')
const Registration = require('./db/registration-model')
const Reregistration = require('./db/reregistration-model')

connDB()

// helpers
const myTime = require('./helpers/myTime')

//  only called on wednesday registration
app.post('/register', async (req, res) => {
  const newRegistration = new Registration({ ...req.body, date: Date.now() })
  const newReRegistration = new Reregistration({ ...req.body, date: Date.now(), checkedInOptions: { checkedIn: false } })
  try {
    await newRegistration.save()
    await newReRegistration.save()
    res.status(200).send({ message: 'success' })
  } catch (error) {
    res.status(500).send(error)
  }
})

// re-register a child
app.post('/re-registration', async (req, res) => {
  const newChild = new Reregistration({ ...req.body, date: Date.now(), checkedInOptions: { checkedIn: false } })
  try {
    await newChild.save()
    res.status(200).send(newChild)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// find a child by Name
app.get('/child/:childName', async (req, res) => {
  try {
    const child = await Registration.find(
      { childFirstName: { $regex: `${req.params.childName}` } },
      { childFirstName: 1, childLastName: 1, childId: 1, _id: 1, childAge: 1 },
    )
    console.log(child)
    res.send(child)
  } catch (error) {}
})

// find a child by Id for admin page
app.get('/getchild/:childId', async (req, res) => {
  try {
    const child = await Reregistration.findOne({ childId: `${req.params.childId}` })
    res.send(child)
    console.log(child)
  } catch (error) {
    console.log(error)
  }
})

// get all the children for the admin page
app.get('/all-children', async (req, res) => {
  const children = await Reregistration.find({}, { photo: 0 }).limit(50).sort({ childFirstName: 1 }).exec()
  children
  res.send(children)
})

app.get('/findAdmin/:childName', async (req, res) => {
  try {
    const child = await Reregistration.find(
      { childFirstName: { $regex: `^${req.params.childName.toLowerCase()}` } },
      { childFirstName: 1, childLastName: 1, childId: 1, _id: 1, childAge: 1, checkedInOptions: 1 },
    )
    console.log(child)
    res.send(child)
  } catch (error) {}
})
// ===================== PUTS ============================== //
// checkedIn child
app.patch('/checkin/:id', async (req, res) => {
  try {
    await Reregistration.updateOne(
      { _id: `${req.params.id}` },
      { $set: { checkedInOptions: { checkedIn: `${req.body.status}`, checkedInTime: myTime() } } },
    )
    res.status(200)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// checkedOut child
app.patch('/checkout/:id', async (req, res) => {
  try {
    await Reregistration.updateOne(
      { _id: `${req.params.id}` },
      { $set: { checkedInOptions: { checkedIn: `${req.body.status}`, checkedOutTime: myTime() } } },
    )
    res.status(200)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))
}

app.get('/*', function (req, res) {
  res.sendFile(`${__dirname}/frontend/build/index.html`)
})

//    "sass": "sass src/styles/main.scss:src/styles/main.css --watch --no-source-map"
app.listen(process.env.PORT || 3001, () => {
  console.log(`running safely`)
})
