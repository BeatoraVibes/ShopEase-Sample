import React, { useState } from "react";

// Sample Product Data for the Storefront
const PRODUCTS = [
  {
    id: 1,
    name: "Premium UI Kit",
    category: "Branding",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    description: "Complete design system with 100+ matching components.",
  },
  {
    id: 2,
    name: "E-Commerce Web Template",
    category: "Web Design",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    description: "Fully responsive modern digital shop front layout.",
  },
  {
    id: 3,
    name: "Minimalist Brand Guidelines",
    category: "Branding",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    description: "Clean typography and asset presentation mockups.",
  },
];

export default function App() {
  // Application States
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Cart Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Add Item to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Remove Item from Cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Handle Order Submit
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased scroll-smooth">
      {/* Navigation Header */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-6 py-4 flex justify-between items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsCheckingOut(false);
            setOrderConfirmed(false);
          }}
        >
          <span className="text-xs uppercase tracking-widest text-gray-400 block font-semibold">
            Beatora Design
          </span>
          <span className="text-xl font-bold tracking-tight">ShopEase</span>
        </div>

        {/* Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-500">
          <button
            onClick={() => {
              setIsCheckingOut(false);
              setOrderConfirmed(false);
            }}
            className="hover:text-black transition-colors"
          >
            Store
          </button>
          <button className="hover:text-black transition-colors">
            About Us
          </button>
          <button className="hover:text-black transition-colors">
            Contact Us
          </button>
        </div>

        {/* Header Interactions (Cart + Hamburger) */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-black transition-colors flex items-center space-x-1"
          >
            <span className="text-sm font-medium tracking-wide">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Action Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 focus:outline-none p-2"
          >
            <span className="text-sm font-semibold tracking-wider">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu Box */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-3 shadow-sm relative z-50">
          <button
            onClick={() => {
              setIsCheckingOut(false);
              setOrderConfirmed(false);
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-medium text-gray-600 hover:text-black py-2 border-b border-gray-50"
          >
            Store
          </button>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-left font-medium text-gray-600 hover:text-black py-2 border-b border-gray-50"
          >
            About Us
          </button>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-left font-medium text-gray-600 hover:text-black py-2"
          >
            Contact Us
          </button>
        </div>
      )}

      {/* Application Main Body Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {isCheckingOut ? (
          <div className="max-w-xl mx-auto">
            {orderConfirmed ? (
              /* Success Order Banner View */
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-2xl mx-auto">
                  ✓
                </div>
                <h2 className="text-3xl font-black tracking-tight">
                  Order Confirmed!
                </h2>
                <p className="text-gray-500 text-sm font-light">
                  Thank you for shopping with{" "}
                  <span className="font-semibold text-black">
                    Beatora Design
                  </span>
                  . Your digital items are ready.
                </p>
                <button
                  onClick={() => {
                    setIsCheckingOut(false);
                    setOrderConfirmed(false);
                  }}
                  className="w-full bg-black text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Return to Store
                </button>
              </div>
            ) : (
              /* Standard Payment Checkouts Box */
              <div className="bg-white rounded-3xl p-8 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">
                  Checkout Details
                </h2>
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-500 text-sm">Total Due:</span>
                      <span className="text-2xl font-bold">${cartTotal}</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white rounded-xl py-3.5 font-medium hover:bg-gray-800 transition-colors"
                    >
                      Complete Secure Payment
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* Store Catalog Showcase Grid */
          <div className="space-y-12">
            {/* Main Brand Hero Banner Layout */}
            <div className="bg-neutral-900 text-white rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="space-y-4 max-w-xl z-10">
                <span className="text-xs uppercase tracking-widest text-neutral-400 bg-neutral-800 px-3 py-1.5 rounded-full font-medium">
                  Portfolio Storefront
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                  ShopEase by <br />
                  <span className="text-neutral-400">Beatora Design</span>
                </h1>
                <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                  Discover signature design templates, custom UI kits, and
                  premium case study assets built to elevate your work.
                </p>
                <button className="bg-white text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-neutral-100 transition-colors shadow-lg">
                  Explore Work Samples
                </button>
              </div>
              <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden bg-neutral-800 shadow-2xl z-10">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Work Portfolio Showcase"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Core Products Shelf Container */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold tracking-tight text-gray-400 uppercase">
                Premium Catalog
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                  >
                    <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md text-gray-700 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-lg tracking-tight">
                            {product.name}
                          </h3>
                          <span className="font-extrabold text-lg text-neutral-900">
                            ${product.price}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm font-light leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-black hover:text-white hover:border-black transition-all"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sliding Slide-out Sidebar Cart Container */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between p-6">
            <div className="space-y-6 overflow-y-auto pr-2">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold tracking-tight">
                  Your Shopping Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-sm font-medium text-gray-400 hover:text-black"
                >
                  Hide ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-400 space-y-2">
                  <span className="block text-3xl">🛒</span>
                  <p className="text-sm font-light">
                    Your basket is completely empty.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 bg-gray-50 p-3 rounded-2xl border border-gray-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-xl"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-sm font-bold truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {item.quantity} x ${item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-semibold text-rose-500 hover:text-rose-700 px-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-100 pt-4 mt-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">Cart Subtotal:</span>
                  <span className="text-xl font-extrabold">${cartTotal}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckingOut(true);
                  }}
                  className="w-full bg-black text-white rounded-xl py-3 text-center text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
