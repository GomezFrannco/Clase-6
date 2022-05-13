function auth(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    return res.status(400).redirect("/login");
  }
}

module.exports = auth;
