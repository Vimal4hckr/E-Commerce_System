import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext({});

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedEmail = localStorage.getItem("email");
    return storedEmail ? { email: storedEmail } : null;
  });

  const [likedProducts, setLikedProducts] = useState([]);
  // Update user and localStorage
  const userUpdate = (props) => {
    setUser((prevUser) => ({ ...prevUser, ...props }));
    if (props.email) {
      localStorage.setItem("email", props.email);
    }
  };

  // Fetch liked products
  const likedProductsUpdate = async () => {
    if (user.email) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/listofWishList",
          {
            email: user.email,
          }
        );
        console.log(user.email);
        setLikedProducts(...likedProducts, data.msg);
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    }
  };

  useEffect(() => {
    likedProductsUpdate();
  }, []); // Fetch liked products whenever the user changes

  const value = { user, userUpdate, likedProducts };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use AuthContext
export const UseAuthContext = () => {
  return useContext(AuthContext);
};
