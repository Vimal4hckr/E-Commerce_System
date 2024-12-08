const {
  user,
  product,
  cart,
  wishList,
  Category,
  address,
} = require("../schema.js");

const createProduct = async (req, res) => {
  const Product = new product({
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    image: req.body.image,
    category_id: req.body.category_id,
  });

  try {
    const savedProduct = await Product.save();
    res.send({ savedProduct });
  } catch (error) {
    res.send({ error: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const Product = await product.findByIdAndUpdate(
      { _id: req.body.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (Product) {
      res.send(Product);
    } else {
      res.send({ error: "error" });
    }
  } catch (error) {
    res.send({ error: "catch error" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.body.id);

    if (deletedProduct) {
      console.log("Successfully deleted");
      res.status(200).json({ message: "Product successfully deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ message: "Error deleting Product", error });
  }
};

const listOfProducts = async (req, res) => {
  try {
    const products = await product.find();
    if (products) {
      res.send({ products: products });
      console.log(products);
    } else {
      console.log("no products");
    }
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  listOfProducts,
};
