const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
  childFirstName: {
    type: String,
    maxlength: 200,
    required: true,
    lowercase: true,
  },
  childLastName: {
    type: String,
    maxlength: 200,
    required: true,
    lowercase: true,
  },
  childAge: {
    type: String,
    maxlength: 5,
    required: true,
  },
  guardianName: {
    type: String,
    maxlength: 200,
    required: true,
    lowercase: true,
  },
  guardianPhoneNumber: {
    type: String,
    maxlength: 15,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  date: Date,
  childId: {
    type: String,
    required: true,
  },
})

const Registration = new mongoose.model('registration', registrationSchema)

module.exports = Registration
