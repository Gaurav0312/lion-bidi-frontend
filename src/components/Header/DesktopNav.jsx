import React from "react";
import {
  User,
  ShoppingCart,
  Heart,
  ChevronDown,
  X,
  Bell,
  UserPlus,
} from "lucide-react";

const DesktopNav = ({
  user,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  wishlist,
  handleNavigate,
  handleLogout,
  openAuthModal,
  setIsCartOpen,
  cartCount,
}) => {
  const navigationItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/about", label: "About", icon: "ℹ️" },
    { path: "/contact", label: "Contact", icon: "📞" },
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0">
      {/* Navigation Links */}
      {navigationItems.map((item) => (
        <button
          key={item.path}
          onClick={() => handleNavigate(item.path)}
          className="relative group flex items-center gap-1 font-medium text-gray-700 hover:text-divine-orange transition-all duration-300 px-3 py-2 rounded-lg hover:bg-orange-50 whitespace-nowrap"
        >
          <span className="text-sm">{item.icon}</span>
          <span className="text-sm">{item.label}</span>
          <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-divine-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>
      ))}

      {/* User Section */}
      {user ? (
        <div className="flex items-center space-x-2 ml-4 border-l border-orange-200 pl-4">
          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 bg-white hover:bg-orange-50 px-3 py-2 rounded-lg text-gray-800 transition-all duration-300 border border-orange-200 hover:border-divine-orange shadow-sm whitespace-nowrap"
            >
              <div className="w-7 h-7 bg-divine-orange rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden xl:inline font-medium text-sm">
                {user.name?.split(" ")[0]}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="fixed right-4 top-20 w-72 bg-white rounded-xl shadow-lg border border-orange-200 py-2 z-[60] animate-in slide-in-from-top-2 duration-300">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-orange-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-divine-orange rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-divine-orange">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                {[
                  { path: "/profile", label: "My Profile", icon: User },
                  { path: "/orders", label: "Orders", icon: ShoppingCart },
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
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:text-divine-orange hover:bg-orange-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-divine-orange text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}

                {/* Logout */}
                <div className="border-t border-orange-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 font-medium"
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
            className="relative p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 border border-transparent hover:border-red-200"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 text-xs font-semibold text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-divine-orange hover:bg-orange-50 rounded-lg transition-all duration-300 border border-transparent hover:border-orange-200"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs font-semibold text-white bg-divine-orange rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2 ml-4 border-l border-orange-200 pl-4">
          <button
            onClick={() => handleNavigate("/products")}
            className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 font-medium whitespace-nowrap"
          >
            <ShoppingCart size={16} />
            <span className="hidden xl:inline text-sm">Shop</span>
          </button>

          <button
            onClick={() => handleNavigate("/login")}
            className="flex items-center gap-1 bg-divine-orange text-white px-4 py-2 rounded-lg hover:bg-divine-orange/90 transition-all duration-300 font-semibold whitespace-nowrap shadow-sm"
          >
            <User size={16} />
            <span className="text-sm">Login</span>
          </button>

          <button
            onClick={() => handleNavigate("/register")}
            className="flex items-center gap-1 border border-divine-orange text-divine-orange px-3 py-2 rounded-lg hover:bg-orange-50 transition-all duration-300 font-medium whitespace-nowrap"
          >
            <UserPlus size={16} />
            <span className="hidden xl:inline text-sm">Register</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default DesktopNav;
