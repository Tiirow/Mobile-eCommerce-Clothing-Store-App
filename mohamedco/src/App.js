import { useState, useEffect, useRef } from "react";

const GOLD = "#d4af37";
const DARK = "#1a1a2e";

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
    color: "#8a7a6a",
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
    color: "#b8860b",
    tag: null,
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Cascading camel overcoat in cashmere-wool blend. Warmth elevated to art.",
  },
  {
    id: 7,
    name: "Pearl White Wedding Suit",
    category: "Wedding Suits",
    price: 899,
    rating: 5.0,
    reviews: 521,
    color: "#c8bca0",
    tag: "Wedding ⭐",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Immaculate pearl-white suit with gold buttons. The groom who turns every head.",
  },
  {
    id: 8,
    name: "Champagne Groom Set",
    category: "Wedding Suits",
    price: 799,
    rating: 4.9,
    reviews: 388,
    color: "#c9a84c",
    tag: "Wedding",
    sizes: ["M", "L", "XL", "XXL"],
    desc: "Warm champagne tones with ivory lapels — romantic elegance on your special day.",
  },
  {
    id: 9,
    name: "Royal Blue Wedding Suit",
    category: "Wedding Suits",
    price: 849,
    rating: 4.9,
    reviews: 302,
    color: "#1a3a6e",
    tag: "Wedding",
    sizes: ["S", "M", "L", "XL"],
    desc: "Commanding royal blue with silver pocket square. Confident, classic, unforgettable.",
  },
  {
    id: 10,
    name: "Blush Rose Groom Suit",
    category: "Wedding Suits",
    price: 749,
    rating: 4.8,
    reviews: 247,
    color: "#b87070",
    tag: "Wedding",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Soft blush rose suit for the modern romantic — subtle color, massive impact.",
  },
  {
    id: 11,
    name: "Emerald Prestige Suit",
    category: "Wedding Suits",
    price: 879,
    rating: 4.9,
    reviews: 195,
    color: "#1a5c3a",
    tag: "Wedding",
    sizes: ["M", "L", "XL"],
    desc: "Deep emerald green with black satin trim. Bold, regal and truly unforgettable.",
  },
  {
    id: 12,
    name: "Silver Ash Wedding Tux",
    category: "Wedding Suits",
    price: 929,
    rating: 5.0,
    reviews: 411,
    color: "#6a7a8a",
    tag: "Wedding ⭐",
    sizes: ["S", "M", "L", "XL", "XXL"],
    desc: "Platinum-silver tuxedo with peak lapels and matching trousers. Pure sophistication.",
  },
];

const CATEGORIES = [
  "All",
  "Suits",
  "Blazers",
  "Jackets",
  "Tuxedos",
  "Coats",
  "Wedding Suits",
];

const CAT_META = {
  All: { icon: "🎩", color: "#1a1a2e", light: "#f0e8d0" },
  Suits: { icon: "🧥", color: "#1b2a4a", light: "#dce8f5" },
  Blazers: { icon: "🥼", color: "#3d2b1f", light: "#f5ece4" },
  Jackets: { icon: "🧣", color: "#3a3a3a", light: "#e8e8e8" },
  Tuxedos: { icon: "🎭", color: "#0d0d0d", light: "#e0e0e0" },
  Coats: { icon: "🧤", color: "#6b4a1e", light: "#f5e8d0" },
  "Wedding Suits": { icon: "💍", color: "#8b0000", light: "#fde8e8" },
};

const SAMPLE_ORDERS = [
  {
    id: "#MC-2401",
    date: "Jan 15, 2026",
    status: "Delivered",
    items: ["Obsidian Peak Suit", "Ivory Monarch Blazer"],
    total: 848,
  },
  {
    id: "#MC-2389",
    date: "Dec 28, 2025",
    status: "Delivered",
    items: ["Midnight Tuxedo"],
    total: 699,
  },
  {
    id: "#MC-2301",
    date: "Nov 10, 2025",
    status: "Delivered",
    items: ["Navy Diplomat Set"],
    total: 858,
  },
];

const WEDDING_COLORS = [
  { hex: "#c8bca0", name: "Pearl White" },
  { hex: "#c9a84c", name: "Champagne" },
  { hex: "#1a3a6e", name: "Royal Blue" },
  { hex: "#b87070", name: "Blush Rose" },
  { hex: "#1a5c3a", name: "Emerald" },
  { hex: "#6a7a8a", name: "Silver" },
];

// ── tiny helpers ──────────────────────────────────────────────────────────────
const mkOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const avatarText = (n = "") =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "MC";

// ── SVG icons ─────────────────────────────────────────────────────────────────
const Ic = ({
  size = 22,
  fill = "none",
  stroke = "currentColor",
  sw = 1.8,
  children,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
const IcHeart = ({ on }) => (
  <Ic fill={on ? "#c0392b" : "none"} stroke={on ? "#c0392b" : "currentColor"}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Ic>
);
const IcHome = () => (
  <Ic>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Ic>
);
const IcSearch = () => (
  <Ic>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Ic>
);
const IcInfo = () => (
  <Ic>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Ic>
);
const IcUser = () => (
  <Ic>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Ic>
);
const IcBack = () => (
  <Ic>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </Ic>
);
const IcStar = ({ on = true }) => (
  <Ic size={14} fill={on ? "#f39c12" : "none"} stroke={on ? "#f39c12" : "#ccc"}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Ic>
);
const IcTrash = () => (
  <Ic size={18}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Ic>
);
const IcCheck = () => (
  <Ic size={48} stroke="#27ae60">
    <polyline points="20 6 9 17 4 12" />
  </Ic>
);
const IcEye = ({ show }) => (
  <Ic size={18}>
    {show ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </Ic>
);
const IcCart = ({ n }) => (
  <div style={{ position: "relative", display: "inline-flex" }}>
    <Ic>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </Ic>
    {n > 0 && (
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
        {n}
      </span>
    )}
  </div>
);

// ── reusable input ────────────────────────────────────────────────────────────
function TInput({
  label,
  ph,
  val,
  onChange,
  type = "text",
  dark = false,
  autoFocus = false,
}) {
  const [show, setShow] = useState(false);
  const isP = type === "password";
  const bdr = `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : "#e0e0e0"}`;
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <div
          style={{
            color: dark ? "rgba(255,255,255,0.55)" : "#666",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            marginBottom: 7,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      )}
      <div style={{ position: "relative" }}>
        <input
          autoFocus={autoFocus}
          type={isP && show ? "text" : type}
          placeholder={ph}
          value={val}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            paddingRight: isP ? 44 : 16,
            borderRadius: 14,
            border: bdr,
            background: dark ? "rgba(255,255,255,0.08)" : "#fafafa",
            color: dark ? "#fff" : "#222",
            fontSize: 15,
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "inherit",
          }}
        />
        {isP && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: dark ? "rgba(255,255,255,0.45)" : "#aaa",
              display: "flex",
              padding: 0,
            }}
          >
            <IcEye show={show} />
          </button>
        )}
      </div>
    </div>
  );
}

function Err({ msg }) {
  if (!msg) return null;
  return (
    <div
      style={{
        color: "#e74c3c",
        fontSize: 13,
        marginBottom: 14,
        padding: "10px 14px",
        background: "rgba(231,76,60,0.1)",
        borderRadius: 12,
        fontWeight: 500,
      }}
    >
      {msg}
    </div>
  );
}

