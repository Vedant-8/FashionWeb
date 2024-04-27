import React, { createContext, useContext, useState } from 'react';

const StoreProductContext = createContext({});

const ProductsContext = ({children}) => {
    
    const[products, setProducts]= useState([]);
  return (
   <>
   <StoreProductContext.Provider value={{products, setProducts}}>
     {children}
   </StoreProductContext.Provider>
   </>
  )
}

export const productsContext =()=> useContext(StoreProductContext);

export default ProductsContext;