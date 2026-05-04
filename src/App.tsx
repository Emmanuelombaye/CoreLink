import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Zap, 
  Activity,
  FileText,
  Coins,
  Wallet,
  Menu,
  X,
  Bell,
  ArrowUpRight,
  ShieldCheck,
  Gift,
  Award,
  RefreshCcw,
  Shield,
  Download,
  Share2,
  GraduationCap,
  HeartHandshake,
  Component,
  Map,
  Crown,
  Network,
  Hexagon,
  Pickaxe,
  Bot,
  Smartphone,
  DownloadCloud,
  Share,
  Trophy,
  BarChart3,
  Fingerprint,
  Languages,
  Link2,
  Eye,
  QrCode
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "./lib/utils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

// --- Mock Data ---
const SIGNAL_FEED_POOL: { user: string; country: string; flag: string; action: string; amount: string; color: string }[] = [
  { user: "0x4A2...F91", country: "Nigeria", flag: "🇳🇬", action: "Joined X3 Level 3", amount: "+$50", color: "text-meta-emerald" },
  { user: "0xB81...C44", country: "UAE", flag: "🇦🇪", action: "Cycle Completed X4", amount: "+$500", color: "text-meta-gold" },
  { user: "0x9D3...A12", country: "USA", flag: "🇺🇸", action: "Upgraded to Level 5", amount: "+$200", color: "text-meta-violet" },
  { user: "0x1F7...B99", country: "Kenya", flag: "🇰🇪", action: "Spillover Received", amount: "+$25", color: "text-meta-emerald" },
  { user: "0xC22...D55", country: "India", flag: "🇮🇳", action: "Joined X4 Level 1", amount: "+$10", color: "text-meta-blue" },
  { user: "0x7E9...F03", country: "UK", flag: "🇬🇧", action: "NFT Royalty Paid", amount: "+$840", color: "text-meta-gold" },
  { user: "0x3A1...E77", country: "Germany", flag: "🇩🇪", action: "Auto-Pool Cycle", amount: "+$1,200", color: "text-meta-emerald" },
  { user: "0x6B4...C21", country: "Brazil", flag: "🇧🇷", action: "Joined X3 Level 7", amount: "+$640", color: "text-meta-violet" },
  { user: "0x8D2...A88", country: "South Africa", flag: "🇿🇦", action: "Direct Bonus", amount: "+$100", color: "text-meta-emerald" },
  { user: "0x5C9...B14", country: "Canada", flag: "🇨🇦", action: "Upgraded to Level 9", amount: "+$2,560", color: "text-meta-gold" },
];

const REVENUE_DATA: Record<string, { name: string; value: number; growth: number }[]> = {
  "2024": [
    { name: "Jan", value: 4200, growth: 1200 },
    { name: "Feb", value: 5100, growth: 1500 },
    { name: "Mar", value: 4800, growth: 1400 },
    { name: "Apr", value: 6200, growth: 1900 },
    { name: "May", value: 5800, growth: 1700 },
    { name: "Jun", value: 7500, growth: 2200 },
    { name: "Jul", value: 8900, growth: 2600 },
    { name: "Aug", value: 9400, growth: 2800 },
    { name: "Sep", value: 10200, growth: 3100 },
    { name: "Oct", value: 11800, growth: 3500 },
    { name: "Nov", value: 13400, growth: 4000 },
    { name: "Dec", value: 15900, growth: 4800 },
  ],
  "2023": [
    { name: "Jan", value: 1800, growth: 500 },
    { name: "Feb", value: 2100, growth: 620 },
    { name: "Mar", value: 1950, growth: 580 },
    { name: "Apr", value: 2600, growth: 780 },
    { name: "May", value: 2400, growth: 710 },
    { name: "Jun", value: 3100, growth: 920 },
    { name: "Jul", value: 3700, growth: 1100 },
    { name: "Aug", value: 3900, growth: 1150 },
    { name: "Sep", value: 4200, growth: 1250 },
    { name: "Oct", value: 4800, growth: 1420 },
    { name: "Nov", value: 5400, growth: 1600 },
    { name: "Dec", value: 6100, growth: 1850 },
  ],
};

const TICKER_DATA = [
  { pair: "CORE/USD", price: "124.21", change: "+12.4%", trend: "up",   vol: "$4.2M" },
  { pair: "LNK/ETH",  price: "0.842",  change: "-2.1%",  trend: "down", vol: "$1.8M" },
  { pair: "NET/SOL",  price: "42.10",  change: "+5.7%",  trend: "up",   vol: "$920K" },
  { pair: "VAULT/BTC",price: "0.00042",change: "+8.9%",  trend: "up",   vol: "$3.1M" },
  { pair: "MPS/USDT", price: "2.841",  change: "+18.2%", trend: "up",   vol: "$6.7M" },
  { pair: "CUSD/USD", price: "1.001",  change: "+0.1%",  trend: "up",   vol: "$2.4M" },
  { pair: "ELITE/BNB",price: "0.0184", change: "-1.3%",  trend: "down", vol: "$540K" },
  { pair: "XPOOL/ETH",price: "0.291",  change: "+7.6%",  trend: "up",   vol: "$1.1M" },
];

// --- Subcomponents ---

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

