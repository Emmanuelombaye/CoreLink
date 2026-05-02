import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  DollarSign, 
  Zap, 
  Activity,
  FileText,
  CreditCard,
  Lock,
  Coins,
  Wallet,
  Menu,
  X,
  Bell,
  ArrowUpRight,
  Search,
  ShieldCheck,
  Gift,
  Award,
  RefreshCcw,
  Plus,
  Shield,
  Download,
  Terminal,
  Server,
  Database,
  Share2,
  Rocket,
  GraduationCap,
  HeartHandshake,
  Component,
  Map,
  Crown
} from "lucide-react";
import { useState, useEffect } from "react";
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
const REVENUE_DATA = [
  { name: "Jan", value: 4200, growth: 1200 },
  { name: "Feb", value: 5100, growth: 1500 },
  { name: "Mar", value: 4800, growth: 1400 },
  { name: "Apr", value: 6200, growth: 1900 },
  { name: "May", value: 5800, growth: 1700 },
  { name: "Jun", value: 7500, growth: 2200 },
  { name: "Jul", value: 8900, growth: 2600 },
];

const NODE_TRAFFIC = [
  { name: "Nairobi", value: 85, color: "#86FF00" },
  { name: "New York", value: 72, color: "#8B5CF6" },
  { name: "Dubai", value: 94, color: "#FFC107" },
  { name: "London", value: 64, color: "#3B82F6" },
  { name: "Tokyo", value: 58, color: "#EF4444" },
];

const TICKER_DATA = [
  { pair: "CORE/USD", price: "124.21", change: "+12.4%", trend: "up" },
  { pair: "LNK/ETH", price: "0.842", change: "-2.1%", trend: "down" },
  { pair: "NET/SOL", price: "42.10", change: "+5.7%", trend: "up" },
  { pair: "VAULT/BTC", price: "0.00042", change: "+8.9%", trend: "up" },
];

