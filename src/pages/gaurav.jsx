// ProductDetailPage.jsx

import React, { useState, useEffect } from "react";
import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Share,
  MessageCircle,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Check,
  Flame,
  Leaf,
  Gem,
  X,
  Crown,
  Phone,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { generateSlug } from "../utils/slugify";
import HandCraftedIcon from "../components/HandCraftedIcon";

// Updated product data structure - using slugs as keys
const productData = {
  "special-lion-bidi-big": {
    id: 1,
    name: "SPECIAL LION BIDI ( BIG )",
    slug: generateSlug("special-lion-bidi-big"),
    price: 280,
    originalPrice: 400,
    discount: 30,
    rating: 4.5,
    reviewCount: 54,
    minQuantity: 2,
    bulkPricing: [
      { minQty: 10, discount: 10, label: "Buy 10+ pieces: Save ₹10 each" },
      { minQty: 20, discount: 15, label: "Buy 20+ pieces: Save ₹15 each" },
      { minQty: 30, discount: 20, label: "Buy 30+ pieces: Save ₹20 each" },
    ],
    inStock: true,
    stockCount: 10000,
    description:
      "Experience the authentic natural taste with our Premium Special Lion Bidi (Big). Handcrafted with the finest tobacco leaves for the ultimate smoking experience. Each bidi is hand-rolled by skilled artisans, guaranteeing a consistent and impeccably crafted product.",
    images: [
      "/LionBidi.jpg",
      "https://res.cloudinary.com/dxqerqng1/image/upload/v1754817964/Pack_sn7kgz.png",
      "https://res.cloudinary.com/dxqerqng1/image/upload/v1754817922/Bidi_iz0x7a.jpg",
      "https://res.cloudinary.com/dxqerqng1/image/upload/v1754817934/Big_niemxu.jpg",
      "https://res.cloudinary.com/dxqerqng1/image/upload/v1754817983/Top_qpiobl.jpg",
    ],
    features: [
      "Superior Quality: Hand-rolled by skilled artisans",
      "Rich Flavor: Bold and distinctive taste blend",
      "Smooth Smoke: Superior quality tobacco leaves",
      "Slow Burn: Designed to burn slowly for extended sessions",
      "Authentic Feel: Traditional hand-rolled experience",
    ],
    specifications: {
      Type: "Premium Bidi (Big)",
      Quantity: "20 pieces per pack",
      "Tobacco Type": "Natural Tobacco Leaves",
      Size: "Large (Big)",
      Manufacturing: "Hand-rolled",
      Origin: "India",
    },
    benefits: [
      {
        icon: <Crown className="w-5 h-5" />,
        title: "Premium Quality",
        description: "Handcrafted with finest tobacco leaves",
      },
      {
        icon: <Flame className="w-5 h-5" />,
        title: "Rich Flavor",
        description: "Bold and distinctive taste experience",
      },
      {
        icon: <Leaf className="w-5 h-5" />,
        title: "Natural Ingredients",
        description: "100% natural tobacco leaves",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Excellent quality bidis! The taste is authentic and rich.",
        date: "2024-01-15",
        verified: true,
        helpful: 12,
      },
      {
        id: 2,
        name: "Amit Singh",
        rating: 4,
        comment: "Good product, burns slowly and has great flavor.",
        date: "2024-01-10",
        verified: true,
        helpful: 8,
      },
      {
        id: 3,
        name: "Pradeep Sharma",
        rating: 5,
        comment: "Best bidis in the market. Highly recommended!",
        date: "2024-01-08",
        verified: false,
        helpful: 15,
      },
    ],
  },
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, cartItems } = useAppContext();

  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(2);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState("features");
  const [showBulkModal, setShowBulkModal] = useState(false);

  useEffect(() => {
    const product = productData[slug];
    if (product) {
      setCurrentProduct(product);
      setQuantity(product.minQuantity);
    }
  }, [slug]);

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Crown className="w-16 h-16 text-orange-500 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800">Loading product details...</h2>
          <p className="text-gray-600">Please wait while we fetch the premium product information</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...currentProduct,
      quantity: quantity,
      totalPrice: currentProduct.price * quantity,
    });
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(currentProduct.minQuantity, prev - 1));
  };

  const getBulkDiscount = (qty) => {
    const applicable = currentProduct.bulkPricing
      .filter((bulk) => qty >= bulk.minQty)
      .sort((a, b) => b.minQty - a.minQty);
    return applicable.length > 0 ? applicable[0] : null;
  };

  const calculateDiscountedPrice = () => {
    const bulkDiscount = getBulkDiscount(quantity);
    return bulkDiscount
      ? currentProduct.price - bulkDiscount.discount
      : currentProduct.price;
  };

  const totalPrice = calculateDiscountedPrice() * quantity;
  const savings = (currentProduct.price - calculateDiscountedPrice()) * quantity;

  const productNotFound = (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <X className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button
            onClick={() => navigate("/")}
            className="hover:text-orange-500 transition-colors duration-200"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-orange-600 font-medium">{currentProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={currentProduct.images[selectedImage]}
                alt={currentProduct.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {currentProduct.discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {currentProduct.discount}% OFF
                </div>
              )}
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {currentProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-orange-500 shadow-lg"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${currentProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {currentProduct.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(currentProduct.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {currentProduct.rating} ({currentProduct.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-orange-600">
                    ₹{calculateDiscountedPrice()}
                  </span>
                  <span className="text-sm text-gray-500">per pack</span>
                  {currentProduct.originalPrice > currentProduct.price && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{currentProduct.originalPrice}
                    </span>
                  )}
                </div>
                
                {savings > 0 && (
                  <div className="text-sm text-green-600 font-semibold">
                    You save ₹{savings.toFixed(0)} on this order!
                  </div>
                )}
              </div>
            </div>

            {/* Bulk Pricing Info */}
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                💰 Bulk Pricing Available
              </h3>
              <div className="space-y-2">
                {currentProduct.bulkPricing.map((bulk, index) => (
                  <div key={index} className="text-sm text-orange-700">
                    • {bulk.label}
                  </div>
                ))}
              </div>
              <p className="text-sm text-orange-600 mt-3 font-medium">
                **Minimum order:** {currentProduct.minQuantity} pieces required
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border-2 border-orange-200 rounded-full overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-orange-50 transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4 text-orange-600" />
                  </button>
                  <span className="px-6 py-3 text-lg font-semibold text-gray-800 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-orange-50 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 text-orange-600" />
                  </button>
                </div>
              </div>

              <div className="text-lg font-bold text-gray-800">
                Total: ₹{totalPrice}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>

              <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center space-x-2 p-3 border-2 border-orange-200 rounded-full hover:bg-orange-50 transition-colors duration-200">
                  <Share className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-orange-600 font-medium">Share</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 border-2 border-orange-200 rounded-full hover:bg-orange-50 transition-colors duration-200">
                  <MessageCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-orange-600 font-medium">Ask</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 border-2 border-orange-200 rounded-full hover:bg-orange-50 transition-colors duration-200">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-orange-600 font-medium">Call</span>
                </button>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Crown className="w-6 h-6 text-orange-500 mr-2" />
                Premium Benefits
              </h3>
              <div className="space-y-3">
                {currentProduct.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-xl shadow-sm">
                    <div className="text-orange-500">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Truck className="w-8 h-8 text-orange-500 mx-auto" />
                  <div className="text-xs font-medium text-gray-600">Fast Delivery</div>
                </div>
                <div className="space-y-2">
                  <Shield className="w-8 h-8 text-green-500 mx-auto" />
                  <div className="text-xs font-medium text-gray-600">Secure Payment</div>
                </div>
                <div className="space-y-2">
                  <RotateCcw className="w-8 h-8 text-blue-500 mx-auto" />
                  <div className="text-xs font-medium text-gray-600">Easy Returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            {["features", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-lg font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50"
                    : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "features" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {currentProduct.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
                        <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(currentProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <span className="font-semibold text-gray-700">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(currentProduct.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">
                      {currentProduct.rating} out of 5
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentProduct.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{review.name}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-orange-500">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Crown className="w-8 h-8 text-orange-500 mr-3" />
              Discover More Premium Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover more premium bidi products from our collection - handpicked for exceptional quality, authentic taste, and customer satisfaction
            </p>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
