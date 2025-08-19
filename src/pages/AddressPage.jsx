// pages/AddressPage.jsx
import React, { useState, useCallback } from 'react';
import { ArrowLeft, MapPin, User, Phone, Mail, Home, Navigation, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const AddressPage = () => {
  const navigate = useNavigate();
  const { user, getCartTotal, getCartItemsCount } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    mobileNumber: user?.phone || '',
    emailAddress: user?.email || '',
    address: '',
    locality: '',
    landmark: '',
    pinCode: '',
    city: '',
    state: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPinCodeLoading, setIsPinCodeLoading] = useState(false);
  const [pinCodeSuggestions, setPinCodeSuggestions] = useState([]);
  const [pinCodeStatus, setPinCodeStatus] = useState(''); // 'valid', 'invalid', or ''

  // Debounced pincode lookup to avoid too many API calls
  const fetchLocationFromPincode = useCallback(async (pincode) => {
    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) return;
    
    setIsPinCodeLoading(true);
    setPinCodeStatus('');
    
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data?.[0]?.Status === 'Success' && data[0].PostOffice?.length > 0) {
        const postOffices = data[0].PostOffice;
        const primaryLocation = postOffices[0];
        
        setFormData(prev => ({
          ...prev,
          city: primaryLocation.District || primaryLocation.Block || '',
          state: primaryLocation.State || primaryLocation.Circle || ''
        }));
        
        setPinCodeStatus('valid');
        
        if (postOffices.length > 1) {
          setPinCodeSuggestions(postOffices.slice(0, 5).map(po => ({
            name: po.Name,
            district: po.District,
            state: po.State,
            block: po.Block
          })));
        } else {
          setPinCodeSuggestions([]);
        }
      } else {
        setPinCodeStatus('invalid');
        setFormData(prev => ({
          ...prev,
          city: '',
          state: ''
        }));
        setPinCodeSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
      setPinCodeStatus('invalid');
    } finally {
      setIsPinCodeLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'pinCode') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      
      if (numericValue !== formData.pinCode) {
        setPinCodeSuggestions([]);
        setPinCodeStatus('');
      }
      
      if (numericValue.length === 6) {
        fetchLocationFromPincode(numericValue);
      } else if (numericValue.length < 6) {
        setFormData(prev => ({
          ...prev,
          city: '',
          state: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      city: suggestion.district,
      state: suggestion.state,
      locality: suggestion.name
    }));
    setPinCodeSuggestions([]);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Enter a valid 10-digit number';
    if (!formData.emailAddress.trim()) newErrors.emailAddress = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) newErrors.emailAddress = 'Enter a valid email';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.pinCode.trim()) newErrors.pinCode = 'Pin code is required';
    else if (!/^\d{6}$/.test(formData.pinCode)) newErrors.pinCode = 'Enter a valid 6-digit pin code';
    else if (pinCodeStatus === 'invalid') newErrors.pinCode = 'Please enter a valid Indian pin code';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      localStorage.setItem('deliveryAddress', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      }));
      navigate('/payment');
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const cartTotal = getCartTotal();
  const cartCount = getCartItemsCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Enhanced Header with Premium Styling */}
      <div className="bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 min-w-0 ml-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
              Delivery Address
            </h1>
            <p className="text-sm text-gray-500">{cartCount} items • ₹{cartTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  
                  <span className="absolute left-8 top-3 text-gray-600 text-sm">+91</span>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    maxLength="10"
                    className={`w-full pl-14 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.emailAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
              </div>

              {/* Address Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat / House No, Building, Colony"
                    rows="3"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none transition-colors ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Locality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Locality / Area <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleInputChange}
                  placeholder="E.g. MG Road, Gandhi Nagar"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Landmark <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="E.g. Near Bank, Chowk, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Pin Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pin Code <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="Enter pin code"
                    maxLength="6"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                      errors.pinCode ? 'border-red-500' : 
                      pinCodeStatus === 'valid' ? 'border-green-500 bg-green-50' : 
                      pinCodeStatus === 'invalid' ? 'border-red-500 bg-red-50' : 
                      'border-gray-300'
                    } ${isPinCodeLoading || pinCodeStatus ? 'pr-10' : ''}`}
                  />
                  
                  <div className="absolute right-3 top-3">
                    {isPinCodeLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-500 border-t-transparent"></div>
                    ) : pinCodeStatus === 'valid' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : pinCodeStatus === 'invalid' ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                </div>
                {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
                {pinCodeStatus === 'valid' && formData.pinCode.length === 6 && (
                  <p className="text-green-600 text-xs mt-1">✓ Valid pincode - City and state auto-filled</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  } ${formData.city && pinCodeStatus === 'valid' ? 'bg-green-50 border-green-300' : ''}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              {/* State Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    } ${formData.state && pinCodeStatus === 'valid' ? 'bg-green-50 border-green-300' : ''}`}
                  />
                </div>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
            </div>

            {/* Pincode Suggestions */}
            {pinCodeSuggestions.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900">
                    Multiple areas found for pincode {formData.pinCode}:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pinCodeSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="text-left text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-xs text-blue-600 truncate">
                        {suggestion.district}, {suggestion.state}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading || isPinCodeLoading}
                className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-400 hover:via-red-400 hover:to-orange-500 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl w-full"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Navigation className="w-5 h-5" />
                    <span className="text-lg">Continue to Payment</span>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;