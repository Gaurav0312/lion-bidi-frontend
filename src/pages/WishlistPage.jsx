import React from 'react';
import { Heart, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

// Wishlist Page Component
const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useAppContext();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items you love for later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length})</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;