function TiltCard({ children, className, glowColor = "rgba(134, 255, 0, 0.15)" }: { children: React.ReactNode, className?: string, glowColor?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 300 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 300 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    e.currentTarget.style.setProperty("--mouse-x", `${mouseX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${mouseY}px`);
    e.currentTarget.style.setProperty("--glow-color", glowColor);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("glass-card relative border border-white/[0.06] hover:border-white/[0.15] transition-colors duration-500", className)}
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

function MarqueeTicker() {
  return (
    <div className="h-10 border-b border-white/5 bg-black/80 backdrop-blur-md overflow-hidden flex items-center z-50">
      <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap gap-16 px-12">
        {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{item.pair}</span>
             <span className="text-xs font-bold text-white tabular-nums">${item.price}</span>
             <span className={cn("text-[10px] font-black", item.trend === 'up' ? "text-meta-emerald" : "text-red-500")}>{item.change}</span>
             <span className="text-[10px] font-bold text-slate-700">VOL {item.vol}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Leaderboard View ---
const LEADERBOARD_DATA = [
  { rank: 1,  name: "Alexander M.",  wallet: "0xA1B...F92", flag: "🇦🇪", country: "UAE",          level: "Trillionaire", earned: 284500, cycles: 142, referrals: 312, change: 12400,  up: true  },
  { rank: 2,  name: "Priya S.",      wallet: "0xC3D...E11", flag: "🇮🇳", country: "India",        level: "Billionaire",  earned: 198200, cycles: 98,  referrals: 241, change: 8900,   up: true  },
  { rank: 3,  name: "Emmanuel O.",   wallet: "0x9F2...B44", flag: "🇳🇬", country: "Nigeria",      level: "Trillionaire", earned: 175800, cycles: 87,  referrals: 198, change: 6200,   up: true  },
  { rank: 4,  name: "James K.",      wallet: "0x7E1...A33", flag: "🇺🇸", country: "USA",          level: "Billionaire",  earned: 142100, cycles: 71,  referrals: 176, change: -1200,  up: false },
  { rank: 5,  name: "Fatima A.",     wallet: "0x2D9...C88", flag: "🇸🇦", country: "Saudi Arabia", level: "Millionaire",  earned: 98400,  cycles: 54,  referrals: 134, change: 4100,   up: true  },
  { rank: 6,  name: "Chen W.",       wallet: "0x5B3...D77", flag: "🇨🇳", country: "China",        level: "Billionaire",  earned: 87600,  cycles: 48,  referrals: 119, change: 3800,   up: true  },
  { rank: 7,  name: "Sofia R.",      wallet: "0x8A4...E55", flag: "🇧🇷", country: "Brazil",       level: "Millionaire",  earned: 74200,  cycles: 39,  referrals: 98,  change: 2900,   up: true  },
  { rank: 8,  name: "David N.",      wallet: "0x1C6...F22", flag: "🇰🇪", country: "Kenya",        level: "Millionaire",  earned: 61800,  cycles: 33,  referrals: 87,  change: -800,   up: false },
  { rank: 9,  name: "Anna P.",       wallet: "0x4F7...A99", flag: "🇩🇪", country: "Germany",      level: "Millionaire",  earned: 54300,  cycles: 28,  referrals: 74,  change: 1700,   up: true  },
  { rank: 10, name: "Marcus T.",     wallet: "0x6E8...B66", flag: "🇬🇧", country: "UK",           level: "Millionaire",  earned: 48900,  cycles: 24,  referrals: 68,  change: 2100,   up: true  },
  { rank: 11, name: "Yuki H.",       wallet: "0x9F1...C33", flag: "🇯🇵", country: "Japan",        level: "Millionaire",  earned: 43200,  cycles: 21,  referrals: 59,  change: 1400,   up: true  },
  { rank: 12, name: "Amara D.",      wallet: "0x3B2...A11", flag: "🇬🇭", country: "Ghana",        level: "Millionaire",  earned: 38700,  cycles: 19,  referrals: 52,  change: -600,   up: false },
  { rank: 13, name: "Carlos M.",     wallet: "0x7C4...B88", flag: "🇲🇽", country: "Mexico",       level: "Activator",   earned: 31400,  cycles: 15,  referrals: 44,  change: 900,    up: true  },
  { rank: 14, name: "Olga V.",       wallet: "0x2E5...D44", flag: "🇺🇦", country: "Ukraine",      level: "Activator",   earned: 27800,  cycles: 13,  referrals: 38,  change: 1100,   up: true  },
  { rank: 15, name: "Kwame A.",      wallet: "0x8D3...F99", flag: "🇳🇬", country: "Nigeria",      level: "Activator",   earned: 24100,  cycles: 11,  referrals: 33,  change: -400,   up: false },
  { rank: 16, name: "Lena K.",       wallet: "0x1A9...C77", flag: "🇸🇪", country: "Sweden",       level: "Activator",   earned: 21600,  cycles: 10,  referrals: 29,  change: 700,    up: true  },
  { rank: 17, name: "Raj P.",        wallet: "0x6F2...E22", flag: "🇮🇳", country: "India",        level: "Activator",   earned: 18900,  cycles: 9,   referrals: 25,  change: 500,    up: true  },
  { rank: 18, name: "Mei L.",        wallet: "0x4C8...A55", flag: "🇸🇬", country: "Singapore",   level: "Activator",   earned: 16200,  cycles: 8,   referrals: 22,  change: -300,   up: false },
  { rank: 19, name: "Ibrahim S.",    wallet: "0x5D1...B33", flag: "🇹🇳", country: "Tanzania",     level: "Activator",   earned: 13800,  cycles: 7,   referrals: 18,  change: 400,    up: true  },
  { rank: 20, name: "Elena B.",      wallet: "0x9E7...C66", flag: "🇷🇴", country: "Romania",      level: "Activator",   earned: 11400,  cycles: 5,   referrals: 15,  change: 200,    up: true  },
];

const REGION_STATS = [
  { region: "Africa",        flag: "🇺🇳", members: 4821, volume: "$2.4M",  color: "text-meta-emerald", bar: 82 },
  { region: "Middle East",   flag: "🌍",    members: 3214, volume: "$3.1M",  color: "text-meta-gold",   bar: 94 },
  { region: "Asia",          flag: "🌏",    members: 5902, volume: "$4.8M",  color: "text-meta-violet", bar: 100 },
  { region: "Europe",        flag: "🇪🇺", members: 2841, volume: "$1.9M",  color: "text-meta-blue",   bar: 64 },
  { region: "Americas",      flag: "🇺🇸", members: 3109, volume: "$2.2M",  color: "text-orange-400",  bar: 72 },
];

function LeaderboardView() {
  const [filter, setFilter] = useState<"all" | "Trillionaire" | "Billionaire" | "Millionaire" | "Activator">("all");
  const [sortBy, setSortBy] = useState<"earned" | "cycles" | "referrals">("earned");

  const filtered = LEADERBOARD_DATA
    .filter(r => filter === "all" || r.level === filter)
    .sort((a, b) => b[sortBy] - a[sortBy])
    .map((r, i) => ({ ...r, rank: i + 1 }));

  const levelColor = (level: string) =>
    level === "Trillionaire" ? "bg-meta-violet/10 text-meta-violet border-meta-violet/20" :
    level === "Billionaire"  ? "bg-meta-gold/10 text-meta-gold border-meta-gold/20" :
    level === "Millionaire"  ? "bg-meta-emerald/10 text-meta-emerald border-meta-emerald/20" :
                               "bg-white/5 text-slate-400 border-white/10";

  return (
    <motion.div key="leaderboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8 max-w-[1600px] mx-auto pb-20">

      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Global <span className="text-meta-gold">Leaderboard</span></h3>
          <p className="text-lg text-slate-500 font-bold">Top earners ranked across all matrix programs worldwide</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-meta-emerald/5 border border-meta-emerald/20">
          <span className="h-2 w-2 rounded-full bg-meta-emerald animate-pulse" />
          <span className="text-[10px] font-black text-meta-emerald uppercase tracking-widest">Live Rankings</span>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {[LEADERBOARD_DATA[1], LEADERBOARD_DATA[0], LEADERBOARD_DATA[2]].map((p, i) => {
          const podiumRank = i === 0 ? 2 : i === 1 ? 1 : 3;
          const heights = ["h-32", "h-40", "h-28"];
          const medals = ["🥈", "🥇", "🥉"];
          const glows = ["rgba(203,213,225,0.15)", "rgba(255,193,7,0.2)", "rgba(234,88,12,0.15)"];
          return (
            <TiltCard key={p.rank} glowColor={glows[i]} className="p-6 flex flex-col items-center text-center border-white/[0.08] relative overflow-hidden">
              {i === 1 && <div className="absolute inset-0 bg-gradient-to-b from-meta-gold/5 to-transparent pointer-events-none" />}
              <span className="text-3xl mb-2">{medals[i]}</span>
              <span className="text-4xl mb-3">{p.flag}</span>
              <p className="text-base font-black text-white mb-1">{p.name}</p>
              <p className="text-[10px] font-mono text-slate-600 mb-3">{p.wallet}</p>
              <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-4", levelColor(p.level))}>{p.level}</span>
              <div className={cn("w-full rounded-t-2xl flex items-end justify-center pb-3", heights[i], i === 1 ? "bg-meta-gold/10 border border-meta-gold/20" : "bg-white/[0.03] border border-white/[0.06]")}>
                <p className="text-2xl font-black text-white">${(p.earned / 1000).toFixed(1)}k</p>
              </div>
              <p className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-widest">{p.country} · #{podiumRank}</p>
            </TiltCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Table */}
        <div className="xl:col-span-3 space-y-4">

          {/* Filters + Sort */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {(["all", "Trillionaire", "Billionaire", "Millionaire", "Activator"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={cn("h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-none border",
                    filter === f ? "bg-meta-gold text-black border-meta-gold" : "bg-white/[0.03] text-slate-500 border-white/[0.06] hover:text-white hover:border-white/20")}>
                  {f === "all" ? "All Levels" : f}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(["earned", "cycles", "referrals"] as const).map(s => (
                <button key={s} onClick={() => setSortBy(s)}
                  className={cn("h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-none border",
                    sortBy === s ? "bg-white/10 text-white border-white/20" : "bg-white/[0.03] text-slate-600 border-white/[0.06] hover:text-white")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <TiltCard className="p-0 overflow-hidden border-white/[0.08]">
            <div className="grid grid-cols-12 px-6 py-3 border-b border-white/[0.05] text-[10px] font-black uppercase tracking-widest text-slate-600">
              <span className="col-span-1">#</span>
              <span className="col-span-3">Member</span>
              <span className="col-span-2">Country</span>
              <span className="col-span-2">Level</span>
              <span className="col-span-2 text-right">Earned</span>
              <span className="col-span-1 text-right">Cycles</span>
              <span className="col-span-1 text-right">+/-</span>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {filtered.map((row, i) => (
                <motion.div key={row.wallet} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-12 px-6 py-4 hover:bg-white/[0.03] transition-colors items-center group cursor-none">
                  <div className="col-span-1">
                    {row.rank <= 3
                      ? <span className="text-base">{row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : "🥉"}</span>
                      : <span className="text-sm font-black text-slate-600">{row.rank}</span>}
                  </div>
                  <div className="col-span-3 flex items-center gap-2 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-meta-emerald/20 to-meta-violet/20 border border-white/10 flex items-center justify-center text-xs font-black text-white shrink-0">
                      {row.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-white group-hover:text-meta-emerald transition-colors truncate">{row.name}</p>
                      <p className="text-[9px] font-mono text-slate-600 truncate">{row.wallet}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5">
                    <span className="text-sm">{row.flag}</span>
                    <span className="text-[11px] font-bold text-slate-400 truncate">{row.country}</span>
                  </div>
                  <div className="col-span-2">
                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border", levelColor(row.level))}>
                      {row.level}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-sm font-black text-white tabular-nums">${row.earned.toLocaleString()}</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="text-xs font-black text-slate-400 tabular-nums">{row.cycles}</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className={cn("text-[11px] font-black tabular-nums", row.up ? "text-meta-emerald" : "text-red-400")}>
                      {row.up ? "+" : ""}{row.change < 0 ? "-" : ""}${Math.abs(row.change).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TiltCard>
        </div>

        {/* Right: Region Stats */}
        <div className="space-y-4">
          <TiltCard className="p-6 border-white/[0.08]">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Top Regions</h4>
            <div className="space-y-5">
              {REGION_STATS.map((r, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{r.flag}</span>
                      <span className="text-xs font-black text-white">{r.region}</span>
                    </div>
                    <span className={cn("text-xs font-black", r.color)}>{r.volume}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${r.bar}%` }} transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", r.color.replace("text-", "bg-"))} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-600">{r.members.toLocaleString()} members</p>
                </div>
              ))}
            </div>
          </TiltCard>

          <TiltCard className="p-6 border-white/[0.08]">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">Your Rank</h4>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-meta-emerald/5 border border-meta-emerald/20">
              <span className="text-3xl">🇳🇬</span>
              <div>
                <p className="text-lg font-black text-white">Emmanuel O.</p>
                <p className="text-[10px] font-black text-meta-emerald uppercase tracking-widest">Rank #3 Globally</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { label: "Total Earned", value: "$175,800" },
                { label: "Total Cycles",  value: "87" },
                { label: "Referrals",     value: "198" },
              ].map((s, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-white/[0.04]">
                  <span className="text-xs font-bold text-slate-500">{s.label}</span>
                  <span className="text-xs font-black text-white">{s.value}</span>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </motion.div>
  );
}

// --- Network View ---
const TREE_DATA = {
  id: "root", name: "You", wallet: "0x84291A", flag: "👤", country: "Nigeria", level: "Trillionaire", volume: "$84,250", active: true,
  children: [
    {
      id: "n1", name: "Alexander M.", wallet: "0xA1B...F92", flag: "🇦🇪", country: "UAE", level: "Billionaire", volume: "$42,100", active: true,
      children: [
        { id: "n1a", name: "Priya S.", wallet: "0xC3D...E11", flag: "🇮🇳", country: "India", level: "Millionaire", volume: "$12,400", active: true, children: [] },
        { id: "n1b", name: "Chen W.", wallet: "0x5B3...D77", flag: "🇨🇳", country: "China", level: "Millionaire", volume: "$9,800", active: true, children: [] },
        { id: "n1c", name: "Sofia R.", wallet: "0x8A4...E55", flag: "🇧🇷", country: "Brazil", level: "Activator", volume: "$1,200", active: false, children: [] },
      ],
    },
    {
      id: "n2", name: "James K.", wallet: "0x7E1...A33", flag: "🇺🇸", country: "USA", level: "Billionaire", volume: "$38,600", active: true,
      children: [
        { id: "n2a", name: "Fatima A.", wallet: "0x2D9...C88", flag: "🇸🇦", country: "Saudi Arabia", level: "Millionaire", volume: "$11,200", active: true, children: [] },
        { id: "n2b", name: "David N.", wallet: "0x1C6...F22", flag: "🇰🇪", country: "Kenya", level: "Activator", volume: "$2,100", active: true, children: [] },
      ],
    },
    {
      id: "n3", name: "Anna P.", wallet: "0x4F7...A99", flag: "🇩🇪", country: "Germany", level: "Millionaire", volume: "$21,800", active: true,
      children: [
        { id: "n3a", name: "Marcus T.", wallet: "0x6E8...B66", flag: "🇬🇧", country: "UK", level: "Activator", volume: "$3,400", active: true, children: [] },
        { id: "n3b", name: "Yuki H.", wallet: "0x9F1...C33", flag: "🇯🇵", country: "Japan", level: "Activator", volume: "$1,800", active: false, children: [] },
      ],
    },
  ],
};

type TreeNode = typeof TREE_DATA;

function NodeCard({ node, isRoot = false, onClick, selected }: { node: TreeNode; isRoot?: boolean; onClick: (n: TreeNode) => void; selected: string | null }) {
  const isSelected = selected === node.id;
  const levelColor = node.level === "Trillionaire" ? "text-meta-violet border-meta-violet/40" : node.level === "Billionaire" ? "text-meta-gold border-meta-gold/40" : node.level === "Millionaire" ? "text-meta-emerald border-meta-emerald/40" : "text-slate-400 border-white/10";
  const glowColor = node.level === "Trillionaire" ? "rgba(139,92,246,0.3)" : node.level === "Billionaire" ? "rgba(255,193,7,0.3)" : "rgba(134,255,0,0.2)";

  return (
    <button onClick={() => onClick(node)}
      className={cn(
        "flex flex-col items-center gap-2 cursor-none group transition-all duration-300",
        isRoot ? "scale-110" : ""
      )}>
      <div className={cn(
        "relative rounded-2xl border-2 p-3 transition-all duration-300 flex flex-col items-center gap-1",
        isRoot ? "w-28" : "w-24",
        isSelected ? "bg-white/10 scale-105" : "bg-white/[0.03] hover:bg-white/[0.06]",
        levelColor
      )}
        style={isSelected ? { boxShadow: `0 0 20px ${glowColor}` } : {}}
      >
        {node.active && <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-meta-emerald border-2 border-black shadow-[0_0_8px_rgba(134,255,0,0.8)]" />}
        <span className="text-2xl">{node.flag}</span>
        <p className="text-[10px] font-black text-white truncate w-full text-center">{node.name.split(" ")[0]}</p>
        <p className="text-[9px] font-bold text-slate-500 truncate w-full text-center">{node.wallet}</p>
        <div className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mt-1", levelColor)}>
          {node.level}
        </div>
      </div>
    </button>
  );
}

// @ts-ignore
function TreeLevel({ nodes, onClick, selected }: { nodes: TreeNode[]; onClick: (n: TreeNode) => void; selected: string | null }) {
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {nodes.map(node => (
        <div key={node.id} className="flex flex-col items-center gap-4">
          <NodeCard node={node} onClick={onClick} selected={selected} />
          {node.children.length > 0 && (
            <>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex gap-4 relative">
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-white/10" />
                {node.children.map(child => (
                  <div key={child.id} className="flex flex-col items-center gap-4">
                    <div className="w-px h-4 bg-white/10" />
                    <NodeCard node={child} onClick={onClick} selected={selected} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function NetworkView() {
  const [selected, setSelected] = useState<TreeNode | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allNodes = [TREE_DATA, ...TREE_DATA.children, ...TREE_DATA.children.flatMap(c => c.children)];
  const totalVolume = TREE_DATA.children.reduce((s, c) => s + parseFloat(c.volume.replace(/[$,]/g, "")), 0);

  return (
    <motion.div key="network" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8 max-w-[1600px] mx-auto pb-20">

      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Network <span className="text-meta-violet">Tree</span></h3>
          <p className="text-lg text-slate-500 font-bold">Visual genealogy of your downline partners</p>
        </div>
        <div className="flex gap-3">
          {[
            { label: "Direct Partners", value: TREE_DATA.children.length, color: "text-meta-emerald" },
            { label: "Total Downline", value: allNodes.length - 1, color: "text-meta-violet" },
            { label: "Team Volume", value: `$${totalVolume.toLocaleString()}`, color: "text-meta-gold" },
          ].map((s, i) => (
            <div key={i} className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
              <p className={cn("text-xl font-black", s.color)}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Tree Canvas */}
        <TiltCard className="lg:col-span-2 p-8 border-white/[0.08] overflow-x-auto">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-black text-white">Genealogy Tree</h4>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              {[
                { label: "Trillionaire", color: "bg-meta-violet" },
                { label: "Billionaire", color: "bg-meta-gold" },
                { label: "Millionaire", color: "bg-meta-emerald" },
                { label: "Activator", color: "bg-slate-500" },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={cn("h-2 w-2 rounded-full", l.color)} />
                  <span className="text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 min-w-[600px]">
            {/* Root */}
            <NodeCard node={TREE_DATA} isRoot onClick={(n) => setSelected(n)} selected={selected?.id ?? null} />
            <div className="w-px h-6 bg-white/10" />
            {/* Level 1 connector */}
            <div className="relative w-full flex justify-center">
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-white/10" />
            </div>
            {/* Level 1 */}
            <div className="flex justify-center gap-16 w-full">
              {TREE_DATA.children.map(child => (
                <div key={child.id} className="flex flex-col items-center gap-4">
                  <div className="w-px h-4 bg-white/10" />
                  <NodeCard node={child} onClick={(n) => setSelected(n)} selected={selected?.id ?? null} />
                  {child.children.length > 0 && (
                    <>
                      <div className="w-px h-4 bg-white/10" />
                      <div className="relative">
                        <div className="absolute top-0 left-[15%] right-[15%] h-px bg-white/10" />
                        <div className="flex gap-4 pt-0">
                          {child.children.map(grandchild => (
                            <div key={grandchild.id} className="flex flex-col items-center gap-2">
                              <div className="w-px h-4 bg-white/10" />
                              <NodeCard node={grandchild} onClick={(n) => setSelected(n)} selected={selected?.id ?? null} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Right Panel */}
        <div className="flex flex-col gap-6">

          {/* Node Detail */}
          <TiltCard className="p-6 border-white/[0.08] flex-1">
            {selected ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-white/[0.06]">
                  <span className="text-4xl">{selected.flag}</span>
                  <div>
                    <p className="text-lg font-black text-white">{selected.name}</p>
                    <p className="text-[11px] font-mono text-slate-500">{selected.wallet}</p>
                  </div>
                  {selected.active && <span className="ml-auto text-[9px] font-black text-meta-emerald bg-meta-emerald/10 border border-meta-emerald/20 px-2 py-1 rounded-lg uppercase tracking-widest">Active</span>}
                </div>
                {[
                  { label: "Country", value: `${selected.flag} ${selected.country}` },
                  { label: "Matrix Level", value: selected.level },
                  { label: "Team Volume", value: selected.volume },
                  { label: "Direct Partners", value: selected.children.length.toString() },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-xs font-bold text-slate-500">{row.label}</span>
                    <span className="text-xs font-black text-white">{row.value}</span>
                  </div>
                ))}
                <button className="w-full h-10 mt-2 bg-meta-violet/10 border border-meta-violet/30 text-meta-violet font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-meta-violet hover:text-white transition-colors cursor-none flex items-center justify-center gap-2">
                  <Eye className="h-3.5 w-3.5" /> View Full Profile
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center gap-4">
                <Network className="h-12 w-12 text-slate-700" />
                <p className="text-sm font-bold text-slate-600">Click any node to view partner details</p>
              </div>
            )}
          </TiltCard>

          {/* Referral Link */}
          <TiltCard className="p-6 border-white/[0.08]">
            <h4 className="text-sm font-black text-white mb-4">Your Referral Link</h4>
            <div className="flex items-center gap-2 bg-black/50 rounded-xl p-3 border border-white/10 mb-4">
              <span className="text-[11px] text-slate-400 truncate flex-1 font-mono">corelink.elite/ref=84291A</span>
              <button onClick={handleCopy} className="shrink-0 cursor-none">
                {copied
                  ? <span className="text-[10px] font-black text-meta-emerald">Copied!</span>
                  : <Link2 className="h-4 w-4 text-meta-emerald" />}
              </button>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 h-10 bg-meta-violet/10 border border-meta-violet/30 text-meta-violet font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-meta-violet hover:text-white transition-colors cursor-none flex items-center justify-center gap-1.5">
                <Share className="h-3.5 w-3.5" /> Share
              </button>
              <button className="flex-1 h-10 bg-white/5 border border-white/10 text-slate-300 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors cursor-none flex items-center justify-center gap-1.5">
                <QrCode className="h-3.5 w-3.5" /> QR Code
              </button>
            </div>
          </TiltCard>
        </div>
      </div>
    </motion.div>
  );
}

// --- Programs Data ---
const X3_LEVELS = [
  { level: 1, cost: 10,    reward: 20,    cycles: 142, partners: 2, active: true  },
  { level: 2, cost: 20,    reward: 40,    cycles: 98,  partners: 2, active: true  },
  { level: 3, cost: 40,    reward: 80,    cycles: 74,  partners: 1, active: true  },
  { level: 4, cost: 80,    reward: 160,   cycles: 51,  partners: 0, active: false },
  { level: 5, cost: 160,   reward: 320,   cycles: 33,  partners: 0, active: false },
  { level: 6, cost: 320,   reward: 640,   cycles: 18,  partners: 0, active: false },
  { level: 7, cost: 640,   reward: 1280,  cycles: 9,   partners: 0, active: false },
  { level: 8, cost: 1280,  reward: 2560,  cycles: 4,   partners: 0, active: false },
  { level: 9, cost: 2560,  reward: 5120,  cycles: 2,   partners: 0, active: false },
  { level: 10, cost: 5120, reward: 10240, cycles: 1,   partners: 0, active: false },
  { level: 11, cost: 10240,reward: 20480, cycles: 0,   partners: 0, active: false },
  { level: 12, cost: 20480,reward: 40960, cycles: 0,   partners: 0, active: false },
];

const X4_LEVELS = [
  { level: 1, cost: 10,    reward: 20,    cycles: 88,  partners: 4, active: true  },
  { level: 2, cost: 20,    reward: 40,    cycles: 61,  partners: 3, active: true  },
  { level: 3, cost: 40,    reward: 80,    cycles: 44,  partners: 2, active: true  },
  { level: 4, cost: 80,    reward: 160,   cycles: 29,  partners: 1, active: false },
  { level: 5, cost: 160,   reward: 320,   cycles: 14,  partners: 0, active: false },
  { level: 6, cost: 320,   reward: 640,   cycles: 7,   partners: 0, active: false },
  { level: 7, cost: 640,   reward: 1280,  cycles: 3,   partners: 0, active: false },
  { level: 8, cost: 1280,  reward: 2560,  cycles: 1,   partners: 0, active: false },
  { level: 9, cost: 2560,  reward: 5120,  cycles: 0,   partners: 0, active: false },
  { level: 10, cost: 5120, reward: 10240, cycles: 0,   partners: 0, active: false },
  { level: 11, cost: 10240,reward: 20480, cycles: 0,   partners: 0, active: false },
  { level: 12, cost: 20480,reward: 40960, cycles: 0,   partners: 0, active: false },
];

function MatrixSlot({ filled, isCenter }: { filled: boolean; isCenter?: boolean }) {
  return (
    <div className={cn(
      "rounded-full border-2 transition-all duration-300",
      isCenter ? "h-8 w-8" : "h-5 w-5",
      filled
        ? "bg-meta-emerald border-meta-emerald shadow-[0_0_10px_rgba(134,255,0,0.6)]"
        : "bg-transparent border-white/20"
    )} />
  );
}

function X3SlotDiagram({ partners }: { partners: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <MatrixSlot filled isCenter />
      <div className="flex gap-3">
        <MatrixSlot filled={partners >= 1} />
        <MatrixSlot filled={partners >= 2} />
      </div>
    </div>
  );
}

function X4SlotDiagram({ partners }: { partners: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <MatrixSlot filled isCenter />
      <div className="flex gap-2">
        <MatrixSlot filled={partners >= 1} />
        <MatrixSlot filled={partners >= 2} />
      </div>
      <div className="flex gap-2">
        <MatrixSlot filled={partners >= 3} />
        <MatrixSlot filled={partners >= 4} />
        <MatrixSlot filled={partners >= 5} />
        <MatrixSlot filled={partners >= 6} />
      </div>
    </div>
  );
}

function ProgramsView() {
  const [activeProgram, setActiveProgram] = useState<"x3" | "x4">("x3");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const levels = activeProgram === "x3" ? X3_LEVELS : X4_LEVELS;
  const selected = selectedLevel !== null ? levels[selectedLevel] : null;

  const totalEarned = levels.filter(l => l.active).reduce((s, l) => s + l.cycles * l.reward, 0);
  const activeLevels = levels.filter(l => l.active).length;

  return (
    <motion.div key="programs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8 max-w-[1600px] mx-auto pb-20">

      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Matrix <span className="text-meta-emerald">Programs</span></h3>
          <p className="text-lg text-slate-500 font-bold">X3 & X4 smart contract slots — levels 1 to 12</p>
        </div>
        <div className="flex gap-3">
          <div className="px-5 py-3 rounded-2xl bg-meta-emerald/5 border border-meta-emerald/20 text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Levels</p>
            <p className="text-2xl font-black text-meta-emerald">{activeLevels}/12</p>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-meta-gold/5 border border-meta-gold/20 text-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Earned</p>
            <p className="text-2xl font-black text-meta-gold">${totalEarned.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Program Tabs */}
      <div className="flex gap-3">
        {(["x3", "x4"] as const).map(p => (
          <button key={p} onClick={() => { setActiveProgram(p); setSelectedLevel(null); }}
            className={cn("h-12 px-8 font-black text-sm uppercase tracking-widest transition-all clip-button cursor-none",
              activeProgram === p
                ? "bg-meta-emerald text-black shadow-[0_0_20px_rgba(134,255,0,0.3)]"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10")}>
            {p === "x3" ? "Power Matrix X3" : "X-Power Matrix X4"}
          </button>
        ))}
      </div>

      {/* Matrix description */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-6 flex-wrap">
        <Hexagon className="h-8 w-8 text-meta-emerald shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white mb-0.5">
            {activeProgram === "x3"
              ? "X3 — Power Matrix: 2 direct partners per slot. Cycles when both positions fill, sending reward up the chain."
              : "X4 — X-Power Matrix: 2 direct + 4 second-level partners. Cycles when all 6 positions fill for maximum spillover."}
          </p>
          <p className="text-[11px] text-slate-500 font-bold">Each level doubles in cost and reward. Activate sequentially to unlock higher earnings.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-meta-emerald animate-pulse" />
          <span className="text-[10px] font-black text-meta-emerald uppercase tracking-widest">BSC Verified</span>
        </div>
      </div>

      {/* Level Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {levels.map((lvl, i) => (
          <motion.div key={lvl.level} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
            <button
              onClick={() => setSelectedLevel(selectedLevel === i ? null : i)}
              className={cn(
                "w-full p-5 rounded-3xl border transition-all duration-300 cursor-none flex flex-col gap-3 relative overflow-hidden group",
                lvl.active
                  ? selectedLevel === i
                    ? "bg-meta-emerald/10 border-meta-emerald shadow-[0_0_30px_rgba(134,255,0,0.2)]"
                    : "bg-meta-emerald/[0.04] border-meta-emerald/40 hover:border-meta-emerald hover:bg-meta-emerald/10"
                  : selectedLevel === i
                    ? "bg-white/[0.06] border-white/20"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]"
              )}
            >
              {lvl.active && (
                <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-meta-emerald shadow-[0_0_8px_rgba(134,255,0,0.8)] animate-pulse" />
              )}
              <div className="flex items-center justify-between">
                <span className={cn("text-[10px] font-black uppercase tracking-widest", lvl.active ? "text-meta-emerald" : "text-slate-600")}>Lvl {lvl.level}</span>
                {lvl.active && <span className="text-[9px] font-black text-meta-emerald bg-meta-emerald/10 px-1.5 py-0.5 rounded-md">ACTIVE</span>}
              </div>

              {/* Slot diagram */}
              <div className="flex justify-center py-2">
                {activeProgram === "x3"
                  ? <X3SlotDiagram partners={lvl.partners} />
                  : <X4SlotDiagram partners={lvl.partners} />}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-600">Cost</span>
                  <span className="text-xs font-black text-white">${lvl.cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-600">Reward</span>
                  <span className="text-xs font-black text-meta-gold">${lvl.reward.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-600">Cycles</span>
                  <span className={cn("text-xs font-black", lvl.cycles > 0 ? "text-meta-emerald" : "text-slate-600")}>{lvl.cycles}</span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Level Detail Panel */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="glass-card p-8 border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: slot visual */}
              <div className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", selected.active ? "text-meta-emerald" : "text-slate-500")}>
                  {activeProgram.toUpperCase()} — Level {selected.level}
                </span>
                <div className="scale-150">
                  {activeProgram === "x3"
                    ? <X3SlotDiagram partners={selected.partners} />
                    : <X4SlotDiagram partners={selected.partners} />}
                </div>
                <p className="text-[11px] text-slate-500 font-bold text-center">
                  {activeProgram === "x3"
                    ? `${selected.partners}/2 partners filled`
                    : `${selected.partners}/6 partners filled`}
                </p>
              </div>

              {/* Middle: stats */}
              <div className="space-y-4">
                <h4 className="text-xl font-black text-white mb-4">
                  Level {selected.level} — <span className="text-meta-emerald">{selected.active ? "Active" : "Locked"}</span>
                </h4>
                {[
                  { label: "Activation Cost", value: `$${selected.cost.toLocaleString()}`, color: "text-white" },
                  { label: "Cycle Reward", value: `$${selected.reward.toLocaleString()}`, color: "text-meta-gold" },
                  { label: "Total Cycles", value: selected.cycles.toString(), color: "text-meta-emerald" },
                  { label: "Total Earned", value: `$${(selected.cycles * selected.reward).toLocaleString()}`, color: "text-meta-violet" },
                  { label: "ROI", value: selected.cost > 0 ? `${((selected.cycles * selected.reward / selected.cost) * 100).toFixed(0)}%` : "—", color: "text-meta-blue" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-white/[0.04]">
                    <span className="text-sm font-bold text-slate-500">{row.label}</span>
                    <span className={cn("text-sm font-black", row.color)}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Right: action */}
              <div className="flex flex-col justify-between gap-6">
                <div className="p-5 rounded-2xl bg-meta-emerald/5 border border-meta-emerald/20">
                  <p className="text-[10px] font-black text-meta-emerald uppercase tracking-widest mb-2">Spillover Info</p>
                  <p className="text-sm text-slate-300 font-medium">
                    {activeProgram === "x3"
                      ? "When your 2 direct slots fill, the cycle completes and reward is sent to your upline's same level."
                      : "When all 6 positions fill (2 direct + 4 second-level), cycle completes and 50% reinvests automatically."}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Smart Contract</p>
                  <p className="text-xs font-mono text-slate-400 break-all">0x4a2F...CoreLink_{activeProgram.toUpperCase()}_L{selected.level}</p>
                </div>
                {selected.active ? (
                  <button className="w-full h-14 bg-meta-emerald text-black font-black text-xs uppercase tracking-widest clip-button hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-none">
                    <RefreshCcw className="h-4 w-4" /> Reinvest Level {selected.level}
                  </button>
                ) : (
                  <button className="w-full h-14 bg-white text-black font-black text-xs uppercase tracking-widest clip-button hover:bg-meta-emerald transition-colors flex items-center justify-center gap-2 cursor-none">
                    <Zap className="h-4 w-4" /> Activate for ${selected.cost.toLocaleString()}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Stat Card with count-up ---
function StatCard({ stat, index }: { stat: { label: string; value: string; icon: React.ElementType; color: string; trend: string; glow: string; sub: string }; index: number }) {
  const raw = parseFloat(String(stat.value).replace(/[$k,%,]/g, ""));
  const counted = useCountUp(isNaN(raw) ? 0 : raw, 1200 + index * 200);
  const display = stat.value.includes("k") ? `$${counted.toFixed(2)}k`
    : stat.value.includes("%") ? `${counted}%`
    : stat.value.includes(",") ? counted.toLocaleString()
    : stat.value;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <TiltCard glowColor={stat.glow} className="p-8 group cursor-none overflow-hidden h-full">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className={cn("p-3 rounded-2xl bg-white/[0.04] transition-transform duration-500 group-hover:scale-110", stat.color)}>
            <stat.icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-black text-meta-emerald px-2 py-1 rounded-lg bg-meta-emerald/5 border border-meta-emerald/10">{stat.trend}</span>
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
          <p className="text-4xl font-black tabular-nums tracking-tighter">{display}</p>
          <p className="text-[11px] text-slate-600 font-bold mt-2">{stat.sub}</p>
        </div>
        <div className="absolute -bottom-8 -right-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000">
          <stat.icon className="h-32 w-32" />
        </div>
      </TiltCard>
    </motion.div>
  );
}

// --- Dashboard View ---
function DashboardView({ liveStats }: { liveStats: { referrals: number; revenue: number; conversion: number; systemLoad: number } }) {
  const [feed, setFeed] = useState(SIGNAL_FEED_POOL.slice(0, 6));
  const [cycleCount, setCycleCount] = useState({ x3: 1482, x4: 847, pool: 3291 });
  const [chartYear, setChartYear] = useState<"2023" | "2024">("2024");

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = SIGNAL_FEED_POOL[Math.floor(Math.random() * SIGNAL_FEED_POOL.length)];
      setFeed(prev => [newEvent, ...prev.slice(0, 7)]);
      setCycleCount(prev => ({
        x3: prev.x3 + (Math.random() > 0.7 ? 1 : 0),
        x4: prev.x4 + (Math.random() > 0.8 ? 1 : 0),
        pool: prev.pool + (Math.random() > 0.6 ? 1 : 0),
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const STATS = [
    { label: "Total Matrix Earnings", value: `$${(liveStats.revenue / 1000).toFixed(2)}k`, icon: DollarSign, color: "text-meta-gold", trend: "+12.4%", glow: "rgba(255,193,7,0.15)", sub: "All-time earnings" },
    { label: "Spillover Bonus", value: "$4,280", icon: Activity, color: "text-meta-emerald", trend: "Active", glow: "rgba(134,255,0,0.15)", sub: "This month" },
    { label: "Direct Referrals", value: liveStats.referrals.toLocaleString(), icon: Users, color: "text-meta-violet", trend: `+${Math.floor(liveStats.referrals * 0.065)}`, glow: "rgba(139,92,246,0.15)", sub: "Active partners" },
    { label: "Conversion Rate", value: `${liveStats.conversion}%`, icon: BarChart3, color: "text-meta-blue", trend: "Live", glow: "rgba(0,122,255,0.15)", sub: "Visitor → Member" },
  ];

  const MATRICES = [
    { name: "Power Matrix (X3)", fill: 85, color: "#86FF00", cycles: cycleCount.x3 },
    { name: "X-Power Matrix (X4)", fill: 72, color: "#8B5CF6", cycles: cycleCount.x4 },
    { name: "Global Auto-Pool", fill: 94, color: "#FFC107", cycles: cycleCount.pool },
  ];

  return (
    <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10 pb-20 max-w-[1600px] mx-auto">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </div>

      {/* Chart + Matrix Cycles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TiltCard className="lg:col-span-2 p-10 flex flex-col min-h-[480px] cursor-none overflow-hidden border-white/[0.08]">
          <div className="flex items-center justify-between mb-8 gap-6 flex-wrap relative z-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter mb-1">Matrix Growth <span className="text-meta-emerald">v4.2</span></h3>
              <p className="text-sm text-slate-500 font-bold">Multi-level attribution across global smart contracts</p>
            </div>
            <div className="flex gap-3 shrink-0">
              {(["2023", "2024"] as const).map(y => (
                <button key={y} onClick={() => setChartYear(y)}
                  className={cn("h-10 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-none transition-all",
                    chartYear === y ? "bg-meta-emerald text-black" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white")}>
                  {y}
                </button>
              ))}
              <button className="h-10 px-5 rounded-2xl bg-white/5 text-slate-300 text-[10px] font-black uppercase tracking-widest cursor-none hover:bg-white/10 transition-colors flex items-center gap-2">
                <DownloadCloud className="h-3.5 w-3.5" /> Export
              </button>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[300px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA[chartYear]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#86FF00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#86FF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff20" fontSize={11} tickLine={false} axisLine={false} dy={10} fontWeight="bold" />
                <YAxis stroke="#ffffff20" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} fontWeight="bold" />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #86FF0020', borderRadius: '20px', padding: '16px' }} itemStyle={{ color: '#86FF00', fontWeight: '900' }} />
                <Area type="monotone" dataKey="value" stroke="#86FF00" strokeWidth={4} fill="url(#colorValue)" animationDuration={3000} />
                <Area type="monotone" dataKey="growth" stroke="#FFC107" strokeWidth={2} strokeDasharray="6 6" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TiltCard>

        <TiltCard className="p-8 flex flex-col gap-6 cursor-none bg-gradient-to-br from-[#001A33]/30 to-black overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white tracking-tight">Global Matrix Cycles</h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-meta-emerald animate-pulse" />
              <span className="text-[10px] font-black text-meta-emerald uppercase tracking-widest">Live</span>
            </div>
          </div>
          <div className="space-y-6 flex-1">
            {MATRICES.map((matrix, i) => (
              <div key={i} className="space-y-3 group cursor-none">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: matrix.color, boxShadow: `0 0 10px ${matrix.color}` }} />
                    <span className="text-sm font-black text-slate-200">{matrix.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black tabular-nums" style={{ color: matrix.color }}>{matrix.cycles.toLocaleString()} cycles</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${matrix.fill}%` }} transition={{ duration: 2, delay: i * 0.15, ease: "easeOut" }} className="h-full rounded-full" style={{ backgroundColor: matrix.color, boxShadow: `0 0 8px ${matrix.color}50` }} />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-600">
                  <span>{matrix.fill}% filled</span>
                  <span>{100 - matrix.fill}% remaining</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-4 group hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-3">
              <Component className="h-5 w-5 text-meta-emerald shrink-0" />
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Smart Contract</p>
                <p className="text-sm font-black text-white">Verified on BSC (BEP20)</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-700 group-hover:text-meta-emerald transition-colors" />
          </div>
        </TiltCard>
      </div>

      {/* Live Signal Feed + AI Agent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Live Global Signal Feed */}
        <TiltCard className="lg:col-span-2 p-8 border-white/[0.08] clip-card flex flex-col overflow-hidden" glowColor="rgba(134,255,0,0.08)">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-meta-emerald animate-pulse" />
              <h3 className="text-lg font-black text-white tracking-tight">Live Global Signal Feed</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-meta-emerald/5 border border-meta-emerald/20">
              <Activity className="h-3 w-3 text-meta-emerald" />
              <span className="text-[10px] font-black text-meta-emerald uppercase tracking-widest">Real-time</span>
            </div>
          </div>
          <div className="space-y-2 overflow-hidden flex-1">
            <AnimatePresence initial={false}>
              {feed.map((event, i) => (
                <motion.div
                  key={`${event.user}-${i}-${event.action}`}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all group cursor-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{event.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-white font-mono">{event.user}</span>
                        <span className="text-[10px] text-slate-600 font-bold">{event.country}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-bold truncate">{event.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={cn("text-sm font-black tabular-nums", event.color)}>{event.amount}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-700 group-hover:text-meta-emerald transition-colors" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Showing live network events</span>
            <button className="text-[10px] font-black text-meta-emerald uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </TiltCard>

        {/* AI Growth Agent */}
        <TiltCard className="p-8 border-white/[0.08] clip-card flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-meta-emerald/5 to-transparent opacity-60 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-meta-emerald flex items-center gap-2">
              <Bot className="h-4 w-4" /> AI Growth Agent
            </h3>
            <div className="h-2 w-2 rounded-full bg-meta-emerald animate-pulse" />
          </div>
          <div className="relative z-10 space-y-4 flex-1">
            <div className="p-4 rounded-2xl bg-meta-emerald/5 border border-meta-emerald/20">
              <p className="text-[10px] font-black text-meta-emerald uppercase tracking-widest mb-1">Earnings Prediction</p>
              <p className="text-xl font-black text-white">+$1,450.00</p>
              <p className="text-[11px] text-slate-500 font-bold mt-0.5">Expected in next 72 hours</p>
            </div>
            <div className="p-4 rounded-2xl bg-meta-gold/5 border border-meta-gold/20">
              <p className="text-[10px] font-black text-meta-gold uppercase tracking-widest mb-1">Optimization Tip</p>
              <p className="text-sm text-slate-300 font-medium">Focus on <span className="font-black text-white">UAE Region</span>. X4 pools filling 42% faster this week.</p>
            </div>
            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">System Load</p>
              <div className="flex items-center gap-3">
                <p className="text-xl font-black text-white">{liveStats.systemLoad}%</p>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${liveStats.systemLoad}%` }} transition={{ duration: 0.8 }} className="h-full bg-red-400 rounded-full" />
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-meta-violet/5 border border-meta-violet/20">
              <p className="text-[10px] font-black text-meta-violet uppercase tracking-widest mb-1">Risk Detection</p>
              <p className="text-sm text-slate-300 font-medium">0 anomalies detected. Anti-bot active.</p>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Quick Actions Banner */}
      <div className="glass-card p-8 border-white/[0.06] flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Quick Actions</p>
          <h3 className="text-2xl font-black text-white tracking-tighter">Grow Your Network <span className="text-meta-emerald">Now</span></h3>
        </div>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-meta-emerald text-black font-black uppercase tracking-widest cursor-none h-12 px-8 text-xs hover:bg-white transition-colors clip-button flex items-center gap-2">
            <Zap className="h-4 w-4" /> Activate Elite
          </button>
          <button className="h-12 px-8 bg-white/5 border border-white/10 text-white font-black text-xs hover:bg-white/10 transition-all cursor-none flex items-center gap-2 clip-button">
            <Share2 className="h-4 w-4" /> Recruit Partners
          </button>
          <button className="h-12 px-8 bg-meta-gold/10 border border-meta-gold/30 text-meta-gold font-black text-xs hover:bg-meta-gold hover:text-black transition-all cursor-none flex items-center gap-2 clip-button">
            <RefreshCcw className="h-4 w-4" /> Force Cycle
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- AI Chat ---
const AI_RESPONSES: Record<string, string> = {
  default:    "I'm analyzing your network data. Your X4 Level 2 pool is 72% full — one more referral could trigger a cycle.",
  earn:       "Your projected earnings for the next 7 days are $1,450 based on current cycle velocity and team activity.",
  referral:   "Your top referral region is UAE. Focus outreach there — X4 pools are filling 42% faster than global average.",
  cycle:      "You have 3 levels close to cycling: X3 L3 (1 slot left), X4 L2 (2 slots left). Prioritize direct invites now.",
  mining:     "Your current hashrate is 42.8 GH/s. Boosting to 100 GH/s would increase daily MPS yield by ~120%.",
  security:   "All systems nominal. 0 anomalies detected in the last 24h. 2FA is active and your last login was verified.",
  withdraw:   "Your available balance is $4,280. Fastest withdrawal is via MetaMask BEP20 — typically confirms in under 2 minutes.",
  level:      "Activating X3 Level 4 ($80) would unlock a $160 cycle reward. Based on your team size, ROI is expected within 48h.",
};

function getAIResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("earn") || q.includes("money") || q.includes("income")) return AI_RESPONSES.earn;
  if (q.includes("referral") || q.includes("recruit") || q.includes("partner")) return AI_RESPONSES.referral;
  if (q.includes("cycle") || q.includes("slot") || q.includes("matrix")) return AI_RESPONSES.cycle;
  if (q.includes("mine") || q.includes("mps") || q.includes("hash")) return AI_RESPONSES.mining;
  if (q.includes("security") || q.includes("safe") || q.includes("hack")) return AI_RESPONSES.security;
  if (q.includes("withdraw") || q.includes("wallet") || q.includes("pay")) return AI_RESPONSES.withdraw;
  if (q.includes("level") || q.includes("activate") || q.includes("unlock")) return AI_RESPONSES.level;
  return AI_RESPONSES.default;
}

function AIChat() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello Emmanuel! Your matrix auto-pool is 94% full. I suggest following up with your latest direct referral to trigger the cycle." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "ai", text: getAIResponse(text) }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className={cn("p-3 rounded-2xl text-sm max-w-[88%]",
              m.from === "ai"
                ? "bg-white/[0.05] text-slate-300 rounded-tl-sm self-start"
                : "bg-meta-emerald/10 border border-meta-emerald/20 text-white rounded-tr-sm ml-auto text-right")}>
            {m.text}
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-1 px-3 py-2 bg-white/[0.05] rounded-2xl rounded-tl-sm w-16">
            {[0,1,2].map(i => <motion.div key={i} animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }} className="h-1.5 w-1.5 rounded-full bg-slate-500" />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="mt-4 relative">
        <input
          type="text" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about earnings, cycles, mining..."
          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-sm text-white placeholder:text-slate-600 outline-none focus:border-meta-emerald/50 transition-colors" />
        <button onClick={send} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-meta-emerald rounded-lg flex items-center justify-center text-black cursor-none hover:bg-white transition-colors">
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

// --- Mining View ---
function MiningStatCard({ stat, index }: { stat: { label: string; value: string; color: string }; index: number }) {
  const raw = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const counted = useCountUp(isNaN(raw) ? 0 : raw, 1000 + index * 150);
  const display = stat.label === "Blocks Mined" ? counted.toLocaleString()
    : stat.value;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
      <TiltCard className="p-6 text-center border-white/[0.08]">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
        <p className={cn("text-2xl font-black tabular-nums", stat.color)}>{display}</p>
      </TiltCard>
    </motion.div>
  );
}

function MiningView() {
  const [mined, setMined] = useState(8425.10);
  const [hashrate, setHashrate] = useState(42.8);
  const [countdown, setCountdown] = useState(765); // seconds
  const [blockCount, setBlockCount] = useState(1482);

  useEffect(() => {
    const mineInterval = setInterval(() => {
      setMined(prev => +(prev + 0.0042).toFixed(4));
      setHashrate(prev => +(prev + (Math.random() - 0.5) * 0.4).toFixed(1));
    }, 1200);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { setBlockCount(b => b + 1); return 765; }
        return prev - 1;
      });
    }, 1000);
    return () => { clearInterval(mineInterval); clearInterval(countdownInterval); };
  }, []);

  const mins = String(Math.floor(countdown / 60)).padStart(2, "0");
  const secs = String(countdown % 60).padStart(2, "0");

  const MINING_STATS = [
    { label: "Blocks Mined",    value: blockCount.toLocaleString(), color: "text-meta-gold" },
    { label: "Daily Yield",     value: "~8.64 MPS",                 color: "text-meta-emerald" },
    { label: "MPS Price",       value: "$2.841",                    color: "text-meta-violet" },
    { label: "Est. Daily USD",  value: "~$24.55",                   color: "text-meta-blue" },
  ];

  return (
    <motion.div key="mining" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10 max-w-[1600px] mx-auto pb-20">
      <div>
        <h3 className="text-5xl font-black text-white tracking-tighter mb-2">MPS Coin <span className="text-meta-gold">Mining</span></h3>
        <p className="text-xl text-slate-500 font-bold">Earn native MPS utility tokens through proof-of-network and smart contract participation.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {MINING_STATS.map((s, i) => (
          <MiningStatCard key={i} stat={s} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <TiltCard className="lg:col-span-1 p-10 border-white/[0.08] flex flex-col items-center text-center clip-card">
          <div className="h-32 w-32 rounded-full bg-meta-gold/10 flex items-center justify-center border-4 border-meta-gold mb-8 relative">
            <Pickaxe className="h-12 w-12 text-meta-gold" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-[-10px] border-t-2 border-r-2 border-meta-gold rounded-full" />
          </div>
          <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Current Hashrate</h4>
          <p className="text-4xl font-black text-white mb-2 tabular-nums">{hashrate.toFixed(1)} <span className="text-xl text-meta-gold">GH/s</span></p>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-8">Fluctuating live</p>
          <button className="w-full h-14 bg-meta-gold text-black font-black uppercase tracking-widest text-xs clip-button hover:bg-white transition-colors">Boost Mining Power</button>
        </TiltCard>

        <TiltCard className="lg:col-span-2 p-10 border-white/[0.08] clip-card flex flex-col justify-between">
          <div>
            <h4 className="text-2xl font-black text-white mb-2">Total MPS Mined</h4>
            <p className="text-sm font-bold text-slate-400">Tokens auto-transferred to your BEP20 wallet every block.</p>
          </div>
          <motion.p
            key={Math.floor(mined)}
            initial={{ opacity: 0.6, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl font-black text-meta-emerald tabular-nums drop-shadow-2xl my-10"
          >
            {mined.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} <span className="text-3xl text-white opacity-50">MPS</span>
          </motion.p>
          <div className="flex items-center justify-between border-t border-white/[0.05] pt-6">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <Activity className="h-4 w-4 text-meta-emerald" />
              Next block reward in
              <span className="text-meta-gold text-sm font-black tabular-nums">{mins}:{secs}</span>
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Block #{blockCount.toLocaleString()}</span>
          </div>
        </TiltCard>
      </div>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  const [activeView, setActiveView] = useState<"dashboard" | "programs" | "network" | "mining" | "assets" | "financials" | "security" | "academy" | "foundation" | "projects" | "roadmap" | "royalty" | "bi" | "leaderboard">("dashboard");
  const [region, setRegion] = useState("Global");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Payout Processed",    desc: "Your commission of $1,240.00 was successfully sent to your vault.",          time: "2m ago",  icon: Gift,        color: "text-meta-emerald", fresh: true  },
    { id: 2, title: "Security Upgrade",    desc: "L4 Security Protocol has been deployed to the Nairobi Node.",                time: "1h ago",  icon: ShieldCheck, color: "text-meta-gold",   fresh: false },
    { id: 3, title: "New Elite Partner",   desc: "Alexander M. has achieved Meta-Elite status in your network.",              time: "4h ago",  icon: Award,       color: "text-meta-violet", fresh: false },
    { id: 4, title: "Market Volatility",   desc: "High traffic detected in UAE region. System load at 84%.",                  time: "12h ago", icon: Activity,    color: "text-red-500",     fresh: false },
  ]);

  const LIVE_ALERT_POOL = [
    { title: "Cycle Completed",     desc: "Your X3 Level 3 slot just cycled. $80 sent to your wallet.",                icon: RefreshCcw,  color: "text-meta-emerald" },
    { title: "New Direct Referral", desc: "A new partner joined under your link from Nigeria.",                         icon: Users,       color: "text-meta-violet" },
    { title: "Spillover Received",  desc: "You received a spillover placement in X4 Level 2 from your upline.",         icon: ArrowUpRight, color: "text-meta-blue" },
    { title: "Royalty Bonus",       desc: "Monthly NFT royalty of $420 has been credited to your account.",             icon: Crown,       color: "text-meta-gold" },
    { title: "Level Unlocked",      desc: "X3 Level 4 is now available. Activate for $80 to unlock higher rewards.",    icon: Zap,         color: "text-meta-gold" },
    { title: "MPS Block Reward",    desc: "Block #1,483 mined. +0.0042 MPS added to your wallet.",                      icon: Pickaxe,     color: "text-meta-emerald" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const alert = LIVE_ALERT_POOL[Math.floor(Math.random() * LIVE_ALERT_POOL.length)];
      setNotifications(prev => [
        { ...alert, id: Date.now(), time: "just now", fresh: true },
        ...prev.slice(0, 7).map(n => ({ ...n, fresh: false })),
      ]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  const [liveStats, setLiveStats] = useState({ referrals: 1284, revenue: 84250, conversion: 12.4, systemLoad: 24 });
  
  // Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Live simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        referrals: prev.referrals + (Math.random() > 0.6 ? 1 : 0),
        revenue: prev.revenue + (Math.random() > 0.8 ? 25 : 0),
        conversion: +(prev.conversion + (Math.random() - 0.5) * 0.1).toFixed(1),
        systemLoad: Math.floor(Math.random() * 40 + 10)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#000000] text-white overflow-hidden font-sans selection:bg-meta-emerald/30 relative cursor-none">
      {/* Interactive Cursor */}
      <motion.div className="fixed top-0 left-0 w-8 h-8 border border-meta-emerald rounded-full pointer-events-none z-[10000] mix-blend-difference" style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} />
      <motion.div className="fixed top-0 left-0 w-2 h-2 bg-meta-emerald rounded-full pointer-events-none z-[10000]" style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} />

      {/* Background Layers */}
      <div className="noise" />
      <div className="star-field" />
      <div className="perspective-grid" />
      <div className="scan-line" />

      {/* Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div animate={{ x: [0, 60, -40, 0], y: [0, -80, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-meta-emerald/[0.06] blur-[120px]" />
        <motion.div animate={{ x: [0, -80, 50, 0], y: [0, 60, -30, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-meta-violet/[0.07] blur-[140px]" />
        <motion.div animate={{ x: [0, 40, -60, 0], y: [0, -40, 80, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          className="absolute bottom-[-15%] left-[30%] w-[550px] h-[550px] rounded-full bg-meta-gold/[0.05] blur-[130px]" />
        <motion.div animate={{ x: [0, -50, 30, 0], y: [0, 70, -50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full bg-meta-blue/[0.05] blur-[100px]" />
      </div>
      
      {/* --- Sidebar --- */}
      <motion.aside animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }} className="relative z-50 border-r border-white/5 bg-[#000000]/80 backdrop-blur-3xl flex flex-col overflow-hidden shrink-0 shadow-2xl">
        <div className="p-8 flex items-center gap-4 shrink-0">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-meta-gold via-meta-emerald to-meta-violet flex items-center justify-center shadow-[0_0_30px_rgba(134,255,0,0.3)]">
             <Zap className="h-6 w-6 text-black fill-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">CORELINK<span className="text-meta-emerald">.</span></span>
            <span className="text-[10px] text-meta-emerald font-black uppercase mt-1">Elite Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto overflow-x-hidden custom-scrollbar pb-10">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4">Smart Contract Core</div>
          {[
            { icon: LayoutDashboard, label: "Intelligence Hub", id: "dashboard" },
            { icon: Hexagon, label: "Matrix Programs", id: "programs" },
            { icon: Network, label: "My Network Tree", id: "network" },
            { icon: Trophy, label: "Global Leaderboards", id: "leaderboard" },
            { icon: Crown, label: "NFT Royalties", id: "royalty" },
            { icon: Wallet, label: "Global Wallet", id: "financials" },
          ].map((item, i) => (
            <button key={`core-${i}`} onClick={() => item.id && setActiveView(item.id as any)}
              className={cn("w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                activeView === item.id ? "bg-white/[0.04] text-white" : "text-slate-500 hover:text-white hover:bg-white/[0.03]")}>
              {activeView === item.id && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-meta-emerald/10 to-transparent rounded-2xl border-l-2 border-meta-emerald" />}
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={cn("relative z-10 shrink-0", activeView === item.id ? "text-meta-emerald" : "text-slate-500 group-hover:text-meta-emerald transition-colors")}>
                <item.icon className="h-5 w-5" />
              </motion.div>
              <span className="text-sm font-bold relative z-10 whitespace-nowrap">{item.label}</span>
              {activeView !== item.id && (
                <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-meta-emerald/40 origin-top rounded-full" />
              )}
            </button>
          ))}

          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-8">Enterprise & Ecosystem</div>
          {[
            { icon: BarChart3, label: "Business Intelligence", id: "bi" },
            { icon: Pickaxe, label: "MPS Coin Mining", id: "mining" },
            { icon: Component, label: "Projects Hub", id: "projects" },
            { icon: Map, label: "Global Roadmap", id: "roadmap" },
            { icon: GraduationCap, label: "Meta Academy", id: "academy" },
            { icon: HeartHandshake, label: "Foundation", id: "foundation" },
            { icon: FileText, label: "Asset Vault", id: "assets" },
            { icon: ShieldCheck, label: "Security & Audits", id: "security" },
          ].map((item, i) => (
            <button key={`eco-${i}`} onClick={() => item.id && setActiveView(item.id as any)}
              className={cn("w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                activeView === item.id ? "bg-white/[0.04] text-white" : "text-slate-500 hover:text-white hover:bg-white/[0.03]")}>
              {activeView === item.id && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-meta-emerald/10 to-transparent rounded-2xl border-l-2 border-meta-emerald" />}
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={cn("relative z-10 shrink-0", activeView === item.id ? "text-meta-emerald" : "text-slate-500 group-hover:text-meta-emerald transition-colors")}>
                <item.icon className="h-5 w-5" />
              </motion.div>
              <span className="text-sm font-bold relative z-10 whitespace-nowrap">{item.label}</span>
              {activeView !== item.id && (
                <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-meta-emerald/40 origin-top rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 shrink-0">
           <TiltCard className="p-6 border-meta-emerald/20 bg-meta-emerald/[0.02]">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[9px] font-black uppercase text-meta-emerald tracking-widest">Network Guard</span>
                 <ShieldCheck className="h-4 w-4 text-meta-emerald" />
              </div>
              <p className="text-lg font-black text-white mb-2 tracking-tight leading-none">Syncing Nodes</p>
              <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div initial={{ width: "20%" }} animate={{ width: "85%" }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} className="h-full bg-meta-emerald shadow-[0_0_15px_var(--color-meta-emerald)]" />
              </div>
           </TiltCard>
        </div>
      </motion.aside>

      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto relative bg-transparent scroll-smooth flex flex-col">
        <MarqueeTicker />
        
        <header className="sticky top-0 z-40 bg-[#000000]/60 backdrop-blur-2xl border-b border-white/[0.04] px-10 h-24 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-8">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-xl transition-colors cursor-none">
                 {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <h2 className="text-2xl font-black capitalize tracking-tighter flex items-center gap-3">
                 <Coins className="h-6 w-6 text-meta-gold" /> {activeView}
              </h2>
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-4 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.05]">
                {["Global", "USA", "UAE", "Europe"].map((r) => (
                  <button key={r} onClick={() => setRegion(r)} className={cn("px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-none", region === r ? "bg-meta-gold text-black shadow-lg" : "text-slate-500 hover:text-white")}>
                    {r}
                  </button>
                ))}
              </div>
              <div className="relative">
                 <button className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-meta-emerald/40 transition-all cursor-none relative group mr-4">
                    <Languages className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                 </button>
              </div>
              <div className="relative">
                 <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-meta-emerald/40 transition-all cursor-none relative group">
                    <Bell className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 shadow-[0_0_10px_red] text-[9px] font-black text-white flex items-center justify-center">
                        {notifications.filter(n => n.fresh).length || notifications.length}
                      </span>
                    )}
                 </button>
              </div>
              <button className="h-12 px-8 bg-gradient-to-r from-meta-violet to-meta-blue text-white font-black text-sm flex items-center gap-2 hover:scale-105 transition-all cursor-none clip-button border-none shadow-[0_10px_30px_rgba(139,92,246,0.3)]">
                 <Wallet className="h-4 w-4" /> Connect Port
              </button>
           </div>
        </header>

        <div className="p-10 relative flex-1">
           <AnimatePresence mode="wait">
              {activeView === "dashboard" && (
                <motion.div key="dashboard-wrap" initial={{ opacity: 0, x: 40, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(8px)" }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                  <DashboardView liveStats={liveStats} />
                </motion.div>
              )}
              {activeView === "programs" && (
                <motion.div key="programs-wrap" initial={{ opacity: 0, x: 40, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(8px)" }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                  <ProgramsView />
                </motion.div>
              )}
              {activeView === "network" && (
                <motion.div key="network-wrap" initial={{ opacity: 0, x: 40, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(8px)" }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                  <NetworkView />
                </motion.div>
              )}
              {activeView === "mining" && (
                <motion.div key="mining-wrap" initial={{ opacity: 0, x: 40, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(8px)" }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                  <MiningView />
                </motion.div>
              )}
              {activeView === "leaderboard" && (
                <motion.div key="leaderboard-wrap" initial={{ opacity: 0, x: 40, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(8px)" }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                  <LeaderboardView />
                </motion.div>
              )}
              {activeView === "assets" && (
                <motion.div key="assets-wrap" initial={{ opacity: 0, x: 40, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(8px)" }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
                <motion.div key="assets" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <div className="flex items-center justify-between gap-10 flex-wrap mb-4">
                      <div className="min-w-0">
                         <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Asset <span className="text-meta-emerald">Vault</span></h3>
                         <p className="text-xl text-slate-500 font-bold max-w-2xl">Secure marketing resources, brand assets, and technical documentation library.</p>
                      </div>
                      <button className="h-16 px-10 rounded-[2rem] bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] cursor-none hover:bg-white/10 transition-colors">
                         Sync All Resources
                      </button>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                      {[
                        { name: "Brand Kit",           cat: "Design",    size: "18.2 MB", color: "text-meta-violet" },
                        { name: "Pitch Deck",          cat: "Marketing", size: "6.4 MB",  color: "text-meta-gold" },
                        { name: "Whitepaper v3",       cat: "Technical", size: "3.1 MB",  color: "text-meta-blue" },
                        { name: "Smart Contract ABI", cat: "Technical", size: "0.8 MB",  color: "text-meta-emerald" },
                        { name: "Onboarding Guide",   cat: "Training",  size: "4.7 MB",  color: "text-meta-emerald" },
                        { name: "Logo Pack",           cat: "Design",    size: "22.5 MB", color: "text-meta-violet" },
                        { name: "Tokenomics Chart",   cat: "Finance",   size: "1.2 MB",  color: "text-meta-gold" },
                        { name: "Legal Framework",    cat: "Legal",     size: "2.9 MB",  color: "text-red-400" },
                        { name: "X3 Matrix Guide",    cat: "Training",  size: "3.8 MB",  color: "text-meta-emerald" },
                        { name: "X4 Matrix Guide",    cat: "Training",  size: "4.1 MB",  color: "text-meta-emerald" },
                        { name: "Audit Report",        cat: "Security",  size: "1.6 MB",  color: "text-meta-gold" },
                        { name: "Investor Report Q4", cat: "Finance",   size: "5.3 MB",  color: "text-meta-blue" },
                      ].map((asset, i) => (
                        <TiltCard key={i} className="p-6 flex flex-col items-center justify-center gap-3 cursor-none border-white/[0.06] group/asset">
                           <div className="relative">
                             <FileText className={cn("h-10 w-10 transition-colors duration-500", asset.color, "opacity-60 group-hover/asset:opacity-100")} />
                             <motion.div initial={{ opacity: 0, scale: 0 }} whileHover={{ opacity: 1, scale: 1 }} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-meta-emerald text-black flex items-center justify-center shadow-2xl">
                                <Download className="h-3 w-3" />
                             </motion.div>
                           </div>
                           <div className="text-center min-w-0 w-full">
                             <p className="text-[10px] font-black text-white truncate">{asset.name}</p>
                             <p className={cn("text-[9px] font-black uppercase tracking-widest mt-0.5", asset.color)}>{asset.cat}</p>
                             <p className="text-[8px] font-bold text-slate-700 mt-1">{asset.size}</p>
                           </div>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
                </motion.div>
              )}

              {activeView === "financials" && (
                <motion.div key="financials" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <div className="flex items-center justify-between gap-10 flex-wrap mb-8">
                      <div className="min-w-0">
                         <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Global <span className="text-meta-gold">Payment System</span></h3>
                         <p className="text-xl text-slate-500 font-bold max-w-2xl">Enterprise-grade multi-wallet support with instant Web3, Fiat, and Mobile Money withdrawals.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <TiltCard className="p-10 border-white/[0.08] clip-card flex flex-col bg-gradient-to-br from-meta-gold/[0.05] to-transparent">
                         <Wallet className="h-12 w-12 text-meta-gold mb-6" />
                         <h4 className="text-2xl font-black text-white mb-2">Web3 Wallets</h4>
                         <p className="text-sm text-slate-400 font-medium mb-8">Instant BEP20/ERC20 payouts directly to your non-custodial wallets.</p>
                         <div className="space-y-3 flex-1">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                               <span className="text-xs font-bold text-white">MetaMask</span>
                               <span className="text-[9px] font-black text-meta-emerald uppercase">Connected</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10 opacity-50">
                               <span className="text-xs font-bold text-white">Trust Wallet</span>
                               <span className="text-[9px] font-black text-slate-500 uppercase">Connect</span>
                            </div>
                         </div>
                         <button className="w-full h-12 mt-6 bg-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-meta-gold hover:text-black transition-colors rounded-xl">Withdraw Crypto</button>
                      </TiltCard>

                      <TiltCard className="p-10 border-white/[0.08] clip-card flex flex-col bg-gradient-to-br from-meta-blue/[0.05] to-transparent">
                         <DollarSign className="h-12 w-12 text-meta-blue mb-6" />
                         <h4 className="text-2xl font-black text-white mb-2">Fiat Gateways</h4>
                         <p className="text-sm text-slate-400 font-medium mb-8">Bank transfers and card payments powered by Stripe & PayPal.</p>
                         <div className="space-y-3 flex-1">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                               <span className="text-xs font-bold text-white">Bank Wire (USD)</span>
                               <span className="text-[9px] font-black text-slate-500 uppercase">Fee: 1.5%</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                               <span className="text-xs font-bold text-white">Credit Card</span>
                               <span className="text-[9px] font-black text-slate-500 uppercase">Fee: 2.9%</span>
                            </div>
                         </div>
                         <button className="w-full h-12 mt-6 bg-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-meta-blue hover:text-black transition-colors rounded-xl">Withdraw Fiat</button>
                      </TiltCard>

                      <TiltCard className="p-10 border-white/[0.08] clip-card flex flex-col bg-gradient-to-br from-meta-emerald/[0.05] to-transparent">
                         <Smartphone className="h-12 w-12 text-meta-emerald mb-6" />
                         <h4 className="text-2xl font-black text-white mb-2">Mobile Money</h4>
                         <p className="text-sm text-slate-400 font-medium mb-8">Direct integration with African mobile money networks.</p>
                         <div className="space-y-3 flex-1">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                               <span className="text-xs font-bold text-white">M-Pesa (Kenya)</span>
                               <span className="text-[9px] font-black text-meta-emerald uppercase">Instant</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                               <span className="text-xs font-bold text-white">Airtel Money</span>
                               <span className="text-[9px] font-black text-slate-500 uppercase">Processing...</span>
                            </div>
                         </div>
                         <button className="w-full h-12 mt-6 bg-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-meta-emerald hover:text-black transition-colors rounded-xl">Withdraw Mobile</button>
                      </TiltCard>
                   </div>
                </motion.div>
              )}

              {activeView === "security" && (
                <motion.div key="security" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-8">Enterprise <span className="text-meta-emerald">Security Audit</span></h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      <TiltCard className="p-10 border-meta-emerald/20 bg-meta-emerald/[0.02] flex flex-col clip-card">
                         <Shield className="h-12 w-12 text-meta-emerald mb-6" />
                         <h4 className="text-2xl font-black text-white mb-2">Two-Factor Auth</h4>
                         <p className="text-sm text-slate-400 font-medium mb-6">Account secured via Authenticator App and Email verification.</p>
                         <div className="mt-auto p-4 bg-meta-emerald/10 border border-meta-emerald/20 rounded-xl flex items-center justify-between">
                            <span className="text-xs font-black text-white uppercase tracking-widest">Status</span>
                            <span className="text-xs font-black text-meta-emerald uppercase">Enabled</span>
                         </div>
                      </TiltCard>
                      <TiltCard className="p-10 border-white/[0.08] flex flex-col clip-card">
                         <Fingerprint className="h-12 w-12 text-slate-400 mb-6" />
                         <h4 className="text-2xl font-black text-white mb-2">Device Tracking</h4>
                         <p className="text-sm text-slate-400 font-medium mb-6">Anti-multi-account and bot detection systems actively monitoring logins.</p>
                         <div className="mt-auto space-y-2">
                            <div className="flex justify-between text-xs text-slate-500"><span>IP: 192.168.1.1 (Nairobi)</span> <span className="text-meta-emerald">Current</span></div>
                            <div className="flex justify-between text-xs text-slate-500"><span>IP: 45.32.X.X (Dubai)</span> <span>2d ago</span></div>
                         </div>
                      </TiltCard>
                      <TiltCard className="p-10 border-meta-gold/20 bg-meta-gold/[0.02] flex flex-col clip-card">
                         <FileText className="h-12 w-12 text-meta-gold mb-6" />
                         <h4 className="text-2xl font-black text-white mb-2">Smart Contract Audits</h4>
                         <p className="text-sm text-slate-400 font-medium mb-6">Publicly visible, read-only blockchain transaction logs and CertiK audits.</p>
                         <button className="mt-auto w-full h-12 bg-white/5 border border-meta-gold/30 text-meta-gold font-black text-[10px] uppercase tracking-widest hover:bg-meta-gold hover:text-black transition-colors rounded-xl flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" /> View Public Logs
                         </button>
                      </TiltCard>
                   </div>
                </motion.div>
              )}

              {activeView === "bi" && (
                <motion.div key="bi" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <div className="flex items-center justify-between gap-10 flex-wrap mb-4">
                      <div className="min-w-0">
                         <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Business <span className="text-meta-blue">Intelligence</span></h3>
                         <p className="text-xl text-slate-500 font-bold max-w-2xl">Enterprise analytics, user growth forecasting, and revenue breakdown for platform admins.</p>
                      </div>
                      <div className="inline-block px-4 py-2 bg-meta-blue/10 border border-meta-blue/20 rounded-full text-meta-blue font-black text-[10px] uppercase tracking-widest">
                         Admin Privileges Active
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      <TiltCard className="lg:col-span-2 p-10 border-white/[0.08] clip-card flex flex-col min-h-[400px]">
                         <div className="flex justify-between items-center mb-8">
                            <h4 className="text-2xl font-black text-white">Global Conversion Funnel</h4>
                            <select className="bg-white/5 border border-white/10 text-xs font-bold text-white p-2 rounded-lg outline-none">
                               <option>Last 30 Days</option>
                               <option>Year to Date</option>
                            </select>
                         </div>
                         <div className="flex-1 flex items-end justify-between gap-4 px-10">
                            {[
                               { step: "Visits", val: 85, h: "h-[100%]", color: "bg-slate-700" },
                               { step: "Signups", val: 42, h: "h-[50%]", color: "bg-meta-blue" },
                               { step: "Activations", val: 28, h: "h-[35%]", color: "bg-meta-violet" },
                               { step: "Upgrades", val: 12, h: "h-[15%]", color: "bg-meta-gold" },
                            ].map((bar, i) => (
                               <div key={i} className="flex flex-col items-center gap-4 w-full group">
                                  <div className="w-full h-[250px] flex items-end bg-white/[0.02] rounded-t-xl">
                                     <div className={cn("w-full rounded-t-xl transition-all duration-1000 group-hover:opacity-80", bar.h, bar.color)} />
                                  </div>
                                  <div className="text-center">
                                     <p className="text-lg font-black text-white">{bar.val}k</p>
                                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{bar.step}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </TiltCard>

                      <TiltCard className="lg:col-span-1 p-10 border-white/[0.08] clip-card flex flex-col gap-6">
                         <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Forecasted Monthly Churn</p>
                            <p className="text-3xl font-black text-meta-emerald">1.2% <span className="text-xs text-slate-400 font-normal">(-0.4% from last month)</span></p>
                         </div>
                         <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Top Performing Region</p>
                            <p className="text-3xl font-black text-white">UAE <span className="text-sm text-meta-emerald font-black">+$842k Rev</span></p>
                         </div>
                         <button className="w-full h-14 mt-auto bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                            <DownloadCloud className="h-4 w-4" /> Download Investor Report
                         </button>
                      </TiltCard>
                   </div>
                </motion.div>
              )}

              {activeView === "royalty" && (
                <motion.div key="royalty" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <div className="flex items-center justify-between gap-10 flex-wrap mb-8">
                      <div className="min-w-0">
                         <h3 className="text-5xl font-black text-white tracking-tighter mb-2">NFT Royalty <span className="text-meta-gold">Program</span></h3>
                         <p className="text-xl text-slate-500 font-bold max-w-2xl">Earn monthly ecosystem bonuses based on your smart contract network activity and NFT status.</p>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {[
                        { title: "Activator", level: "Lvl 1", bonus: "10%", color: "text-slate-400" },
                        { title: "Supervisor", level: "Lvl 2", bonus: "11%", color: "text-blue-400" },
                        { title: "Manager", level: "Lvl 3", bonus: "12%", color: "text-purple-400" },
                        { title: "Pro-Manager", level: "Lvl 4", bonus: "13%", color: "text-pink-400" },
                        { title: "Pacesetter", level: "Lvl 5", bonus: "14%", color: "text-orange-400" },
                        { title: "Ambassador", level: "Lvl 6", bonus: "15%", color: "text-meta-gold" },
                        { title: "Millionaire", level: "Lvl 7", bonus: "25%", color: "text-meta-emerald" },
                      ].map((tier, i) => (
                         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                           <TiltCard key={i} className="p-8 border-white/[0.08] flex flex-col items-center justify-center text-center clip-card bg-gradient-to-br from-white/[0.02] to-black">
                              <Crown className={cn("h-16 w-16 mb-6", tier.color)} />
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">{tier.level}</span>
                              <h4 className="text-2xl font-black text-white mb-4">{tier.title}</h4>
                              <div className="w-full h-12 rounded-[1rem] bg-white/[0.03] flex items-center justify-center gap-2 border border-white/[0.05]">
                                 <span className="text-xs font-black text-slate-400 uppercase">Pool Bonus:</span>
                                 <span className={cn("text-lg font-black", tier.color)}>{tier.bonus}</span>
                              </div>
                           </TiltCard>
                         </motion.div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "academy" && (
                <motion.div key="academy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-8">Meta <span className="text-meta-emerald">Academy</span></h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        { title: "Metaverse Basics",           desc: "Understand virtual economies, digital land ownership, and avatar-based commerce in Web3 worlds.",         duration: "4h 20m", lessons: 12, progress: 100, color: "text-meta-emerald" },
                        { title: "Web 3.0 Architecture",       desc: "Deep dive into decentralized protocols, IPFS, smart contract layers, and trustless infrastructure.",      duration: "6h 10m", lessons: 18, progress: 78,  color: "text-meta-blue" },
                        { title: "Yield Farming",              desc: "Master liquidity pools, APY optimization, impermanent loss mitigation, and DeFi compounding strategies.", duration: "5h 45m", lessons: 15, progress: 55,  color: "text-meta-gold" },
                        { title: "Initial Game Offerings",     desc: "Learn how IGOs work, how to evaluate gaming tokens, and how to participate in early-stage launches.",    duration: "3h 30m", lessons: 10, progress: 30,  color: "text-meta-violet" },
                        { title: "Advanced Staking",           desc: "Explore validator nodes, delegated staking, lock-up periods, and maximizing staking rewards safely.",    duration: "5h 00m", lessons: 14, progress: 10,  color: "text-orange-400" },
                        { title: "NFT Ecosystems",             desc: "From minting to royalties — understand NFT standards, marketplace dynamics, and collection strategies.",  duration: "4h 50m", lessons: 13, progress: 0,   color: "text-pink-400" },
                      ].map((course, i) => (
                        <TiltCard key={i} className="p-8 border-white/[0.08] flex flex-col justify-between min-h-[320px] clip-card hover:border-meta-emerald/50 transition-colors">
                           <div>
                              <GraduationCap className={cn("h-10 w-10 mb-4", course.color)} />
                              <h4 className="text-xl font-black text-white leading-tight mb-2">{course.title}</h4>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{course.desc}</p>
                           </div>
                           <div className="mt-6 space-y-3">
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                 <span className="text-slate-600">{course.lessons} Lessons · {course.duration}</span>
                                 <span className={course.progress === 100 ? "text-meta-emerald" : course.progress > 0 ? "text-meta-gold" : "text-slate-600"}>
                                    {course.progress === 100 ? "Completed" : course.progress > 0 ? `${course.progress}%` : "Not Started"}
                                 </span>
                              </div>
                              <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                                    className={cn("h-full rounded-full", course.progress === 100 ? "bg-meta-emerald" : course.progress > 0 ? "bg-meta-gold" : "bg-transparent")} />
                              </div>
                              <button className={cn("mt-2 text-xs font-black uppercase tracking-widest flex items-center gap-2", course.color)}>
                                 {course.progress === 100 ? "Review Course" : course.progress > 0 ? "Continue" : "Start Course"} <ArrowUpRight className="h-4 w-4" />
                              </button>
                           </div>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "projects" && (
                <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-8">Projects <span className="text-meta-blue">Hub</span></h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        { title: "Core Coin & Token",     desc: "The native utility token powering all transactions, governance votes, and reward distributions across the CoreLink ecosystem.",  status: "Live",        statusColor: "text-meta-emerald bg-meta-emerald/10 border-meta-emerald/20", color: "text-meta-gold",    icon: Coins },
                        { title: "Gaming NFTs",           desc: "Play-to-earn NFT collections with on-chain ownership, tradeable in-game assets, and IGO launchpad integration.",               status: "Beta",        statusColor: "text-meta-gold bg-meta-gold/10 border-meta-gold/20",         color: "text-meta-violet", icon: Trophy },
                        { title: "Decentralized DAPP",   desc: "A fully non-custodial Web3 application enabling peer-to-peer matrix participation without any central authority.",             status: "Live",        statusColor: "text-meta-emerald bg-meta-emerald/10 border-meta-emerald/20", color: "text-meta-blue",   icon: Component },
                        { title: "Core Blockchain",      desc: "A proprietary Layer-1 blockchain with sub-second finality, EVM compatibility, and native smart contract support.",            status: "In Dev",      statusColor: "text-meta-blue bg-meta-blue/10 border-meta-blue/20",           color: "text-meta-emerald",icon: Network },
                        { title: "C-USD Stablecoin",     desc: "A fully collateralized stablecoin pegged 1:1 to USD, backed by ecosystem reserves and audited monthly by CertiK.",           status: "Live",        statusColor: "text-meta-emerald bg-meta-emerald/10 border-meta-emerald/20", color: "text-meta-gold",   icon: DollarSign },
                        { title: "Blastaroo Lottery",    desc: "A provably fair, on-chain lottery with weekly jackpots funded by 2% of all ecosystem transaction fees.",                     status: "Coming Soon", statusColor: "text-slate-400 bg-white/5 border-white/10",                    color: "text-pink-400",    icon: Zap },
                      ].map((proj, i) => (
                        <TiltCard key={i} className="p-8 border-white/[0.08] flex flex-col justify-between min-h-[320px] clip-card hover:border-meta-blue/50 transition-colors">
                           <div>
                              <div className="flex items-start justify-between mb-4">
                                 <proj.icon className={cn("h-10 w-10", proj.color)} />
                                 <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border", proj.statusColor)}>{proj.status}</span>
                              </div>
                              <h4 className="text-xl font-black text-white leading-tight mb-2">{proj.title}</h4>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{proj.desc}</p>
                           </div>
                           <button className={cn("mt-8 text-xs font-black uppercase tracking-widest flex items-center gap-2", proj.color)}>
                              Explore Protocol <ArrowUpRight className="h-4 w-4" />
                           </button>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "foundation" && (
                <motion.div key="foundation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1200px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-2">CoreLink <span className="text-pink-500">Foundation</span></h3>
                   <p className="text-xl text-slate-500 font-bold mb-8">2% of all ecosystem royalties fund real-world impact in developing nations.</p>

                   {/* Impact Stats */}
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        { label: "Total Donated",    value: "$2.4M",  color: "text-pink-500",      icon: HeartHandshake },
                        { label: "Beneficiaries",    value: "12,840", color: "text-meta-emerald",  icon: Users },
                        { label: "Countries Reached",value: "18",     color: "text-meta-gold",    icon: Map },
                        { label: "Active Projects",  value: "34",     color: "text-meta-violet",  icon: Component },
                      ].map((s, i) => (
                        <TiltCard key={i} className="p-6 text-center border-white/[0.08]">
                          <s.icon className={cn("h-8 w-8 mx-auto mb-3", s.color)} />
                          <p className={cn("text-3xl font-black tabular-nums", s.color)}>{s.value}</p>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{s.label}</p>
                        </TiltCard>
                      ))}
                   </div>

                   {/* Mission Card */}
                   <TiltCard className="p-12 border-pink-500/20 bg-gradient-to-br from-pink-500/[0.03] to-black clip-card">
                      <div className="flex items-start gap-8 flex-wrap">
                        <HeartHandshake className="h-16 w-16 text-pink-500 shrink-0 animate-pulse" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-3xl font-black text-white mb-4">Empowering Global Communities Through Decentralized Technology</h4>
                          <p className="text-base text-slate-400 font-medium leading-relaxed mb-8">
                            The Foundation allocates 2% of all ecosystem royalties to fund education, clean water, and tech access in developing nations. Every cycle completed on CoreLink directly contributes to a better world.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {[
                              { area: "Education",    detail: "4,200 students funded across Nigeria, Ghana & Kenya",      pct: 45 },
                              { area: "Clean Water",  detail: "38 boreholes drilled across rural East Africa",             pct: 30 },
                              { area: "Tech Access",  detail: "6,100 devices distributed to underserved communities",      pct: 25 },
                            ].map((p, i) => (
                              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                                <p className="text-xs font-black text-white uppercase tracking-widest">{p.area}</p>
                                <p className="text-[11px] text-slate-500 font-medium">{p.detail}</p>
                                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                                    className="h-full rounded-full bg-pink-500" />
                                </div>
                                <p className="text-[10px] font-black text-pink-500">{p.pct}% of fund</p>
                              </div>
                            ))}
                          </div>
                          <button className="h-14 px-10 bg-pink-500 text-white font-black text-xs uppercase tracking-widest clip-button hover:bg-pink-400 transition-colors">
                            View Full Impact Report
                          </button>
                        </div>
                      </div>
                   </TiltCard>
                </motion.div>
              )}

              {activeView === "leaderboard" && <LeaderboardView />}

              {activeView === "roadmap" && (
                <motion.div key="roadmap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1200px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-12">Global <span className="text-meta-violet">Roadmap</span></h3>
                   <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                      {[
                        {
                          phase: "Phase 1: Genesis",
                          date: "Q1 2023",
                          status: "Completed",
                          desc: "Launch of the core protocol, partner matrix, and initial intelligence hub features.",
                          milestones: ["Smart contract deployment on BSC", "X3 & X4 matrix launch", "1,000 founding members onboarded", "CertiK audit passed"]
                        },
                        {
                          phase: "Phase 2: Expansion",
                          date: "Q3 2023",
                          status: "Completed",
                          desc: "Deployment of the Royalty Program, global node infrastructure, and C-USD stablecoin.",
                          milestones: ["NFT Royalty Program live", "C-USD stablecoin launched", "Mobile Money integration (M-Pesa)", "10,000 active members reached"]
                        },
                        {
                          phase: "Phase 3: Metaverse",
                          date: "Q2 2024",
                          status: "In Progress",
                          desc: "Integration of 3D gaming NFTs, MPS coin mining, and fully immersive academy experiences.",
                          milestones: ["MPS Coin mining engine live", "Gaming NFT beta launch", "Meta Academy v1 released", "50,000 member target"]
                        },
                        {
                          phase: "Phase 4: Independence",
                          date: "Q1 2025",
                          status: "Upcoming",
                          desc: "Launch of the native CoreLink Blockchain, DAO governance, and fully decentralized ecosystem.",
                          milestones: ["CoreLink Layer-1 mainnet", "DAO governance portal", "Blastaroo Lottery launch", "100,000 member target"]
                        },
                      ].map((item, i) => (
                        <div key={i} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#000] bg-white/[0.05] group-hover:bg-meta-violet text-slate-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10 mt-1">
                            <Map className="h-4 w-4" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] group-hover:border-meta-violet/30 transition-colors clip-card">
                            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                              <h4 className="font-black text-white text-xl">{item.phase}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.date}</span>
                                <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                  item.status === "Completed" ? "bg-meta-emerald/10 text-meta-emerald" :
                                  item.status === "In Progress" ? "bg-meta-gold/10 text-meta-gold" :
                                  "bg-white/5 text-slate-500")}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-4">{item.desc}</p>
                            <ul className="space-y-1.5">
                              {item.milestones.map((m, j) => (
                                <li key={j} className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                                  <span className={cn("h-1.5 w-1.5 rounded-full shrink-0",
                                    item.status === "Completed" ? "bg-meta-emerald" :
                                    item.status === "In Progress" ? "bg-meta-gold" : "bg-slate-600")} />
                                  {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </main>

      {/* --- Notification Drawer --- */}
      <AnimatePresence>
         {isNotificationsOpen && (
           <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsNotificationsOpen(false)} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 h-full w-[450px] z-[101] bg-black/90 border-l border-white/[0.08] backdrop-blur-3xl p-12 flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.8)]">
                 <div className="flex items-center justify-between mb-12 shrink-0">
                    <h3 className="text-3xl font-black text-white tracking-tighter">Alert Center</h3>
                    <button onClick={() => setIsNotificationsOpen(false)} className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all cursor-none">
                       <X className="h-6 w-6" />
                    </button>
                 </div>
                 <div className="flex-1 space-y-8 overflow-y-auto pr-4 custom-scrollbar">
                    {notifications.map((n, i) => (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} key={n.id} className={cn("p-8 rounded-[2.5rem] border transition-all group cursor-none", n.fresh ? "bg-meta-emerald/5 border-meta-emerald/20" : "bg-white/[0.03] border-white/5 hover:border-white/10")}>
                         <div className="flex items-center gap-5 mb-4">
                            <div className={cn("h-12 w-12 rounded-2xl bg-white/[0.04] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner", n.color)}>
                               <n.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-lg font-black text-white">{n.title}</p>
                                {n.fresh && <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-meta-emerald text-black">New</span>}
                              </div>
                            </div>
                         </div>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{n.desc}</p>
                         <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-meta-emerald transition-colors">{n.time}</p>
                      </motion.div>
                    ))}
                 </div>
                 <button onClick={() => setNotifications([])} className="w-full h-16 mt-10 rounded-[2rem] bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-colors cursor-none shrink-0">
                    Dismiss All Alerts
                 </button>
              </motion.div>
           </>
         )}
      </AnimatePresence>

      {/* --- AI Chat Assistant Widget --- */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end">
         <AnimatePresence>
            {isAIAssistantOpen && (
               <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="w-[350px] h-[450px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl mb-4 p-6 shadow-2xl flex flex-col">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-meta-emerald/20 flex items-center justify-center text-meta-emerald">
                           <Bot className="h-5 w-5" />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-white">CoreLink AI</h4>
                           <p className="text-[10px] text-meta-emerald uppercase tracking-widest">Online</p>
                        </div>
                     </div>
                     <button onClick={() => setIsAIAssistantOpen(false)} className="text-slate-500 hover:text-white transition-colors cursor-none"><X className="h-5 w-5" /></button>
                  </div>
                  <AIChat />
               </motion.div>
            )}
         </AnimatePresence>
         <button onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)} className="h-16 w-16 bg-gradient-to-br from-meta-emerald to-meta-blue rounded-full shadow-[0_0_30px_rgba(134,255,0,0.3)] flex items-center justify-center hover:scale-110 transition-transform cursor-none relative group">
            <Bot className="h-7 w-7 text-black group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-black" />
         </button>
      </div>
    </div>
  );
}
