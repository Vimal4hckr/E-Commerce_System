const axios = require("axios");

const myFunc = async () => {
  try {
    // Fetch data from the API
    const { data } = await axios.get("https://fakestoreapi.com/products");

    // Extract unique categories
    // const categorySet = new Set(data.map((item) => item.category));
    const cat = await axios.get("http://127.0.0.1:4000/ListOfCategory");
    // Send POST request for each category
    const categories = cat.data.categories;

    for (const product of data) {
      for (const category of categories) {
        if (product.category === category.name) {
          console.log(product.category);
          await axios.post("http://127.0.0.1:4000/createproduct", {
            name: product.title,
            desc: product.description,
            price: product.price,
            image: product.image,
            category_id: category._id,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

myFunc();
