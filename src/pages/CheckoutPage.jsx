// CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Smartphone,
  CheckCircle,
  Copy,
  ExternalLink,
  Monitor,
} from "lucide-react";
import QRCode from "react-qr-code";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ["android", "iphone", "ipad", "mobile", "tablet"];
      const isMobileDevice = mobileKeywords.some((k) =>
        userAgent.includes(k)
      );
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 px-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            No product found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * product.quantity;
  const upiId = "9589773525@ptsbi";
  const upiName = "Gaurav Verma";
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    upiName
  )}&am=${totalPrice}&cu=INR&tn=Order%20Payment`;

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy UPI ID");
    }
  };

  const handleAppClick = (appName, deepLink, webUrl = null) => {
    if (isMobile) {
      window.location.href = deepLink;
      setTimeout(() => {
        if (!document.hidden) window.location.href = upiLink;
      }, 1500);
    } else {
      if (webUrl) {
        window.open(webUrl, "_blank");
      } else {
        const modal = document.createElement("div");
        modal.innerHTML = `
          <div style="position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;">
            <div style="background:white;padding:2rem;border-radius:1rem;max-width:400px;text-align:center;">
              <h3 style="margin-bottom:1rem;font-size:1.25rem;font-weight:600;">Pay with ${appName}</h3>
              <p style="margin-bottom:0.5rem;color:#444;">1. Open ${appName} app on your phone</p>
              <p style="margin-bottom:0.5rem;color:#444;">2. Scan the QR code on this page</p>
              <p style="margin-bottom:0.5rem;color:#444;">3. Or use UPI ID: <strong>${upiId}</strong></p>
              <p style="margin-bottom:1rem;color:#444;">4. Amount: ₹${totalPrice}</p>
              <button onclick="this.parentElement.parentElement.remove()" style="background:#dc2626;color:white;padding:0.5rem 1rem;border:none;border-radius:0.5rem;cursor:pointer;">Close</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              Secure Checkout
            </h1>
            <p className="text-gray-600 text-lg">
              Complete your purchase with confidence
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h2>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-start space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity:{" "}
                    <span className="font-medium">{product.quantity}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Unit Price:{" "}
                    <span className="text-orange-600 font-medium">
                      ₹{product.price}
                    </span>
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <span className="text-gray-700">Total</span>
                <span className="text-2xl font-bold text-orange-600">
                  ₹{totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Options
              </h2>
            </div>

            <div className="space-y-6">
              {/* QR */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center shadow-inner">
                <div className="inline-block p-4 bg-white rounded-xl shadow-lg border border-indigo-100">
                  <QRCode value={upiLink} size={180} />
                </div>
                <h3 className="mt-4 font-semibold text-gray-800">
                  Scan QR Code to Pay
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Works with all UPI apps
                </p>
              </div>

              {/* UPI ID */}
              <div>
                <p className="text-sm text-gray-600 mb-2">UPI ID</p>
                <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
                  <span className="font-mono text-gray-800">{upiId}</span>
                  <button
                    onClick={copyUpiId}
                    className="text-gray-500 hover:text-green-500 transition"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-green-600 text-xs mt-1">Copied!</p>
                )}
              </div>

              {/* CTA */}
              <a
                href={upiLink}
                className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition transform hover:scale-105 shadow-md text-center"
              >
                Pay ₹{totalPrice} Now
              </a>
              <div className="flex items-center justify-center text-gray-500 text-sm">
                <Shield className="w-4 h-4 mr-1" />
                Secured by UPI • 256-bit encryption
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            How to Pay
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                1
              </div>
              <p>
                {isMobile
                  ? "Click your preferred UPI app below"
                  : "Open any UPI app on your phone"}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                2
              </div>
              <p>
                {isMobile
                  ? "Complete payment with your UPI PIN"
                  : "Scan QR code or enter UPI ID manually"}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                3
              </div>
              <p>
                {isMobile
                  ? "Payment confirmation will appear"
                  : "Complete payment with UPI PIN"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
