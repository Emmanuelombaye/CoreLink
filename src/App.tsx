import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  Shield, 
  ArrowUpRight, 
  Search, 
  Bell, 
  Settings,
  Plus,
  Share2,
  ChevronRight,
  Command,
  Activity,
  FileText,
  CreditCard,
  Target,
  BarChart3,
  Cpu,
  MousePointer2,
  Lock,
  ExternalLink,
  Download
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
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 5100 },
  { name: "Mar", value: 4800 },
  { name: "Apr", value: 6200 },
  { name: "May", value: 5800 },
  { name: "Jun", value: 7500 },
  { name: "Jul", value: 8900 },
];

const NODE_TRAFFIC = [
  { name: "Nairobi", value: 85, color: "#10B981" },
  { name: "New York", value: 72, color: "#8B5CF6" },
  { name: "Dubai", value: 94, color: "#FBBF24" },
  { name: "London", value: 64, color: "#3B82F6" },
  { name: "Tokyo", value: 58, color: "#EF4444" },
];

// --- Types ---
type Region = "Global" | "USA" | "UAE" | "Europe" | "Kenya";
type View = "dashboard" | "assets" | "nodes" | "payouts" | "settings";

export default function App() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [region, setRegion] = useState<Region>("Global");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [liveStats, setLiveStats] = useState({ referrals: 1284, revenue: 84250, conversion: 12.4, systemLoad: 24 });

  // --- Effects ---
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        referrals: prev.referrals + (Math.random() > 0.6 ? 1 : 0),
        revenue: prev.revenue + (Math.random() > 0.8 ? 25 : 0),
        conversion: +(prev.conversion + (Math.random() - 0.5) * 0.1).toFixed(1),
        systemLoad: Math.floor(Math.random() * 40 + 10)
      }));
    }, 3000);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#030303] text-white overflow-hidden font-sans selection:bg-meta-violet/30 relative">
      <div className="noise" />
      
      {/* --- Sidebar --- */}
      <motion.aside className="w-[280px] border-r border-white/5 bg-[#030303]/40 backdrop-blur-3xl flex flex-col z-50">
        <div className="p-8 flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-meta-violet via-meta-blue to-meta-emerald flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] group cursor-pointer overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <Zap className="h-6 w-6 text-white fill-white relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">METAPRO<span className="text-meta-violet">.</span></span>
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">International</span>
          </div>
        </div>

        <div className="px-6 py-4">
           <button 
             onClick={() => setIsCommandOpen(true)}
             className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10 transition-all text-xs font-bold group"
           >
              <Command className="h-3.5 w-3.5 group-hover:text-meta-violet transition-colors" />
              <span>Search network...</span>
              <kbd className="ml-auto bg-black/40 px-1.5 py-0.5 rounded border border-white/10 text-[9px] font-mono">⌘K</kbd>
           </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {[
            { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
            { icon: Globe, label: "Network nodes", id: "nodes" },
            { icon: FileText, label: "Marketing assets", id: "assets" },
            { icon: CreditCard, label: "Financial hub", id: "payouts" },
            { icon: Target, label: "Campaigns" },
            { icon: Users, label: "Partner network" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => item.id && setActiveView(item.id as View)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-500 group relative",
                activeView === item.id ? "bg-white/[0.03] text-white" : "text-slate-500 hover:bg-white/[0.01] hover:text-slate-300"
              )}
            >
              {activeView === item.id && (
                <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-meta-violet/10 to-transparent rounded-2xl border-l-2 border-meta-violet" />
              )}
              <item.icon className={cn("h-5 w-5 relative z-10 transition-colors", activeView === item.id ? "text-meta-violet" : "group-hover:text-meta-violet")} />
              <span className="text-sm font-bold relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-4">
           <div className="glass-card p-5 bg-gradient-to-br from-slate-900/50 to-black/50 border-none group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-2 w-2 rounded-full bg-meta-emerald animate-pulse" />
                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Network Secure</span>
              </div>
              <div className="flex items-center justify-between">
                 <div>
                    <p className="text-xs font-bold text-white">System Load</p>
                    <p className="text-lg font-black text-meta-emerald">{liveStats.systemLoad}%</p>
                 </div>
                 <BarChart3 className="h-8 w-8 text-white/10 group-hover:text-meta-emerald transition-colors" />
              </div>
           </div>
           
           <div className="flex items-center gap-4 px-2">
              <div className="h-10 w-10 rounded-full border-2 border-meta-violet p-0.5">
                 <div className="h-full w-full rounded-full bg-slate-800" />
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-sm font-black truncate">Alexander M.</p>
                 <p className="text-[10px] text-slate-500 font-bold uppercase">Elite Platinum Partner</p>
              </div>
              <Settings className="h-4 w-4 text-slate-500 hover:text-white cursor-pointer transition-colors" />
           </div>
        </div>
      </motion.aside>

      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto relative bg-[#030303]">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#030303]/60 backdrop-blur-xl border-b border-white/[0.04] px-10 h-24 flex items-center justify-between">
           <div className="flex items-center gap-8">
              <h2 className="text-2xl font-black capitalize tracking-tight">{activeView}</h2>
              <div className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.05]">
                {(["Global", "USA", "UAE", "Europe", "Kenya"] as Region[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={cn(
                      "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-500",
                      region === r ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "text-slate-500 hover:text-white"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-9 w-9 rounded-full border-2 border-[#030303] bg-slate-800" />
                 ))}
                 <div className="h-9 w-9 rounded-full border-2 border-[#030303] bg-meta-violet flex items-center justify-center text-[10px] font-black">+24</div>
              </div>
              <button className="h-12 px-6 rounded-2xl bg-meta-violet text-white font-black text-sm flex items-center gap-2 shadow-[0_0_40px_rgba(139,92,246,0.2)] hover:scale-105 transition-all">
                 <Plus className="h-4 w-4" /> Create New
              </button>
           </div>
        </header>

        {/* View Content */}
        <div className="p-10">
           <AnimatePresence mode="wait">
              {activeView === "dashboard" && (
                <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  {/* Hero Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {[
                       { label: "Active Nodes", value: liveStats.referrals.toLocaleString(), icon: Activity, color: "text-blue-400", sub: "+24 today" },
                       { label: "Gross Revenue", value: `$${(liveStats.revenue / 1000).toFixed(1)}k`, icon: DollarSign, color: "text-meta-violet", sub: "+12.4% growth" },
                       { label: "Conversion Rate", value: `${liveStats.conversion}%`, icon: TrendingUp, color: "text-meta-emerald", sub: "Elite tier" },
                       { label: "Pending Payouts", value: "$4.2k", icon: CreditCard, color: "text-meta-gold", sub: "Next: May 15" },
                     ].map((stat, i) => (
                       <div key={i} className="glass-card p-8 group cursor-pointer">
                          <div className="flex justify-between items-start mb-6">
                             <div className={cn("p-4 rounded-3xl bg-white/[0.03] transition-all group-hover:scale-110", stat.color)}>
                                <stat.icon className="h-6 w-6" />
                             </div>
                             <ArrowUpRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-colors" />
                          </div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                          <p className={cn("text-4xl font-black mt-2 tabular-nums", i === 1 && "meta-text-glow")}>{stat.value}</p>
                          <p className="text-[10px] font-bold text-slate-600 mt-4 uppercase tracking-widest">{stat.sub}</p>
                       </div>
                     ))}
                  </div>

                  {/* Main Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                     {/* Revenue Chart */}
                     <div className="lg:col-span-2 glass-card p-10 flex flex-col min-h-[500px]">
                        <div className="flex items-center justify-between mb-10">
                           <div>
                              <h3 className="text-2xl font-black">Performance Analytics</h3>
                              <p className="text-sm text-slate-500 font-bold">Revenue intelligence across all regions</p>
                           </div>
                           <div className="flex gap-3">
                              <button className="px-5 py-2 rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-widest">7 Days</button>
                              <button className="px-5 py-2 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest shadow-lg">30 Days</button>
                           </div>
                        </div>
                        <div className="flex-1 w-full h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={REVENUE_DATA}>
                                 <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                                       <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                 <XAxis 
                                    dataKey="name" 
                                    stroke="#ffffff20" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    dy={10}
                                 />
                                 <YAxis 
                                    stroke="#ffffff20" 
                                    fontSize={10} 
                                    tickLine={false} 
                                    axisLine={false}
                                    tickFormatter={(val) => `$${val}`}
                                 />
                                 <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '16px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                 />
                                 <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#8B5CF6" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                    animationDuration={2000}
                                 />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     {/* Geographic Traffic */}
                     <div className="glass-card p-10 flex flex-col space-y-8">
                        <div>
                           <h3 className="text-xl font-black">Node Traffic</h3>
                           <p className="text-xs text-slate-500 font-bold">Top performing geographic hubs</p>
                        </div>
                        <div className="space-y-8 flex-1">
                           {NODE_TRAFFIC.map((node, i) => (
                             <div key={i} className="space-y-3 group cursor-pointer">
                                <div className="flex justify-between items-end">
                                   <div className="flex items-center gap-3">
                                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: node.color }} />
                                      <span className="text-sm font-black group-hover:text-white transition-colors">{node.name}</span>
                                   </div>
                                   <span className="text-[10px] font-black text-slate-500">{node.value}% Capacity</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
                                   <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${node.value}%` }}
                                      transition={{ duration: 1.5, delay: i * 0.1 }}
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}40` }}
                                   />
                                </div>
                             </div>
                           ))}
                        </div>
                        <button className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                           View Global Map <Globe className="h-4 w-4" />
                        </button>
                     </div>
                  </div>

                  {/* Secondary Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                     {/* Active Campaigns */}
                     <div className="glass-card p-10 space-y-8 overflow-hidden relative">
                        <div className="flex items-center justify-between">
                           <h3 className="text-xl font-black">Campaigns</h3>
                           <Target className="h-5 w-5 text-meta-blue" />
                        </div>
                        <div className="space-y-4">
                           {[
                             { name: "Global Health V2", performance: 92, status: "active" },
                             { name: "Enterprise Flow", performance: 74, status: "active" },
                             { name: "Airlift Initiative", performance: 48, status: "paused" },
                           ].map((c, i) => (
                             <div key={i} className="p-5 rounded-3xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                   <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center", c.status === 'active' ? "bg-meta-emerald/10 text-meta-emerald" : "bg-slate-800 text-slate-500")}>
                                      <Zap className="h-5 w-5" />
                                   </div>
                                   <div>
                                      <p className="text-sm font-black">{c.name}</p>
                                      <p className="text-[10px] text-slate-600 font-bold uppercase">{c.performance}% Efficient</p>
                                   </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-800 group-hover:text-white transition-all" />
                             </div>
                           ))}
                        </div>
                        <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-meta-blue/5 rounded-full blur-3xl" />
                     </div>

                     {/* System Monitoring */}
                     <div className="glass-card p-10 bg-gradient-to-br from-[#0a0f1e] to-black border-meta-blue/20">
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-xl font-black">System Status</h3>
                           <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-meta-emerald animate-pulse" />
                              <span className="text-[10px] font-black uppercase text-meta-emerald tracking-widest">Online</span>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           {[
                             { label: "API Latency", value: "14ms", icon: Cpu },
                             { label: "Node Health", value: "99.9%", icon: Shield },
                             { label: "Active Users", value: "4.2k", icon: Users },
                             { label: "Security", value: "Tier 4", icon: Lock },
                           ].map((item, i) => (
                             <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                                <item.icon className="h-4 w-4 text-meta-blue/50" />
                                <p className="text-[10px] text-slate-500 font-black uppercase">{item.label}</p>
                                <p className="text-lg font-black">{item.value}</p>
                             </div>
                           ))}
                        </div>
                        <div className="mt-8 p-5 rounded-2xl bg-meta-blue/10 border border-meta-blue/20 flex items-center justify-between group cursor-pointer">
                           <div className="flex items-center gap-3">
                              <Activity className="h-5 w-5 text-meta-blue" />
                              <span className="text-xs font-black">Deep Analytics</span>
                           </div>
                           <ExternalLink className="h-4 w-4 text-meta-blue group-hover:translate-x-1 transition-transform" />
                        </div>
                     </div>

                     {/* Recent Activity (Live Feed) */}
                     <div className="glass-card p-10 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-xl font-black">Live Activity</h3>
                           <MousePointer2 className="h-5 w-5 text-meta-violet" />
                        </div>
                        <div className="space-y-6 flex-1 overflow-hidden relative">
                           <div className="space-y-6">
                             {[
                               { id: 1, type: "entry", text: "New node activated in UAE: DXB-7", time: "Just now", icon: Globe, val: "+1.2ms latency" },
                               { id: 2, type: "payout", text: "Commission $1,240.00 sent to Partner_TX", time: "2m ago", icon: DollarSign, val: "Confirmed" },
                               { id: 3, type: "user", text: "New elite partner onboarded: Alex_12 (USA)", time: "12m ago", icon: Users, val: "Certified" },
                               { id: 4, type: "security", text: "L4 Security patch deployed to Nairobi Hub", time: "45m ago", icon: Shield, val: "Optimal" },
                               { id: 5, type: "entry", text: "Traffic spike detected in EU-West-1", time: "1h ago", icon: Activity, val: "Managed" },
                             ].map((act, i) => (
                               <motion.div 
                                 key={act.id}
                                 initial={{ opacity: 0, x: 20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: i * 0.1 }}
                                 className="flex gap-4 items-start group"
                               >
                                  <div className="mt-1 h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-meta-violet/30 group-hover:bg-meta-violet/10 transition-all shrink-0">
                                     <act.icon className="h-4 w-4 text-slate-400 group-hover:text-meta-violet" />
                                  </div>
                                  <div className="flex-1">
                                     <div className="flex justify-between items-start">
                                        <p className="text-xs font-bold leading-tight text-slate-300 group-hover:text-white transition-colors">{act.text}</p>
                                        <span className="text-[8px] font-black text-meta-emerald uppercase ml-2">{act.val}</span>
                                     </div>
                                     <p className="text-[10px] text-slate-600 font-black uppercase mt-1">{act.time}</p>
                                  </div>
                               </motion.div>
                             ))}
                           </div>
                           <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        </div>
                        <button className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-meta-violet transition-colors">View All Logs</button>
                     </div>
                  </div>
                </motion.div>
              )}

              {activeView === "assets" && (
                <motion.div 
                  key="assets"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-10"
                >
                   <div className="flex items-center justify-between">
                      <div>
                         <h3 className="text-3xl font-black">Digital Asset Library</h3>
                         <p className="text-sm text-slate-500 font-bold mt-2">Professional marketing resources for global distribution</p>
                      </div>
                      <div className="flex gap-4">
                         <button className="h-12 px-6 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Download className="h-4 w-4" /> Download All
                         </button>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                      {[
                        { title: "Global Hero Banner", type: "IMAGE", size: "4.2MB", color: "from-meta-violet" },
                        { title: "Partner Deck 2026", type: "PDF", size: "12.8MB", color: "from-meta-blue" },
                        { title: "Network Video Ads", type: "VIDEO", size: "84.1MB", color: "from-meta-emerald" },
                        { title: "Social Media Kit", type: "ZIP", size: "15.2MB", color: "from-meta-gold" },
                        { title: "Technical Whitepaper", type: "PDF", size: "2.1MB", color: "from-slate-600" },
                        { title: "API Documentation", type: "DOC", size: "0.8MB", color: "from-meta-violet" },
                      ].map((asset, i) => (
                        <div key={i} className="glass-card group cursor-pointer border-none overflow-hidden h-[340px] flex flex-col">
                           <div className={cn("flex-1 bg-gradient-to-br transition-all duration-700 group-hover:scale-110", asset.color, "to-black/40")} />
                           <div className="p-6 bg-slate-900/80 backdrop-blur-md relative">
                              <div className="absolute top-0 right-6 -translate-y-1/2 h-10 w-10 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-y-[-70%] transition-all duration-500">
                                 <Download className="h-5 w-5" />
                              </div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{asset.type} • {asset.size}</p>
                              <p className="text-lg font-black mt-1 group-hover:text-meta-violet transition-colors">{asset.title}</p>
                              <div className="flex items-center justify-between mt-4">
                                 <button className="text-[10px] font-black uppercase text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                                    <Share2 className="h-3 w-3" /> Share Link
                                 </button>
                                 <button className="text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors">Preview</button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </main>

      {/* --- Command Palette --- */}
      <AnimatePresence>
         {isCommandOpen && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCommandOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative z-10"
              >
                 <div className="p-6 border-b border-white/10 flex items-center gap-4">
                    <Search className="h-5 w-5 text-meta-violet" />
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Type a command or search..."
                      className="flex-1 bg-transparent border-none outline-none text-lg font-bold placeholder:text-slate-600"
                    />
                    <button 
                      onClick={() => setIsCommandOpen(false)}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10"
                    >
                       Esc
                    </button>
                 </div>
                 <div className="p-4 max-h-[400px] overflow-y-auto">
                    <div className="space-y-1">
                       <p className="px-4 py-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Navigation</p>
                       {[
                         { icon: LayoutDashboard, label: "Go to Dashboard", shortcut: "G D" },
                         { icon: FileText, label: "Browse Marketing Assets", shortcut: "G A" },
                         { icon: Globe, label: "View Network Nodes", shortcut: "G N" },
                         { icon: CreditCard, label: "Financial Overview", shortcut: "G F" },
                       ].map((item, i) => (
                         <button key={i} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 group transition-all text-left">
                            <item.icon className="h-4 w-4 text-slate-500 group-hover:text-meta-violet transition-colors" />
                            <span className="flex-1 text-sm font-bold group-hover:text-white transition-colors">{item.label}</span>
                            <span className="text-[10px] font-mono text-slate-600">{item.shortcut}</span>
                         </button>
                       ))}
                    </div>
                    
                    <div className="mt-6 space-y-1">
                       <p className="px-4 py-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Actions</p>
                       {[
                         { icon: Plus, label: "Create New Campaign", shortcut: "⌘ N" },
                         { icon: Share2, label: "Share Referral Link", shortcut: "⌘ S" },
                         { icon: Bell, label: "View Notifications", shortcut: "⌘ B" },
                       ].map((item, i) => (
                         <button key={i} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 group transition-all text-left">
                            <item.icon className="h-4 w-4 text-slate-500 group-hover:text-meta-blue transition-colors" />
                            <span className="flex-1 text-sm font-bold group-hover:text-white transition-colors">{item.label}</span>
                            <span className="text-[10px] font-mono text-slate-600">{item.shortcut}</span>
                         </button>
                       ))}
                    </div>
                 </div>
                 <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between px-8">
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono">↑↓</span>
                          <span className="text-[9px] font-black text-slate-600 uppercase">Navigate</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono">↵</span>
                          <span className="text-[9px] font-black text-slate-600 uppercase">Select</span>
                       </div>
                    </div>
                    <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest">MetaPro Intelligent Search v4.2</p>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}

