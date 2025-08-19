import React from "react";
import { Mail, Phone, MapPin, Crown, Zap, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import AppContext from '../context/AppContext';

const Footer = () => {
  const { setCurrentPage } = useContext(AppContext);
  
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Premium top border with glow effect */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400/60 through-yellow-400/80 to-transparent shadow-lg shadow-amber-500/20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Lion Bidi Brand Section */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-amber-500/30">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-white text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Lion Bidi
                </span>
                <p className="text-amber-400/80 text-xs font-medium">Premium Quality</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed text-sm lg:text-base">
              Experience the authentic taste of traditional tobacco with our premium handcrafted bidis. 
              Trusted by generations for exceptional quality.
            </p>
            
            {/* Contact Info with enhanced styling */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-300 group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a href="mailto:info@lionbidi.com" className="text-sm hover:text-amber-400 transition-colors duration-300">
                  info@lionbidi.com
                </a>
              </div>
              
              <div className="flex items-center text-gray-300 group">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3 group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all duration-300">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a href="tel:+91-9876543210" className="text-sm hover:text-amber-400 transition-colors duration-300">
                  +91-9876543210
                </a>
              </div>
              
              <div className="flex items-center text-gray-300 group">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">Mumbai, Delhi, Bangalore</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-6 flex items-center">
              <Zap className="w-5 h-5 text-amber-400 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '#' },
                { name: 'Our Story', href: '#' },
                { name: 'Contact Us', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms & Conditions', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-400/50 rounded-full mr-3 group-hover:bg-amber-400 transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setCurrentPage("refundPolicy")}
                  className="text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm text-left flex items-center group"
                >
                  <span className="w-2 h-2 bg-amber-400/50 rounded-full mr-3 group-hover:bg-amber-400 transition-colors duration-300"></span>
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-6 flex items-center">
              <Crown className="w-5 h-5 text-amber-400 mr-2" />
              Our Products
            </h3>
            <ul className="space-y-3">
              {[
                'Premium Lion Bidi',
                'Traditional Tobacco',
                'Rolling Papers',
                'Bidi Accessories',
                'Gift Collections'
              ].map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-400/50 rounded-full mr-3 group-hover:bg-amber-400 transition-colors duration-300"></span>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-6 flex items-center">
              <Shield className="w-5 h-5 text-amber-400 mr-2" />
              Customer Care
            </h3>
            <ul className="space-y-3">
              {[
                'Help Center',
                'Fast Delivery',
                'Quality Guarantee',
                'Track Your Order',
                '24/7 Support'
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-400/50 rounded-full mr-3 group-hover:bg-amber-400 transition-colors duration-300"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service Highlights - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-12 mb-8">
          <div className="bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
            <div className="flex items-center">
              <Truck className="w-8 h-8 text-amber-400 mr-3" />
              <div>
                <h4 className="text-white font-semibold text-sm">Fast Delivery</h4>
                <p className="text-gray-400 text-xs">Same day delivery available</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
            <div className="flex items-center">
              <Crown className="w-8 h-8 text-amber-400 mr-3" />
              <div>
                <h4 className="text-white font-semibold text-sm">Premium Quality</h4>
                <p className="text-gray-400 text-xs">100% authentic products</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-amber-400 mr-3" />
              <div>
                <h4 className="text-white font-semibold text-sm">Secure Shopping</h4>
                <p className="text-gray-400 text-xs">Safe & encrypted payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Enhanced Mobile Layout */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 <span className="text-amber-400 font-semibold">Lion Bidi</span>. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">Crafted with tradition, delivered with care</p>
            </div>
            
            {/* Payment Methods - Mobile Optimized */}
            <div className="flex flex-col items-center lg:items-end">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-gray-400">Secure Payments:</span>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-end gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg px-3 py-2 text-xs font-bold text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                  VISA
                </div>
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg px-3 py-2 text-xs font-bold text-white shadow-lg hover:shadow-red-500/30 transition-all duration-300">
                  MasterCard
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg px-3 py-2 text-xs font-bold text-white shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                  UPI
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg px-3 py-2 text-xs font-bold text-white shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
                  PayTM
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg px-3 py-2 text-xs font-bold text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                  PhonePe
                </div>
              </div>
            </div>

            {/* Social Links - Enhanced */}
            <div className="flex justify-center lg:justify-end space-x-4">
              {[
                { name: 'Facebook', icon: 'M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z' },
                { name: 'Instagram', icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.467 4.467-4.467c2.459 0 4.468 2.009 4.468 4.467s-2.01 4.468-4.468 4.468zm7.584 0c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.467 4.467-4.467c2.459 0 4.468 2.009 4.468 4.467s-2.01 4.468-4.468 4.468z' },
                { name: 'Twitter', icon: 'M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-gradient-to-r from-slate-700 to-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-400 hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
