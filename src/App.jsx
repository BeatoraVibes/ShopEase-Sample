import React, { useState } from "react";

// Your product/sample list
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: "Minimalist Brand Identity",
    category: "Branding",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
    description:
      "Complete visual identity system including logos, typography guidelines, and brand book templates.",
    specs: [
      "Fully editable vector files (.AI & .EPS)",
      "Includes custom type style sheets",
      "Commercial use license granted",
      "Detailed 45-page brand manual guide",
    ],
  },
  {
    id: 2,
    title: "Modern UI Kit (Figma)",
    category: "UI/UX Design",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
    description:
      "A fully customizable, accessible design system for SaaS dashboards and mobile applications.",
    specs: [
      "150+ components with auto-layout v5",
      "Light and dark mode variants included",
      "WCAG AA compliant contrast checking",
      "Free lifetime kit updates included",
    ],
  },
  {
    id: 3,
    title: "Abstract Geometric Posters",
    category: "Print & Digital",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
    description:
      "High-resolution digital vector art pack perfect for physical prints or editorial backgrounds.",
    specs: [
      "10 distinct vector art compositions",
      "Ultra-high res exportable CMYK / 300 DPI",
      "Scalable infinite resolution formats",
      "Bonus mobile wallpaper assets included",
    ],
  },
  {
    id: 4,
    title: "Premium Webflow Template",
    category: "Web Development",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    description:
      "A responsive, fluid-motion landing page template designed specifically for creative agencies.",
    specs: [
      "100% fluid web responsive build",
      "Integrated custom GSAP animations",
      "SEO optimized structure",
      "Global swatches & clean style guide panel",
    ],
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // NEW STATES: Controls checkout screen view and order placement confirmation screen
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

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

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
    e.target.reset();
  };

  // Submitting the checkout form
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
    setCart([]); // Clear the cart upon completion
  };

  const categories = [
    "All",
    ...new Set(SAMPLE_PRODUCTS.map((p) => p.category)),
  ];
  const filteredProducts =
    activeCategory === "All"
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter(
          (product) => product.category === activeCategory
        );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased scroll-smooth">
      {/* Navigation Header */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div
            className="cursor-pointer"
            onClick={() => setIsCheckingOut(false)}
          >
            <span className="text-xs uppercase tracking-widest text-gray-400 block font-semibold">
              Beatora Design
            </span>
            <span className="text-xl font-bold tracking-tight">ShopEase</span>
          </div>
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
            <a
              href="#about-section"
              onClick={() => setIsCheckingOut(false)}
              className="hover:text-black transition-colors"
            >
              About Us
            </a>
            <a
              href="#contact-section"
              onClick={() => setIsCheckingOut(false)}
              className="hover:text-black transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {!isCheckingOut && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-black transition-colors"
            >
              <span className="text-sm font-medium tracking-wide">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <span className="text-sm font-semibold tracking-wider">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </nav>
      {/* Mobile Menu Dropdown Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-3 shadow-sm">
          <button
            onClick={() => {
              setIsCheckingOut(false); // Goes back to main shop view
              setIsMenuOpen(false); // Closes the menu
            }}
            className="block w-full text-left font-medium text-gray-600 hover:text-black py-2"
          >
            Shop
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false); // Closes menu
              // If you have a categories filter section, you can trigger it here
            }}
            className="block w-full text-left font-medium text-gray-600 hover:text-black py-2"
          >
            Categories
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false); // Closes menu
              alert("Contact section coming soon!"); // Temporary alert or navigation
            }}
            className="block w-full text-left font-medium text-gray-600 hover:text-black py-2"
          >
            Contact
          </button>
        </div>
      )}

      {/* Main Content Conditional Switch: Shows Checkout Form OR Standard Storefront */}
      {isCheckingOut ? (
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Order Success Screen Layout */}
          {orderConfirmed ? (
            <div className="bg-white rounded-3xl p-8 md:p-16 border border-gray-100 text-center shadow-sm max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-2xl font-bold mx-auto border border-emerald-100">
                ✓
              </div>
              <h2 className="text-3xl font-black tracking-tight">
                Order Confirmed!
              </h2>
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                Thank you for shopping with{" "}
                <span className="font-semibold text-black">
                  ShopEase by Beatora Design
                </span>
                . Your order is being assembled. You will pay via Cash on
                Delivery when your package arrives.
              </p>
              <button
                onClick={() => {
                  setIsCheckingOut(false);
                  setOrderConfirmed(false);
                }}
                className="inline-block bg-black hover:bg-neutral-800 text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors"
              >
                Return to Storefront
              </button>
            </div>
          ) : (
            /* Standard Active Checkout Interface */
            <div>
              <button
                onClick={() => setIsCheckingOut(false)}
                className="text-sm font-semibold tracking-wide text-neutral-400 hover:text-black mb-8 block"
              >
                ← Back to Storefront
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Form: Delivery Data Input */}
                <form
                  onSubmit={handlePlaceOrder}
                  className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6"
                >
                  <h2 className="text-xl font-bold tracking-tight border-b border-gray-100 pb-4">
                    Shipping & Delivery Info
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          First Name
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          Contact Phone
                        </label>
                        <input
                          required
                          type="tel"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="ABC123@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                        Street Address
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder="Flat No, Building, Landmark Area"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          City
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          State
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          PIN Code
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="PIN Code"
                        />
                      </div>
                    </div>
                  </div>

                  {/* COD Payment Segment Container */}
                  <div className="pt-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 mb-3">
                      Select Payment Mode
                    </h3>
                    <div className="border border-neutral-900 bg-neutral-50 rounded-2xl p-4 flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                      <div>
                        <div className="text-sm font-bold">
                          Cash on Delivery (COD)
                        </div>
                        <div className="text-xs text-gray-500 font-light mt-0.5">
                          Pay safely in cash upon physical item reception.
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-800 text-white font-semibold py-4 rounded-xl tracking-wide transition-all shadow-md text-sm"
                  >
                    Complete Order via COD
                  </button>
                </form>

                {/* Right Panel: Sticky Invoice Breakdown */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 sticky top-24">
                  <h3 className="text-base font-bold tracking-tight border-b border-gray-100 pb-2">
                    Order Summary
                  </h3>
                  <div className="max-h-[220px] overflow-y-auto divide-y divide-gray-50 pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-2.5 text-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 object-cover rounded-lg bg-gray-100"
                          />
                          <div>
                            <p className="font-bold text-gray-900 leading-tight">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400 font-light mt-0.5">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-800">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <p className="font-light">Subtotal</p>
                      <p className="font-medium text-gray-900">${cartTotal}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-light">Shipping Delivery</p>
                      <p className="text-emerald-600 font-medium">FREE</p>
                    </div>
                    <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-50">
                      <p>Total Due</p>
                      <p>${cartTotal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Standard Application Layout Wrapper (Banner, Grid, About, Contact) */
        <div>
          {/* Hero Banner */}
          <header className="max-w-6xl mx-auto px-6 pt-8 pb-4">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 rounded-3xl overflow-hidden shadow-xl text-white grid grid-cols-1 md:grid-cols-2 items-center min-h-[400px]">
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start space-y-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
                  Portfolio Storefront
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  ShopEase by <br />
                  <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                    Beatora Design
                  </span>
                </h1>
                <p className="text-neutral-400 font-light leading-relaxed text-sm md:text-base max-w-sm">
                  Discover signature design templates, custom UI kits, and
                  premium case study assets built to elevate your work.
                </p>
                <div className="pt-2">
                  <a
                    href="#products-section"
                    className="inline-block bg-white hover:bg-neutral-200 text-neutral-950 font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md text-sm tracking-wide"
                  >
                    Explore Work Samples
                  </a>
                </div>
              </div>
              <div className="h-full min-h-[250px] md:min-h-full w-full relative bg-neutral-950 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
                  alt="Beatora Design Showcase Graphic"
                  className="w-full h-full object-cover opacity-75 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </header>

          {/* Products Grid */}
          <section
            id="products-section"
            className="max-w-6xl mx-auto px-6 pt-12"
          >
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium tracking-wide rounded-xl transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-black text-white shadow-sm scale-102"
                      : "bg-white text-gray-600 hover:text-black hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No assets found in this segment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="overflow-hidden bg-gray-100 aspect-[4/3] relative cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold tracking-wider shadow-md text-neutral-900">
                          Quick View
                        </span>
                      </div>
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wide rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h3
                            onClick={() => setSelectedProduct(product)}
                            className="text-xl font-bold tracking-tight cursor-pointer hover:text-neutral-600 transition-colors"
                          >
                            {product.title}
                          </h3>
                          <span className="text-lg font-semibold text-gray-800">
                            ${product.price}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
                          {product.description}
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-xl font-medium tracking-wide transition-colors duration-200 shadow-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* About Us Section */}
          <section
            id="about-section"
            className="max-w-6xl mx-auto px-6 py-20 mt-12 border-t border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                  The Studio
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                  About Beatora Design
                </h2>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  ShopEase by Beatora Design operates at the intersection of
                  modern aesthetic engineering and fluid digital experiences. We
                  compose elite resources built explicitly for modern designers,
                  creators, and growth-focused businesses looking to outpace
                  digital noise.
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  Every package, layout kit, and physical sample available here
                  undergoes comprehensive optimization cycles to maximize
                  aesthetic premium and real-world conversion.
                </p>
              </div>
              <div className="bg-neutral-900 rounded-3xl overflow-hidden aspect-video shadow-md relative">
                <img
                  src="https://images.unsplash.com/photo-1541462608141-ad4979e408c9?auto=format&fit=crop&w=800&q=80"
                  alt="Design Process Office"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </section>

          {/* Contact Us Section */}
          <section
            id="contact-section"
            className="bg-white border-t border-gray-100 py-20"
          >
            <div className="max-w-4xl mx-auto px-6 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                Inquiries
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Let's Work Together
              </h2>
              <p className="text-gray-600 font-light max-w-lg mx-auto mb-10 text-sm md:text-base">
                Have a custom brand design project or questions regarding asset
                licensing? Shoot us a message directly below.
              </p>
              <form
                onSubmit={handleContactSubmit}
                className="max-w-xl mx-auto text-left space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Message Body
                  </label>
                  <textarea
                    required
                    rows="4"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
                    placeholder="Describe your design specifications or store inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-neutral-800 text-white font-semibold py-4 px-6 rounded-xl tracking-wide transition-all duration-200 shadow-sm text-sm"
                >
                  Send Secure Message
                </button>
                {contactSubmitted && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 text-sm font-medium rounded-xl text-center border border-emerald-100">
                    ✓ Message successfully sent! The Beatora Design team will
                    respond shortly.
                  </div>
                )}
              </form>
            </div>
          </section>
        </div>
      )}

      {/* Quick View Modal Pop-up Component */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative grid grid-cols-1 md:grid-cols-2 min-h-[480px] z-10">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md z-20 border border-gray-100"
            >
              ✕
            </button>
            <div className="w-full h-full min-h-[250px] md:min-h-full bg-neutral-100 relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-between bg-white">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1 block">
                  {selectedProduct.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                  {selectedProduct.title}
                </h2>
                <div className="text-xl font-bold text-neutral-800 mb-4">
                  ${selectedProduct.price}
                </div>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-6 border-b border-gray-100 pb-4">
                  {selectedProduct.description}
                </p>
                <div className="mb-8">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-800 mb-3">
                    Asset Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedProduct.specs?.map((spec, index) => (
                      <li
                        key={index}
                        className="text-xs text-gray-600 flex items-start"
                      >
                        <span className="text-emerald-500 mr-2 font-bold">
                          ✓
                        </span>{" "}
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-3.5 px-4 rounded-xl text-sm tracking-wide transition-all shadow-sm"
              >
                Add Asset to Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Out Side-Cart Drawer Component */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-black text-sm uppercase tracking-wider font-semibold"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                    <p className="text-sm">Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 border-b border-gray-50 pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-gray-900 leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.category}
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p className="font-bold">${cartTotal}</p>
                  </div>
                  {/* MODIFIED: Clicking this now safely forwards users into the new checkout dashboard screen */}
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckingOut(true);
                    }}
                    className="w-full bg-black hover:bg-gray-800 text-white text-center py-4 rounded-xl font-semibold tracking-wide transition-colors shadow-sm"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white text-center py-8 text-xs text-gray-400 tracking-wider">
        © 2026 ShopEase by Beatora Design. All rights reserved.
      </footer>
    </div>
  );
}
