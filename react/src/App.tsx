import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./components/products/AddProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
import PrivateRoute from "./utils/PrivateRoute";
import UsersList from "./components/users/UsersList";
function App() {
  const [showCard, setShowCard] = useState(false);

  const showCartHandler = () => {
    setShowCard(true);
  };

  const hideCartHandler = () => {
    setShowCard(false);
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="*"
            element={
              <>
                <Products />
                {showCard && <Checkout />}
              </>
            }
          />
          <Route path="/new-product" element={<AddProduct />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/card" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
