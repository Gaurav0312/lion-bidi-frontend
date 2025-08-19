import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
  return (
    <div className="refund-policy-container">
      <div className="refund-policy-header">
        <h1>Refund Policy</h1>
        <p className="last-updated">Last updated on April 16, 2024</p>
      </div>

      <div className="refund-policy-content">
        <section>
          <p>Thank you for shopping at Smokeshop. We appreciate your business and want to ensure you have a seamless experience with our products.</p>
        </section>

        <section>
          <h2>Digital Products</h2>
          <p>We <strong>do not offer refunds</strong> for digital products once the order is confirmed and the product is sent.</p>
          <p>We recommend contacting us for assistance if you experience any issues receiving or downloading our products.</p>
        </section>

        <section>
          <h2>Physical Goods</h2>
          <p>You have <strong>7 calendar days</strong> to request a refund from your purchase date. To be eligible:</p>
          <ul>
            <li>Product must be unused with original packaging</li>
            <li>Proof of purchase is required</li>
            <li>Items must be in resellable condition</li>
          </ul>
        </section>

        <section>
          <h2>Refund Processing</h2>
          <p>Approved refunds will be processed within 5 business days. Your refund will be credited to your original payment method.</p>
        </section>

        <section>
          <h2>Shipping Returns</h2>
          <p>Customers are responsible for return shipping costs. We recommend using trackable shipping services as we can't guarantee receipt of returned items.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>For any questions about our Returns and Refunds Policy:</p>
          <ul>
            <li>Email: support@smokeshop.co.in</li>
            <li>Phone: +91-XXXXXXXXXX</li>
            <li>Business Hours: Mon-Sat, 10AM to 6PM IST</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;