import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  products: [],
  filteredProducts: [],
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case "FILTER_PRODUCTS":
      return {
        ...state,
        filteredProducts: state.products.filter((product) =>
          product.name.includes(action.payload)
        ),
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Create context
const ProductContext = createContext(null); // Set default value as null

// Provider component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Ensure `value` is always valid
  const value = { state, dispatch };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// Custom hook to access Product context
export const UseProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