function GoldBtn({ onClick, children, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "15px",
        borderRadius: 16,
        border: "none",
        background: "linear-gradient(135deg,#d4af37,#f0d060)",
        color: DARK,
        fontSize: 16,
        fontWeight: 800,
        cursor: "pointer",
        letterSpacing: 0.5,
        boxShadow: "0 6px 20px rgba(212,175,55,0.3)",
        marginBottom: 14,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function AuthWrap({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0a0a14 0%,#1a1a2e 55%,#2d1b00 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI',system-ui,sans-serif",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 430 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 74,
              height: 74,
              borderRadius: 22,
              background: "linear-gradient(135deg,#d4af37,#f0d060)",
              marginBottom: 12,
              boxShadow: "0 8px 32px rgba(212,175,55,0.45)",
            }}
          >
            <span style={{ fontSize: 34 }}>🎩</span>
          </div>
          <div
            style={{
              color: GOLD,
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            MOHAMED CO
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 11,
              letterSpacing: 3,
              marginTop: 3,
              textTransform: "uppercase",
            }}
          >
            Elegant Suits · Modern Man
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            borderRadius: 26,
            padding: "30px 26px",
            border: "1px solid rgba(212,175,55,0.18)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ── OTP INPUT ─────────────────────────────────────────────────────────────────
function OtpInput({ value, onChange }) {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const digits = value.split("");
  const handle = (i, v) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = d;
    onChange(next.join(""));
    if (d && i < 5) refs[i + 1].current?.focus();
  };
  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0)
      refs[i - 1].current?.focus();
  };
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={refs[i]}
          value={digits[i] || ""}
          onChange={(e) => handle(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          maxLength={1}
          style={{
            width: 48,
            height: 56,
            textAlign: "center",
            fontSize: 22,
            fontWeight: 800,
            color: DARK,
            borderRadius: 14,
            border: `2px solid ${digits[i] ? GOLD : "#ddd"}`,
            background: digits[i] ? "#fffef5" : "#fafafa",
            outline: "none",
            boxSizing: "border-box",
            transition: "border .2s",
          }}
        />
      ))}
    </div>
  );
}

