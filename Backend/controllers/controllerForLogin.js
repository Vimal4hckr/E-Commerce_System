const { user } = require("../schema.js");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const User = await user.findOne({ email: req.body.email });
    // console.log(User);
    if (User) {
      const pwd = User["pwd"];
      if (pwd == req.body.pwd) {
        const access_token = jwt.sign(
          { email: req.body.email },
          process.env.ACCESS_TOKEN
        );
        const refresh_token = jwt.sign(
          { email: req.body.email },
          process.env.REFRESH_TOKEN
        );
        console.log("login successful");
        res.send({ Access_token: access_token, Refresh_token: refresh_token });
      } else {
        res.send({ msg: "User invalid" });
      }
    } else {
      res.send({ msg: "user invalid" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
};

module.exports = { login };
