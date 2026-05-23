import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Heart,
  Search,
  Star,
  Trash2,
  Plus,
  Minus,
  User,
  MapPin,
  CreditCard,
  ChevronRight,
  CheckCircle,
  MessageSquare,
  X,
  Filter,
  Sparkles,
  SlidersHorizontal,
  ArrowLeftRight,
} from "lucide-react";

// --- INITIAL CONSTANTS & PRODUCTS ---
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Nike Free Run Shoes",
    category: "Shoes",
    price: 2999,
    rating: 4.5,
    brand: "Nike",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    popular: true,
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    category: "Shoes",
    price: 3999,
    rating: 4.8,
    brand: "Adidas",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
    popular: true,
  },
  {
    id: 3,
    name: "Puma Classic Sneakers",
    category: "Shoes",
    price: 1999,
    rating: 4.2,
    brand: "Puma",
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&q=80",
    popular: false,
  },
  {
    id: 4,
    name: "Hex Dumbbell Set (10kg)",
    category: "Gym Equipment",
    price: 999,
    rating: 4.4,
    brand: "FitLine",
    image:
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&q=80",
    popular: false,
  },
  {
    id: 5,
    name: "Adjustable Workout Bench",
    category: "Gym Equipment",
    price: 7999,
    rating: 4.6,
    brand: "FlexGym",
    image:
      "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80",
    popular: true,
  },
  {
    id: 6,
    name: "Pro Series Treadmill",
    category: "Gym Equipment",
    price: 29999,
    rating: 4.9,
    brand: "FitLine",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    popular: true,
  },
  {
    id: 7,
    name: "MuscleBlaze Whey Protein",
    category: "Protein Supplements",
    price: 1299,
    rating: 4.7,
    brand: "MuscleBlaze",
    image:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=400&q=80",
    popular: true,
  },
];

const HERO_SLIDES = [
  {
    title: "Elevate Your Performance",
    sub: "Premium Gym Equipment Up To 40% Off",
    color: "from-purple-900 to-indigo-900",
  },
  {
    title: "Step Into Comfort",
    sub: "Exclusive Trends in Nike & Adidas Footwear",
    color: "from-fuchsia-950 to-purple-900",
  },
  {
    title: "Pure Nutrition Fuels",
    sub: "MuscleBlaze & Elite Protein Supplements",
    color: "from-indigo-950 to-purple-950",
  },
];

