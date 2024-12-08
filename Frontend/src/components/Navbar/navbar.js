import React, { useState } from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseProduct } from "../ProductContext.js";
import styles from "./navbar.module.css";
import { UseThemeContext } from "../ThemeContext.js";
import { faSearch } from "../../../node_modules/@fortawesome/free-solid-svg-icons/index.js";
import logo from "./images/logo.png";
library.add(faCheckSquare, faCoffee, faPerson, faSearch);

const Navbar = () => {
  const { dispatch } = UseProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const { toggleTheme } = UseThemeContext();
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch({ type: "FILTER_PRODUCTS", payload: value });
  };

  const submit = () => {
    toggleTheme();
  };

  return (
    <div className={styles.Nav_bar}>
      <div className={styles.logoname}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className={styles.search_box}>
        <input
          type="text"
          placeholder="Enter the product to search"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        {/* <button onClick={submit}>
          <FontAwesomeIcon
            icon="search"
          ></FontAwesomeIcon>
        </button> */}
        {/* <img src="" alt="Search Icon" /> */}
      </div>
      <div className={styles.nav_links}>
        <div className={styles.nav_topics}>
          <Link to="/">Home</Link>
          {/* <Link to="/wishList">WishList</Link>
          <Link to="/cart">Cart</Link> */}
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <a href="#">
          <FontAwesomeIcon icon="person" className={styles.icon_profile} />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
