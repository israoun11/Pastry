import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./JS/store";
import { userCurrent } from "./JS/userSlice";
import StoreStatusBanner from "./components/StoreStatusBanner";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ClickAndCollect from "./components/ClickAndCollect";
import Login from "./components/Login";
import Register from "./components/Register";
import ContactUs from "./components/ContactUs";
import DessertConcierge from "./components/DessertConcierge";
import TastingRoom from "./components/TastingRoom";
import Account from "./components/Account";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userCurrent());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <StoreStatusBanner />
      <Navbar />
      <CartDrawer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/click-and-collect" element={<ClickAndCollect />} />
        <Route path="/tasting-room" element={<TastingRoom />} />
        <Route path="/dessert-concierge" element={<DessertConcierge />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>

      <Footer />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;