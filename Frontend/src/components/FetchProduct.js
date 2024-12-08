import React, { useEffect } from "react";
import { UseProduct } from "./ProductContext.js";
import axios from "axios";
const FetchProducts = () => {
  const { dispatch } = UseProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:4000/listOfproducts");
      const res = await response.data.products;
      console.log(res);
      dispatch({ type: "SET_PRODUCTS", payload: res });
    };
    fetchProducts();
  }, [dispatch]);

  return <></>; // No UI rendering
};

export default FetchProducts;
