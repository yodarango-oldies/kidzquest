const mongoose = require('mongoose')

const reRegistrationSchema = new mongoose.Schema({
  childFirstName: {
    type: String,
    maxlength: 200,
    required: true,
  },
  childLastName: {
    type: String,
    maxlength: 200,
    required: true,
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
  checkedInOptions: {
    checkedIn: Boolean,
    checkedInTime: String,
    checkedOutTime: String,
  },
  date: Date,
  childId: {
    type: String,
    required: true,
  },
})

const Reregistration = new mongoose.model('Re-registration', reRegistrationSchema)

module.exports = Reregistration
