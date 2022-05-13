function logout(req, res) {
  req.session.destroy((err) => {
    if (!err) {
      res.status(200).render("signout", { userName: userName });
    }
  });
}

module.exports = logout;
