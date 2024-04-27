import React, { createContext, useContext, useState } from 'react'

const CartNumberContext = createContext('');


const CartItemsNumberContext = ({children}) => {
    // const cartItemsNumberFromLocalStorage = Number(localStorage.getItem('cartItems'));
    const [cartItemsNumber, setCartItemsNumber] = useState(0);
    return (
        <>
         <CartNumberContext.Provider value={{cartItemsNumber, setCartItemsNumber}}>
            {children}
         </CartNumberContext.Provider>
        </>
      )
}

export default CartItemsNumberContext;
export const useCartItemsNumber = ()=> useContext(CartNumberContext);