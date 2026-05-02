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
  Database
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

function TiltCard({ children, className, glowColor = "rgba(134, 255, 0, 0.1)" }: { children: React.ReactNode, className?: string, glowColor?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
      className={cn("glass-card relative", className)}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
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
  const [activeView, setActiveView] = useState<"dashboard" | "marketplace" | "nodes" | "assets" | "financials" | "security">("dashboard");
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
      <motion.aside animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }} className="relative z-50 border-r border-white/5 bg-[#000000]/80 backdrop-blur-3xl flex flex-col overflow-hidden shrink-0">
        <div className="p-8 flex items-center gap-4 shrink-0">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-meta-gold via-meta-emerald to-meta-violet flex items-center justify-center shadow-[0_0_30px_rgba(134,255,0,0.3)]">
             <Zap className="h-6 w-6 text-black fill-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">CORELINK<span className="text-meta-emerald">.</span></span>
            <span className="text-[10px] text-meta-emerald font-black uppercase mt-1">Elite Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto overflow-x-hidden">
          {[
            { icon: LayoutDashboard, label: "Intelligence Hub", id: "dashboard" },
            { icon: Globe, label: "Partner Discovery", id: "marketplace" },
            { icon: RefreshCcw, label: "Node Infrastructure", id: "nodes" },
            { icon: FileText, label: "Asset Vault", id: "assets" },
            { icon: CreditCard, label: "Financial Flux", id: "financials" },
            { icon: ShieldCheck, label: "Security Audit", id: "security" },
          ].map((item, i) => (
            <button key={i} onClick={() => item.id && setActiveView(item.id as any)} className={cn("w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative", activeView === item.id ? "bg-white/[0.04] text-white" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]")}>
              {activeView === item.id && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-meta-emerald/10 to-transparent rounded-2xl border-l-2 border-meta-emerald shadow-[0_0_20px_rgba(134,255,0,0.1)]" />}
              <item.icon className={cn("h-5 w-5 relative z-10", activeView === item.id ? "text-meta-emerald" : "group-hover:text-meta-emerald")} />
              <span className="text-sm font-bold relative z-10 whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 shrink-0">
           <TiltCard className="p-5 border-meta-emerald/20 group animate-float">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[10px] font-black uppercase text-meta-emerald">Network Sync</span>
                 <RefreshCcw className="h-3 w-3 text-meta-emerald animate-spin" />
              </div>
              <p className="text-lg font-black text-white">L4 Guard Active</p>
              <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-meta-emerald w-3/4 shadow-[0_0_10px_var(--color-meta-emerald)]" />
              </div>
           </TiltCard>
        </div>
      </motion.aside>

      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto relative bg-transparent scroll-smooth flex flex-col">
        <MarqueeTicker />
        
        <header className="sticky top-0 z-40 bg-[#000000]/60 backdrop-blur-xl border-b border-white/[0.04] px-10 h-24 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-8">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-xl transition-colors cursor-none">
                 {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <h2 className="text-2xl font-black capitalize tracking-tight flex items-center gap-3">
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
                 <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-meta-emerald/40 transition-all cursor-none relative">
                    <Bell className="h-5 w-5 text-slate-300" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_red]" />
                 </button>
              </div>
              <button className="h-12 px-6 rounded-2xl bg-gradient-to-r from-meta-violet to-meta-blue text-white font-black text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-none">
                 <Wallet className="h-4 w-4" /> Connect Port
              </button>
           </div>
        </header>

        <div className="p-10 relative flex-1">
           <AnimatePresence mode="wait">
              {activeView === "dashboard" && (
                <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 pb-20">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {[
                       { label: "Active Revenue", value: `$${(liveStats.revenue / 1000).toFixed(1)}k`, icon: DollarSign, color: "text-meta-gold", trend: "+12.4%" },
                       { label: "Node Latency", value: "14.2ms", icon: Activity, color: "text-meta-emerald", trend: "-2.1ms" },
                       { label: "Partner Reach", value: liveStats.referrals.toLocaleString(), icon: Users, color: "text-meta-violet", trend: "+84" },
                       { label: "Vault Security", value: "Elite Tier", icon: Lock, color: "text-white", trend: "Stable" },
                     ].map((stat, i) => (
                       <TiltCard key={i} className="p-8 group cursor-none overflow-hidden">
                          <div className="flex justify-between items-start mb-6">
                             <div className={cn("p-4 rounded-3xl bg-white/[0.03]", stat.color)}><stat.icon className="h-6 w-6" /></div>
                             <span className="text-[10px] font-black text-meta-emerald">{stat.trend}</span>
                          </div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{stat.label}</p>
                          <p className="text-4xl font-black mt-2 tabular-nums">{stat.value}</p>
                       </TiltCard>
                     ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                     <TiltCard className="lg:col-span-2 p-10 flex flex-col min-h-[500px] cursor-none overflow-hidden">
                        <div className="flex items-center justify-between mb-10 gap-4 flex-wrap">
                           <div className="min-w-0">
                              <h3 className="text-2xl font-black text-meta-emerald tracking-tighter truncate">Earnings Matrix v4.2</h3>
                              <p className="text-sm text-slate-500 font-bold truncate">Synchronized Multi-Touch Attribution Tracking</p>
                           </div>
                           <div className="flex gap-2 shrink-0">
                              <button className="h-10 px-4 rounded-xl bg-meta-emerald text-black text-[10px] font-black uppercase tracking-widest cursor-none">Live Growth</button>
                           </div>
                        </div>
                        <div className="flex-1 w-full min-h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={REVENUE_DATA}>
                                 <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#86FF00" stopOpacity={0.4}/>
                                       <stop offset="95%" stopColor="#86FF00" stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                 <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                                 <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                                 <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #86FF0020', borderRadius: '16px' }} />
                                 <Area type="monotone" dataKey="value" stroke="#86FF00" strokeWidth={4} fill="url(#colorValue)" animationDuration={3000} />
                                 <Area type="monotone" dataKey="growth" stroke="#FFC107" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </TiltCard>

                     <TiltCard className="p-10 flex flex-col space-y-8 cursor-none bg-gradient-to-br from-[#001A33]/40 to-black overflow-hidden">
                        <div className="flex items-center justify-between">
                           <h3 className="text-xl font-black text-meta-emerald">Node Sync</h3>
                           <RefreshCcw className="h-4 w-4 text-meta-emerald animate-spin" />
                        </div>
                        <div className="space-y-8 flex-1">
                           {NODE_TRAFFIC.map((node, i) => (
                             <div key={i} className="space-y-3 group cursor-none">
                                <div className="flex justify-between items-end gap-2">
                                   <div className="flex items-center gap-3 min-w-0">
                                      <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}` }} />
                                      <span className="text-sm font-black truncate">{node.name}</span>
                                   </div>
                                   <span className="text-[10px] font-black text-slate-500 whitespace-nowrap">{node.value}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                                   <motion.div initial={{ width: 0 }} animate={{ width: `${node.value}%` }} transition={{ duration: 1.5, delay: i * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: node.color }} />
                                </div>
                             </div>
                           ))}
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                           <div className="flex items-center gap-3 min-w-0">
                              <ShieldCheck className="h-5 w-5 text-meta-emerald shrink-0" />
                              <span className="text-xs font-bold text-slate-400 uppercase truncate">Global Audit</span>
                           </div>
                           <span className="text-xs font-black text-meta-emerald shrink-0">SECURE</span>
                        </div>
                     </TiltCard>
                  </div>
                </motion.div>
              )}

              {activeView === "marketplace" && (
                <motion.div key="marketplace" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-12">
                   <div className="flex items-center justify-between gap-6 flex-wrap">
                      <div className="min-w-0">
                         <h3 className="text-4xl font-black text-meta-emerald tracking-tighter truncate">Partner Discovery</h3>
                         <p className="text-lg text-slate-500 font-bold mt-2">Recruit elite nodes from the global network</p>
                      </div>
                      <div className="flex gap-4 items-center shrink-0">
                         <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <input type="text" placeholder="Search..." className="h-14 w-64 pl-12 pr-6 rounded-2xl bg-white/5 border border-white/10 outline-none text-sm font-bold focus:border-meta-emerald/40 transition-all cursor-none" />
                         </div>
                         <button className="h-14 px-8 rounded-2xl bg-meta-gold text-black font-black text-sm flex items-center gap-2 hover:scale-105 transition-all cursor-none whitespace-nowrap">
                            <Plus className="h-5 w-5" /> Launch
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {[
                        { title: "Meta-Health Protocol", tier: "DIAMOND", earnings: "12.4%", partners: "4.2k", color: "from-meta-emerald", glow: "rgba(134, 255, 0, 0.2)" },
                        { title: "Global Nexus Hub", tier: "PLATINUM", earnings: "8.1%", partners: "12.8k", color: "from-meta-gold", glow: "rgba(255, 193, 7, 0.2)" },
                        { title: "Cyber-Fintech v2", tier: "ELITE", earnings: "15.0%", partners: "1.1k", color: "from-meta-violet", glow: "rgba(139, 92, 246, 0.2)" },
                        { title: "Quantum Infrastructure", tier: "ALPHA", earnings: "22.4%", partners: "420", color: "from-meta-blue", glow: "rgba(0, 26, 51, 0.2)" },
                      ].map((p, i) => (
                        <TiltCard key={i} glowColor={p.glow} className="p-8 group border-white/5 hover:border-white/20 transition-all duration-500 cursor-none flex flex-col h-full">
                           <div className={cn("h-44 w-full rounded-3xl bg-gradient-to-br mb-8 flex items-center justify-center relative overflow-hidden shrink-0", p.color, "to-black/90")}>
                              <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                              <Zap className="h-16 w-16 text-white/30 group-hover:scale-110 group-hover:text-white transition-all duration-700" />
                           </div>
                           <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] font-black text-meta-emerald uppercase tracking-[0.2em]">{p.tier}</span>
                              <Award className="h-4 w-4 text-meta-gold" />
                           </div>
                           <h4 className="text-2xl font-black text-white mb-8 leading-tight break-words hyphens-auto min-h-[4rem]">
                              {p.title}
                           </h4>
                           <div className="grid grid-cols-2 gap-3 mt-auto">
                              <div className="p-4 rounded-2xl bg-white/[0.03] flex flex-col items-center justify-center min-w-0">
                                 <p className="text-[8px] font-black text-slate-500 uppercase text-center truncate w-full">Avg. Earn</p>
                                 <p className="text-xl font-black text-meta-emerald whitespace-nowrap">{p.earnings}</p>
                              </div>
                              <div className="p-4 rounded-2xl bg-white/[0.03] flex flex-col items-center justify-center min-w-0">
                                 <p className="text-[8px] font-black text-slate-500 uppercase text-center truncate w-full">Nodes</p>
                                 <p className="text-xl font-black text-white whitespace-nowrap">{p.partners}</p>
                              </div>
                           </div>
                           <button className="w-full h-14 mt-8 rounded-2xl bg-white text-black font-black text-xs hover:scale-[1.02] transition-all cursor-none flex items-center justify-center gap-2 shrink-0">
                              Apply <ArrowUpRight className="h-4 w-4" />
                           </button>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "nodes" && (
                <motion.div key="nodes" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                   <div className="flex items-center justify-between gap-6 flex-wrap">
                      <div className="min-w-0">
                         <h3 className="text-4xl font-black text-meta-emerald tracking-tighter truncate">Node Infrastructure</h3>
                         <p className="text-lg text-slate-500 font-bold mt-2">Manage and monitor global decentralized computing nodes</p>
                      </div>
                      <button className="h-14 px-8 rounded-2xl bg-meta-emerald text-black font-black text-sm flex items-center gap-2 hover:scale-105 transition-all cursor-none">
                         <Plus className="h-5 w-5" /> Deploy Node
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        { name: "Hub-Kenya-01", status: "Active", uptime: "99.99%", load: "42%", icon: Server },
                        { name: "Hub-UAE-DXB", status: "Active", uptime: "100.0%", load: "78%", icon: Database },
                        { name: "Hub-USA-NYC", status: "Provisioning", uptime: "---", load: "0%", icon: Terminal },
                      ].map((node, i) => (
                        <TiltCard key={i} className="p-8 cursor-none">
                           <div className="flex items-center gap-4 mb-6">
                              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-meta-emerald">
                                 <node.icon className="h-6 w-6" />
                              </div>
                              <div>
                                 <h4 className="text-lg font-black text-white">{node.name}</h4>
                                 <span className={cn("text-[10px] font-black uppercase", node.status === 'Active' ? "text-meta-emerald" : "text-meta-gold")}>{node.status}</span>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                 <span className="text-xs text-slate-500 font-bold">Uptime</span>
                                 <span className="text-xs font-black text-white">{node.uptime}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="text-xs text-slate-500 font-bold">Current Load</span>
                                 <span className="text-xs font-black text-white">{node.load}</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-meta-emerald" style={{ width: node.load }} />
                              </div>
                           </div>
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "assets" && (
                <motion.div key="assets" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                   <div className="flex items-center justify-between">
                      <h3 className="text-4xl font-black text-meta-emerald">Asset Vault</h3>
                      <button className="h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest cursor-none">
                         Sync Library
                      </button>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                        <TiltCard key={i} className="aspect-square p-4 flex flex-col items-center justify-center gap-3 cursor-none">
                           <FileText className="h-8 w-8 text-slate-500" />
                           <span className="text-[10px] font-black text-slate-400 uppercase text-center">Asset_{i}.pdf</span>
                           <Download className="h-4 w-4 text-meta-emerald opacity-0 group-hover:opacity-100 transition-opacity" />
                        </TiltCard>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeView === "financials" && (
                <motion.div key="financials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                   <h3 className="text-4xl font-black text-meta-gold">Financial Flux</h3>
                   <div className="glass-card p-12 flex flex-col items-center justify-center space-y-6 text-center border-meta-gold/20">
                      <div className="h-20 w-20 rounded-full bg-meta-gold/10 flex items-center justify-center text-meta-gold animate-pulse">
                         <DollarSign className="h-10 w-10" />
                      </div>
                      <h4 className="text-2xl font-black text-white">Vault Synchronization in Progress</h4>
                      <p className="text-slate-500 max-w-md">Your financial distribution data is being synchronized with the L4 Protocol. Please check back in a few moments for full audit details.</p>
                      <button className="h-14 px-10 rounded-2xl bg-meta-gold text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all cursor-none">
                         Refresh Vault
                      </button>
                   </div>
                </motion.div>
              )}

              {activeView === "security" && (
                <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                   <h3 className="text-4xl font-black text-white">Security Audit</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <TiltCard className="p-10 space-y-8 border-meta-emerald/20 cursor-none">
                         <div className="flex items-center gap-4">
                            <Shield className="h-10 w-10 text-meta-emerald" />
                            <h4 className="text-2xl font-black">Firewall Active</h4>
                         </div>
                         <p className="text-slate-400">Quantum-resistant encryption is currently protecting all node communications. Zero breaches detected in the last 72 hours.</p>
                      </TiltCard>
                      <TiltCard className="p-10 space-y-8 border-meta-gold/20 cursor-none">
                         <div className="flex items-center gap-4">
                            <Lock className="h-10 w-10 text-meta-gold" />
                            <h4 className="text-2xl font-black">Access Control</h4>
                         </div>
                         <p className="text-slate-400">Multi-sig authorization required for all high-value transactions. Your hardware wallet is currently connected via Port 8080.</p>
                      </TiltCard>
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsNotificationsOpen(false)} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-[400px] z-[101] bg-[#000] border-l border-white/5 backdrop-blur-3xl p-10 flex flex-col">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-white">Alert Center</h3>
                    <button onClick={() => setIsNotificationsOpen(false)} className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all cursor-none">
                       <X className="h-5 w-5" />
                    </button>
                 </div>
                 <div className="flex-1 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
                    {[
                      { title: "Payout Processed", desc: "Your commission of $1,240.00 was successfully sent to your vault.", time: "2m ago", icon: Gift },
                      { title: "Security Upgrade", desc: "L4 Security Protocol has been deployed to the Nairobi Node.", time: "1h ago", icon: ShieldCheck },
                      { title: "New Elite Partner", desc: "Alexander M. has achieved Meta-Elite status in your network.", time: "4h ago", icon: Award },
                      { title: "Market Volatility", desc: "High traffic detected in UAE region. System load at 84%.", time: "12h ago", icon: Activity },
                    ].map((n, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-meta-emerald/40 transition-all group">
                         <div className="flex items-center gap-4 mb-3">
                            <div className="h-10 w-10 rounded-2xl bg-meta-emerald/10 flex items-center justify-center text-meta-emerald group-hover:scale-110 transition-all">
                               <n.icon className="h-5 w-5" />
                            </div>
                            <p className="text-sm font-black text-white">{n.title}</p>
                         </div>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed">{n.desc}</p>
                         <p className="text-[10px] text-meta-emerald font-black uppercase mt-4">{n.time}</p>
                      </div>
                    ))}
                 </div>
              </motion.div>
           </>
         )}
      </AnimatePresence>
    </div>
  );
}
