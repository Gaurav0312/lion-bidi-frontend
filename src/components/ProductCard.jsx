import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { 
    addToCart, 
    addToWishlist, 
    wishlist, 
    user, 
    openAuthModal
  } = useAppContext();

  // Early return if product is invalid
  if (!product || !product.id) {
    return null;
  }
  
  const isInWishlist = wishlist.some((i) => i.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      openAuthModal();
      return;
    }
    addToCart(product);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      openAuthModal();
      return;
    }
    addToWishlist(product);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.slug}`);
  };

  // Calculate discount amount and final price
  const calculatePriceDetails = () => {
    if (product.discount > 0 && product.originalPrice) {
      const originalPrice = product.originalPrice;
      const discountAmount = (originalPrice * product.discount) / 100;
      const finalPrice = originalPrice - discountAmount;
      
      return {
        originalPrice,
        discountAmount: Math.round(discountAmount),
        finalPrice: Math.round(finalPrice),
        hasDiscount: true
      };
    }
    
    return {
      originalPrice: product.price,
      discountAmount: 0,
      finalPrice: product.price,
      hasDiscount: false
    };
  };

  const priceDetails = calculatePriceDetails();

  return (
    <div 
      className="group bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleProductClick}
    >
      {/* Product image */}
      <div className="relative overflow-hidden">
        <div className="aspect-square">
          <img
            src={product.image || '/placeholder-image.jpg'}
            alt={product.name || 'Product'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </div>

        {/* Discount badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isInWishlist
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart
            size={16}
            fill={isInWishlist ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-divine-orange transition-colors duration-300">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-divine-orange">
              ₹{priceDetails.finalPrice}
            </span>
            {priceDetails.hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ₹{priceDetails.originalPrice}
              </span>
            )}
          </div>
          
          {priceDetails.hasDiscount && (
            <div className="text-xs text-green-600 font-semibold">
              You save ₹{priceDetails.discountAmount} ({product.discount}% off)
            </div>
          )}
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-divine-orange hover:bg-divine-orange/90 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
