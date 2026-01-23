import { useEffect, useState } from "react";
import axios from "axios";
import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cart-items")
      .then((response) => {
        setCart(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;
