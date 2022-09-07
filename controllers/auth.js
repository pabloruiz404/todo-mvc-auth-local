//The reason the success flash message doesn't appear is because we are (1) being sent to the todos ejs page, which has on EJS to render locals.messages.success - so EJS got it, but didn't render it.
const passport = require('passport')
const validator = require('validator')
//Declaring a variable that is pulled from user.js in our models folder.
const User = require('../models/User')

//When user clicks on login button on homepage, it renders the login page. If they are already logged in, it will send them to the todo page.
 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/todos')
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
  //The first time the user fills out the login form new user and password being checked by the validator.
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    //Authenticate user against what is already stored in the database.
    //If authentication fails, it will redirect to the login page.
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      //If authentication succeeds, it will send the user to the todos page.
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/todos')
      })
    })(req, res, next)
  }
  
  //Logs out the user, destroys the session and redirects to the homepage.
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  //Redirects user to signup page.
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/todos')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  //Check new user signup info to validate user inputs.
  //Check if email is an email using @, password is at least 8 characters in length, and confirm both entries of password match.
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    //Create new user inside user collection using our user model where the encryption is handled.
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    //If user already exits, warn user account already exists via flash message.
    User.findOne({
      $or: [
        {email: req.body.email},
        {userName: req.body.userName}
      ]
    }, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      //If user doesn't already exist, save new user and send them to the todo page.
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/todos')
        })
      })
    })
  }