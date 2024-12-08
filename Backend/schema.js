const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jeeva3377:Jeeva123@cluster1.wbe67.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => {
    console.log("mongodb got connected");
  })
  .catch((error) => {
    console.log("not connected", error);
  });

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  legalName: String,
  email: String,
  pwd: String,
});

const user = mongoose.model("user", userSchema);

const addressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  address_line_1: String,
  address_line_2: String,
  city: String,
  state: String,
  country: String,
  postal: String,
});

const address = mongoose.model("address", addressSchema);

const categorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: String,
  // desc: String,
  // parent_category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  //   default: null,
  // }, // Self-reference
});

const Category = mongoose.model("Category", categorySchema);

const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  image: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

const product = mongoose.model("product", productSchema);

const wishListSchema = new mongoose.Schema({
  user_email: { type: String },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
});

const wishList = mongoose.model("wishList", wishListSchema);

const cartSchema = new mongoose.Schema({
  user_email: { type: String },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: { type: Number, default: 1 },
});

const cart = mongoose.model("cart", cartSchema);

module.exports = { user, address, Category, product, wishList, cart };
