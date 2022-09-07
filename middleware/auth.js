//Check to see if the user is authenticated and continue using next()
//Allows us to force a redirect to home page if unathenticated user tries to manually type in the URL.
module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
  }
  