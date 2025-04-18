// src/Context/CarritoContext.jsx
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.quantity < item.stock
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (producto) => dispatch({ type: "ADD_TO_CART", payload: producto });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const decreaseQuantity = (id) => dispatch({ type: "DECREASE_QUANTITY", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        dispatch, // también lo exponemos si quieres usarlo directamente
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
