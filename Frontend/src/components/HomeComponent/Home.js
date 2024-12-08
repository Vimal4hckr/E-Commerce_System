import React from "react";
import Navbar from "../Navbar/navbar.js";
import { ThemeProvider } from "../ThemeContext.js";
import { ProductProvider } from "../ProductContext.js";
import FetchProducts from "../FetchProduct.js";
import ProductList from "../Product/productList.js";
import { AuthProvider } from "../AuthContext.js";
const Home = () => {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
          <ProductProvider>
            <FetchProducts />
            <Navbar />
            <ProductList />
          </ProductProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};

export default Home;
