// AppContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

/* ─────────────────── CONTEXT SETUP ─────────────────── */
const AppContext = createContext();
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
  return ctx;
};

/* ─────────────────── PROVIDER ─────────────────── */
export const AppProvider = ({ children }) => {
  /* ——— Core state ——— */
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ——— GLOBAL AUTH-MODAL STATE ——— */
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  /* ─────────────── CART HELPERS ─────────────── */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      return existing
        ? prev.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, qty) =>
    qty <= 0
      ? removeFromCart(id)
      : setCartItems((prev) =>
          prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
        );

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => setCartItems([]);
  const getCartTotal = () =>
    cartItems.reduce((t, p) => t + p.price * p.quantity, 0);
  const getCartItemsCount = () =>
    cartItems.reduce((t, p) => t + p.quantity, 0);

  /* ─────────────── WISHLIST HELPERS ─────────────── */
  const addToWishlist = (product) =>
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((p) => p.id !== id));

  const toggleWishlist = (product) =>
    wishlist.some((p) => p.id === product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);

  /* ─────────────── USER HELPERS ─────────────── */
  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to save user in localStorage", e);
    }
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  /* ─────────────── RESTORE PERSISTED DATA ─────────────── */
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Failed to parse localStorage data", e);
      localStorage.clear();
    }
  }, []);

  /* Persist cart and wishlist whenever they change */
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [wishlist]);

  /* ─────────────── DERIVED STATES ─────────────── */
  const isLoggedIn = !!user;
  const cartCount = getCartItemsCount();
  const wishlistCount = wishlist.length;
  const cartTotal = getCartTotal();

  /* ─────────────── CONTEXT VALUE ─────────────── */
  const value = {
    /* state */
    cartItems,
    wishlist,
    user,
    isAuthModalOpen,
    selectedProduct,

    /* derived states */
    isLoggedIn,
    cartCount,
    wishlistCount,
    cartTotal,

    /* cart */
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,

    /* wishlist */
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,

    /* navigation */
    setSelectedProduct,

    /* user */
    login,
    logout,

    /* auth-modal controls */
    openAuthModal,
    closeAuthModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
