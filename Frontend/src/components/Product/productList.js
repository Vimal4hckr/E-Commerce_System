import React from "react";
import Product from "./product.js";
import styles from "./productList.module.css";
import { UseProduct } from "../ProductContext.js";
import { UseThemeContext } from "../ThemeContext.js";
import { AuthProvider } from "../AuthContext.js";
const ProductList = () => {
  const { state } = UseProduct();
  const { flag } = UseThemeContext();
  if (flag) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }
  return (
    <div className={styles.Products}>
      <ul className={styles.Product_list}>
        {state.filteredProducts.map((product) => (
          <li key={product["_id"]} className={styles.Product_item}>
            <Product props={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
