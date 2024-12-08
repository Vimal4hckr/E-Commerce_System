const {
  user,
  product,
  cart,
  wishList,
  Category,
  address,
} = require("../schema.js");

const createUser = async (req, res) => {
  const User = new user({
    userName: req.body.Uname,
    legalName: req.body.lName,
    email: req.body.email,
    pwd: req.body.pwd,
  });

  try {
    const savedUser = await User.save();
    console.log("User saved:", savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

const findUser = async (req, res) => {
  try {
    const User = await user.findById({ _id: req.body.id });
    if (User) {
      console.log("User was found", User["userName"]);
      res.send({ user: User });
    } else {
      console.log("User was not found");
    }
  } catch (error) {
    console.log("error", error);
  }
};

const findUserbyemail = async (req, res) => {
  try {
    
    const User = await user.findOne({ email: req.params.email });
    if (User) {
      console.log("User was found", User["userName"]);
      res.send({ user: User });
    } else {
      console.log("User was not found");
    }
  } catch (error) {
    console.log("error", error);
  }
};
const updateUser = async (req, res) => {
  try {
    const User = await user.findByIdAndUpdate({ _id: req.body.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (User) {
      console.log("Updated successfully");
      res.send({ msg: User });
    } else {
      console.log("not updated");
    }
  } catch (error) {
    console.log("error", error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.body.id);

    if (deletedUser) {
      console.log("Successfully deleted");
      res.status(200).json({ message: "User successfully deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  createUser,
  findUser,
  updateUser,
  deleteUser,
  findUserbyemail,
};
