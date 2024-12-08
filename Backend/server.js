const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUser,
  updateUser,
  deleteUser,
  findUserbyemail,
} = require("./controllers/controllerForUser.js");

const {
  createCategory,
  ListOfCategories,
} = require("./controllers/controllerForCategory.js");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  listOfProducts,
} = require("./controllers/controllerForProduct.js");

const {
  listOfproducts,
  createCart,
} = require("./controllers/controllerForCart.js");

const { login } = require("./controllers/controllerForLogin.js");

const {
  createWishList,
  removeItemFromWishlist,
  listOfWishList,
} = require("./controllers/controllerForWishlist.js");
const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // Allow only requests from this origin
  methods: "GET,POST,DELETE", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));
app.post("/createUser", async (req, res) => {
  try {
    await createUser(req, res);
    res.send("creating user successfully");
  } catch {
    res.send("not able to create.");
  }
});

app.get("/findUser", findUser);

app.post("/updateUser", updateUser);

app.post("/createCategory", createCategory);

app.get("/ListOfCategory", ListOfCategories);

app.post("/createProduct", createProduct);

app.get("/userMail/:email", findUserbyemail);

app.get("/listOfproducts", listOfProducts);

app.post("/login", login);

app.post("/createWishListItem", createWishList);

app.post("/listofWishList", listOfWishList);

app.delete("/deleteWishListItem", removeItemFromWishlist);

app.post("/addToCart", createCart);

const authToken = (req, res, next) => {
  const auth_header = req.headers["authorization"];
  const token = auth_header && auth_header.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (user) {
      req.user = user;
      console.log(req.user);
      next();
    } else {
      res.send(err);
    }
  });
};

app.get("/finduserbyemail", authToken, (req, res) => {
  res.send({ msg: req.user.email });
});
app.listen(4000, () => {
  console.log("server start listening");
});