export default function App() {
  // --- STATE ENVIRONMENT ---
  const [activeTab, setActiveTab] = useState("home"); // home, checkout, profile, tracking
  const [cart, setCart] = useState(() => {
    const local = localStorage.getItem("shopease_cart");
    return local ? JSON.parse(local) : [];
  });
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(35000);
  const [sortBy, setSortBy] = useState("popular");

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Fake Checkout Form State
  const [address, setAddress] = useState({
    name: "Daksh",
    street: "Station Road, Virar West",
    city: "Mumbai",
    pin: "401303",
  });
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Sync Cart with Local Storage
  useEffect(() => {
    localStorage.setItem("shopease_cart", JSON.stringify(cart));
  }, [cart]);

  // Sliding Banner Loop
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, []);

  // --- BUSINESS LOGIC FUNCTIONS ---
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    triggerToast(`Added ${product.name} to Cart!`);
  };

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + change;
            return nextQty > 0 ? { ...item, quantity: nextQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    triggerToast(
      wishlist.includes(id) ? "Removed from Wishlist" : "Saved to Wishlist!"
    );
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      setAppliedDiscount(10);
      triggerToast("10% Coupon Applied Successfully!");
    } else {
      triggerToast("Invalid Coupon Code");
    }
  };

  // --- FILTER & SORT EXECUTION ---
  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "lowHigh") return a.price - b.price;
    if (sortBy === "highLow") return b.price - a.price;
    return b.rating - a.rating; // default: popularity metric
  });

  // Dynamic Totals Calculation
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = Math.round((cartSubtotal * appliedDiscount) / 100);
  const cartTotal = cartSubtotal - discountAmount;

  return (
    <div className="min-h-screen bg-[#FAFAFE] text-slate-800 font-sans antialiased selection:bg-purple-200">
      {/* GLOBAL TOAST SYSTEM */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-in">
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          <p className="text-sm font-medium">{toast}</p>
        </div>
      )}

      {/* --- DESKTOP & TABLET NAV BAR --- */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo Identity */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveTab("home")}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-200">
              SE
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-purple-700 to-indigo-800 bg-clip-text text-transparent">
              ShopEase
            </span>
          </div>

          {/* Interactive Live Search Filter Engine */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <input
              type="text"
              placeholder="Search running shoes, proteins, workout gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F3F0FA]/60 pl-10 pr-4 py-2 rounded-xl text-sm border border-transparent focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            />
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
          </div>

          {/* Core Navigation Pathways */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setActiveTab("home")}
              className={`text-sm font-semibold transition-colors ${
                activeTab === "home"
                  ? "text-purple-600"
                  : "text-slate-600 hover:text-purple-600"
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => setActiveTab("tracking")}
              className={`text-sm font-semibold transition-colors ${
                activeTab === "tracking"
                  ? "text-purple-600"
                  : "text-slate-600 hover:text-purple-600"
              }`}
            >
              Track Order
            </button>

            {/* User Interface Quick-Actions */}
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4 sm:pl-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`p-2 rounded-xl transition-all ${
                  activeTab === "profile"
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 relative transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE-ONLY SEARCH HEADER BAR */}
      <div className="p-4 sm:hidden bg-white border-b border-purple-50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search premium products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F3F0FA]/70 pl-10 pr-4 py-2.5 rounded-xl text-sm border border-transparent focus:border-purple-300 outline-none transition-all"
          />
          <Search className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
        </div>
      </div>

      {/* --- RENDER CONTENT SCHEDULER ENGINE --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-12">
        {activeTab === "home" && (
          <>
            {/* HERO PROMOTIONAL CAROUSEL BANNER */}
            <div className="relative h-44 sm:h-64 rounded-2xl overflow-hidden mb-8 shadow-premium transition-all duration-700">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${HERO_SLIDES[currentSlide].color} flex flex-col justify-center px-6 sm:px-12 text-white transition-all`}
              >
                <span className="text-xs uppercase tracking-widest text-purple-300 font-bold mb-1">
                  Exclusive Collection
                </span>
                <h1 className="text-xl sm:text-3xl font-black max-w-md sm:max-w-xl transition-all leading-tight">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                  {HERO_SLIDES[currentSlide].sub}
                </p>
              </div>
              <div className="absolute bottom-3 right-4 flex gap-1.5">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSlide ? "bg-white w-5" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* DYNAMIC CATEGORY FILTER TRACK */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Explore Premium
                Categories
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {["All", "Shoes", "Gym Equipment", "Protein Supplements"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? "bg-purple-600 text-white shadow-md shadow-purple-100"
                          : "bg-white text-slate-600 border border-purple-100 hover:border-purple-300"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* CONTROL PANEL GRID: PARAMETER FILTER SIDEBAR + PRODUCT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* FILTERING / SORTING PANEL */}
              <div className="bg-white p-5 rounded-2xl border border-purple-50 shadow-premium h-fit space-y-6 lg:sticky lg:top-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <Filter className="w-4 h-4 text-purple-600" /> Filter Engine
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setMaxPrice(35000);
                      setSortBy("popular");
                    }}
                    className="text-[11px] text-purple-600 font-bold hover:underline"
                  >
                    Reset All
                  </button>
                </div>

                {/* Price Ceiling Ranger */}
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-2">
                    Max Budget: ₹{maxPrice.toLocaleString("en-IN")}
                  </label>
                  <input
                    type="range"
                    min="999"
                    max="35000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-purple-600 bg-purple-100 h-1 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                    <span>₹999</span>
                    <span>₹35,000</span>
                  </div>
                </div>

                {/* Metrics Sorting Architecture */}
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-2">
                    Sort Criteria
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full text-xs font-semibold bg-[#F3F0FA]/60 p-2.5 rounded-xl border border-transparent focus:border-purple-300 focus:bg-white outline-none"
                  >
                    <option value="popular">Top Rated & Popular</option>
                    <option value="lowHigh">Price: Low to High</option>
                    <option value="highLow">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* CORE STORE PRODUCT GRID CONFIGURATION */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Showing{" "}
                    <span className="text-slate-800 font-bold">
                      {filteredProducts.length}
                    </span>{" "}
                    luxury assets
                  </p>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-purple-50 p-12 text-center shadow-premium">
                    <p className="text-slate-400 text-sm font-medium">
                      No luxury assets match your current configuration.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl border border-purple-50/70 p-4 shadow-premium hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Image Sandbox Wrapper */}
                          <div className="relative rounded-xl overflow-hidden bg-[#F3F0FA]/40 aspect-square flex items-center justify-center mb-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Wishlist Toggle Action Node */}
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                            >
                              <Heart
                                className={`w-4 h-4 transition-colors ${
                                  wishlist.includes(product.id)
                                    ? "fill-red-500 text-red-500"
                                    : "text-slate-400"
                                }`}
                              />
                            </button>

                            {/* Luxury Quick View Action Hook */}
                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="absolute bottom-2 inset-x-2 bg-white/95 backdrop-blur-sm py-2 rounded-xl text-[11px] font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-center text-purple-700"
                            >
                              Asset Quick View
                            </button>
                          </div>

                          {/* Brand Metadata */}
                          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                            {product.brand}
                          </span>
                          <h4 className="text-sm font-bold text-slate-800 mt-0.5 line-clamp-1">
                            {product.name}
                          </h4>

                          {/* Star Ratings Component Layout */}
                          <div className="flex items-center gap-1 mt-1.5 mb-3">
                            <div className="flex items-center text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < Math.floor(product.rating)
                                      ? "fill-amber-400"
                                      : "text-slate-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-slate-400 font-bold">
                              ({product.rating})
                            </span>
                          </div>
                        </div>

                        {/* Card Purchase Action Footer */}
                        <div className="flex items-center justify-between border-t border-purple-50/50 pt-3 mt-2">
                          <span className="text-base font-black text-slate-900">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>

                          {cart.find((item) => item.id === product.id) ? (
                            <div className="flex items-center bg-purple-50 rounded-xl border border-purple-100 overflow-hidden">
                              <button
                                onClick={() => updateQuantity(product.id, -1)}
                                className="p-2 hover:bg-purple-100 text-purple-700 transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-black text-purple-900">
                                {
                                  cart.find((item) => item.id === product.id)
                                    .quantity
                                }
                              </span>
                              <button
                                onClick={() => updateQuantity(product.id, 1)}
                                className="p-2 hover:bg-purple-100 text-purple-700 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(product)}
                              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-100"
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* --- CHECKOUT WORKFLOW VIEW --- */}
        {activeTab === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address Subsystem */}
              <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-premium">
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" /> Delivery Target
                  Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Customer Identifier Name
                    </label>
                    <input
                      type="text"
                      value={address.name}
                      onChange={(e) =>
                        setAddress({ ...address, name: e.target.value })
                      }
                      className="w-full text-xs font-medium bg-[#F3F0FA]/50 p-3 rounded-xl border border-purple-50 focus:border-purple-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Street / Landmark Destination
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      className="w-full text-xs font-medium bg-[#F3F0FA]/50 p-3 rounded-xl border border-purple-50 focus:border-purple-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Metropolitan City Location
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full text-xs font-medium bg-[#F3F0FA]/50 p-3 rounded-xl border border-purple-50 focus:border-purple-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Postal Code (PIN)
                    </label>
                    <input
                      type="text"
                      value={address.pin}
                      onChange={(e) =>
                        setAddress({ ...address, pin: e.target.value })
                      }
                      className="w-full text-xs font-medium bg-[#F3F0FA]/50 p-3 rounded-xl border border-purple-50 focus:border-purple-300 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Gateway Matrix Selector */}
              <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-premium">
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" /> Secured
                  Settlement Engine
                </h2>
                <div className="space-y-2.5">
                  {[
                    {
                      id: "upi",
                      label:
                        "Instant Unified Payments Interface (UPI / GPay / PhonePe)",
                      sub: "Pay securely using any mobile authentication VPA",
                    },
                    {
                      id: "card",
                      label: "Credit or Debit Card Processing",
                      sub: "Visa, MasterCard, RuPay transactions supported",
                    },
                    {
                      id: "cod",
                      label: "Cash On Delivery (COD)",
                      sub: "Additional verification handling at physical drop",
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-purple-600 bg-purple-50/40 shadow-sm"
                          : "border-slate-100 hover:border-purple-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="mt-0.5 accent-purple-600"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          {method.label}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          {method.sub}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Static Snapshot Invoice Sidebar Summary */}
            <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-premium h-fit">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
                Verification Summary
              </h3>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-xs mb-3 font-medium"
                >
                  <span className="text-slate-600 truncate max-w-[160px]">
                    {item.name}{" "}
                    <span className="text-slate-400 font-bold">
                      x{item.quantity}
                    </span>
                  </span>
                  <span className="text-slate-900 font-bold">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}

              <div className="border-t border-dashed border-slate-100 pt-3 mt-4 space-y-2.5">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Subtotal Matrix</span>
                  <span>₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-600 font-bold">
                    <span>Coupon Save Drop</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Logistics/Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Final Invoice Total</span>
                  <span className="text-purple-700 text-base">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCart([]);
                  setAppliedDiscount(0);
                  setActiveTab("tracking");
                  triggerToast("Order compiled successfully!");
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 rounded-xl shadow-md mt-6 transition-all"
              >
                Authorize & Dispatch Order
              </button>
            </div>
          </div>
        )}

        {/* --- CUSTOMER PROFILE MODULE --- */}
        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-purple-50 p-6 shadow-premium animate-fade-in">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-md">
                D
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Daksh</h2>
                <p className="text-xs font-semibold text-purple-600">
                  Premium Account Tier Member
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Saved Wishlist Index ({wishlist.length} Items)
              </h3>
              {wishlist.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">
                  No product tokens configured in your core favorites database.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ALL_PRODUCTS.filter((p) => wishlist.includes(p.id)).map(
                    (p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-purple-50 bg-[#F3F0FA]/20"
                      >
                        <img
                          src={p.image}
                          alt=""
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {p.name}
                          </p>
                          <p className="text-[11px] font-black text-purple-700">
                            ₹{p.price}
                          </p>
                        </div>
                        <button
                          onClick={() => addToCart(p)}
                          className="p-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- FAKE ORDER TRACKING DASHBOARD --- */}
        {activeTab === "tracking" && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-purple-50 p-6 shadow-premium animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                  LIVE DISPATCH
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  Invoice Tracker #SE-9482-2026
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-500">
                ETA: 2 Days
              </span>
            </div>

            {/* Tracking Sequence Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-purple-100">
              {[
                {
                  title: "Consignment Dispatched from Virar Fulfillment Hub",
                  done: true,
                  desc: "Package picked up and checked for structural fidelity.",
                },
                {
                  title: "Passed Sorting Matrix Inspection Gate",
                  done: true,
                  desc: "Routing telemetry synced for delivery tracking.",
                },
                {
                  title: "Out for Transit via Local Hub Logistics",
                  done: false,
                  desc: "Assigned route handler scheduling vehicle drops.",
                },
                {
                  title: "Delivered to Customer Drop Point",
                  done: false,
                  desc: "Requires pin authentication signature code.",
                },
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div
                    className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 bg-white transition-colors ${
                      step.done
                        ? "border-purple-600 bg-purple-600"
                        : "border-slate-300"
                    }`}
                  />
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        step.done ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- CART DRAWER OVERLAY SIDEBAR PANEL --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-left">
            {/* Drawer Header Area */}
            <div className="p-4 border-b border-purple-50 flex items-center justify-between bg-gradient-to-r from-white to-[#F3F0FA]/30">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-purple-600" /> Active
                Cart Storage
              </span>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Matrix Checklist Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <ShoppingBag className="w-12 h-12 text-slate-200 mx-auto" />
                  <p className="text-xs font-medium text-slate-400">
                    Your shopping allocation matrix is completely empty.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white p-3 rounded-xl border border-purple-50 shadow-sm hover:border-purple-200 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 object-cover rounded-lg bg-slate-50"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs font-black text-slate-900 block mt-0.5">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Control Micro-nodes */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-purple-100 text-slate-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-[11px] font-black text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-purple-100 text-slate-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, -item.quantity)
                          }
                          className="text-slate-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Settlement Calculations & Checkout Directives */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-purple-50 bg-[#F3F0FA]/30 space-y-4">
                {/* Coupon Input System */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. SAVE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs bg-white border border-purple-100 rounded-xl px-3 outline-none focus:border-purple-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Subtotals & Discounts Block */}
                <div className="space-y-1.5 border-b border-purple-50 pb-3 text-xs font-medium text-slate-500">
                  <div className="flex justify-between">
                    <span>Subtotal Matrix</span>
                    <span>₹{cartSubtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount (10%)</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-900 font-black text-sm pt-1.5">
                    <span>Final Total</span>
                    <span className="text-purple-700">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab("checkout");
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  Proceed To Checkout <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- QUICK VIEW POPUP BLOCK MODAL --- */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 relative border border-purple-50 shadow-2xl animate-fade-in">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={quickViewProduct.image}
              alt=""
              className="w-full h-48 object-cover rounded-xl bg-slate-50 mb-4"
            />
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
              {quickViewProduct.brand}
            </span>
            <h3 className="text-base font-black text-slate-900">
              {quickViewProduct.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Premium performance engineered asset. Constructed with lightweight
              mesh architectures and resilient compound layers optimized for
              longevity and durability.
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
              <span className="text-xl font-black text-slate-900">
                ₹{quickViewProduct.price}
              </span>
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors"
              >
                Add Asset To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING AI CONCIERGE CHAT MODULE --- */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        {chatOpen && (
          <div className="w-72 bg-white rounded-2xl border border-purple-100 shadow-2xl overflow-hidden mb-3 animate-slide-up">
            <div className="bg-purple-600 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold">ShopEase Assistant AI</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 h-48 overflow-y-auto bg-slate-50 text-[11px] font-medium space-y-2">
              <div className="bg-purple-50 text-purple-900 p-2.5 rounded-xl rounded-tl-none max-w-[85%]">
                Hello Daksh! Ready to deploy your code? You can use code
                `SAVE10` to get 10% off on premium assets! Let me know if you
                need any shipping help.
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3.5 rounded-full shadow-xl transition-all hover:scale-105"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {/* --- MOBILE SMARTPHONE BOTTOM NAV BAR TRACK --- */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-purple-100 shadow-lg px-6 py-2 flex justify-between items-center sm:hidden z-40">
        {[
          { id: "home", icon: ShoppingBag, label: "Shop" },
          { id: "tracking", icon: ArrowLeftRight, label: "Track" },
          { id: "profile", icon: User, label: "Profile" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveTab(btn.id)}
            className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
              activeTab === btn.id ? "text-purple-600" : "text-slate-400"
            }`}
          >
            <btn.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
