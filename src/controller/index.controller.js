function index(_req, res) {
  try {
    return res.status(200).render("main", {userName: userName});
  } catch (e) {
    return res.status(500).json({
      message: "Server is not online",
    });
  }
}

module.exports = index;
