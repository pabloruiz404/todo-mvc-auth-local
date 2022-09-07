//Route that handles CRUD post get put delete routes.
const express = require('express')
//Setting up router declaring a variable for express router method.
const router = express.Router()
//Declaring a variable to go to controllers folder to todo.js.
const todosController = require('../controllers/todos') 
//Middleware ensureAuth destructuring.
const { ensureAuth } = require('../middleware/auth')

//Router gets user URL, go to the middleware folder to auth.js to check to see if the user is authenticated, go to todos.js in controller folder and call getTodos method.
router.get('/', ensureAuth, todosController.getTodos)
//Router that gets the user URL, go to todos.js file in the controller folder and call method createTodo.
router.post('/createTodo', todosController.createTodo)
//Router that gets the user URL, go to todos.js file in the controller folder and call the method markComplete.
router.put('/markComplete', todosController.markComplete)
//Router that gets the user URL, go to todos.js file in the controller folder and call the method markIncomplete.
router.put('/markIncomplete', todosController.markIncomplete)
//Router that gets the user URL, go to todos.js file in the controller folder and call the method deleteTodo.
router.delete('/deleteTodo', todosController.deleteTodo)
//Exports router to be used elsewhere.
module.exports = router