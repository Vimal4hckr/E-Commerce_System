import axios from "axios";
let products = [];
const myFunc = async () => {
  try {
    const data = await axios("https://fakestoreapi.com/products")
      .then(() => {
        console.log(data);
      })
      .catch(() => {
        console.log("error");
      });
  } catch (error) {
    console.log(error);
  }
};

export default myFunc;
