// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppContext from "./context/AppContext";
import { Toaster, toast } from "react-hot-toast";

import AuthModal from "./components/AuthModal";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RefundPolicy from "./components/RefundPolicy/RefundPolicy";
import Profile from "./components/user/Profile";
import AddressPage from "./pages/AddressPage";
import CheckoutPage from "./pages/CheckoutPage";
import Layout from "./components/Layout"; // ✅ new layout

const App = () => {
  /* ─────────────────── GLOBAL STATE ─────────────────── */
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ─────────────────── AUTH-MODAL STATE ─────────────────── */
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  /* ─── restore user on mount ─── */
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (err) {
      console.error("Error restoring state:", err);
      localStorage.clear();
    } finally {
      setLoading(false); // stop splash
    }
  }, []);

  /* ─────────────────── AUTH HELPERS ─────────────────── */
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("Logged in successfully");
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    setCartItems([]);
    setWishlist([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  /* ─────────────────── CART HELPERS ─────────────────── */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      toast.success(`${product.name} added to cart`);
      return updated;
    });
  };

  const updateCartQuantity = (id, qty) =>
    qty <= 0
      ? removeFromCart(id)
      : setCartItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
        );

  const removeFromCart = (id) =>
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) toast.success(`${item.name} removed from cart`);
      return prev.filter((i) => i.id !== id);
    });

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const getCartTotal = () =>
    cartItems.reduce(
      (t, i) => t + (Number(i.price) || 0) * (Number(i.quantity) || 0),
      0
    );

  const getCartItemsCount = () =>
    cartItems.reduce((t, i) => t + (Number(i.quantity) || 0), 0);

  /* ─────────────────── WISHLIST HELPERS ─────────────────── */
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === product.id)) return prev;
      toast.success(`${product.name} added to wishlist`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) =>
    setWishlist((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) toast.success(`${item.name} removed from wishlist`);
      return prev.filter((i) => i.id !== id);
    });

  const toggleWishlist = (product) =>
    wishlist.some((i) => i.id === product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);

  /* ─────────────────── PERSISTENCE ─────────────────── */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ─────────────────── CONTEXT VALUE ─────────────────── */
  const contextValue = {
    user,
    cartItems,
    wishlist,
    isAuthModalOpen,

    login,
    logout,
    openAuthModal,
    closeAuthModal,

    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,

    addToWishlist,
    removeFromWishlist,
    toggleWishlist,

    showToast: (msg, type = "success") =>
      type === "error" ? toast.error(msg) : toast.success(msg),
  };

  /* ─────────────────── LOADING SPLASH ─────────────────── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/address"
              element={user ? <AddressPage /> : <Navigate to="/login" />}
            />

            {/* Main layout with Header + Footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route
                path="/wishlist"
                element={
                  user ? (
                    <WishlistPage />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  user ? <Profile user={user} /> : <Navigate to="/login" />
                }
              />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Global modals */}
        <AuthModal />
        
      </Router>
    </AppContext.Provider>
  );
};

export default App;
