import React, { useEffect, useState } from "react";
import styles from "./product.module.css";
import { BsHeart } from "react-icons/bs";
import axios from "axios";
import { UseAuthContext } from "../AuthContext.js";

const Product = ({ props }) => {
  const [liked, setLiked] = useState(false);

  const { likedProducts, user } = UseAuthContext();

  const toggleLike = async () => {
    try {
      if (liked) {
        await removeFromWish();
      } else {
        await addToWish();
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  useEffect(() => {
    for (const product of likedProducts) {
      if (product.product_id === props._id) {
        setLiked((liked) => !liked);
      }
    }
  }, [props._id, likedProducts]);

  const addToWish = async () => {
    await axios.post("http://localhost:4000/createWishListItem", {
      product_id: props._id,
      email: user.email,
    });
  };

  const removeFromWish = async () => {
    await axios.delete("http://localhost:4000/deleteWishListItem", {
      data: {
        product_id: props._id,
        email: user.email,
      },
    });
  };

  const addToCart = async () => {
    const res = await axios.post("http://localhost:4000/addToCart", {
      product_id: props._id,
      email: user.email, // Ensure this is defined
    });
  };

  return (
    <div className={styles.productClass}>
      <img src={props.image} alt={props.name} className={styles.image} />
      <div className={styles.product_content}>
        <h3>{props.name}</h3>
        <h5>{props.price}</h5>
      </div>
      <div className={styles.button_list}>
        <BsHeart
          className={styles.heart}
          onClick={toggleLike}
          style={{ color: liked ? "red" : "black" }}
        />
        <button className={styles.cart_button} onClick={addToCart}>
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
