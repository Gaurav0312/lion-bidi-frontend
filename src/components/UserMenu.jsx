import React from 'react';
import { User, ShoppingCart, Heart, Bell, ChevronDown, X } from 'lucide-react';

const UserMenu = ({ 
  user, 
  isUserMenuOpen, 
  setIsUserMenuOpen, 
  handleNavigate, 
  handleLogout, 
  wishlist, 
  userMenuRef 
}) => {
  const menuItems = [
    { path: "/profile", label: "My Profile", icon: User },
    { path: "/orders", label: "Orders", icon: ShoppingCart },
    { path: "/wishlist", label: "Wishlist", icon: Heart, badge: wishlist.length },
    { path: "/settings", label: "Settings", icon: Bell },
  ];

  return (
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
          className={`transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`}
        />
      </button>

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
          {menuItems.map((item) => (
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
  );
};

export default UserMenu;
