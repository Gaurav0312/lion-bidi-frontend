import React, { useState, useEffect } from "react";
import {
  X,
  ShoppingCart,
  Crown,
  Gift,
  Truck,
  Shield,
  Award,
  Zap,
  Plus,
  Minus,
  Trash2,
  Star,
  ArrowRight,
} from "lucide-react";
import CartItem from "./CartItem";

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  cartCount,
  cartSavings,
  bulkDiscountPercent,
  totalQuantity,
  finalTotal,
  handleNavigate,
  isLoading,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - finalTotal
  );
  const shippingProgress = Math.min(
    100,
    (finalTotal / freeShippingThreshold) * 100
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const getBulkDiscountMessage = () => {
    if (totalQuantity < 5) {
      return {
        icon: <Gift className="w-4 h-4" />,
        message: `Add ${5 - totalQuantity} more items for 5% discount!`,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      };
    } else if (totalQuantity < 10) {
      return {
        icon: <Zap className="w-4 h-4" />,
        message: `Add ${10 - totalQuantity} more items for 10% discount!`,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      };
    } else if (totalQuantity < 20) {
      return {
        icon: <Star className="w-4 h-4" />,
        message: `Add ${20 - totalQuantity} more items for 15% discount!`,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      };
    } else if (totalQuantity < 50) {
      return {
        icon: <Crown className="w-4 h-4" />,
        message: `Add ${50 - totalQuantity} more items for 20% discount!`,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      };
    }
    return null;
  };

  const bulkDiscount = getBulkDiscountMessage();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isClosing ? "opacity-0" : "opacity-50"
        }`}
        onClick={handleClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 lg:w-[420px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isClosing ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Shopping Cart</h2>
                <p className="text-white/90 text-sm">
                  {cartCount} {cartCount === 1 ? "item" : "items"} • ₹
                  {finalTotal.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Add some products to get started
              </p>
              <button
                onClick={handleClose}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Promotional Banners */}
              <div className="p-4 space-y-3 border-b border-gray-100">
                {/* Free Shipping Progress */}
                {remainingForFreeShipping > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Free Shipping
                        </span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        {shippingProgress.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${shippingProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-green-700">
                      Add ₹{remainingForFreeShipping.toLocaleString()} more for
                      FREE shipping! 🚚
                    </p>
                  </div>
                )}

                {/* Bulk Discount Banner */}
                {bulkDiscount && (
                  <div
                    className={`${bulkDiscount.bgColor} p-4 rounded-xl border border-current border-opacity-20`}
                  >
                    <div
                      className={`flex items-center space-x-2 ${bulkDiscount.color}`}
                    >
                      {bulkDiscount.icon}
                      <span className="text-sm font-medium">
                        {bulkDiscount.message}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items - Custom Scrollable Area */}
              <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto scrollbar-hidden hover:scrollbar-visible">
                  <div className="p-4 space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={item.id || index}>
                        <CartItem item={item} />
                        {index < cartItems.length - 1 && (
                          <div className="border-b border-gray-100 mt-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary & Checkout */}
              <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                {/* Savings Display */}
                {cartSavings > 0 && (
                  <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          You're saving
                        </span>
                      </div>
                      <span className="text-sm font-bold text-green-700">
                        ₹{cartSavings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  {cartSavings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{cartSavings.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 pt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Grand Total</span>
                      <span className="text-orange-600">
                        ₹{finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
                  <div className="flex flex-col items-center space-y-1">
                    <Truck className="w-4 h-4" />
                    <span>Fast Delivery</span>
                    <span className="text-xs">2-3 Days</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Shield className="w-4 h-4" />
                    <span>Easy Returns</span>
                    <span className="text-xs">7 Day Policy</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Award className="w-4 h-4" />
                    <span>Quality</span>
                    <span className="text-xs">Guaranteed</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    handleClose(); // Close the cart sidebar first
                    handleNavigate("/address"); // Navigate to address page instead of /checkout
                  }}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 shadow-lg"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>
                        Secure Checkout (₹{finalTotal.toLocaleString()})
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>SSL Encrypted • 100% Secure Checkout</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hidden {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-visible::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-visible::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 2px;
        }
        .scrollbar-visible::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </>
  );
};

export default CartSidebar;
