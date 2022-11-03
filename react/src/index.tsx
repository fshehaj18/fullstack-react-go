import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/Login/Login";
import AddProduct from "./components/products/AddProduct";
import "./index.css";
import { CardProvider } from "./store/CardProvider";
import { ProductsProvider } from "./store/ProductsProvider";

ReactDOM.render(
  <ProductsProvider>
    <CardProvider>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </CardProvider>
  </ProductsProvider>,
  document.getElementById("root") as HTMLElement
);
