module.exports = (req, res) => {
  res.status(200).send("<h1>/test/(.*) => /api/test</h1>");
};
