import React from 'react';
import { Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';

const MobileActions = ({
  setIsMobileSearchOpen,
  isMobileSearchOpen,
  user,
  wishlist,
  cartCount,
  setIsCartOpen,
  setIsMenuOpen,
  isMenuOpen,
  handleNavigate
}) => {
  return (
    <div className="flex items-center lg:hidden space-x-2">
      {/* Mobile Search */}
      <button
        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
        className={`p-3 rounded-lg transition-all duration-300 ${
          isMobileSearchOpen
            ? "text-divine-orange bg-orange-50 border border-orange-200"
            : "text-gray-600 hover:text-divine-orange hover:bg-orange-50 border border-transparent"
        }`}
      >
        <Search size={20} />
      </button>

      {/* Wishlist */}
      {user && (
        <button
          onClick={() => handleNavigate("/wishlist")}
          className="relative p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 border border-transparent hover:border-red-200"
        >
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
      )}

      {/* Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-3 text-gray-600 hover:text-divine-orange hover:bg-orange-50 rounded-lg transition-all duration-300 border border-transparent hover:border-orange-200"
      >
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-divine-orange rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Menu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`p-3 rounded-lg transition-all duration-300 ${
          isMenuOpen
            ? "text-red-600 bg-red-50 border border-red-200"
            : "text-gray-600 hover:text-divine-orange hover:bg-orange-50 border border-transparent hover:border-orange-200"
        }`}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default MobileActions;
