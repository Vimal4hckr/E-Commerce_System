const {
  user,
  product,
  cart,
  wishList,
  Category,
  address,
} = require("../schema.js");

const createCategory = async (req, res) => {
  try {
    const category = await new Category({
      name: req.body.name,
      desc: req.body.desc,
      parent_category: req.body.parent,
    });

    if (category) {
      category.save();
      res.send(category);
    } else {
      res.send({ msg: "error" });
    }
  } catch (error) {
    res.send({ msg: "catch error" });
  }
};

const ListOfCategories = async (req, res) => {
  try {
    const list = await Category.find();
    res.send({ categories: list });
  } catch (error) {
    res.send({ error: error });
  }
};
module.exports = { createCategory, ListOfCategories };
