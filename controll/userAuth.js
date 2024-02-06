const authMiddleware = (req, res, next) => {
    if(!req.session.user) {
        // user is not logged in
        return res.status(401).json( { message : "Unauthorized access"})
    }
    // user is logged in, proceed to next middleware or routehandler
  next()
}

module.exports = authMiddleware;