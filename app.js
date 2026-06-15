import { useState, useEffect } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Obsidian Peak Suit",
    category: "Suits",
    price: 499,
    rating: 4.9,
    reviews: 312,
    color: "#1a1a2e",
    tag: "Bestseller",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "A sharp, structured silhouette crafted from Italian wool. Power in every thread.",
  },
  {
    id: 2,
    name: "Ivory Monarch Blazer",
    category: "Blazers",
    price: 349,
    rating: 4.8,
    reviews: 218,
    color: "#f5f0e8",
    tag: "New",
    sizes: ["S", "M", "L", "XL"],
    desc: "Cream-white single-breasted blazer for the man who commands rooms effortlessly.",
  },
  {
    id: 3,
    name: "Navy Diplomat Set",
    category: "Suits",
    price: 579,
    rating: 5.0,
    reviews: 401,
    color: "#1b2a4a",
    tag: "Premium",
    sizes: ["M", "L", "XL", "XXL"],
    desc: "Navy double-breasted suit — timeless authority for boardrooms and galas alike.",
  },
  {
    id: 4,
    name: "Charcoal Edge Jacket",
    category: "Jackets",
    price: 279,
    rating: 4.7,
    reviews: 155,
    color: "#3a3a3a",
    tag: null,
    sizes: ["S", "M", "L", "XL"],
    desc: "Slim-cut charcoal jacket with refined lapels. Pair with anything, impress everyone.",
  },
  {
    id: 5,
    name: "Midnight Tuxedo",
    category: "Tuxedos",
    price: 699,
    rating: 5.0,
    reviews: 289,
    color: "#0d0d0d",
    tag: "Exclusive",
    sizes: ["M", "L", "XL"],
    desc: "The definitive evening suit — satin lapels, peak perfection.",
  },
  {
    id: 6,
    name: "Camel Executive Coat",
    category: "Coats",
    price: 429,
    rating: 4.6,
    reviews: 134,
    color: "#c19a6b",
    tag: null,
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Cascading camel overcoat in cashmere-wool blend. Warmth elevated to art.",
  },
];

