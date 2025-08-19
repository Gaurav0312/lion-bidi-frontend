import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const useHeader = () => {
  const navigate = useNavigate();
  const {
    cartItems = [],
    wishlist = [],
    user,
    logout,
    getCartTotal,
    getCartItemsCount,
    openAuthModal,
  } = useAppContext();

  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const userMenuRef = useRef(null);

  // Calculated values
  const cartTotal = getCartTotal ? getCartTotal() : 0;
  const cartCount = getCartItemsCount ? getCartItemsCount() : cartItems.length;

  const calculateCartSavings = () => {
    let savings = cartItems.reduce(
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

  // Event handlers
  const handleNavigate = async (path) => {
  setIsLoading(true);
  try {
    // Close any open modals/menus before navigating
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsMobileSearchOpen(false);
    setIsUserMenuOpen(false);
    
    // Small delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    // Use React Router navigation
    navigate(path);
  } catch (error) {
    console.error('Navigation error:', error);
    // Fallback to window.location
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

  // Effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 20);
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (isMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    const timer = setTimeout(() => setShowPromo(false), 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timer);
    };
  }, [isMenuOpen]);

  return {
    state: {
      isMenuOpen,
      isCartOpen,
      isMobileSearchOpen,
      searchQuery,
      isScrolled,
      isUserMenuOpen,
      showPromo,
      isLoading,
    },
    actions: {
      setIsMenuOpen,
      setIsCartOpen,
      setIsMobileSearchOpen,
      setSearchQuery,
      setIsUserMenuOpen,
      setShowPromo,
      setIsLoading,
    },
    refs: {
      userMenuRef,
    },
    data: {
      cartItems,
      wishlist,
      user,
      cartTotal,
      cartCount,
      cartSavings,
      bulkDiscountPercent,
      totalQuantity,
      finalTotal,
      openAuthModal,
    },
    handlers: {
      handleNavigate,
      handleSearch,
      handleLogout,
    },
  };
};
