const {
  user,
  product,
  cart,
  wishList,
  Category,
  address,
} = require("../schema.js");

const createWishList = async (req, res) => {
  const { product_id, email } = req.body;

  try {
    // Check if the item already exists in the wishlist
    const existingItem = await wishList.findOne({
      product_id,
      user_email: email,
    });

    if (existingItem) {
      return res
        .status(409)
        .send({ msg: "Item already exists in the wishlist." });
    }

    // Create a new wishlist item
    const newWishListItem = new wishList({ product_id, user_email: email });
    await newWishListItem.save();

    res.status(201).send(newWishListItem);
  } catch (error) {
    console.error("Error creating wishlist item:", error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

const removeItemFromWishlist = async (req, res) => {
  const { product_id, email } = req.body;

  try {
    const removedItem = await wishList.findOneAndDelete({
      product_id,
      user_email: email,
    });

    if (!removedItem) {
      return res.status(404).send({ msg: "Item not found in the wishlist." });
    }

    res.send({ msg: "Item successfully removed from the wishlist." });
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    res.status(500).send({ msg: "Internal server error" });
  }
};

const listOfWishList = async (req, res) => {
  try {
    const list = await wishList.find({ user_email: req.body.email });
    if (list.length >= 0) {
      console.log(req.body);
      res.send({ msg: list });
      return;
    }
    res.send({ msg: "eror" });
  } catch (error) {
    res.send({ msg: error });
  }
};

module.exports = { createWishList, listOfWishList, removeItemFromWishlist };
