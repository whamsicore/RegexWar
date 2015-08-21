

var isAuth = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.status(401).send();
}

module.exports = {
  isAuth: isAuth,
}