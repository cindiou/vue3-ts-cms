module.exports = (req, res) => {
  // res.json({
  //   name: "cindiou",
  //   age: 18,
  // });
  // res.type("html");
  console.log("res=", res);
  console.log("req=", req);
  res.status(200).send("<h1>Hello,World!</h1>");
};
