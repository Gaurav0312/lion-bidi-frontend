import React from "react";
import { useHeader } from "../hooks/useHeader";
import PromoBar      from "./Header/PromoBar";
import HeaderLogo    from "./Header/HeaderLogo";
import DesktopSearch from "./Header/DesktopSearch";
import DesktopNav    from "./Header/DesktopNav";
import MobileActions from "./Header/MobileActions";
import MobileSearch  from "./Header/MobileSearch";
import MobileMenu    from "./Header/MobileMenu";
import CartSidebar   from "./CartSidebar";

// Tailwind colour added in tailwind.config.js
// colors: { 'divine-orange': '#FF6B35' }

const Header = () => {
  const { state, actions, refs, data, handlers } = useHeader();

  /* -----------------------------  STYLES  ----------------------------- */
  // header background (top = cream, scrolled = white)
  const headerBg = state.isScrolled
    ? "bg-white/95 backdrop-blur-xl shadow-md"
    : "bg-orange-50/95 backdrop-blur-md";

  // slim orange bar that sits on the very top
  const accentBar = (
    <div className="h-1 bg-divine-orange" />
  );

  // optional bulk-discount banner
  const bulkBanner = data.bulkDiscountPercent > 0 && (
    <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-center py-1.5 px-4">
      <span className="text-sm font-semibold flex items-center justify-center gap-2">
        🔥 {data.bulkDiscountPercent}% BULK DISCOUNT ACTIVE! ({data.totalQuantity} items)
      </span>
    </div>
  );

  /* -----------------------------  RENDER  ----------------------------- */
  return (
    <>
      {/* promo strip */}
      <PromoBar
        showPromo={state.showPromo}
        onClose={() => actions.setShowPromo(false)}
      />

      {/* header */}
      <header
        className={`sticky top-0 z-50 border-b border-orange-100 transition-all duration-300 ${headerBg}`}
      >
        {accentBar}
        {bulkBanner}

        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* desktop / mobile header row */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            <HeaderLogo handleNavigate={handlers.handleNavigate} />

            <DesktopSearch
              searchQuery={state.searchQuery}
              setSearchQuery={actions.setSearchQuery}
              handleSearch={handlers.handleSearch}
              isLoading={state.isLoading}
            />

            <DesktopNav
              user={data.user}
              isUserMenuOpen={state.isUserMenuOpen}
              setIsUserMenuOpen={actions.setIsUserMenuOpen}
              userMenuRef={refs.userMenuRef}
              wishlist={data.wishlist}
              handleNavigate={handlers.handleNavigate}
              handleLogout={handlers.handleLogout}
              openAuthModal={data.openAuthModal}
              setIsCartOpen={actions.setIsCartOpen}
              cartCount={data.cartCount}
            />

            <MobileActions
              setIsMobileSearchOpen={actions.setIsMobileSearchOpen}
              isMobileSearchOpen={state.isMobileSearchOpen}
              user={data.user}
              wishlist={data.wishlist}
              cartCount={data.cartCount}
              setIsCartOpen={actions.setIsCartOpen}
              setIsMenuOpen={actions.setIsMenuOpen}
              isMenuOpen={state.isMenuOpen}
              handleNavigate={handlers.handleNavigate}
            />
          </div>

          {/* slide-down mobile search */}
          <MobileSearch
            isMobileSearchOpen={state.isMobileSearchOpen}
            searchQuery={state.searchQuery}
            setSearchQuery={actions.setSearchQuery}
            handleSearch={handlers.handleSearch}
            isLoading={state.isLoading}
          />
        </div>
      </header>

      {/* mobile drawer */}
      <MobileMenu
        isOpen={state.isMenuOpen}
        onClose={() => actions.setIsMenuOpen(false)}
        user={data.user}
        handleNavigate={handlers.handleNavigate}
        handleLogout={handlers.handleLogout}
        openAuthModal={data.openAuthModal}
        wishlist={data.wishlist}
        cartCount={data.cartCount}
        cartSavings={data.cartSavings}
        bulkDiscountPercent={data.bulkDiscountPercent}
        totalQuantity={data.totalQuantity}
      />

      {/* cart sidebar */}
      <CartSidebar
        isOpen={state.isCartOpen}
        onClose={() => actions.setIsCartOpen(false)}
        cartItems={data.cartItems}
        cartTotal={data.cartTotal}
        cartCount={data.cartCount}
        cartSavings={data.cartSavings}
        bulkDiscountPercent={data.bulkDiscountPercent}
        totalQuantity={data.totalQuantity}
        finalTotal={data.finalTotal}
        handleNavigate={handlers.handleNavigate}
        isLoading={state.isLoading}
      />
    </>
  );
};

export default Header;
