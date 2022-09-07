//Server.js runs on startup and requires all mvc and middleware acting as both controller and router. As controller, it acts as the brain that controls the application. As, Router, it inherits all routing from the router directing from home url to files in folders shown in our dependacies below.
const express = require('express')
const app = express()
//Mongoose connects to mongodb alling us to use understandable methods.
const mongoose = require('mongoose')
//Passport.js is acting as user authentication.
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
//Flash is being used as a message success/warning/error system.
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
//Declared variable directing to the main.js file in the routes folder.
const mainRoutes = require('./routes/main')
//Declared variable directing to the todo.js file in the routes folder.
const todoRoutes = require('./routes/todos')

//Initializing our hidden path .env and guilding to the .env file in config folder.
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()
//Templating language aka view engine that renders our HTML.
app.set('view engine', 'ejs')
//Sets location for static assets in the public folder for client side rendering images, css, and js event listeners.
app.use(express.static('public'))
//Replaces body-parser.
app.use(express.urlencoded({ extended: true }))
//Parses JSON content from incoming requests.
app.use(express.json())
//Express morgan middleware.
app.use(logger('dev'))

// Sessions
//Creates and stores user login in the database as a collection named sessions.
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
//Helps with authentication and cookies.
app.use(passport.initialize())
app.use(passport.session())

//Initialize express flash messages.
app.use(flash())

//Server.js is acting as a reouter listening to user URL going ot home page'/' calls the variable declared at the beginning of server.js directing us to main.js in routes folder.
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
//Initialize or setting up our port in this case localhost:4263 found in .env file
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    