const CATEGORIES = ["All", "Suits", "Blazers", "Jackets", "Tuxedos", "Coats"];

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = ({
  path,
  size = 22,
  color = "currentColor",
  fill = "none",
  strokeWidth = 1.8,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
);

const HeartIcon = ({ filled }) => (
  <Icon
    fill={filled ? "#c0392b" : "none"}
    color={filled ? "#c0392b" : "currentColor"}
    path={
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    }
  />
);
const HomeIcon = () => (
  <Icon
    path={
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    }
  />
);
const SearchIcon = () => (
  <Icon
    path={
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    }
  />
);
const CartIcon = ({ count }) => (
  <div style={{ position: "relative", display: "inline-flex" }}>
    <Icon
      path={
        <>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </>
      }
    />
    {count > 0 && (
      <span
        style={{
          position: "absolute",
          top: -8,
          right: -8,
          background: "#c0392b",
          color: "#fff",
          borderRadius: "50%",
          fontSize: 10,
          width: 18,
          height: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
        }}
      >
        {count}
      </span>
    )}
  </div>
);
const UserIcon = () => (
  <Icon
    path={
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    }
  />
);
const InfoIcon = () => (
  <Icon
    path={
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    }
  />
);
const BackIcon = () => (
  <Icon
    path={
      <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </>
    }
  />
);
const StarIcon = ({ filled = true }) => (
  <Icon
    size={14}
    fill={filled ? "#f39c12" : "none"}
    color={filled ? "#f39c12" : "#ccc"}
    path={
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    }
  />
);
const TrashIcon = () => (
  <Icon
    size={18}
    path={
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    }
  />
);
const CheckIcon = () => (
  <Icon
    size={40}
    color="#27ae60"
    path={
      <>
        <polyline points="20 6 9 17 4 12" />
      </>
    }
  />
);

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({ product, onAdd, onFav, isFav, onView }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hover
          ? "0 20px 60px rgba(0,0,0,0.14)"
          : "0 4px 24px rgba(0,0,0,0.07)",
        transition: "all .3s cubic-bezier(.4,0,.2,1)",
        transform: hover ? "translateY(-6px)" : "none",
        cursor: "pointer",
      }}
    >
      {/* image area */}
      <div
        onClick={() => onView(product)}
        style={{
          position: "relative",
          height: 220,
          background: `linear-gradient(135deg, ${product.color}22, ${product.color}55)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 120,
            height: 150,
            borderRadius: 16,
            background: `linear-gradient(160deg, ${product.color}cc, ${product.color})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 32px ${product.color}55`,
          }}
        >
          <span style={{ fontSize: 52 }}>🧥</span>
        </div>
        {product.tag && (
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: "#1a1a2e",
              color: "#d4af37",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1,
              padding: "4px 10px",
              borderRadius: 20,
              textTransform: "uppercase",
            }}
          >
            {product.tag}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFav(product.id);
          }}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.95)",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          }}
        >
          <HeartIcon filled={isFav} />
        </button>
      </div>
      {/* info */}
      <div style={{ padding: "16px 18px 18px" }}>
        <div
          style={{
            fontSize: 11,
            color: "#999",
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {product.category}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: "#1a1a2e",
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 12,
          }}
        >
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <span style={{ fontSize: 11, color: "#888", marginLeft: 4 }}>
            ({product.reviews})
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>
            ${product.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            style={{
              background: "#1a1a2e",
              color: "#d4af37",
              border: "none",
              borderRadius: 12,
              padding: "8px 16px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "background .2s",
            }}
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── STARS RENDER ──────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= Math.round(rating)} />
      ))}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("login");
  const [nav, setNav] = useState("home");
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [viewProduct, setViewProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [orderDone, setOrderDone] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [cartStep, setCartStep] = useState("list"); // list | checkout | done
  const [user] = useState({ name: "Mohamed Al-Hassan", avatar: "MA" });
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (product) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === product.id);
      if (ex)
        return c.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...c, { ...product, qty: 1, size: "M" }];
    });
    showToast(`"${product.name}" added to cart`);
  };

  const toggleFav = (id) => {
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = PRODUCTS.filter(
    (p) =>
      (catFilter === "All" || p.category === catFilter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())),
  );

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  if (page === "login") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 60%, #2d1b00 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          padding: 20,
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: 24,
                background: "linear-gradient(135deg, #d4af37, #f0d060)",
                marginBottom: 16,
                boxShadow: "0 8px 32px rgba(212,175,55,0.4)",
              }}
            >
              <span style={{ fontSize: 36 }}>🎩</span>
            </div>
            <div
              style={{
                color: "#d4af37",
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              MOHAMED CO
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                letterSpacing: 3,
                marginTop: 4,
                textTransform: "uppercase",
              }}
            >
              Elegant Suits for Modern Man
            </div>
          </div>

          {/* Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              borderRadius: 28,
              padding: "36px 32px",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Welcome Back
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 13,
                marginBottom: 28,
              }}
            >
              Sign in to your exclusive account
            </div>

            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1,
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@mohamedco.com"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((f) => ({ ...f, email: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.07)",
                  color: "#fff",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border .2s",
                }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1,
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((f) => ({ ...f, password: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.07)",
                  color: "#fff",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {loginError && (
              <div
                style={{
                  color: "#e74c3c",
                  fontSize: 13,
                  marginBottom: 12,
                  padding: "8px 12px",
                  background: "rgba(231,76,60,0.1)",
                  borderRadius: 10,
                }}
              >
                {loginError}
              </div>
            )}

            <div style={{ textAlign: "right", marginBottom: 24 }}>
              <span
                style={{ color: "#d4af37", fontSize: 13, cursor: "pointer" }}
              >
                Forgot password?
              </span>
            </div>

            <button
              onClick={() => {
                if (!loginForm.email || !loginForm.password) {
                  setLoginError("Please fill in all fields.");
                  return;
                }
                if (loginForm.password.length < 4) {
                  setLoginError("Incorrect password. Try 'demo'.");
                  return;
                }
                setLoginError("");
                setPage("app");
              }}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 16,
                border: "none",
                background: "linear-gradient(135deg, #d4af37, #f0d060)",
                color: "#1a1a2e",
                fontSize: 16,
                fontWeight: 800,
                cursor: "pointer",
                letterSpacing: 1,
                boxShadow: "0 8px 24px rgba(212,175,55,0.35)",
                transition: "all .2s",
              }}
            >
              SIGN IN
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: 22,
                color: "rgba(255,255,255,0.4)",
                fontSize: 13,
              }}
            >
              New here?{" "}
              <span
                style={{ color: "#d4af37", fontWeight: 600, cursor: "pointer" }}
                onClick={() => setPage("app")}
              >
                Create Account
              </span>
            </div>

            {/* demo hint */}
            <div
              style={{
                marginTop: 20,
                padding: "12px 16px",
                background: "rgba(212,175,55,0.08)",
                borderRadius: 12,
                border: "1px solid rgba(212,175,55,0.2)",
                textAlign: "center",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                Demo: any email + any password (4+ chars)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── APP SHELL ──────────────────────────────────────────────────────────────
  const renderPage = () => {
    if (viewProduct) return <ProductDetailPage />;
    if (nav === "home") return <HomePage />;
    if (nav === "search") return <SearchPage />;
    if (nav === "cart") return <CartPage />;
    if (nav === "fav") return <FavPage />;
    if (nav === "profile") return <ProfilePage />;
    if (nav === "about") return <AboutPage />;
  };

  // ── HOME PAGE ──────────────────────────────────────────────────────────────
  function HomePage() {
    return (
      <div>
        {/* Hero */}
        <div
          style={{
            background: "linear-gradient(135deg, #0d0d0d, #1a1a2e)",
            borderRadius: 24,
            padding: "32px 28px",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -20,
              top: -20,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.05)",
            }}
          />
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            New Collection 2026
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 26,
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Elegance
            <br />
            <span style={{ color: "#d4af37" }}>Redefined.</span>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              marginBottom: 20,
              maxWidth: 240,
            }}
          >
            Italian craftsmanship. Modern silhouettes. Built for the man who
            leads.
          </div>
          <button
            onClick={() => setCatFilter("All")}
            style={{
              background: "linear-gradient(135deg, #d4af37, #f0d060)",
              color: "#1a1a2e",
              border: "none",
              borderRadius: 14,
              padding: "12px 24px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              letterSpacing: 0.5,
            }}
          >
            Shop Collection
          </button>
          <div
            style={{
              position: "absolute",
              right: 24,
              bottom: 16,
              fontSize: 72,
              opacity: 0.15,
            }}
          >
            🎩
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 22 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: "#1a1a2e",
              marginBottom: 14,
            }}
          >
            Categories
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                style={{
                  flexShrink: 0,
                  padding: "9px 18px",
                  borderRadius: 20,
                  border: `1.5px solid ${catFilter === c ? "#1a1a2e" : "#e0e0e0"}`,
                  background: catFilter === c ? "#1a1a2e" : "#fff",
                  color: catFilter === c ? "#d4af37" : "#555",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div
          style={{
            fontWeight: 700,
            fontSize: 17,
            color: "#1a1a2e",
            marginBottom: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Featured Pieces</span>
          <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>
            {filtered.length} items
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addToCart}
              onFav={toggleFav}
              isFav={favs.includes(p.id)}
              onView={setViewProduct}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── SEARCH PAGE ────────────────────────────────────────────────────────────
  function SearchPage() {
    return (
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: "#1a1a2e",
            marginBottom: 18,
          }}
        >
          Discover
        </div>
        <div style={{ position: "relative", marginBottom: 24 }}>
          <div
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#aaa",
            }}
          >
            <SearchIcon />
          </div>
          <input
            autoFocus
            placeholder="Search suits, blazers, tuxedos…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px 14px 46px",
              borderRadius: 16,
              border: "1.5px solid #e0e0e0",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              background: "#fafafa",
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addToCart}
              onFav={toggleFav}
              isFav={favs.includes(p.id)}
              onView={setViewProduct}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#bbb",
              marginTop: 60,
              fontSize: 16,
            }}
          >
            No results for "{search}"
          </div>
        )}
      </div>
    );
  }

  // ── PRODUCT DETAIL ─────────────────────────────────────────────────────────
  function ProductDetailPage() {
    const p = viewProduct;
    return (
      <div>
        <button
          onClick={() => {
            setViewProduct(null);
            setSelectedSize(null);
            setQty(1);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            color: "#1a1a2e",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 20,
            padding: 0,
          }}
        >
          <BackIcon /> Back
        </button>
        {/* Hero image */}
        <div
          style={{
            borderRadius: 24,
            background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`,
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 160,
              height: 200,
              borderRadius: 20,
              background: `linear-gradient(160deg, ${p.color}bb, ${p.color})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 16px 48px ${p.color}55`,
            }}
          >
            <span style={{ fontSize: 80 }}>🧥</span>
          </div>
          <button
            onClick={() => toggleFav(p.id)}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            <HeartIcon filled={favs.includes(p.id)} />
          </button>
          {p.tag && (
            <span
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                background: "#1a1a2e",
                color: "#d4af37",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1,
                padding: "5px 12px",
                borderRadius: 20,
                textTransform: "uppercase",
              }}
            >
              {p.tag}
            </span>
          )}
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "#999",
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {p.category}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>
                {p.name}
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#1a1a2e" }}>
              ${p.price}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Stars rating={p.rating} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>
              {p.rating}
            </span>
            <span style={{ fontSize: 12, color: "#aaa" }}>
              ({p.reviews} reviews)
            </span>
          </div>

          <div
            style={{
              fontSize: 14,
              color: "#555",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {p.desc}
          </div>

          {/* Size */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "#1a1a2e",
                marginBottom: 12,
              }}
            >
              Select Size
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    border: `2px solid ${selectedSize === s ? "#1a1a2e" : "#e0e0e0"}`,
                    background: selectedSize === s ? "#1a1a2e" : "#fff",
                    color: selectedSize === s ? "#d4af37" : "#555",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "#1a1a2e",
                marginBottom: 12,
              }}
            >
              Quantity
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: "1.5px solid #e0e0e0",
                  background: "#fafafa",
                  fontSize: 20,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                −
              </button>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#1a1a2e",
                  minWidth: 24,
                  textAlign: "center",
                }}
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: "1.5px solid #e0e0e0",
                  background: "#fafafa",
                  fontSize: 20,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) addToCart(p);
                setViewProduct(null);
                setSelectedSize(null);
                setQty(1);
                setNav("cart");
              }}
              style={{
                flex: 1,
                padding: "16px",
                borderRadius: 16,
                border: "none",
                background: "linear-gradient(135deg, #1a1a2e, #2d2d4e)",
                color: "#d4af37",
                fontSize: 16,
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              🛒 Add to Cart · ${(p.price * qty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── CART PAGE ──────────────────────────────────────────────────────────────
  function CartPage() {
    if (cartStep === "done")
      return (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(39,174,96,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <CheckIcon />
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#1a1a2e",
              marginBottom: 8,
            }}
          >
            Order Confirmed!
          </div>
          <div
            style={{
              color: "#888",
              fontSize: 14,
              marginBottom: 32,
              maxWidth: 260,
              margin: "0 auto 32px",
            }}
          >
            Your MOHAMED CO pieces are being prepared. Expect delivery in 3–5
            business days.
          </div>
          <button
            onClick={() => {
              setCart([]);
              setCartStep("list");
              setNav("home");
            }}
            style={{
              background: "linear-gradient(135deg, #d4af37, #f0d060)",
              color: "#1a1a2e",
              border: "none",
              borderRadius: 16,
              padding: "14px 32px",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      );

    if (cartStep === "checkout")
      return (
        <div>
          <button
            onClick={() => setCartStep("list")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              color: "#1a1a2e",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              marginBottom: 20,
              padding: 0,
            }}
          >
            <BackIcon /> Back to Cart
          </button>
          <div
            style={{
              fontWeight: 800,
              fontSize: 22,
              color: "#1a1a2e",
              marginBottom: 24,
            }}
          >
            Checkout
          </div>

          {[
            ["Full Name", "Mohamed Al-Hassan", "text"],
            ["Email", "you@mohamedco.com", "email"],
            ["Phone", "+252 61 000 0000", "tel"],
            ["Shipping Address", "123 Main St, Mogadishu", "text"],
            ["City", "Mogadishu", "text"],
          ].map(([label, ph, type]) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#666",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {label}
              </label>
              <input
                type={type}
                placeholder={ph}
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  borderRadius: 14,
                  border: "1.5px solid #e0e0e0",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fafafa",
                }}
              />
            </div>
          ))}

          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: "#1a1a2e",
              margin: "24px 0 12px",
            }}
          >
            Payment
          </div>
          {[
            ["Card Number", "•••• •••• •••• 4242"],
            ["Expiry", "MM/YY"],
            ["CVV", "•••"],
          ].map(([label, ph]) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#666",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {label}
              </label>
              <input
                placeholder={ph}
                style={{
                  width: "100%",
                  padding: "13px 15px",
                  borderRadius: 14,
                  border: "1.5px solid #e0e0e0",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fafafa",
                }}
              />
            </div>
          ))}

          <div
            style={{
              background: "#f8f8f8",
              borderRadius: 16,
              padding: 20,
              marginTop: 24,
              marginBottom: 20,
            }}
          >
            {cart.map((i) => (
              <div
                key={i.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  fontSize: 14,
                  color: "#333",
                }}
              >
                <span>
                  {i.name} ×{i.qty}
                </span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
            <div
              style={{
                borderTop: "1px solid #e0e0e0",
                paddingTop: 12,
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 800,
                fontSize: 17,
                color: "#1a1a2e",
              }}
            >
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setCartStep("done")}
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: 16,
              border: "none",
              background: "linear-gradient(135deg, #d4af37, #f0d060)",
              color: "#1a1a2e",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(212,175,55,0.3)",
            }}
          >
            Place Order · ${cartTotal.toFixed(2)}
          </button>
        </div>
      );

    return (
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: "#1a1a2e",
            marginBottom: 24,
          }}
        >
          Your Cart <span style={{ color: "#d4af37" }}>({cartCount})</span>
        </div>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🛒</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#1a1a2e",
                marginBottom: 8,
              }}
            >
              Your cart is empty
            </div>
            <div style={{ color: "#aaa", marginBottom: 24 }}>
              Discover our elegant collection
            </div>
            <button
              onClick={() => setNav("home")}
              style={{
                background: "#1a1a2e",
                color: "#d4af37",
                border: "none",
                borderRadius: 14,
                padding: "13px 28px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  padding: 18,
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 80,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${item.color}33, ${item.color}66)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 32,
                  }}
                >
                  🧥
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#1a1a2e",
                      marginBottom: 2,
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#aaa", marginBottom: 8 }}>
                    {item.category}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <button
                      onClick={() =>
                        setCart((c) =>
                          c.map((i) =>
                            i.id === item.id
                              ? { ...i, qty: Math.max(1, i.qty - 1) }
                              : i,
                          ),
                        )
                      }
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        border: "1.5px solid #e0e0e0",
                        background: "#fafafa",
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontWeight: 700, color: "#1a1a2e" }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() =>
                        setCart((c) =>
                          c.map((i) =>
                            i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
                          ),
                        )
                      }
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        border: "1.5px solid #e0e0e0",
                        background: "#fafafa",
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#1a1a2e",
                      marginBottom: 8,
                    }}
                  >
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                  <button
                    onClick={() =>
                      setCart((c) => c.filter((i) => i.id !== item.id))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#e74c3c",
                      cursor: "pointer",
                    }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
            <div
              style={{
                background: "linear-gradient(135deg, #1a1a2e, #2d2d4e)",
                borderRadius: 20,
                padding: 24,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#d4af37",
                  fontSize: 18,
                  fontWeight: 800,
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => setCartStep("checkout")}
                style={{
                  width: "100%",
                  marginTop: 18,
                  padding: "15px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg, #d4af37, #f0d060)",
                  color: "#1a1a2e",
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ── FAV PAGE ───────────────────────────────────────────────────────────────
  function FavPage() {
    const favProducts = PRODUCTS.filter((p) => favs.includes(p.id));
    return (
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: "#1a1a2e",
            marginBottom: 24,
          }}
        >
          Favourites <span style={{ color: "#c0392b" }}>♥</span>
        </div>
        {favProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 60, marginBottom: 16, color: "#f5c6cb" }}>
              ♡
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#1a1a2e",
                marginBottom: 8,
              }}
            >
              No favourites yet
            </div>
            <div style={{ color: "#aaa", marginBottom: 24 }}>
              Tap the ♡ on any piece to save it here
            </div>
            <button
              onClick={() => setNav("home")}
              style={{
                background: "#1a1a2e",
                color: "#d4af37",
                border: "none",
                borderRadius: 14,
                padding: "13px 28px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {favProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={addToCart}
                onFav={toggleFav}
                isFav={true}
                onView={setViewProduct}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── ABOUT PAGE ─────────────────────────────────────────────────────────────
  function AboutPage() {
    return (
      <div>
        <div
          style={{
            background: "linear-gradient(135deg, #0d0d0d, #1a1a2e)",
            borderRadius: 24,
            padding: "40px 28px",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎩</div>
          <div
            style={{
              color: "#d4af37",
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 6,
            }}
          >
            MOHAMED CO
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 14,
              letterSpacing: 2,
            }}
          >
            ELEGANT SUITS FOR MODERN MAN
          </div>
        </div>

        {[
          {
            icon: "🌍",
            title: "Our Story",
            body: "Founded in 2018, MOHAMED CO was born from a conviction that every man deserves to wear his confidence. We source the finest Italian wools and Moroccan silks to craft suits that speak before you do.",
          },
          {
            icon: "✂️",
            title: "The Craft",
            body: "Each piece passes through 47 individual tailoring steps. From pattern-cutting to hand-stitched lapels, our Mogadishu atelier blends traditional craft with modern precision.",
          },
          {
            icon: "🌿",
            title: "Sustainability",
            body: "We use low-impact dyeing and partner with fair-trade weavers. Our packaging is 100% recyclable. Elegance should never cost the earth.",
          },
          {
            icon: "📦",
            title: "Delivery",
            body: "Free worldwide shipping on all orders. Every suit arrives in our signature black box with a handwritten note — because first impressions start at the door.",
          },
        ].map((s) => (
          <div
            key={s.title}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 22,
              marginBottom: 14,
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 16,
                color: "#1a1a2e",
                marginBottom: 8,
              }}
            >
              {s.title}
            </div>
            <div style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>
              {s.body}
            </div>
          </div>
        ))}

        <div
          style={{
            background: "linear-gradient(135deg, #d4af37, #f0d060)",
            borderRadius: 20,
            padding: 24,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 18,
              color: "#1a1a2e",
              marginBottom: 6,
            }}
          >
            Visit Our Atelier
          </div>
          <div
            style={{
              fontSize: 14,
              color: "rgba(26,26,46,0.7)",
              marginBottom: 4,
            }}
          >
            📍 Mogadishu City Centre, Somalia
          </div>
          <div
            style={{
              fontSize: 14,
              color: "rgba(26,26,46,0.7)",
              marginBottom: 4,
            }}
          >
            ✉️ hello@mohamedco.so
          </div>
          <div style={{ fontSize: 14, color: "rgba(26,26,46,0.7)" }}>
            📞 +252 61 000 0000
          </div>
        </div>
      </div>
    );
  }

  // ── PROFILE PAGE ───────────────────────────────────────────────────────────
  function ProfilePage() {
    return (
      <div>
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #2d2d4e)",
            borderRadius: 24,
            padding: "32px 24px",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4af37, #f0d060)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              fontSize: 28,
              fontWeight: 900,
              color: "#1a1a2e",
            }}
          >
            {user.avatar}
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 4,
            }}
          >
            {user.name}
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
            Premium Member · Since 2024
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {[
            ["Orders", "12"],
            ["Favourites", favs.length],
            ["Reviews", "8"],
          ].map(([label, val]) => (
            <div
              key={label}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "16px 12px",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1a2e" }}>
                {val}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#aaa",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {[
          { icon: "👤", label: "Edit Profile" },
          { icon: "📦", label: "Order History" },
          { icon: "🔔", label: "Notifications" },
          { icon: "💳", label: "Payment Methods" },
          { icon: "📍", label: "Saved Addresses" },
          {
            icon: "ℹ️",
            label: "About MOHAMED CO",
            action: () => setNav("about"),
          },
          {
            icon: "🚪",
            label: "Sign Out",
            action: () => {
              setPage("login");
              setNav("home");
              setCart([]);
              setFavs([]);
            },
            danger: true,
          },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#fff",
              border: "none",
              borderRadius: 16,
              padding: "16px 20px",
              marginBottom: 10,
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span
              style={{
                flex: 1,
                fontWeight: 600,
                fontSize: 15,
                color: item.danger ? "#e74c3c" : "#1a1a2e",
              }}
            >
              {item.label}
            </span>
            <span style={{ color: "#bbb", fontSize: 18 }}>›</span>
          </button>
        ))}
      </div>
    );
  }

  // ── NAV BAR ────────────────────────────────────────────────────────────────
  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "search", label: "Search", icon: <SearchIcon /> },
    { id: "cart", label: "Cart", icon: <CartIcon count={cartCount} /> },
    { id: "fav", label: "Saved", icon: <HeartIcon filled={false} /> },
    { id: "about", label: "About", icon: <InfoIcon /> },
    { id: "profile", label: "Profile", icon: <UserIcon /> },
  ];

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#f4f4f8",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: "#aaa",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Hello, Welcome 👋
          </div>
          <div style={{ fontWeight: 800, fontSize: 17, color: "#1a1a2e" }}>
            {user.name}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setNav("cart")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1a1a2e",
            }}
          >
            <CartIcon count={cartCount} />
          </button>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4af37, #f0d060)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 14,
              color: "#1a1a2e",
              cursor: "pointer",
            }}
          >
            {user.avatar}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ padding: "24px 20px 100px", maxWidth: 900, margin: "0 auto" }}
      >
        {renderPage()}
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1a1a2e",
            color: "#d4af37",
            padding: "12px 24px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            zIndex: 999,
            whiteSpace: "nowrap",
          }}
        >
          ✓ {toast}
        </div>
      )}

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #f0f0f0",
          padding: "8px 0 12px",
          display: "flex",
          justifyContent: "space-around",
          zIndex: 100,
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setViewProduct(null);
              setNav(item.id);
              if (item.id === "cart") setCartStep("list");
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: nav === item.id ? "#1a1a2e" : "#bbb",
              fontWeight: nav === item.id ? 700 : 400,
              padding: "4px 8px",
              transition: "all .2s",
            }}
          >
            <div
              style={{
                transform: nav === item.id ? "scale(1.15)" : "scale(1)",
                transition: "transform .2s",
              }}
            >
              {item.icon}
            </div>
            <span
              style={{
                fontSize: 10,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </span>
            {nav === item.id && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#d4af37",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
