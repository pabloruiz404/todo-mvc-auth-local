//Connecting to our database using mongoose.
const mongoose = require('mongoose')

//Async function using mongoose to connect to our DB.
//The try bock is a bit outdated and normally use
//Const conn = await mongoose.connect(
  //process.env.DB_STRING
//)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    //If connection is succcessful log to console connected.
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    //If connection fails log error to console.
    console.error(err)
    //Close the program.
    process.exit(1)
  }
}
//Export the function connectDB so that we can all it in server.js to connect to our database.
module.exports = connectDB
