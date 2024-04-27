import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CartItemsContext from "./components/contextApi/CartItemsContext.jsx";
import CartItemsNumberContext from "./components/contextApi/CartItemsNumberContext.jsx";
import AccessTokenContext from "./components/contextApi/AccessTokenContext.jsx";
import ProductsContext from "./components/contextApi/ProductsContext.jsx";
import BaseDomainContext from "./components/contextApi/BaseDomainContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseDomainContext>
        <ProductsContext>
          <CartItemsNumberContext>
            <CartItemsContext>
              <AccessTokenContext>
                <App />
              </AccessTokenContext>
            </CartItemsContext>
          </CartItemsNumberContext>
        </ProductsContext>
      </BaseDomainContext>
    </BrowserRouter>
  </React.StrictMode>
);
