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
  Info,
  Mail,
  Phone,
  ShieldCheck,
  Truck,
  RefreshCw,
  Smartphone,
  Download,
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
  const [toast, setToast] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appModalOpen, setAppModalOpen] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  // Trigger app download banner alert after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppModalOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
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

  const deleteFromCart = (id, productName) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    triggerToast(`Removed ${productName} from Cart.`);
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    triggerToast(
      "Thank you! Our support team will contact you within 24 hours."
    );
    setContactForm({ name: "", email: "", message: "" });
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
    return b.rating - a.rating;
  });

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
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          <p className="text-sm font-medium">{toast}</p>
        </div>
      )}

      {/* --- NAV BAR --- */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo Identity */}
          <div
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={() => setActiveTab("home")}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-200">
              SE
            </div>
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-purple-700 to-indigo-800 bg-clip-text text-transparent">
              ShopEase
            </span>
          </div>

          {/* Search Engine (Desktop) */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <input
              type="text"
              placeholder="Search running shoes, proteins, workout gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F3F0FA]/60 pl-10 pr-4 py-2 rounded-xl text-sm border border-transparent focus:border-purple-300 focus:bg-white outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
          </div>

          {/* Quick UI Navigation Nodes */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setAppModalOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-purple-600 transition-all"
              title="Download App"
            >
              <Smartphone className="w-5 h-5" />
            </button>

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
                <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE-ONLY SEARCH BAR */}
      <div className="p-4 sm:hidden bg-white border-b border-purple-50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search premium products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F3F0FA]/70 pl-10 pr-4 py-2.5 rounded-xl text-sm border border-transparent focus:border-purple-300 outline-none"
          />
          <Search className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
        </div>
      </div>

      {/* --- RENDER ROUTER SYSTEM --- */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 sm:pb-12">
        {/* HOME COMPONENT */}
        {activeTab === "home" && (
          <>
            {/* HERO PROMOTIONAL BANNER */}
            <div className="relative h-44 sm:h-64 rounded-2xl overflow-hidden mb-8 shadow-premium">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${HERO_SLIDES[currentSlide].color} flex flex-col justify-center px-6 sm:px-12 text-white`}
              >
                <span className="text-xs uppercase tracking-widest text-purple-300 font-bold mb-1">
                  Exclusive Collection
                </span>
                <h1 className="text-xl sm:text-3xl font-black max-w-md sm:max-w-xl leading-tight">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                  {HERO_SLIDES[currentSlide].sub}
                </p>
              </div>
            </div>

            {/* CATEGORY TRACK */}
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
                          ? "bg-purple-600 text-white"
                          : "bg-white text-slate-600 border border-purple-100"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* PRODUCT SECTION DISPLAY */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white p-5 rounded-2xl border border-purple-50 shadow-premium h-fit space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <Filter className="w-4 h-4 text-purple-600" /> Filter Engine
                  </span>
                </div>
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
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-2">
                    Sort Criteria
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full text-xs font-semibold bg-[#F3F0FA]/60 p-2.5 rounded-xl outline-none"
                  >
                    <option value="popular">Top Rated & Popular</option>
                    <option value="lowHigh">Price: Low to High</option>
                    <option value="highLow">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-purple-50 p-4 shadow-premium flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative rounded-xl overflow-hidden bg-[#F3F0FA]/40 aspect-square flex items-center justify-center mb-4">
                          <img
                            src={product.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-white/90 backdrop-blur-sm"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                wishlist.includes(product.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-slate-400"
                              }`}
                            />
                          </button>
                        </div>
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 mt-0.5 line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-1.5 mb-3">
                          <span className="text-[11px] text-slate-400 font-bold">
                            ★ {product.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-purple-50 pt-3">
                        <span className="text-base font-black text-slate-900">
                          ₹{product.price}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- ABOUT US MODULE --- */}
            <div className="bg-white rounded-2xl border border-purple-50 p-6 md:p-8 shadow-premium space-y-6 mb-8">
              <div className="text-center space-y-1">
                <div className="inline-flex p-2.5 rounded-xl bg-purple-50 text-purple-600 mb-1">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Redefining Digital Commerce
                </h2>
                <p className="text-xs text-slate-400 max-w-xl mx-auto">
                  ShopEase combines a minimal, luxury interface with premium
                  lifestyle essentials to elevate your standard shopping
                  ecosystem.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F3F0FA]/30 space-y-1">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Elite Authenticity
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Every premium shoe and gym apparatus is sourced strictly
                    through authorized global brand distribution lines.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F3F0FA]/30 space-y-1">
                  <Truck className="w-5 h-5 text-purple-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Express Logistics
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Optimized automated priority lines ensuring hyper-fast
                    processing across our regional fulfillment hubs.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F3F0FA]/30 space-y-1">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Fluid Exchange
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    A frictionless protection layout guaranteeing complete
                    post-purchase safety metrics across all accounts.
                  </p>
                </div>
              </div>
            </div>

            {/* --- CONTACT US MODULE --- */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2 bg-gradient-to-br from-purple-700 to-indigo-900 rounded-2xl p-6 text-white flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-black tracking-tight">
                    Connect Channels
                  </h3>
                  <p className="text-[11px] text-purple-100">
                    Have inquiries regarding bulk gym apparatus configurations
                    or wholesale supplements allocation models?
                  </p>
                </div>
                <div className="space-y-3 my-4 text-[11px] font-semibold text-purple-100">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>support@shopease.io</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 98230 45120</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>HQ Fulfillment Hub, Virar East, Mumbai, MH</span>
                  </div>
                </div>
                <span className="text-[9px] text-purple-300 font-bold uppercase tracking-widest">
                  Support Core: 24/7/365
                </span>
              </div>

              <div className="md:col-span-3 bg-white border border-purple-50 rounded-2xl p-6 shadow-premium">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Transmit Inquiries
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full text-xs bg-[#F3F0FA]/50 p-3 rounded-xl outline-none border border-transparent focus:border-purple-200"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full text-xs bg-[#F3F0FA]/50 p-3 rounded-xl outline-none border border-transparent focus:border-purple-200"
                    placeholder="Email Address"
                  />
                  <textarea
                    rows="2"
                    required
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full text-xs bg-[#F3F0FA]/50 p-3 rounded-xl outline-none border border-transparent focus:border-purple-200 resize-none"
                    placeholder="State structural issues or sizing inquiries..."
                  />
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white font-bold text-xs py-2.5 rounded-xl"
                  >
                    Dispatch Ticket Pipeline
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {/* --- CHECKOUT VIEW --- */}
        {activeTab === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-premium">
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" /> Delivery Target
                  Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) =>
                      setAddress({ ...address, name: e.target.value })
                    }
                    className="w-full text-xs bg-[#F3F0FA]/50 p-3 rounded-xl outline-none"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    className="w-full text-xs bg-[#F3F0FA]/50 p-3 rounded-xl outline-none"
                    placeholder="Street Address"
                  />
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full text-xs bg-[#F3F0FA]/50 p-3 rounded-xl outline-none"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    value={address.pin}
                    onChange={(e) =>
                      setAddress({ ...address, pin: e.target.value })
                    }
                    className="w-full text-xs bg-[#F3F0FA]/50 p-3 rounded-xl outline-none"
                    placeholder="PIN Code"
                  />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-premium">
                <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" /> Secured
                  Settlement
                </h2>
                <div className="space-y-2">
                  {["upi", "card", "cod"].map((id) => (
                    <label
                      key={id}
                      className={`flex gap-3 p-3 rounded-xl border cursor-pointer ${
                        paymentMethod === id
                          ? "border-purple-600 bg-purple-50/40"
                          : "border-slate-100"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === id}
                        onChange={() => setPaymentMethod(id)}
                        className="accent-purple-600"
                      />
                      <span className="text-xs font-bold text-slate-900 capitalize">
                        {id === "upi"
                          ? "UPI / GPay"
                          : id === "card"
                          ? "Credit/Debit Card"
                          : "Cash on Delivery"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-premium h-fit">
              <h3 className="text-sm font-bold text-slate-900 pb-3 mb-4 border-b">
                Verification Summary
              </h3>
              <div className="space-y-2 text-xs mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#F3F0FA]/50 px-3 py-2 rounded-xl text-xs outline-none"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Apply
                </button>
              </div>
              <div className="border-t pt-3 space-y-2 text-xs">
                <div className="flex justify-between font-black text-slate-900">
                  <span>Final Total</span>
                  <span className="text-purple-700">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setCart([]);
                  setActiveTab("tracking");
                  triggerToast("Order compiled successfully!");
                }}
                className="w-full bg-purple-600 text-white font-bold text-xs py-3 rounded-xl mt-6"
              >
                Authorize & Dispatch Order
              </button>
            </div>
          </div>
        )}

        {/* --- CUSTOMER PROFILE MODULE --- */}
        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-purple-50 p-6 shadow-premium">
            <div className="flex items-center gap-4 border-b pb-6 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg font-black">
                D
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Daksh</h2>
                <p className="text-xs text-purple-600 font-semibold">
                  Premium Account Tier Member
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Welcome back to your central interface workspace dashboard profile
              management portal.
            </p>
          </div>
        )}

        {/* --- ORDER TRACKING DASHBOARD --- */}
        {activeTab === "tracking" && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-purple-50 p-6 shadow-premium">
            <h2 className="text-base font-bold text-slate-900 border-b pb-4 mb-6">
              Invoice Tracker #SE-9482-2026
            </h2>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-purple-100">
              <div className="relative">
                <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-purple-600" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Consignment Dispatched from Virar Hub
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Package processed successfully.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 border-slate-300 bg-white" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Out for Delivery Logistics Transit
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Route planning sync active.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- RESTORED: CART DRAWER OVERLAY --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">
                Active Cart Storage
              </span>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                  Your storage cart is currently empty.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white p-3 rounded-xl border border-purple-50 items-center justify-between"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-slate-50 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs font-black text-purple-700">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* RESTORED: COUNTER BLOCK */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="flex items-center border border-purple-100 bg-slate-50 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-purple-100 text-slate-500 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-purple-100 text-slate-500 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => deleteFromCart(item.id, item.name)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 bg-slate-50 border-t space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-600 px-1">
                  <span>Subtotal Matrix:</span>
                  <span className="text-slate-900 font-black">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab("checkout");
                  }}
                  className="w-full bg-purple-600 text-white font-bold text-xs py-3 rounded-xl transition-transform active:scale-[0.99]"
                >
                  Proceed To Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MOBILE APPLICATION DOWNLOAD MODAL --- */}
      {appModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative border border-purple-100 shadow-2xl text-center space-y-4">
            <button
              onClick={() => setAppModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center rounded-2xl mx-auto shadow-lg">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Get ShopEase Mobile App
              </h3>
              <p className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md inline-block mt-1">
                Android Edition (.APK)
              </p>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Unlock fluid navigation pathways, lightning fast order tracking
              metrics, and immediate app-only checkout updates.
            </p>

            <a
              href="/base.apk"
              download="ShopEase.apk"
              onClick={() => {
                setAppModalOpen(false);
                triggerToast("Initializing download...");
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Android Package
            </a>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Vercel Distributed Assets Core
            </p>
          </div>
        </div>
      )}

      {/* --- FLOATING CHAT MODULE --- */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        {chatOpen && (
          <div className="w-72 bg-white rounded-2xl border border-purple-100 shadow-2xl overflow-hidden mb-3">
            <div className="bg-purple-600 text-white p-3 flex items-center justify-between">
              <span className="text-xs font-bold">ShopEase Assistant AI</span>
            </div>
            <div className="p-3 h-32 bg-slate-50 text-[11px]">
              Hello Daksh! Use coupon code `SAVE10` to get 10% off items!
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-purple-600 text-white p-3.5 rounded-full shadow-xl"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {/* --- BOTTOM MOBILE TRACK --- */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-purple-100 px-6 py-2 flex justify-between items-center sm:hidden z-40">
        {[
          { id: "home", icon: ShoppingBag, label: "Shop" },
          { id: "tracking", icon: ArrowLeftRight, label: "Track" },
          { id: "profile", icon: User, label: "Profile" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveTab(btn.id)}
            className={`flex flex-col items-center gap-0.5 p-1 ${
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
