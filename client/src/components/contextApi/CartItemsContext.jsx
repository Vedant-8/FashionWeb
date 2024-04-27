import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext('');

const CartItemsContext = ({children}) => {
    const[cartItems, setCartItems]= useState([]);
    const[totalPrice, setTotalPrice] = useState(0);
  return (
   <>
   <CartContext.Provider value={{cartItems, setCartItems,totalPrice, setTotalPrice}}>
    {children}
   </CartContext.Provider>
   </>
  )
}

export default CartItemsContext;

export const useCartItems = ()=> useContext(CartContext);