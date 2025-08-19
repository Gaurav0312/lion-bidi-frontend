import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  User,
  Search,
  Heart,
  Menu,
  X,
  Crown,
  Sparkles,
  Zap,
  UserPlus,
  ChevronDown,
  Gift,
  Percent,
  Bell,
  MapPin,
  Phone,
  Mail,
  Star,
  Shield,
  Truck,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import CartItem from "./CartItem";

const Header = () => {
  const navigate = useNavigate();

  const {
    cartItems = [],
    wishlist = [],
    user,
    logout,
    getCartTotal,
    getCartItemsCount,
    addToCart,
    openAuthModal,
  } = useAppContext();

  const cartTotal = getCartTotal ? getCartTotal() : 0;
  const cartCount = getCartItemsCount ? getCartItemsCount() : cartItems.length;

  const calculateCartSavings = () => {
    let savings = 0;
    savings += cartItems.reduce(
      (total, item) => total + (item.discountAmount || 0) * item.quantity,
      0
    );
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    let bulkDiscountPercent = 0;
    if (totalQuantity >= 50) bulkDiscountPercent = 20;
    else if (totalQuantity >= 20) bulkDiscountPercent = 15;
    else if (totalQuantity >= 10) bulkDiscountPercent = 10;
    else if (totalQuantity >= 5) bulkDiscountPercent = 5;

    if (bulkDiscountPercent > 0) {
      const bulkDiscount = (cartTotal * bulkDiscountPercent) / 100;
      savings += bulkDiscount;
    }
    return { savings, bulkDiscountPercent, totalQuantity };
  };

  const {
    savings: cartSavings,
    bulkDiscountPercent,
    totalQuantity,
  } = calculateCartSavings();
  const finalTotal = Math.max(0, cartTotal - cartSavings);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (isMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPromo(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = async (path) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      navigate(path);
    } catch (error) {
      window.location.href = path;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      await handleNavigate("/products");
      setIsMobileSearchOpen(false);
    }
  };

  const handleLogout = () => {
    if (logout && typeof logout === "function") logout();
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    handleNavigate("/");
  };

  return (
    <>
      {/* ───────────────────────── PROMO BAR ───────────────────────── */}
      {showPromo && (
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-center py-2 px-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Award size={16} className="text-yellow-300" />
              <span className="hidden sm:inline">🎉 Premium Launch Offer:</span>
              <span className="font-bold">FREE SHIPPING on orders ₹999+</span>
              <Sparkles size={16} className="text-yellow-300 animate-pulse" />
            </div>
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────── MAIN HEADER ───────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-orange-100"
            : "bg-white/98 backdrop-blur-md shadow border-b border-orange-200"
        }`}
      >
        <div className="h-1 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400" />

        {bulkDiscountPercent > 0 && (
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-center py-1.5 px-4">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <Gift size={14} />
              <span className="animate-pulse">
                🔥 {bulkDiscountPercent}% BULK DISCOUNT ACTIVE!
              </span>
              <span className="hidden sm:inline">({totalQuantity} items)</span>
            </div>
          </div>
        )}

        {/* CONTENT WRAPPER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top row */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* LOGO */}
            <div
              onClick={() => handleNavigate("/")}
              className="flex items-center cursor-pointer group flex-shrink-0 mr-4"
            >
              <div className="relative">
                <img
                  src="/lion.png"
                  alt="Lion Bidi"
                  className="h-12 w-auto sm:h-14 lg:h-16 transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
                  Lion Bidi
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <Crown size={12} className="text-yellow-500" />
                  <p className="text-xs text-orange-600 font-bold uppercase">
                    Premium Quality
                  </p>
                </div>
              </div>
            </div>

            {/* DESKTOP SEARCH */}
            <div className="hidden lg:flex flex-1 mx-8 max-w-2xl">
              <form
                onSubmit={handleSearch}
                className="relative flex w-full group"
                ref={searchRef}
              >
                <div className="flex w-full rounded-2xl bg-gradient-to-r from-gray-50 to-orange-50 ring-2 ring-orange-200 focus-within:ring-4 focus-within:ring-orange-400/20 transition-all shadow-md">
                  <div className="flex items-center pl-5 text-gray-400">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium products, brands..."
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 px-4 py-4 outline-none text-base font-medium"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-2xl shadow hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Sparkles size={18} />
                    )}
                    <span className="hidden xl:inline">Search</span>
                  </button>
                </div>
              </form>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              {/* Navigation Links */}
              {[
                { path: "/", label: "Home", icon: "🏠" },
                { path: "/products", label: "Products", icon: "🛍️" },
                { path: "/about", label: "About", icon: "ℹ️" },
                { path: "/contact", label: "Contact", icon: "📞" },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="relative group flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-600 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>
              ))}

              {/* User Section */}
              {user ? (
                <div className="flex items-center space-x-3 ml-6 border-l border-orange-200 pl-6">
                  {/* User Menu */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 px-4 py-3 rounded-xl text-gray-800 transition-all duration-300 ring-2 ring-orange-200 hover:ring-orange-300 shadow-lg"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden xl:inline font-semibold">
                        {user.name?.split(" ")[0]}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-200 py-2 animate-in slide-in-from-top-2 duration-300">
                        <div className="px-4 py-3 border-b border-orange-100">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800">
                                {user.name}
                              </p>
                              <p className="text-sm text-orange-600">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {[
                          { path: "/profile", label: "My Profile", icon: User },
                          {
                            path: "/orders",
                            label: "Orders",
                            icon: ShoppingCart,
                          },
                          {
                            path: "/wishlist",
                            label: "Wishlist",
                            icon: Heart,
                            badge: wishlist.length,
                          },
                          { path: "/settings", label: "Settings", icon: Bell },
                        ].map((item) => (
                          <button
                            key={item.path}
                            onClick={() => {
                              handleNavigate(item.path);
                              setIsUserMenuOpen(false);
                            }}
                            className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon size={18} />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && item.badge > 0 && (
                              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        ))}

                        <div className="border-t border-orange-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                          >
                            <X size={18} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={() => handleNavigate("/wishlist")}
                    className="relative p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Heart size={22} />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
                        {wishlist.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart size={22} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-6 border-l border-orange-200 pl-6">
                  <button
                    onClick={() => handleNavigate("/products")}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
                  >
                    <ShoppingCart size={18} />
                    <span className="hidden xl:inline">Shop</span>
                  </button>
                  <button
                    onClick={() => {
                      if (openAuthModal) {
                        openAuthModal();
                      } else {
                        handleNavigate("/login");
                      }
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 font-bold"
                  >
                    <User size={18} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => handleNavigate("/register")}
                    className="flex items-center gap-2 border-2 border-orange-400 text-orange-600 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 font-semibold"
                  >
                    <UserPlus size={18} />
                    <span className="hidden xl:inline">Register</span>
                  </button>
                </div>
              )}
            </nav>
            {/* ——— KEEPING SAME STRUCTURE ——— */}
            {/* Your original desktop nav code stays same here */}

            {/* MOBILE ACTIONS */}
            <div className="flex items-center lg:hidden space-x-1">
              {/* Mobile Search */}
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className={`p-3.5 rounded-xl transition-all ${
                  isMobileSearchOpen
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                } shadow`}
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              {user && (
                <button
                  onClick={() => handleNavigate("/wishlist")}
                  className="relative p-3.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow"
                >
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              )}

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all shadow"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-3.5 rounded-xl transition-all mobile-menu ${
                  isMenuOpen
                    ? "text-red-600 bg-red-50"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                } shadow`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH BAR */}
          {isMobileSearchOpen && (
            <div className="lg:hidden pb-4 animate-in slide-in-from-top-4 duration-300">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex rounded-2xl bg-gradient-to-r from-gray-50 to-orange-50 ring-2 ring-orange-200 focus-within:ring-4 focus-within:ring-orange-400/20 transition-all shadow">
                  <div className="flex items-center pl-4 text-gray-400">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium products..."
                    className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 px-4 py-4 outline-none text-base font-medium"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-6 py-4 rounded-2xl shadow hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Sparkles size={16} />
                    )}
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* ——— MOBILE MENU ——— */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white/98 backdrop-blur-xl lg:hidden z-50 shadow-2xl border-l border-orange-200 animate-in slide-in-from-right duration-300 mobile-menu">
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 hover:scrollbar-thumb-orange-400">
                {/* Your existing mobile menu content here */}
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                      <Crown size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                      <p className="text-sm text-orange-600">
                        Premium Experience
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Quality Assurance */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield size={24} className="text-blue-600" />
                      <div>
                        <p className="font-bold text-blue-800">
                          Quality Assured
                        </p>
                        <p className="text-sm text-blue-600">
                          100% Authentic Products
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-blue-700">
                      <div className="text-center">
                        <Truck size={16} className="mx-auto mb-1" />
                        <span>Fast Delivery</span>
                      </div>
                      <div className="text-center">
                        <Award size={16} className="mx-auto mb-1" />
                        <span>Premium</span>
                      </div>
                      <div className="text-center">
                        <Shield size={16} className="mx-auto mb-1" />
                        <span>Secure</span>
                      </div>
                    </div>
                  </div>

                  {/* Bulk Discount Info */}
                  {totalQuantity > 0 && (
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Gift size={20} className="text-emerald-600" />
                        <p className="font-bold text-emerald-800">
                          Bulk Discounts
                        </p>
                      </div>
                      <div className="space-y-2 text-sm text-emerald-700">
                        <div className="flex justify-between">
                          <span>5+ items:</span>
                          <span className="font-semibold">5% OFF</span>
                        </div>
                        <div className="flex justify-between">
                          <span>10+ items:</span>
                          <span className="font-semibold">10% OFF</span>
                        </div>
                        <div className="flex justify-between">
                          <span>20+ items:</span>
                          <span className="font-semibold">15% OFF</span>
                        </div>
                        <div className="flex justify-between">
                          <span>50+ items:</span>
                          <span className="font-semibold">20% OFF</span>
                        </div>
                      </div>
                      {bulkDiscountPercent > 0 && (
                        <div className="mt-3 p-3 bg-emerald-100 rounded-xl">
                          <p className="text-sm font-bold text-emerald-800 text-center">
                            🎉 {bulkDiscountPercent}% OFF Active on{" "}
                            {totalQuantity} items!
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    {[
                      {
                        path: "/",
                        label: "Home",
                        icon: "🏠",
                        desc: "Back to homepage",
                      },
                      {
                        path: "/products",
                        label: "Products",
                        icon: "🛍️",
                        desc: "Browse catalog",
                      },
                      {
                        path: "/about",
                        label: "About",
                        icon: "ℹ️",
                        desc: "Our story",
                      },
                      {
                        path: "/contact",
                        label: "Contact",
                        icon: "📞",
                        desc: "Get in touch",
                      },
                    ].map(({ path, label, icon, desc }) => (
                      <button
                        key={path}
                        onClick={() => {
                          handleNavigate(path);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center justify-between w-full p-4 text-left rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                            {icon}
                          </span>
                          <div>
                            <p className="font-semibold text-lg">{label}</p>
                            <p className="text-sm text-gray-500 group-hover:text-orange-500">
                              {desc}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          size={16}
                          className="-rotate-90 group-hover:text-orange-600"
                        />
                      </button>
                    ))}
                  </div>

                  {/* User Section */}
                  {user ? (
                    <div className="pt-6 border-t border-orange-200 space-y-4">
                      {/* User Welcome Card */}
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-lg">
                              Welcome back!
                            </p>
                            <p className="text-orange-600 font-medium">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* User Actions Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            path: "/profile",
                            label: "Profile",
                            icon: User,
                            color: "blue",
                          },
                          {
                            path: "/orders",
                            label: "Orders",
                            icon: ShoppingCart,
                            color: "green",
                          },
                        ].map(({ path, label, icon: Icon, color }) => (
                          <button
                            key={path}
                            onClick={() => {
                              handleNavigate(path);
                              setIsMenuOpen(false);
                            }}
                            className={`flex flex-col items-center gap-3 p-4 bg-${color}-50 hover:bg-${color}-100 rounded-2xl text-${color}-700 hover:text-${color}-800 transition-all duration-300 border border-${color}-200`}
                          >
                            <Icon size={24} />
                            <span className="font-semibold">{label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Wishlist & Cart */}
                      <button
                        onClick={() => {
                          handleNavigate("/wishlist");
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center justify-between w-full p-4 bg-red-50 hover:bg-red-100 rounded-2xl text-red-700 hover:text-red-800 transition-all duration-300 border border-red-200"
                      >
                        <div className="flex items-center gap-3">
                          <Heart size={24} />
                          <span className="font-semibold">Wishlist</span>
                        </div>
                        {wishlist.length > 0 && (
                          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-full px-3 py-1 font-bold shadow-lg">
                            {wishlist.length}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setIsCartOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl transition-all duration-300 shadow-xl"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingCart size={24} />
                          <div className="text-left">
                            <p className="font-bold">View Cart</p>
                            <p className="text-sm opacity-90">
                              {cartCount} items
                            </p>
                          </div>
                        </div>
                        {cartSavings > 0 && (
                          <div className="text-right">
                            <div className="text-sm opacity-80">Savings</div>
                            <div className="font-bold">
                              ₹{cartSavings.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </button>

                      {/* Logout */}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-3 p-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-2xl transition-all duration-300 border-2 border-red-200 hover:border-red-300 font-semibold"
                      >
                        <X size={20} />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-6 border-t border-orange-200 space-y-4">
                      {/* Guest Welcome */}
                      <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                          <Crown size={32} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          Join Lion Bidi
                        </h3>
                        <p className="text-orange-600 font-medium">
                          Experience premium quality products!
                        </p>
                      </div>

                      {/* Auth Actions */}
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            if (openAuthModal) {
                              openAuthModal();
                            } else {
                              handleNavigate("/login");
                            }
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <User size={22} />
                          <span className="text-lg">Sign In</span>
                        </button>

                        <button
                          onClick={() => {
                            handleNavigate("/register");
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-center gap-3 w-full border-2 border-orange-400 text-orange-600 font-bold py-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300"
                        >
                          <UserPlus size={22} />
                          <span className="text-lg">Create Account</span>
                        </button>

                        <button
                          onClick={() => {
                            handleNavigate("/products");
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center justify-center gap-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-2xl transition-all duration-300"
                        >
                          <ShoppingCart size={22} />
                          <span className="text-lg">Browse Products</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Trust Indicators */}
                  <div className="pt-6 border-t border-orange-200">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                      <div className="flex flex-col items-center gap-2">
                        <Shield size={20} className="text-green-600" />
                        <span>Secure</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Award size={20} className="text-blue-600" />
                        <span>Certified</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Truck size={20} className="text-orange-600" />
                        <span>Fast Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* ──────────── PREMIUM CART SIDEBAR ──────────── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <aside className="w-full max-w-md bg-white/98 backdrop-blur-xl shadow-2xl border-l border-orange-200 flex flex-col animate-in slide-in-from-right duration-300">
            {/* Enhanced Cart Header */}
            <div className="relative">
              <div className="flex items-center justify-between px-6 py-5 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                    <ShoppingCart size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                    <div className="flex items-center gap-2 text-orange-600">
                      <span className="font-semibold">{cartCount} items</span>
                      <span>•</span>
                      <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                      {cartSavings > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-green-600 font-bold">Save ₹{cartSavings.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 shadow-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Active Discount Banner */}
              {bulkDiscountPercent > 0 && (
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4">
                  <div className="flex items-center justify-center gap-3">
                    <Gift size={20} />
                    <div className="text-center">
                      <p className="font-bold text-lg">🎉 {bulkDiscountPercent}% Bulk Discount Active!</p>
                      <p className="text-sm opacity-90">Applied on {totalQuantity} items</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-8">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center shadow-2xl">
                      <ShoppingCart size={48} className="text-orange-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Sparkles size={16} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h3>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                      Discover our premium collection of<br />
                      authentic products curated just for you
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleNavigate("/products");
                      setIsCartOpen(false);
                    }}
                    className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg transform hover:scale-105"
                  >
                    <Crown size={24} />
                    Shop Premium Collection
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {/* Bulk discount progress */}
                  {totalQuantity > 0 && totalQuantity < 50 && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Gift size={18} className="text-blue-600" />
                        <p className="font-bold text-blue-800">Unlock More Savings!</p>
                      </div>
                      <div className="space-y-2 text-sm text-blue-700">
                        {totalQuantity < 5 && (
                          <p className="font-semibold">Add {5 - totalQuantity} more items for 5% discount! 🎯</p>
                        )}
                        {totalQuantity >= 5 && totalQuantity < 10 && (
                          <p className="font-semibold">Add {10 - totalQuantity} more items for 10% discount! 🚀</p>
                        )}
                        {totalQuantity >= 10 && totalQuantity < 20 && (
                          <p className="font-semibold">Add {20 - totalQuantity} more items for 15% discount! ⭐</p>
                        )}
                        {totalQuantity >= 20 && totalQuantity < 50 && (
                          <p className="font-semibold">Add {50 - totalQuantity} more items for 20% discount! 💎</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Cart Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6 space-y-6">
                {/* Order Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700 text-lg">
                    <span className="font-semibold">Subtotal ({cartCount} items)</span>
                    <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                  </div>

                  {/* Bulk Discount */}
                  {bulkDiscountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-200">
                      <div className="flex items-center gap-2">
                        <Percent size={16} />
                        <span className="font-semibold">Bulk Discount ({bulkDiscountPercent}%)</span>
                      </div>
                      <span className="font-bold">-₹{((cartTotal * bulkDiscountPercent) / 100).toLocaleString()}</span>
                    </div>
                  )}

                  {/* Item Discounts */}
                  {cartSavings > bulkDiscountPercent * cartTotal / 100 && (
                    <div className="flex justify-between text-orange-600 bg-orange-50 px-4 py-3 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-2">
                        <Gift size={16} />
                        <span className="font-semibold">Product Discounts</span>
                      </div>
                      <span className="font-bold">-₹{(cartSavings - (cartTotal * bulkDiscountPercent) / 100).toLocaleString()}</span>
                    </div>
                  )}

                  {/* Total Savings */}
                  {cartSavings > 0 && (
                    <div className="flex justify-between text-green-600 font-bold bg-green-50 px-4 py-3 rounded-xl border-2 border-green-200">
                      <span className="flex items-center gap-2">
                        <Sparkles size={16} />
                        Total Savings
                      </span>
                      <span className="text-lg">₹{cartSavings.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t-2 border-orange-200">
                    <span>Grand Total</span>
                    <span className="text-orange-600">₹{finalTotal.toLocaleString()}</span>
                  </div>

                  {/* Free Shipping Indicator */}
                  {finalTotal >= 999 ? (
                    <div className="flex items-center justify-center gap-3 text-green-600 bg-green-50 px-4 py-3 rounded-xl border border-green-200">
                      <Truck size={18} />
                      <span className="font-bold">🎉 FREE Shipping Included!</span>
                    </div>
                  ) : (
                    <div className="text-center text-blue-600 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200">
                      <p className="font-semibold">Add ₹{(999 - finalTotal).toLocaleString()} more for FREE shipping! 🚚</p>
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <button 
                  disabled={isLoading}
                  className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Zap size={24} className="animate-pulse" />
                  )}
                  <span>Secure Checkout</span>
                  <span className="text-lg opacity-90">(₹{finalTotal.toLocaleString()})</span>
                </button>

                {/* Trust Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
                    <Shield size={16} className="text-green-600" />
                    <span>SSL Encrypted • 100% Secure Checkout</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-xs text-gray-600">
                    <div className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-xl">
                      <Truck size={18} className="text-blue-600" />
                      <span className="font-semibold">Fast Delivery</span>
                      <span className="text-gray-500">2-3 Days</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-xl">
                      <Shield size={18} className="text-green-600" />
                      <span className="font-semibold">Easy Returns</span>
                      <span className="text-gray-500">7 Day Policy</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-yellow-50 rounded-xl">
                      <Award size={18} className="text-yellow-600" />
                      <span className="font-semibold">Quality</span>
                      <span className="text-gray-500">Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