// ── COUNTDOWN ─────────────────────────────────────────────────────────────────
function Countdown({ start, onEnd }) {
  const [t, setT] = useState(start);
  useEffect(() => {
    if (t <= 0) {
      onEnd();
      return;
    }
    const id = setTimeout(() => setT(t - 1), 1000);
    return () => clearTimeout(id);
  }, [t]);
  const m = Math.floor(t / 60);
  const s = (t % 60).toString().padStart(2, "0");
  return (
    <span style={{ color: GOLD, fontWeight: 700 }}>
      {m}:{s}
    </span>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function PCard({ p, onAdd, onFav, isFav, onView }) {
  const [hov, setHov] = useState(false);
  const wed = p.category === "Wedding Suits";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hov
          ? "0 20px 60px rgba(0,0,0,0.15)"
          : "0 4px 20px rgba(0,0,0,0.07)",
        transition: "all .28s cubic-bezier(.4,0,.2,1)",
        transform: hov ? "translateY(-7px)" : "none",
        cursor: "pointer",
      }}
    >
      <div
        onClick={() => onView(p)}
        style={{
          position: "relative",
          height: 210,
          background: `linear-gradient(135deg,${p.color}${wed ? "44" : "28"},${p.color}${wed ? "77" : "50"})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 110,
            height: 140,
            borderRadius: 18,
            background: `linear-gradient(155deg,${p.color}cc,${p.color})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 10px 36px ${p.color}66`,
          }}
        >
          <span style={{ fontSize: 50 }}>{wed ? "👔" : "🧥"}</span>
        </div>
        {p.tag && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: wed
                ? "linear-gradient(135deg,#9b0000,#e74c3c)"
                : DARK,
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: 1,
              padding: "4px 10px",
              borderRadius: 20,
              textTransform: "uppercase",
            }}
          >
            {p.tag}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFav(p.id);
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(255,255,255,0.94)",
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          }}
        >
          <IcHeart on={isFav} />
        </button>
        {wed && (
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 5,
            }}
          >
            {WEDDING_COLORS.map((c, i) => (
              <div
                key={i}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: c.hex,
                  border: "1.5px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div
          style={{
            fontSize: 10,
            color: wed ? "#c0392b" : "#aaa",
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {p.category}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: DARK,
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {p.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            marginBottom: 10,
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <IcStar key={i} />
          ))}
          <span style={{ fontSize: 11, color: "#999", marginLeft: 4 }}>
            ({p.reviews})
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 800, color: DARK }}>
            ${p.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(p);
            }}
            style={{
              background: wed
                ? "linear-gradient(135deg,#9b0000,#e74c3c)"
                : DARK,
              color: wed ? "#fff" : GOLD,
              border: "none",
              borderRadius: 11,
              padding: "7px 14px",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function App() {
  // ── AUTH STATE ────────────────────────────────────────────────────────────
  const [screen, setScreen] = useState("login");
  const [accounts, setAccounts] = useState([
    {
      name: "Mohamed Adan Mohamed",
      email: "mohamedenjoya7@gmail.com",
      password: "12345678",
    },
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  // login
  const [lEmail, setLEmail] = useState("");
  const [lPass, setLPass] = useState("");
  const [lErr, setLErr] = useState("");

  // signup
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPass, setSPass] = useState("");
  const [sConf, setSConf] = useState("");
  const [sErr, setSErr] = useState("");

  // forgot
  const [fEmail, setFEmail] = useState("");
  const [fErr, setFErr] = useState("");
  const [otpCode, setOtpCode] = useState(""); // generated
  const [otpInput, setOtpInput] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [otpExpired, setOtpExpired] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [newPassConf, setNewPassConf] = useState("");
  const [resetErr, setResetErr] = useState("");

  // ── APP STATE ─────────────────────────────────────────────────────────────
  const [nav, setNav] = useState("home");
  const [profileSub, setProfileSub] = useState(null);
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [viewProd, setViewProd] = useState(null);
  const [selSize, setSelSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [cartStep, setCartStep] = useState("list");
  const [toast, setToast] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "+252 61 7269857",
    city: "Mogadishu",
  });
  const [notifs, setNotifs] = useState([
    {
      id: 1,
      read: false,
      title: "New Wedding Collection 💍",
      body: "6 stunning wedding suit colors now available!",
      time: "1h ago",
    },
    {
      id: 2,
      read: false,
      title: "Order Shipped 📦",
      body: "Your Obsidian Peak Suit is on its way!",
      time: "1d ago",
    },
    {
      id: 3,
      read: true,
      title: "VIP Offer 🌟",
      body: "Get 15% off. Code: VIPMC15",
      time: "3d ago",
    },
    {
      id: 4,
      read: true,
      title: "Order Delivered ✅",
      body: "Your Midnight Tuxedo has been delivered.",
      time: "1w ago",
    },
  ]);
  const [cards, setCards] = useState([
    { id: 1, type: "VISA", last4: "4242", expiry: "08/27", primary: true },
    { id: 2, type: "MC", last4: "8810", expiry: "12/26", primary: false },
  ]);
  const [addrs, setAddrs] = useState([
    {
      id: 1,
      label: "Home",
      address: "123 Waaberi Street, Mogadishu",
      primary: true,
    },
    {
      id: 2,
      label: "Office",
      address: "45 KM4 Business District, Mogadishu",
      primary: false,
    },
  ]);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [showAddCard, setShowAddCard] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: "", address: "" });
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [selWedColor, setSelWedColor] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const unread = notifs.filter((n) => !n.read).length;
  const addToCart = (p) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      return ex
        ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...p, qty: 1 }];
    });
    showToast(`"${p.name}" added ✓`);
  };
  const toggleFav = (id) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const filtered = PRODUCTS.filter(
    (p) =>
      (catFilter === "All" || p.category === catFilter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())),
  );

  // ── LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (screen === "login")
    return (
      <AuthWrap>
        <div
          style={{
            color: "#fff",
            fontSize: 21,
            fontWeight: 800,
            marginBottom: 4,
          }}
        >
          Welcome Back
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            marginBottom: 22,
          }}
        >
          Sign in to your exclusive account
        </div>
        <TInput
          label="Email"
          ph="demo@mohamedco.so"
          val={lEmail}
          onChange={(v) => {
            setLEmail(v);
            setLErr("");
          }}
          type="email"
          dark
          autoFocus
        />
        <TInput
          label="Password"
          ph="••••••••"
          val={lPass}
          onChange={(v) => {
            setLPass(v);
            setLErr("");
          }}
          type="password"
          dark
        />
        <Err msg={lErr} />
        <div style={{ textAlign: "right", marginBottom: 18 }}>
          <span
            onClick={() => {
              setFEmail("");
              setFErr("");
              setOtpInput("");
              setOtpErr("");
              setOtpExpired(false);
              setScreen("forgot");
            }}
            style={{
              color: GOLD,
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Forgot password?
          </span>
        </div>
        <GoldBtn
          onClick={() => {
            if (!lEmail.trim() || !lPass.trim()) {
              setLErr("Please fill in all fields.");
              return;
            }
            const acc = accounts.find(
              (a) =>
                a.email.toLowerCase() === lEmail.trim().toLowerCase() &&
                a.password === lPass,
            );
            if (!acc) {
              setLErr("Incorrect email or password.");
              return;
            }
            setCurrentUser(acc);
            setProfileForm((f) => ({ ...f, name: acc.name, email: acc.email }));
            setLErr("");
            setScreen("app");
          }}
        >
          SIGN IN
        </GoldBtn>
        <div
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.38)",
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          New here?{" "}
          <span
            onClick={() => {
              setSName("");
              setSEmail("");
              setSPass("");
              setSConf("");
              setSErr("");
              setScreen("signup");
            }}
            style={{ color: GOLD, fontWeight: 700, cursor: "pointer" }}
          >
            Create Account
          </span>
        </div>
        <div
          style={{
            padding: "10px 14px",
            background: "rgba(212,175,55,0.07)",
            borderRadius: 12,
            border: "1px solid rgba(212,175,55,0.18)",
            textAlign: "center",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
            Demo → demo@mohamedco.so / demo123
          </span>
        </div>
      </AuthWrap>
    );

  // ── SIGNUP SCREEN ─────────────────────────────────────────────────────────
  if (screen === "signup")
    return (
      <AuthWrap>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <button
            onClick={() => setScreen("login")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: GOLD,
              display: "flex",
              padding: 0,
            }}
          >
            <IcBack />
          </button>
          <div>
            <div style={{ color: "#fff", fontSize: 21, fontWeight: 800 }}>
              Create Account
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
              Join the MOHAMED CO family
            </div>
          </div>
        </div>
        <TInput
          label="Full Name"
          ph="Your full name"
          val={sName}
          onChange={(v) => {
            setSName(v);
            setSErr("");
          }}
          dark
        />
        <TInput
          label="Email"
          ph="you@example.com"
          val={sEmail}
          onChange={(v) => {
            setSEmail(v);
            setSErr("");
          }}
          type="email"
          dark
        />
        <TInput
          label="Password"
          ph="Min. 6 characters"
          val={sPass}
          onChange={(v) => {
            setSPass(v);
            setSErr("");
          }}
          type="password"
          dark
        />
        <TInput
          label="Confirm Password"
          ph="Repeat password"
          val={sConf}
          onChange={(v) => {
            setSConf(v);
            setSErr("");
          }}
          type="password"
          dark
        />
        <Err msg={sErr} />
        <GoldBtn
          onClick={() => {
            if (!sName.trim() || !sEmail.trim() || !sPass || !sConf) {
              setSErr("Please fill in all fields.");
              return;
            }
            if (!sEmail.includes("@")) {
              setSErr("Please enter a valid email.");
              return;
            }
            if (sPass.length < 6) {
              setSErr("Password must be at least 6 characters.");
              return;
            }
            if (sPass !== sConf) {
              setSErr("Passwords do not match.");
              return;
            }
            if (
              accounts.find(
                (a) => a.email.toLowerCase() === sEmail.trim().toLowerCase(),
              )
            ) {
              setSErr("This email is already registered.");
              return;
            }
            const acc = {
              name: sName.trim(),
              email: sEmail.trim(),
              password: sPass,
            };
            setAccounts((a) => [...a, acc]);
            setCurrentUser(acc);
            setProfileForm((f) => ({ ...f, name: acc.name, email: acc.email }));
            setSErr("");
            setScreen("app");
            showToast("Welcome to MOHAMED CO! 🎩");
          }}
        >
          CREATE ACCOUNT
        </GoldBtn>
        <div
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.38)",
            fontSize: 13,
          }}
        >
          Have an account?{" "}
          <span
            onClick={() => setScreen("login")}
            style={{ color: GOLD, fontWeight: 700, cursor: "pointer" }}
          >
            Sign In
          </span>
        </div>
      </AuthWrap>
    );

  // ── FORGOT EMAIL ──────────────────────────────────────────────────────────
  if (screen === "forgot")
    return (
      <AuthWrap>
        <button
          onClick={() => setScreen("login")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: GOLD,
            fontWeight: 600,
            fontSize: 13,
            marginBottom: 20,
            padding: 0,
          }}
        >
          <IcBack /> Back
        </button>
        <div
          style={{
            color: "#fff",
            fontSize: 21,
            fontWeight: 800,
            marginBottom: 4,
          }}
        >
          Forgot Password?
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            marginBottom: 22,
          }}
        >
          Enter your registered email. We'll send a 6-digit OTP code.
        </div>
        <TInput
          label="Email Address"
          ph="you@mohamedco.com"
          val={fEmail}
          onChange={(v) => {
            setFEmail(v);
            setFErr("");
          }}
          type="email"
          dark
        />
        <Err msg={fErr} />
        <GoldBtn
          onClick={() => {
            if (!fEmail.trim()) {
              setFErr("Please enter your email.");
              return;
            }
            if (!fEmail.includes("@")) {
              setFErr("Invalid email address.");
              return;
            }
            if (
              !accounts.find(
                (a) => a.email.toLowerCase() === fEmail.trim().toLowerCase(),
              )
            ) {
              setFErr("No account found with this email.");
              return;
            }
            const code = mkOTP();
            setOtpCode(code);
            setOtpInput("");
            setOtpErr("");
            setOtpExpired(false);
            setFErr("");
            console.log("OTP CODE (demo):", code);
            setScreen("otp");
            showToast(`OTP sent! (Demo code: ${code})`);
          }}
        >
          SEND OTP CODE
        </GoldBtn>
      </AuthWrap>
    );

  // ── OTP SCREEN ────────────────────────────────────────────────────────────
  if (screen === "otp")
    return (
      <AuthWrap>
        <button
          onClick={() => setScreen("forgot")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: GOLD,
            fontWeight: 600,
            fontSize: 13,
            marginBottom: 20,
            padding: 0,
          }}
        >
          <IcBack /> Back
        </button>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.12)",
              border: "2px solid rgba(212,175,55,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              fontSize: 30,
            }}
          >
            📩
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 21,
              fontWeight: 800,
              marginBottom: 6,
            }}
          >
            Enter OTP Code
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            We sent a 6-digit code to
          </div>
          <div
            style={{ color: GOLD, fontWeight: 700, fontSize: 14, marginTop: 3 }}
          >
            {fEmail}
          </div>
        </div>
        {/* Demo hint */}
        <div
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: 12,
            padding: "10px 14px",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
            Demo OTP:{" "}
            <span
              style={{
                color: GOLD,
                fontWeight: 800,
                fontSize: 15,
                letterSpacing: 3,
              }}
            >
              {otpCode}
            </span>
          </div>
        </div>
        <OtpInput
          value={otpInput}
          onChange={(v) => {
            setOtpInput(v);
            setOtpErr("");
          }}
        />
        <Err msg={otpErr} />
        {!otpExpired ? (
          <div
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.4)",
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            Code expires in{" "}
            <Countdown start={120} onEnd={() => setOtpExpired(true)} />
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#e74c3c",
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            OTP expired. Please resend.
          </div>
        )}
        <GoldBtn
          onClick={() => {
            if (otpInput.length < 6) {
              setOtpErr("Please enter all 6 digits.");
              return;
            }
            if (otpExpired) {
              setOtpErr("OTP has expired. Please resend.");
              return;
            }
            if (otpInput !== otpCode) {
              setOtpErr("Incorrect OTP code. Please try again.");
              return;
            }
            setOtpErr("");
            setNewPass("");
            setNewPassConf("");
            setResetErr("");
            setScreen("resetPass");
          }}
        >
          VERIFY OTP
        </GoldBtn>
        <button
          onClick={() => {
            const code = mkOTP();
            setOtpCode(code);
            setOtpInput("");
            setOtpErr("");
            setOtpExpired(false);
            showToast(`New OTP: ${code}`);
          }}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 14,
            border: "1.5px solid rgba(212,175,55,0.3)",
            background: "transparent",
            color: GOLD,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Resend OTP
        </button>
      </AuthWrap>
    );

  // ── RESET PASSWORD ────────────────────────────────────────────────────────
  if (screen === "resetPass")
    return (
      <AuthWrap>
        <div
          style={{
            color: "#fff",
            fontSize: 21,
            fontWeight: 800,
            marginBottom: 4,
          }}
        >
          New Password
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            marginBottom: 22,
          }}
        >
          Create a strong new password for your account.
        </div>
        <TInput
          label="New Password"
          ph="Min. 6 characters"
          val={newPass}
          onChange={(v) => {
            setNewPass(v);
            setResetErr("");
          }}
          type="password"
          dark
        />
        <TInput
          label="Confirm New Password"
          ph="Repeat password"
          val={newPassConf}
          onChange={(v) => {
            setNewPassConf(v);
            setResetErr("");
          }}
          type="password"
          dark
        />
        <Err msg={resetErr} />
        <GoldBtn
          onClick={() => {
            if (!newPass || !newPassConf) {
              setResetErr("Please fill in both fields.");
              return;
            }
            if (newPass.length < 6) {
              setResetErr("Password must be at least 6 characters.");
              return;
            }
            if (newPass !== newPassConf) {
              setResetErr("Passwords do not match.");
              return;
            }
            setAccounts((accs) =>
              accs.map((a) =>
                a.email.toLowerCase() === fEmail.trim().toLowerCase()
                  ? { ...a, password: newPass }
                  : a,
              ),
            );
            setScreen("resetDone");
          }}
        >
          RESET PASSWORD
        </GoldBtn>
      </AuthWrap>
    );

  if (screen === "resetDone")
    return (
      <AuthWrap>
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(39,174,96,0.12)",
              border: "2px solid rgba(39,174,96,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <IcCheck />
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Password Reset! 🎉
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 14,
              marginBottom: 28,
              lineHeight: 1.6,
            }}
          >
            Your password has been updated successfully. Sign in with your new
            password.
          </div>
          <GoldBtn
            style={{ marginBottom: 0 }}
            onClick={() => {
              setLEmail(fEmail);
              setLPass("");
              setScreen("login");
            }}
          >
            Go to Sign In
          </GoldBtn>
        </div>
      </AuthWrap>
    );

  // ── APP SHELL ─────────────────────────────────────────────────────────────
  const Back = ({ to }) => (
    <button
      onClick={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
        color: DARK,
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        marginBottom: 20,
        padding: 0,
      }}
    >
      <IcBack /> Back
    </button>
  );

  // ── HOME ──────────────────────────────────────────────────────────────────
  function HomePage() {
    return (
      <div>
        {/* Hero */}
        <div
          style={{
            background: "linear-gradient(135deg,#0d0d0d,#1a1a2e)",
            borderRadius: 24,
            padding: "28px 26px",
            marginBottom: 20,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -20,
              top: -20,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.07)",
            }}
          />
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            New Collection 2026
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 23,
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: 8,
            }}
          >
            Elegance
            <br />
            <span style={{ color: GOLD }}>Redefined.</span>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.48)",
              fontSize: 13,
              marginBottom: 18,
              maxWidth: 220,
            }}
          >
            Italian craft. Modern silhouettes. Built for the man who leads.
          </div>
          <button
            onClick={() => setCatFilter("All")}
            style={{
              background: "linear-gradient(135deg,#d4af37,#f0d060)",
              color: DARK,
              border: "none",
              borderRadius: 14,
              padding: "11px 22px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: 10,
              fontSize: 64,
              opacity: 0.1,
            }}
          >
            🎩
          </div>
        </div>

        {/* Wedding Banner */}
        <div
          onClick={() => setCatFilter("Wedding Suits")}
          style={{
            background: "linear-gradient(135deg,#6b0000,#b00000,#e74c3c)",
            borderRadius: 22,
            padding: "22px 24px",
            marginBottom: 20,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -15,
              top: -15,
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
            }}
          />
          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Exclusive Collection
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 19,
              fontWeight: 900,
              marginBottom: 6,
            }}
          >
            💍 Wedding Suits
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {WEDDING_COLORS.map((c, i) => (
              <div
                key={i}
                title={c.name}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: c.hex,
                  border: "2px solid rgba(255,255,255,0.6)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
            ))}
          </div>
          <span
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: 20,
              padding: "5px 14px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            View All 6 Colors →
          </span>
          <div
            style={{
              position: "absolute",
              right: 18,
              bottom: 8,
              fontSize: 46,
              opacity: 0.18,
            }}
          >
            👔
          </div>
        </div>

        {/* Categories */}
        <div
          style={{
            fontWeight: 700,
            fontSize: 17,
            color: DARK,
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
            paddingBottom: 8,
            marginBottom: 22,
            scrollbarWidth: "none",
          }}
        >
          {CATEGORIES.map((c) => {
            const m = CAT_META[c];
            const active = catFilter === c;
            return (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 18px",
                  borderRadius: 20,
                  border: `2px solid ${active ? m.color : "#e8e8e8"}`,
                  background: active ? m.color : m.light,
                  cursor: "pointer",
                  transition: "all .22s",
                  minWidth: 76,
                  boxShadow: active ? "0 6px 20px rgba(0,0,0,0.18)" : "none",
                  transform: active ? "scale(1.05)" : "scale(1)",
                }}
              >
                <span style={{ fontSize: 26 }}>{m.icon}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: active ? "#fff" : m.color,
                    textAlign: "center",
                    lineHeight: 1.2,
                    maxWidth: 68,
                  }}
                >
                  {c}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 17, color: DARK }}>
            {catFilter === "Wedding Suits"
              ? "💍 Wedding Collection"
              : catFilter === "All"
                ? "All Pieces"
                : catFilter}
          </div>
          <span style={{ fontSize: 12, color: "#aaa" }}>
            {filtered.length} items
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
            gap: 18,
          }}
        >
          {filtered.map((p) => (
            <PCard
              key={p.id}
              p={p}
              onAdd={addToCart}
              onFav={toggleFav}
              isFav={favs.includes(p.id)}
              onView={setViewProd}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── SEARCH ────────────────────────────────────────────────────────────────
  function SearchPage() {
    return (
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: DARK,
            marginBottom: 16,
          }}
        >
          Discover
        </div>
        <div style={{ position: "relative", marginBottom: 16 }}>
          <div
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#aaa",
            }}
          >
            <IcSearch />
          </div>
          <input
            autoFocus
            placeholder="Search suits, wedding, blazers…"
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
              fontFamily: "inherit",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 8,
            marginBottom: 18,
            scrollbarWidth: "none",
          }}
        >
          {CATEGORIES.map((c) => {
            const m = CAT_META[c];
            const active = catFilter === c;
            return (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                style={{
                  flexShrink: 0,
                  padding: "7px 14px",
                  borderRadius: 20,
                  border: `1.5px solid ${active ? m.color : "#e0e0e0"}`,
                  background: active ? m.color : "#fff",
                  color: active ? "#fff" : m.color,
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {m.icon} {c}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
            gap: 18,
          }}
        >
          {filtered.map((p) => (
            <PCard
              key={p.id}
              p={p}
              onAdd={addToCart}
              onFav={toggleFav}
              isFav={favs.includes(p.id)}
              onView={setViewProd}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#ccc",
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

  // ── PRODUCT DETAIL ────────────────────────────────────────────────────────
  function DetailPage() {
    const p = viewProd;
    const wed = p.category === "Wedding Suits";
    const [wc, setWc] = useState(p.color);
    const wcName = WEDDING_COLORS.find((c) => c.hex === wc)?.name || "";
    return (
      <div>
        <Back
          to={() => {
            setViewProd(null);
            setSelSize(null);
            setQty(1);
            setSelWedColor(null);
          }}
        />
        <div
          style={{
            borderRadius: 24,
            background: `linear-gradient(135deg,${wc}28,${wc}55)`,
            height: 290,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 22,
            position: "relative",
            transition: "background .3s",
          }}
        >
          <div
            style={{
              width: 148,
              height: 185,
              borderRadius: 20,
              background: `linear-gradient(155deg,${wc}cc,${wc})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 16px 48px ${wc}55`,
              transition: "all .3s",
            }}
          >
            <span style={{ fontSize: 76 }}>{wed ? "👔" : "🧥"}</span>
          </div>
          <button
            onClick={() => toggleFav(p.id)}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 42,
              height: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            <IcHeart on={favs.includes(p.id)} />
          </button>
          {p.tag && (
            <span
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: wed
                  ? "linear-gradient(135deg,#9b0000,#e74c3c)"
                  : DARK,
                color: "#fff",
                fontSize: 10,
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
            padding: 22,
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
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
                  fontSize: 11,
                  color: wed ? "#c0392b" : "#aaa",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                {p.category}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: DARK }}>
                {p.name}
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: DARK }}>
              ${p.price}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <IcStar key={i} />
            ))}
            <span style={{ fontWeight: 700, fontSize: 13, color: DARK }}>
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
              marginBottom: 18,
            }}
          >
            {p.desc}
          </div>

          {wed && (
            <div style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: DARK,
                  marginBottom: 10,
                }}
              >
                Choose Color{" "}
                {wcName && (
                  <span style={{ color: GOLD, fontSize: 13 }}>— {wcName}</span>
                )}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {WEDDING_COLORS.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => setWc(c.hex)}
                    title={c.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: c.hex,
                        border: `3px solid ${wc === c.hex ? "#1a1a2e" : "transparent"}`,
                        boxShadow:
                          wc === c.hex
                            ? "0 0 0 2px #d4af37"
                            : "0 2px 8px rgba(0,0,0,0.15)",
                        transition: "all .2s",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 9,
                        color: wc === c.hex ? DARK : "#bbb",
                        fontWeight: wc === c.hex ? 800 : 400,
                        textAlign: "center",
                        maxWidth: 42,
                      }}
                    >
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: DARK,
                marginBottom: 10,
              }}
            >
              Select Size
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelSize(s)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    border: `2px solid ${selSize === s ? DARK : "#e0e0e0"}`,
                    background: selSize === s ? DARK : "#fff",
                    color: selSize === s ? GOLD : "#555",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: DARK,
                marginBottom: 10,
              }}
            >
              Quantity
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
                  color: DARK,
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

          <button
            onClick={() => {
              for (let i = 0; i < qty; i++) addToCart(p);
              setViewProd(null);
              setSelSize(null);
              setQty(1);
              setNav("cart");
            }}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 16,
              border: "none",
              background: wed
                ? "linear-gradient(135deg,#9b0000,#e74c3c)"
                : "linear-gradient(135deg,#1a1a2e,#2d2d4e)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            🛒 Add to Cart · ${(p.price * qty).toFixed(2)}
          </button>
        </div>
      </div>
    );
  }

  // ── CART ──────────────────────────────────────────────────────────────────
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
              border: "2px solid rgba(39,174,96,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <IcCheck />
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: DARK,
              marginBottom: 8,
            }}
          >
            Order Confirmed! 🎉
          </div>
          <div
            style={{
              color: "#888",
              fontSize: 14,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Your MOHAMED CO pieces are being prepared with care. Delivery in 3–5
            business days.
          </div>
          <GoldBtn
            style={{ maxWidth: 260, margin: "0 auto" }}
            onClick={() => {
              setCart([]);
              setCartStep("list");
              setNav("home");
            }}
          >
            Continue Shopping
          </GoldBtn>
        </div>
      );
    if (cartStep === "checkout")
      return (
        <div>
          <Back to={() => setCartStep("list")} />
          <div
            style={{
              fontWeight: 800,
              fontSize: 22,
              color: DARK,
              marginBottom: 18,
            }}
          >
            Checkout
          </div>
          {[
            ["Full Name", "Mohamed Al-Hassan", "text"],
            ["Email", "you@mohamedco.com", "email"],
            ["Phone", "+252 61 000 0000", "tel"],
            ["Address", "123 Main St, Mogadishu", "text"],
            ["City", "Mogadishu", "text"],
          ].map(([l, ph, t]) => (
            <div key={l} style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#666",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                {l}
              </label>
              <input
                type={t}
                placeholder={ph}
                style={{
                  width: "100%",
                  padding: "13px 14px",
                  borderRadius: 13,
                  border: "1.5px solid #e0e0e0",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fafafa",
                  fontFamily: "inherit",
                }}
              />
            </div>
          ))}
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: DARK,
              margin: "18px 0 12px",
            }}
          >
            Payment
          </div>
          {[
            ["Card Number", "•••• •••• •••• 4242"],
            ["Expiry", "MM/YY"],
            ["CVV", "•••"],
          ].map(([l, ph]) => (
            <div key={l} style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#666",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                {l}
              </label>
              <input
                placeholder={ph}
                style={{
                  width: "100%",
                  padding: "13px 14px",
                  borderRadius: 13,
                  border: "1.5px solid #e0e0e0",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fafafa",
                  fontFamily: "inherit",
                }}
              />
            </div>
          ))}
          <div
            style={{
              background: "#f8f8f8",
              borderRadius: 16,
              padding: 18,
              margin: "18px 0",
            }}
          >
            {cart.map((i) => (
              <div
                key={i.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 7,
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
                paddingTop: 10,
                marginTop: 6,
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 800,
                fontSize: 16,
                color: DARK,
              }}
            >
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <GoldBtn onClick={() => setCartStep("done")}>
            Place Order · ${cartTotal.toFixed(2)}
          </GoldBtn>
        </div>
      );
    return (
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: DARK,
            marginBottom: 18,
          }}
        >
          Your Cart <span style={{ color: GOLD }}>({cartCount})</span>
        </div>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 60, marginBottom: 14 }}>🛒</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: DARK,
                marginBottom: 8,
              }}
            >
              Your cart is empty
            </div>
            <div style={{ color: "#aaa", marginBottom: 22 }}>
              Discover our elegant collection
            </div>
            <button
              onClick={() => setNav("home")}
              style={{
                background: DARK,
                color: GOLD,
                border: "none",
                borderRadius: 14,
                padding: "12px 26px",
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
                  padding: 16,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: 66,
                    height: 74,
                    borderRadius: 14,
                    background: `linear-gradient(135deg,${item.color}30,${item.color}60)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 28,
                  }}
                >
                  {item.category === "Wedding Suits" ? "👔" : "🧥"}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: DARK,
                      marginBottom: 2,
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#aaa", marginBottom: 8 }}>
                    {item.category}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
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
                    <span
                      style={{
                        fontWeight: 700,
                        color: DARK,
                        minWidth: 16,
                        textAlign: "center",
                      }}
                    >
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
                      fontSize: 15,
                      color: DARK,
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
                    <IcTrash />
                  </button>
                </div>
              </div>
            ))}
            <div
              style={{
                background: "linear-gradient(135deg,#1a1a2e,#2d2d4e)",
                borderRadius: 20,
                padding: 22,
                marginTop: 6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: GOLD,
                  fontSize: 18,
                  fontWeight: 800,
                  marginTop: 10,
                  paddingTop: 10,
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
                  marginTop: 16,
                  padding: "14px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg,#d4af37,#f0d060)",
                  color: DARK,
                  fontSize: 15,
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

  // ── FAV ───────────────────────────────────────────────────────────────────
  function FavPage() {
    const fp = PRODUCTS.filter((p) => favs.includes(p.id));
    return (
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: DARK,
            marginBottom: 18,
          }}
        >
          Favourites <span style={{ color: "#c0392b" }}>♥</span>
        </div>
        {fp.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 60, marginBottom: 14 }}>♡</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: DARK,
                marginBottom: 8,
              }}
            >
              No favourites yet
            </div>
            <div style={{ color: "#aaa", marginBottom: 22 }}>
              Tap ♡ on any piece
            </div>
            <button
              onClick={() => setNav("home")}
              style={{
                background: DARK,
                color: GOLD,
                border: "none",
                borderRadius: 14,
                padding: "12px 26px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Explore
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
              gap: 18,
            }}
          >
            {fp.map((p) => (
              <PCard
                key={p.id}
                p={p}
                onAdd={addToCart}
                onFav={toggleFav}
                isFav={true}
                onView={setViewProd}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── ABOUT ─────────────────────────────────────────────────────────────────
  function AboutPage() {
    return (
      <div>
        <div
          style={{
            background: "linear-gradient(135deg,#0d0d0d,#1a1a2e)",
            borderRadius: 24,
            padding: "36px 28px",
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 12 }}>🎩</div>
          <div
            style={{
              color: GOLD,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            MOHAMED CO
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 12,
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
            body: "Founded in 2018, MOHAMED CO was born from a conviction that every man deserves to wear his confidence. We source Italian wools and Moroccan silks to craft suits that speak before you do.",
          },
          {
            icon: "💍",
            title: "Wedding Collection",
            body: "Our Wedding Suits line offers 6 exclusive colors — Pearl White, Champagne, Royal Blue, Blush Rose, Emerald and Silver. Each groom suit is handcrafted and delivered in our luxury box.",
          },
          {
            icon: "✂️",
            title: "The Craft",
            body: "Each piece passes through 47 tailoring steps. From pattern-cutting to hand-stitched lapels, our Mogadishu atelier blends traditional craft with modern precision.",
          },
          {
            icon: "🌿",
            title: "Sustainability",
            body: "Low-impact dyeing, fair-trade weavers, 100% recyclable packaging. Elegance should never cost the earth.",
          },
          {
            icon: "📦",
            title: "Delivery",
            body: "Free worldwide shipping. Every suit arrives in our signature black box with a handwritten note.",
          },
        ].map((s) => (
          <div
            key={s.title}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
              boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 7 }}>{s.icon}</div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 15,
                color: DARK,
                marginBottom: 6,
              }}
            >
              {s.title}
            </div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>
              {s.body}
            </div>
          </div>
        ))}
        <div
          style={{
            background: "linear-gradient(135deg,#d4af37,#f0d060)",
            borderRadius: 20,
            padding: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 16,
              color: DARK,
              marginBottom: 8,
            }}
          >
            Visit Our Atelier
          </div>
          {[
            "📍 Mogadishu City Centre, Somalia",
            "✉️ hello@mohamedco.so",
            "📞 +252 61 7269857",
          ].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 13,
                color: "rgba(26,26,46,0.7)",
                marginBottom: 4,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── PROFILE SUBS ──────────────────────────────────────────────────────────
  function EditProfilePage() {
    const [f, setF] = useState({ ...profileForm });
    const [saved, setSaved] = useState(false);
    return (
      <div>
        <Back to={() => setProfileSub(null)} />
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: DARK,
            marginBottom: 18,
          }}
        >
          Edit Profile
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 22,
            boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#d4af37,#f0d060)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
                fontSize: 24,
                fontWeight: 900,
                color: DARK,
              }}
            >
              {avatarText(f.name)}
            </div>
            <button
              style={{
                background: "none",
                border: `1.5px solid ${GOLD}`,
                color: GOLD,
                borderRadius: 10,
                padding: "5px 14px",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Change Photo
            </button>
          </div>
          {[
            ["Full Name", "Your full name", "name", "text"],
            ["Email", "your@email.com", "email", "email"],
            ["Phone", "+252 61 000 0000", "phone", "tel"],
            ["City", "Your city", "city", "text"],
          ].map(([label, ph, key, type]) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#666",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                {label}
              </label>
              <input
                type={type}
                placeholder={ph}
                value={f[key]}
                onChange={(e) => setF((x) => ({ ...x, [key]: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 13,
                  border: "1.5px solid #e0e0e0",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#fafafa",
                  fontFamily: "inherit",
                }}
              />
            </div>
          ))}
          {saved && (
            <div
              style={{
                background: "rgba(39,174,96,0.1)",
                color: "#27ae60",
                borderRadius: 12,
                padding: "9px 14px",
                marginBottom: 12,
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              ✓ Profile saved!
            </div>
          )}
          <GoldBtn
            onClick={() => {
              setProfileForm({ ...f });
              setSaved(true);
              showToast("Profile updated ✓");
            }}
          >
            Save Changes
          </GoldBtn>
        </div>
      </div>
    );
  }

  function OrdersPage() {
    return (
      <div>
        <Back to={() => setProfileSub(null)} />
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: DARK,
            marginBottom: 18,
          }}
        >
          Order History
        </div>
        {SAMPLE_ORDERS.map((o) => (
          <div
            key={o.id}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
              boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 10,
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: DARK }}>
                  {o.id}
                </div>
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
                  {o.date}
                </div>
              </div>
              <span
                style={{
                  background: "rgba(39,174,96,0.12)",
                  color: "#27ae60",
                  borderRadius: 20,
                  padding: "4px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                ✓ {o.status}
              </span>
            </div>
            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 10 }}>
              {o.items.map((item) => (
                <div
                  key={item}
                  style={{ fontSize: 13, color: "#555", marginBottom: 3 }}
                >
                  • {item}
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid #f0f0f0",
                paddingTop: 10,
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 800, fontSize: 16, color: DARK }}>
                ${o.total}
              </span>
              <button
                style={{
                  background: DARK,
                  color: GOLD,
                  border: "none",
                  borderRadius: 10,
                  padding: "7px 14px",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function NotifsPage() {
    return (
      <div>
        <Back to={() => setProfileSub(null)} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 22, color: DARK }}>
            Notifications
          </div>
          {unread > 0 && (
            <button
              onClick={() =>
                setNotifs((n) => n.map((x) => ({ ...x, read: true })))
              }
              style={{
                background: "none",
                border: `1.5px solid ${GOLD}`,
                color: GOLD,
                borderRadius: 12,
                padding: "5px 12px",
                fontWeight: 600,
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              Mark all read
            </button>
          )}
        </div>
        {notifs.map((n) => (
          <div
            key={n.id}
            onClick={() =>
              setNotifs((ns) =>
                ns.map((x) => (x.id === n.id ? { ...x, read: true } : x)),
              )
            }
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 18,
              marginBottom: 10,
              cursor: "pointer",
              borderLeft: `4px solid ${n.read ? "#e8e8e8" : GOLD}`,
              opacity: n.read ? 0.65 : 1,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: DARK }}>
                {n.title}
              </div>
              {!n.read && (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: GOLD,
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
              )}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#666",
                marginBottom: 4,
                lineHeight: 1.5,
              }}
            >
              {n.body}
            </div>
            <div style={{ fontSize: 11, color: "#bbb" }}>{n.time}</div>
          </div>
        ))}
      </div>
    );
  }

  function PaymentPage() {
    return (
      <div>
        <Back to={() => setProfileSub(null)} />
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: DARK,
            marginBottom: 18,
          }}
        >
          Payment Methods
        </div>
        {cards.map((c) => (
          <div
            key={c.id}
            style={{
              background: c.primary
                ? "linear-gradient(135deg,#1a1a2e,#2d2d4e)"
                : "#fff",
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
              boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  background: c.type === "VISA" ? "#1a1fcf" : "#e03030",
                  borderRadius: 8,
                  padding: "3px 10px",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                {c.type}
              </span>
              {c.primary && (
                <span
                  style={{
                    background: "rgba(212,175,55,0.2)",
                    color: GOLD,
                    borderRadius: 20,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  Primary
                </span>
              )}
            </div>
            <div
              style={{
                color: c.primary ? "#fff" : DARK,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 4,
                marginBottom: 12,
              }}
            >
              •••• •••• •••• {c.last4}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: c.primary ? "rgba(255,255,255,0.6)" : "#aaa",
                  fontSize: 13,
                }}
              >
                Expires {c.expiry}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {!c.primary && (
                  <button
                    onClick={() =>
                      setCards((cs) =>
                        cs.map((x) => ({ ...x, primary: x.id === c.id })),
                      )
                    }
                    style={{
                      background: "rgba(212,175,55,0.15)",
                      color: GOLD,
                      border: "none",
                      borderRadius: 10,
                      padding: "6px 12px",
                      fontWeight: 600,
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    Set Primary
                  </button>
                )}
                <button
                  onClick={() =>
                    setCards((cs) => cs.filter((x) => x.id !== c.id))
                  }
                  style={{
                    background: "rgba(231,76,60,0.1)",
                    color: "#e74c3c",
                    border: "none",
                    borderRadius: 10,
                    padding: "6px 12px",
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        {showAddCard ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: DARK,
                marginBottom: 14,
              }}
            >
              Add New Card
            </div>
            {[
              ["Name", "Mohamed Adan Mohamed", "name"],
              ["Card Number", "1234 5678 9012 3456", "number"],
              ["Expiry", "MM/YY", "expiry"],
              ["CVV", "•••", "cvv"],
            ].map(([l, ph, k]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#666",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  {l}
                </label>
                <input
                  placeholder={ph}
                  value={newCard[k]}
                  onChange={(e) =>
                    setNewCard((c) => ({ ...c, [k]: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: "1.5px solid #e0e0e0",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    background: "#fafafa",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                onClick={() => {
                  if (!newCard.number || !newCard.expiry) {
                    showToast("Fill all fields");
                    return;
                  }
                  const l4 =
                    newCard.number.replace(/\s/g, "").slice(-4) || "0000";
                  setCards((c) => [
                    ...c,
                    {
                      id: Date.now(),
                      type: "VISA",
                      last4: l4,
                      expiry: newCard.expiry,
                      primary: false,
                    },
                  ]);
                  setNewCard({ number: "", expiry: "", cvv: "", name: "" });
                  setShowAddCard(false);
                  showToast("Card added ✓");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg,#d4af37,#f0d060)",
                  color: DARK,
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddCard(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  border: "1.5px solid #e0e0e0",
                  background: "#fff",
                  color: "#666",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddCard(true)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 16,
              border: `2px dashed ${GOLD}`,
              background: "rgba(212,175,55,0.04)",
              color: GOLD,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            + Add New Card
          </button>
        )}
      </div>
    );
  }

  function AddrsPage() {
    return (
      <div>
        <Back to={() => setProfileSub(null)} />
        <div
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: DARK,
            marginBottom: 18,
          }}
        >
          Saved Addresses
        </div>
        {addrs.map((a) => (
          <div
            key={a.id}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
              borderLeft: `4px solid ${a.primary ? GOLD : "#e0e0e0"}`,
              boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 15, color: DARK }}>
                📍 {a.label}
              </div>
              {a.primary && (
                <span
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    color: GOLD,
                    borderRadius: 20,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  Primary
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#666",
                marginBottom: 12,
                lineHeight: 1.5,
              }}
            >
              {a.address}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {!a.primary && (
                <button
                  onClick={() =>
                    setAddrs((as) =>
                      as.map((x) => ({ ...x, primary: x.id === a.id })),
                    )
                  }
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    color: GOLD,
                    border: "none",
                    borderRadius: 10,
                    padding: "6px 12px",
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Set Primary
                </button>
              )}
              <button
                onClick={() =>
                  setAddrs((as) => as.filter((x) => x.id !== a.id))
                }
                style={{
                  background: "rgba(231,76,60,0.1)",
                  color: "#e74c3c",
                  border: "none",
                  borderRadius: 10,
                  padding: "6px 12px",
                  fontWeight: 600,
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {showAddAddr ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: DARK,
                marginBottom: 14,
              }}
            >
              Add Address
            </div>
            {[
              ["Label", "Home / Office", "label"],
              ["Full Address", "123 Main St, Mogadishu", "address"],
            ].map(([l, ph, k]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#666",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  {l}
                </label>
                <input
                  placeholder={ph}
                  value={newAddr[k]}
                  onChange={(e) =>
                    setNewAddr((a) => ({ ...a, [k]: e.target.value }))
                  }
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: "1.5px solid #e0e0e0",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    background: "#fafafa",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                onClick={() => {
                  if (!newAddr.label || !newAddr.address) {
                    showToast("Fill all fields");
                    return;
                  }
                  setAddrs((a) => [
                    ...a,
                    {
                      id: Date.now(),
                      label: newAddr.label,
                      address: newAddr.address,
                      primary: false,
                    },
                  ]);
                  setNewAddr({ label: "", address: "" });
                  setShowAddAddr(false);
                  showToast("Address saved ✓");
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg,#d4af37,#f0d060)",
                  color: DARK,
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setShowAddAddr(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  border: "1.5px solid #e0e0e0",
                  background: "#fff",
                  color: "#666",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddAddr(true)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 16,
              border: `2px dashed ${GOLD}`,
              background: "rgba(212,175,55,0.04)",
              color: GOLD,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            + Add New Address
          </button>
        )}
      </div>
    );
  }

  function ProfilePage() {
    if (profileSub === "edit") return <EditProfilePage />;
    if (profileSub === "orders") return <OrdersPage />;
    if (profileSub === "notifs") return <NotifsPage />;
    if (profileSub === "payment") return <PaymentPage />;
    if (profileSub === "addrs") return <AddrsPage />;
    const name = profileForm.name || currentUser?.name || "Member";
    return (
      <div>
        <div
          style={{
            background: "linear-gradient(135deg,#1a1a2e,#2d2d4e)",
            borderRadius: 24,
            padding: "28px 22px",
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#d4af37,#f0d060)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              fontSize: 24,
              fontWeight: 900,
              color: DARK,
            }}
          >
            {avatarText(name)}
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 3,
            }}
          >
            {name}
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
            {profileForm.email || currentUser?.email}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {[
            ["Orders", SAMPLE_ORDERS.length],
            ["Favourites", favs.length],
            ["Reviews", "8"],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "14px 8px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 900, color: DARK }}>
                {v}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#aaa",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
        {[
          {
            icon: "✏️",
            label: "Edit Profile",
            click: () => setProfileSub("edit"),
          },
          {
            icon: "📦",
            label: "Order History",
            click: () => setProfileSub("orders"),
          },
          {
            icon: "🔔",
            label: "Notifications",
            click: () => setProfileSub("notifs"),
            badge: unread,
          },
          {
            icon: "💳",
            label: "Payment Methods",
            click: () => setProfileSub("payment"),
          },
          {
            icon: "📍",
            label: "Saved Addresses",
            click: () => setProfileSub("addrs"),
          },
          {
            icon: "ℹ️",
            label: "About MOHAMED CO",
            click: () => {
              setProfileSub(null);
              setNav("about");
            },
          },
          {
            icon: "🚪",
            label: "Sign Out",
            click: () => {
              setScreen("login");
              setNav("home");
              setCart([]);
              setFavs([]);
              setProfileSub(null);
              setCurrentUser(null);
              setLEmail("");
              setLPass("");
            },
            danger: true,
          },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.click}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#fff",
              border: "none",
              borderRadius: 16,
              padding: "15px 18px",
              marginBottom: 9,
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span
              style={{
                flex: 1,
                fontWeight: 600,
                fontSize: 15,
                color: item.danger ? "#e74c3c" : DARK,
              }}
            >
              {item.label}
            </span>
            {item.badge > 0 && (
              <span
                style={{
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
                {item.badge}
              </span>
            )}
            <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
          </button>
        ))}
      </div>
    );
  }

  // ── RENDER ─────────────────────────────────────────────────────────────────
  const renderPage = () => {
    if (viewProd) return <DetailPage />;
    if (nav === "home") return <HomePage />;
    if (nav === "search") return <SearchPage />;
    if (nav === "cart") return <CartPage />;
    if (nav === "fav") return <FavPage />;
    if (nav === "about") return <AboutPage />;
    if (nav === "profile") return <ProfilePage />;
  };

  const navItems = [
    { id: "home", label: "Home", icon: <IcHome /> },
    { id: "search", label: "Search", icon: <IcSearch /> },
    { id: "cart", label: "Cart", icon: <IcCart n={cartCount} /> },
    { id: "fav", label: "Saved", icon: <IcHeart on={nav === "fav"} /> },
    { id: "about", label: "About", icon: <IcInfo /> },
    { id: "profile", label: "Profile", icon: <IcUser /> },
  ];
  const name = profileForm.name || currentUser?.name || "Guest";

  return (
    <div
      style={{
        fontFamily: "'Segoe UI',system-ui,sans-serif",
        background: "#f2f2f6",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          padding: "13px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              color: "#aaa",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Hello, Welcome 👋
          </div>
          <div style={{ fontWeight: 800, fontSize: 15, color: DARK }}>
            {name}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => {
              setNav("cart");
              setCartStep("list");
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: DARK,
            }}
          >
            <IcCart n={cartCount} />
          </button>
          <div
            onClick={() => {
              setProfileSub(null);
              setNav("profile");
            }}
            style={{
              width: 37,
              height: 37,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#d4af37,#f0d060)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 13,
              color: DARK,
              cursor: "pointer",
            }}
          >
            {avatarText(name)}
          </div>
        </div>
      </div>

      {/* Page */}
      <div
        style={{ padding: "20px 16px 100px", maxWidth: 900, margin: "0 auto" }}
      >
        {renderPage()}
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 86,
            left: "50%",
            transform: "translateX(-50%)",
            background: DARK,
            color: GOLD,
            padding: "11px 22px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 8px 28px rgba(0,0,0,0.22)",
            zIndex: 999,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {toast}
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
          borderTop: "1px solid #efefef",
          padding: "7px 0 10px",
          display: "flex",
          justifyContent: "space-around",
          zIndex: 100,
          boxShadow: "0 -4px 22px rgba(0,0,0,0.08)",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setViewProd(null);
              setProfileSub(null);
              setNav(item.id);
              if (item.id === "cart") setCartStep("list");
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: nav === item.id ? DARK : "#c0c0c0",
              padding: "4px 6px",
              transition: "all .2s",
              position: "relative",
            }}
          >
            <div
              style={{
                transform: nav === item.id ? "scale(1.18)" : "scale(1)",
                transition: "transform .2s",
              }}
            >
              {item.icon}
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: nav === item.id ? 800 : 500,
                letterSpacing: 0.4,
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
                  background: GOLD,
                }}
              />
            )}
            {item.id === "profile" && unread > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 2,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#c0392b",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
