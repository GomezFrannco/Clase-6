function postLogin(req, res) {
  const { user } = req.body
  userName = user
  req.session.login = true;
  return res.status(200).redirect("/");
}
function user(req, _res, next) {
  const { user } = req.body
  userName = user
  next()
}
function getLogin(_req, res) {
  res.status(200).render("logForm", { layout: "login" });
}

module.exports = {
  getLogin,
  postLogin,
  user
};
