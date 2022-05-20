module.exports = (req, res) => {
  res.status(200).send("<h1>/reg/(.*) => /api/\\1</h1>");
};