// --- Subcomponents ---

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
          <div key={i} className="flex items-center gap-4">
             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{item.pair}</span>
             <span className="text-xs font-bold text-white tabular-nums">${item.price}</span>
             <span className={cn("text-[10px] font-black", item.trend === 'up' ? "text-meta-emerald" : "text-red-500")}>
                {item.change}
             </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [activeView, setActiveView] = useState<"dashboard" | "marketplace" | "nodes" | "assets" | "financials" | "security" | "academy" | "foundation" | "projects" | "roadmap" | "royalty">("dashboard");
  const [region, setRegion] = useState("Global");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
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
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-4">Core Network</div>
          {[
            { icon: LayoutDashboard, label: "Intelligence Hub", id: "dashboard" },
            { icon: Globe, label: "Partner Discovery", id: "marketplace" },
            { icon: RefreshCcw, label: "Node Infrastructure", id: "nodes" },
            { icon: Crown, label: "Royalty Program", id: "royalty" },
            { icon: CreditCard, label: "Financial Flux", id: "financials" },
          ].map((item, i) => (
            <button key={`core-${i}`} onClick={() => item.id && setActiveView(item.id as any)} className={cn("w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative", activeView === item.id ? "bg-white/[0.04] text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]")}>
              {activeView === item.id && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-meta-emerald/10 to-transparent rounded-2xl border-l-2 border-meta-emerald" />}
              <item.icon className={cn("h-5 w-5 relative z-10", activeView === item.id ? "text-meta-emerald" : "group-hover:text-meta-emerald")} />
              <span className="text-sm font-bold relative z-10 whitespace-nowrap">{item.label}</span>
            </button>
          ))}

          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4 mb-2 mt-8">Ecosystem</div>
          {[
            { icon: Component, label: "Projects Hub", id: "projects" },
            { icon: Map, label: "Global Roadmap", id: "roadmap" },
            { icon: GraduationCap, label: "Meta Academy", id: "academy" },
            { icon: HeartHandshake, label: "Foundation", id: "foundation" },
            { icon: FileText, label: "Asset Vault", id: "assets" },
            { icon: ShieldCheck, label: "Security Audit", id: "security" },
          ].map((item, i) => (
            <button key={`eco-${i}`} onClick={() => item.id && setActiveView(item.id as any)} className={cn("w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative", activeView === item.id ? "bg-white/[0.04] text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]")}>
              {activeView === item.id && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-meta-emerald/10 to-transparent rounded-2xl border-l-2 border-meta-emerald" />}
              <item.icon className={cn("h-5 w-5 relative z-10", activeView === item.id ? "text-meta-emerald" : "group-hover:text-meta-emerald")} />
              <span className="text-sm font-bold relative z-10 whitespace-nowrap">{item.label}</span>
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
                 <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-meta-emerald/40 transition-all cursor-none relative group">
                    <Bell className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_red]" />
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
                <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 pb-20 max-w-[1600px] mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                     {[
                       { label: "Active Revenue", value: `$${(liveStats.revenue / 1000).toFixed(1)}k`, icon: DollarSign, color: "text-meta-gold", trend: "+12.4%", glow: "rgba(255, 193, 7, 0.15)" },
                       { label: "Node Latency", value: "14.2ms", icon: Activity, color: "text-meta-emerald", trend: "-2.1ms", glow: "rgba(134, 255, 0, 0.15)" },
                       { label: "Partner Reach", value: liveStats.referrals.toLocaleString(), icon: Users, color: "text-meta-violet", trend: "+84", glow: "rgba(139, 92, 246, 0.15)" },
                       { label: "Vault Security", value: "Elite Tier", icon: Lock, color: "text-white", trend: "Stable", glow: "rgba(255, 255, 255, 0.1)" },
                     ].map((stat, i) => (
                       <TiltCard key={i} glowColor={stat.glow} className="p-8 group cursor-none overflow-hidden h-full">
                          <div className="flex justify-between items-start mb-8 relative z-10">
                             <div className={cn("p-4 rounded-[2rem] bg-white/[0.04] transition-transform duration-500 group-hover:scale-110", stat.color)}><stat.icon className="h-6 w-6" /></div>
                             <span className="text-[10px] font-black text-meta-emerald px-2 py-1 rounded-lg bg-meta-emerald/5 border border-meta-emerald/10">{stat.trend}</span>
                          </div>
                          <div className="relative z-10">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                            <p className="text-5xl font-black tabular-nums tracking-tighter">{stat.value}</p>
                          </div>
                          <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000">
                             <stat.icon className="h-40 w-40" />
                          </div>
                       </TiltCard>
                     ))}
                  </div>

                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                     <TiltCard className="lg:col-span-2 p-10 flex flex-col min-h-[550px] cursor-none overflow-hidden border-white/[0.08]">
                        <div className="flex items-center justify-between mb-12 gap-8 flex-wrap relative z-10">
                           <div className="min-w-0">
                              <h3 className="text-3xl font-black text-white tracking-tighter mb-1">Intelligence Matrix <span className="text-meta-emerald">v4.2</span></h3>
                              <p className="text-sm text-slate-500 font-bold max-w-md">Synchronized multi-touch attribution tracking across all global regions.</p>
                           </div>
                           <div className="flex gap-3 shrink-0">
                              <button className="h-11 px-6 rounded-2xl bg-meta-emerald text-black text-[11px] font-black uppercase tracking-widest cursor-none hover:scale-105 transition-transform shadow-2xl">Live Growth</button>
                              <button className="h-11 px-6 rounded-2xl bg-white/5 text-slate-300 text-[11px] font-black uppercase tracking-widest cursor-none hover:bg-white/10 transition-colors">Export</button>
                           </div>
                        </div>
                        <div className="flex-1 w-full min-h-[350px] relative z-10">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                                 <Area type="monotone" dataKey="value" stroke="#86FF00" strokeWidth={5} fill="url(#colorValue)" animationDuration={3000} />
                                 <Area type="monotone" dataKey="growth" stroke="#FFC107" strokeWidth={2} strokeDasharray="6 6" fill="transparent" />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </TiltCard>

                     <TiltCard className="p-10 flex flex-col space-y-10 cursor-none bg-gradient-to-br from-[#001A33]/30 to-black overflow-hidden">
                        <div className="flex items-center justify-between relative z-10">
                           <h3 className="text-xl font-black text-white tracking-tight">Node Synchronization</h3>
                           <div className="flex items-center gap-2">
                             <span className="h-2 w-2 rounded-full bg-meta-emerald animate-pulse" />
                             <span className="text-[10px] font-black text-meta-emerald uppercase tracking-widest">Active</span>
                           </div>
                        </div>
                        <div className="space-y-10 flex-1 relative z-10">
                           {NODE_TRAFFIC.map((node, i) => (
                             <div key={i} className="space-y-4 group cursor-none">
                                <div className="flex justify-between items-end gap-2">
                                   <div className="flex items-center gap-4 min-w-0">
                                      <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: node.color, boxShadow: `0 0 15px ${node.color}` }} />
                                      <span className="text-sm font-black text-slate-200 group-hover:text-white transition-colors truncate">{node.name} Node</span>
                                   </div>
                                   <span className="text-xs font-black text-slate-500 tabular-nums">{node.value}% Sync</span>
                                </div>
                                <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden border border-white/5">
                                   <motion.div initial={{ width: 0 }} animate={{ width: `${node.value}%` }} transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }} className="h-full rounded-full" style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}50` }} />
                                </div>
                             </div>
                           ))}
                        </div>
                        <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-between gap-6 relative z-10 group hover:bg-white/[0.05] transition-colors">
                           <div className="flex items-center gap-4 min-w-0">
                              <ShieldCheck className="h-6 w-6 text-meta-emerald shrink-0" />
                              <div className="min-w-0">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Audit Status</p>
                                <p className="text-sm font-black text-white truncate">Global L4 Protocol Secure</p>
                              </div>
                           </div>
                           <ArrowUpRight className="h-5 w-5 text-slate-700 group-hover:text-meta-emerald transition-colors shrink-0" />
                        </div>
                     </TiltCard>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                     <TiltCard className="lg:col-span-1 p-10 space-y-8 cursor-none border-white/[0.08]">
                        <div className="flex items-center justify-between mb-4">
                           <h3 className="text-sm font-black uppercase tracking-[0.3em] text-meta-emerald">Live Signals</h3>
                           <Activity className="h-5 w-5 text-meta-emerald animate-pulse" />
                        </div>
                        <div className="space-y-5">
                           {[
                             { user: "ID_284", val: "+$12.42", type: "success", time: "Just now" },
                             { user: "ID_912", val: "Node Sync", type: "info", time: "1m ago" },
                             { user: "ID_042", val: "L3 Verified", type: "success", time: "3m ago" },
                             { user: "ID_771", val: "+$84.10", type: "success", time: "12m ago" },
                           ].map((sig, i) => (
                             <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors uppercase">{sig.user}</span>
                                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{sig.time}</span>
                                </div>
                                <span className={cn("text-xs font-black uppercase tracking-tight", sig.type === 'success' ? "text-meta-emerald" : "text-meta-gold")}>{sig.val}</span>
                             </div>
                           ))}
                        </div>
                        <button className="w-full text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-meta-emerald transition-colors py-2">Full Signal Log</button>
                     </TiltCard>

                     <div className="lg:col-span-3 glass-card p-14 bg-gradient-to-br from-[#001A33]/40 to-black overflow-hidden relative group border-white/[0.08] clip-card">
                        <div className="relative z-20 space-y-12 max-w-xl">
                           <div className="space-y-6">
                              <div className="inline-block px-4 py-2 bg-meta-emerald/10 border border-meta-emerald/20 rounded-full text-meta-emerald font-black text-[10px] uppercase tracking-widest mb-4">
                                🌌 Next-Gen Affiliate Hub
                              </div>
                              <h3 className="text-6xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
                                 The Apex of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-meta-emerald to-meta-gold">Intelligence</span>.
                              </h3>
                              <p className="text-slate-300 text-xl font-medium leading-relaxed">
                                 Welcome to CoreLink Elite. We've integrated the world's most sophisticated protocols into a single, flawless interface.
                              </p>
                           </div>
                           <div className="flex gap-6 flex-wrap">
                              <button className="bg-meta-emerald text-black font-black uppercase tracking-widest cursor-none h-16 px-10 text-sm hover:bg-white transition-colors clip-button">ACTIVATE ELITE</button>
                              <button className="h-16 px-10 bg-white/5 border border-white/10 text-white font-black hover:bg-white/10 transition-all cursor-none flex items-center gap-3 group clip-button">
                                 <Share2 className="h-5 w-5 group-hover:text-meta-emerald transition-colors" /> RECRUIT PARTNERS
                              </button>
                           </div>
                        </div>

                        {/* --- Image Generation Prompts & Placeholders --- */}
                        {/* Prompt 1: "3D Pixar-style cartoon astronaut character with neon green accents, flying with a jetpack, high-quality render, transparent background." */}
                        <div className="absolute right-[5%] top-[10%] w-[400px] h-[400px] bg-white/[0.02] border border-dashed border-meta-emerald/30 rounded-[3rem] animate-float-slow flex flex-col items-center justify-center p-6 text-center z-10 backdrop-blur-sm">
                           <Rocket className="h-12 w-12 text-meta-emerald/50 mb-4" />
                           <p className="text-xs font-bold text-meta-emerald/70">Place 3D Mascot Image Here</p>
                           <p className="text-[9px] text-slate-500 mt-2">See code comments for prompt</p>
                        </div>
                        
                        {/* Prompt 2: "Floating 3D gold coins and glowing green gems, Pixar-style render, depth of field, transparent background." */}
                        <div className="absolute right-[25%] bottom-[10%] w-[200px] h-[200px] bg-white/[0.02] border border-dashed border-meta-gold/30 rounded-full animate-float-fast flex flex-col items-center justify-center p-4 text-center z-10 backdrop-blur-sm delay-500">
                           <Coins className="h-8 w-8 text-meta-gold/50 mb-2" />
                           <p className="text-[10px] font-bold text-meta-gold/70">3D Coins</p>
                        </div>

                        <div className="absolute top-[-30%] right-[-15%] h-[800px] w-[800px] bg-meta-emerald/20 rounded-full blur-[120px] group-hover:scale-110 transition-transform duration-[3s] -z-10" />
                     </div>
                  </motion.div>
                </motion.div>
              )}

              {activeView === "marketplace" && (
                <motion.div key="marketplace" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <div className="flex items-center justify-between gap-10 flex-wrap mb-4">
                      <div className="min-w-0">
                         <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Partner <span className="text-meta-emerald">Discovery</span></h3>
                         <p className="text-xl text-slate-500 font-bold max-w-2xl">Browse, analyze, and recruit elite nodes from the global decentralized network.</p>
                      </div>
                      <div className="flex gap-5 items-center shrink-0">
                         <div className="relative hidden md:block">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input type="text" placeholder="Search elite programs..." className="h-16 w-80 pl-14 pr-8 rounded-[2rem] bg-white/[0.04] border border-white/10 outline-none text-sm font-bold focus:border-meta-emerald/40 transition-all cursor-none" />
                         </div>
                         <button className="h-16 px-10 rounded-[2rem] bg-meta-gold text-black font-black text-sm flex items-center gap-3 hover:scale-105 transition-all cursor-none shadow-2xl">
                            <Plus className="h-5 w-5" /> Launch Program
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                      {[
                        { title: "Meta-Health Protocol", tier: "DIAMOND", earnings: "12.4%", partners: "4.2k", color: "from-meta-emerald", glow: "rgba(134, 255, 0, 0.3)" },
                        { title: "Global Nexus Hub", tier: "PLATINUM", earnings: "8.1%", partners: "12.8k", color: "from-meta-gold", glow: "rgba(255, 193, 7, 0.3)" },
                        { title: "Cyber-Fintech v2", tier: "ELITE", earnings: "15.0%", partners: "1.1k", color: "from-meta-violet", glow: "rgba(139, 92, 246, 0.3)" },
                        { title: "Quantum Infrastructure", tier: "ALPHA", earnings: "22.4%", partners: "420", color: "from-meta-blue", glow: "rgba(0, 26, 51, 0.3)" },
                      ].map((p, i) => (
                        <TiltCard key={i} glowColor={p.glow} className="p-8 group border-white/[0.08] hover:border-white/20 transition-all duration-700 cursor-none flex flex-col h-[520px] clip-card">
                           <div className={cn("h-48 w-full rounded-[2.5rem] bg-gradient-to-br mb-10 flex items-center justify-center relative overflow-hidden shrink-0", p.color, "to-black/90")}>
                              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                              <Zap className="h-20 w-20 text-white/40 group-hover:scale-125 group-hover:rotate-12 group-hover:text-white transition-all duration-1000" />
                           </div>
                           <div className="flex justify-between items-center mb-4 relative z-10 px-2">
                              <span className="text-[11px] font-black text-meta-emerald uppercase tracking-[0.3em]">{p.tier} TIER</span>
                              <Award className="h-5 w-5 text-meta-gold" />
                           </div>
                           <h4 className="text-2xl font-black text-white mb-auto leading-[1.1] tracking-tight break-words hyphens-auto px-2 group-hover:text-meta-emerald transition-colors">
                              {p.title}
                           </h4>
                           <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
                              <div className="p-5 rounded-[2rem] bg-white/[0.04] flex flex-col items-center justify-center min-w-0 border border-white/[0.05] group-hover:bg-white/[0.08] transition-colors">
                                 <p className="text-[9px] font-black text-slate-500 uppercase text-center truncate w-full mb-1">Avg Earn</p>
                                 <p className="text-xl font-black text-meta-emerald tabular-nums">{p.earnings}</p>
                              </div>
                              <div className="p-5 rounded-[2rem] bg-white/[0.04] flex flex-col items-center justify-center min-w-0 border border-white/[0.05] group-hover:bg-white/[0.08] transition-colors">
                                 <p className="text-[9px] font-black text-slate-500 uppercase text-center truncate w-full mb-1">Nodes</p>
                                 <p className="text-xl font-black text-white tabular-nums">{p.partners}</p>
                              </div>
                           </div>
                           <button className="w-full h-16 mt-10 bg-white text-black font-black text-xs hover:bg-meta-emerald transition-all cursor-none flex items-center justify-center gap-3 shrink-0 shadow-2xl relative z-10 overflow-hidden group/btn clip-button">
                              <span className="relative z-10">APPLY TO NODE</span>
                              <ArrowUpRight className="h-5 w-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                              <div className="absolute inset-0 bg-meta-emerald translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                           </button>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "nodes" && (
                <motion.div key="nodes" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <div className="flex items-center justify-between gap-8 flex-wrap mb-4">
                      <div className="min-w-0">
                         <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Node <span className="text-meta-emerald">Infrastructure</span></h3>
                         <p className="text-xl text-slate-500 font-bold max-w-2xl">Monitor and deploy global decentralized computing clusters with zero-latency synchronization.</p>
                      </div>
                      <button className="h-16 px-10 rounded-[2rem] bg-meta-emerald text-black font-black text-sm flex items-center gap-3 hover:scale-105 transition-all cursor-none shadow-2xl">
                         <Plus className="h-5 w-5" /> Deploy New Hub
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {[
                        { name: "Hub-Kenya-01", status: "Active", uptime: "99.99%", load: "42%", icon: Server, color: "text-meta-emerald" },
                        { name: "Hub-UAE-DXB", status: "Active", uptime: "100.0%", load: "78%", icon: Database, color: "text-meta-gold" },
                        { name: "Hub-USA-NYC", status: "Provisioning", uptime: "---", load: "0%", icon: Terminal, color: "text-meta-violet" },
                      ].map((node, i) => (
                        <TiltCard key={i} className="p-10 cursor-none flex flex-col h-full border-white/[0.08]">
                           <div className="flex items-center gap-6 mb-10">
                              <div className="h-16 w-16 rounded-[2rem] bg-white/[0.05] flex items-center justify-center text-meta-emerald group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                 <node.icon className={cn("h-8 w-8", node.color)} />
                              </div>
                              <div className="min-w-0">
                                 <h4 className="text-2xl font-black text-white truncate mb-1">{node.name}</h4>
                                 <span className={cn("text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.05] border border-white/5", node.status === 'Active' ? "text-meta-emerald" : "text-meta-gold")}>{node.status}</span>
                              </div>
                           </div>
                           <div className="space-y-6 flex-1">
                              <div className="flex justify-between items-center py-4 border-b border-white/[0.03]">
                                 <span className="text-sm text-slate-500 font-bold">Protocol Uptime</span>
                                 <span className="text-sm font-black text-white tabular-nums">{node.uptime}</span>
                              </div>
                              <div className="flex justify-between items-center pt-2">
                                 <span className="text-sm text-slate-500 font-bold">Network Load</span>
                                 <span className="text-sm font-black text-white tabular-nums">{node.load}</span>
                              </div>
                              <div className="h-2.5 w-full bg-white/[0.04] rounded-full overflow-hidden border border-white/5">
                                 <motion.div initial={{ width: 0 }} animate={{ width: node.load }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-meta-emerald shadow-[0_0_15px_var(--color-meta-emerald)]" />
                              </div>
                           </div>
                           <button className="w-full h-14 mt-10 rounded-2xl border border-white/10 text-white font-black text-xs hover:bg-white/5 transition-all cursor-none uppercase tracking-widest">Connect Terminal</button>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "assets" && (
                <motion.div key="assets" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
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
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                        <TiltCard key={i} className="aspect-square p-6 flex flex-col items-center justify-center gap-5 cursor-none border-white/[0.06] group/asset">
                           <div className="relative">
                             <FileText className="h-10 w-10 text-slate-600 group-hover/asset:text-meta-emerald transition-colors duration-500" />
                             <motion.div initial={{ opacity: 0, scale: 0 }} whileHover={{ opacity: 1, scale: 1 }} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-meta-emerald text-black flex items-center justify-center shadow-2xl">
                                <Download className="h-3 w-3" />
                             </motion.div>
                           </div>
                           <div className="text-center min-w-0 w-full px-2">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">Asset_{i}.pdf</p>
                             <p className="text-[8px] font-bold text-slate-700 mt-1 uppercase">2.4 MB</p>
                           </div>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "financials" && (
                <motion.div key="financials" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1200px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-8">Financial <span className="text-meta-gold">Flux</span></h3>
                   <TiltCard className="p-20 flex flex-col items-center justify-center space-y-10 text-center border-meta-gold/20 min-h-[600px] bg-gradient-to-br from-meta-gold/[0.03] to-black">
                      <div className="relative">
                        <div className="h-32 w-32 rounded-full bg-meta-gold/10 flex items-center justify-center text-meta-gold animate-pulse shadow-[0_0_50px_rgba(255,193,7,0.2)]">
                           <DollarSign className="h-16 w-16" />
                        </div>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20px] border border-dashed border-meta-gold/20 rounded-full" />
                      </div>
                      <div className="space-y-4 max-w-xl">
                        <h4 className="text-4xl font-black text-white tracking-tight">Vault Synchronization in Progress</h4>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">Your decentralized financial distribution data is being synchronized with the global L4 Security Protocol. Please stand by for full audit integrity.</p>
                      </div>
                      <button className="h-16 px-12 rounded-[2rem] bg-meta-gold text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all cursor-none shadow-2xl">
                         Refresh Secure Vault
                      </button>
                   </TiltCard>
                </motion.div>
              )}

              {activeView === "security" && (
                <motion.div key="security" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-8">Security <span className="text-meta-emerald">Audit</span></h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <TiltCard className="p-12 space-y-10 border-meta-emerald/20 bg-meta-emerald/[0.01] flex flex-col h-full">
                         <div className="flex items-center gap-6">
                            <div className="h-20 w-20 rounded-[2.5rem] bg-meta-emerald/5 flex items-center justify-center text-meta-emerald shadow-inner">
                               <Shield className="h-10 w-10" />
                            </div>
                            <div>
                               <h4 className="text-3xl font-black text-white">Firewall Active</h4>
                               <span className="text-[10px] font-black text-meta-emerald uppercase tracking-[0.3em]">Quantum-Resistant</span>
                            </div>
                         </div>
                         <p className="text-xl text-slate-400 font-medium leading-relaxed flex-1">
                            L4-grade encryption is currently protecting all node-to-node communications. Our decentralized firewall has successfully deflected 1,284 unauthorized access attempts in the last 24 hours.
                         </p>
                         <div className="flex items-center gap-4 text-meta-emerald font-black text-xs uppercase tracking-widest border-t border-white/[0.05] pt-8">
                            <Activity className="h-4 w-4" /> Monitoring Real-time Traffic...
                         </div>
                      </TiltCard>
                      <TiltCard className="p-12 space-y-10 border-meta-gold/20 bg-meta-gold/[0.01] flex flex-col h-full">
                         <div className="flex items-center gap-6">
                            <div className="h-20 w-20 rounded-[2.5rem] bg-meta-gold/5 flex items-center justify-center text-meta-gold shadow-inner">
                               <Lock className="h-10 w-10" />
                            </div>
                            <div>
                               <h4 className="text-3xl font-black text-white">Access Control</h4>
                               <span className="text-[10px] font-black text-meta-gold uppercase tracking-[0.3em]">Multi-Sig Enabled</span>
                            </div>
                         </div>
                         <p className="text-xl text-slate-400 font-medium leading-relaxed flex-1">
                            CoreLink uses multi-signature authorization for all high-value transactions. Your hardware port is currently secured via biometric-linked session keys. All systems are operational.
                         </p>
                         <div className="flex items-center gap-4 text-meta-gold font-black text-xs uppercase tracking-widest border-t border-white/[0.05] pt-8">
                            <ShieldCheck className="h-4 w-4" /> Port 8080 Secured
                         </div>
                      </TiltCard>
                   </div>
                </motion.div>
              )}

              {activeView === "royalty" && (
                <motion.div key="royalty" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <div className="flex items-center justify-between gap-10 flex-wrap mb-8">
                      <div className="min-w-0">
                         <h3 className="text-5xl font-black text-white tracking-tighter mb-2">Royalty <span className="text-meta-gold">Program</span></h3>
                         <p className="text-xl text-slate-500 font-bold max-w-2xl">Earn monthly ecosystem bonuses based on your network activity and node volume.</p>
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
                      {["Metaverse Basics", "Web 3.0 Architecture", "Yield Farming", "Initial Game Offerings (IGO)", "Advanced Staking", "NFT Ecosystems"].map((course, i) => (
                        <TiltCard key={i} className="p-8 border-white/[0.08] flex flex-col justify-between min-h-[300px] clip-card hover:border-meta-emerald/50 transition-colors">
                           <GraduationCap className="h-12 w-12 text-meta-emerald mb-4" />
                           <div>
                              <h4 className="text-2xl font-black text-white leading-tight mb-2">{course}</h4>
                              <p className="text-sm text-slate-500 font-medium">Master the fundamentals of the decentralized web and maximize your network potential.</p>
                           </div>
                           <button className="mt-8 text-xs font-black text-meta-emerald uppercase tracking-widest flex items-center gap-2">Start Course <ArrowUpRight className="h-4 w-4" /></button>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "projects" && (
                <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1600px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-8">Projects <span className="text-meta-blue">Hub</span></h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {["Core Coin & Token", "Gaming NFTs", "Decentralized DAPP", "Core Blockchain", "C-USD Stablecoin", "Blastaroo Lottery"].map((proj, i) => (
                        <TiltCard key={i} className="p-8 border-white/[0.08] flex flex-col justify-between min-h-[300px] clip-card hover:border-meta-blue/50 transition-colors">
                           <Component className="h-12 w-12 text-meta-blue mb-4" />
                           <div>
                              <h4 className="text-2xl font-black text-white leading-tight mb-2">{proj}</h4>
                              <p className="text-sm text-slate-500 font-medium">Explore the native utilities and infrastructure powering the CoreLink Elite ecosystem.</p>
                           </div>
                           <button className="mt-8 text-xs font-black text-meta-blue uppercase tracking-widest flex items-center gap-2">Explore Protocol <ArrowUpRight className="h-4 w-4" /></button>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "foundation" && (
                <motion.div key="foundation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1200px] mx-auto pb-20 text-center">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-8">CoreLink <span className="text-pink-500">Foundation</span></h3>
                   <TiltCard className="p-16 border-pink-500/20 bg-gradient-to-br from-pink-500/[0.02] to-black min-h-[500px] flex flex-col items-center justify-center clip-card">
                      <HeartHandshake className="h-24 w-24 text-pink-500 mb-8 animate-pulse" />
                      <h4 className="text-3xl font-black text-white mb-6 max-w-2xl">Empowering Global Communities Through Decentralized Technology</h4>
                      <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-3xl mb-12">
                         The Foundation is our commitment to giving back. We allocate a percentage of all ecosystem royalties to fund education, clean water, and tech access in developing nations.
                      </p>
                      <button className="h-14 px-10 bg-pink-500 text-white font-black text-xs uppercase tracking-widest clip-button hover:bg-pink-400 transition-colors">
                         View Impact Report
                      </button>
                   </TiltCard>
                </motion.div>
              )}

              {activeView === "roadmap" && (
                <motion.div key="roadmap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 max-w-[1200px] mx-auto pb-20">
                   <h3 className="text-5xl font-black text-white tracking-tighter mb-12">Global <span className="text-meta-violet">Roadmap</span></h3>
                   <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                      {[
                        { phase: "Phase 1: Genesis", desc: "Launch of the core protocol, partner matrix, and initial intelligence hub features.", status: "Completed" },
                        { phase: "Phase 2: Expansion", desc: "Deployment of the Royalty Program, global node infrastructure, and M-USD.", status: "Completed" },
                        { phase: "Phase 3: Metaverse", desc: "Integration of 3D gaming NFTs and fully immersive academy experiences.", status: "In Progress" },
                        { phase: "Phase 4: Independence", desc: "Launch of the native CoreLink Blockchain and fully decentralized governance.", status: "Upcoming" },
                      ].map((item, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#000] bg-white/[0.05] group-hover:bg-meta-violet text-slate-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                            <Map className="h-4 w-4" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] group-hover:border-meta-violet/30 transition-colors clip-card">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-black text-white text-xl">{item.phase}</h4>
                              <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full", item.status === 'Completed' ? "bg-meta-emerald/10 text-meta-emerald" : item.status === 'In Progress' ? "bg-meta-gold/10 text-meta-gold" : "bg-white/5 text-slate-500")}>
                                {item.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
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
                    {[
                      { title: "Payout Processed", desc: "Your commission of $1,240.00 was successfully sent to your vault.", time: "2m ago", icon: Gift, color: "text-meta-emerald" },
                      { title: "Security Upgrade", desc: "L4 Security Protocol has been deployed to the Nairobi Node.", time: "1h ago", icon: ShieldCheck, color: "text-meta-gold" },
                      { title: "New Elite Partner", desc: "Alexander M. has achieved Meta-Elite status in your network.", time: "4h ago", icon: Award, color: "text-meta-violet" },
                      { title: "Market Volatility", desc: "High traffic detected in UAE region. System load at 84%.", time: "12h ago", icon: Activity, color: "text-red-500" },
                    ].map((n, i) => (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group cursor-none">
                         <div className="flex items-center gap-5 mb-4">
                            <div className={cn("h-12 w-12 rounded-2xl bg-white/[0.04] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner", n.color)}>
                               <n.icon className="h-6 w-6" />
                            </div>
                            <p className="text-lg font-black text-white">{n.title}</p>
                         </div>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{n.desc}</p>
                         <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-meta-emerald transition-colors">{n.time}</p>
                      </motion.div>
                    ))}
                 </div>
                 <button className="w-full h-16 mt-10 rounded-[2rem] bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-colors cursor-none shrink-0">
                    Dismiss All Alerts
                 </button>
              </motion.div>
           </>
         )}
      </AnimatePresence>
    </div>
  );
}
