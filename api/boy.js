module.exports = (req, res) => {
  res.type("html");
  res.status(200).send("<h1>Hello,World!</h1>");
};
