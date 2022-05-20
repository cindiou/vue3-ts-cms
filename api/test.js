module.exports = (req, res) => {
  // res.json({
  //   name: "cindiou",
  //   age: 18,
  // });
  res.status(200).type("html").send("<h1>Hello,World!</h1>");
};
