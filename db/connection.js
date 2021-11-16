const mongoose = require('mongoose')

const connDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_DB_KEY}`)
    console.log(`You are connected to ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connDB
