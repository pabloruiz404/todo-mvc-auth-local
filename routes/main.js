//This directs the flow to the controller handling homepage, login and signup.
const express = require('express')
//Setup router by declaring a variable for express router for express router method.
const router = express.Router()
//Declare variable going into controllers folder to auth.js file.
const authController = require('../controllers/auth')
//Declare variable going into controllers folder to home.js file.
const homeController = require('../controllers/home')
//Middleware ensureAuth destructuring this isn't being used in this router but will be used in todos.js router.
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Router gets URL request from user, sends that request to the home.js file in the controller folder calling the method getIndex.
router.get('/', homeController.getIndex)
//Router gets URL request from user, sends that request to the home.js file in the controller folder calling the method getIndex.
router.get('/login', authController.getLogin)
//Router gets URL request from user, sends that request to the auth.js file in the controller folder calling the method postLogin.
router.post('/login', authController.postLogin)
//Router gets URL request from user, sends that request to the auth.js file in the controller folder calling the method logout.
router.get('/logout', authController.logout)
//Router gets URL request from user, sends that request to the auth.js file in the controller folder calling the method getSignup.
router.get('/signup', authController.getSignup)
//Router gets url request from user, sends that request to the auth.js file in the controller folder calling the method postSignup.
router.post('/signup', authController.postSignup)

//Export router to be used elsewhere.
module.exports = router