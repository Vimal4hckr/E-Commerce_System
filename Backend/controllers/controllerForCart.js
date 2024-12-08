const {
  user,
  product,
  cart,
  wishList,
  Category,
  address,
} = require("../schema.js");

const createCart = async (req, res) => {
  try {
    console.log(req.body);
    const Cart = new cart({
      user_email: req.body.email,
      product_id: req.body.product_id,
    });
    if (Cart) {
      await Cart.save();
      res.send(Cart);
    } else {
      res.send({ msg: "error" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
};

const listOfproducts = async (req, res) => {
  try {
    const products = await cart.find();
    if (products) {
      res.send({ products });
      console.log(products);
    } else {
      console.log("no products");
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { listOfproducts, createCart };
