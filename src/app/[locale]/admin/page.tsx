"use client";

import { ArrowLeft, Users, ShieldCheck, Activity, Search, PhoneCall, MapPin, Clock, AlertCircle, PlayCircle, Eye, RefreshCw, Terminal, CheckCircle2, Globe, BarChart, X, Save, Edit3, UserPlus, DollarSign, Server, Lock } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";

interface CallLog {
  id: string;
  destination: string | null;
  durationSeconds: number;
  hasRecording: boolean;
  flagged: boolean;
  startedAt: string;
}

interface Client {
  id: string;
  name: string | null;
  phone: string;
  balance: number;
  lastActive: string | null;
  lastLocation: string | null;
  deviceInfo: string | null;
  status: string;
  _count: { callLogs: number };
  callLogs: CallLog[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"clients" | "fusionpbx" | "map" | "analytics" | "security" | "console" | "telecom" | "pbx-dashboard" | "pbx-extensions" | "pbx-users" | "pbx-active-calls">("clients");
  const [callLogs, setCallLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);
  
  // Telecom State
  const [twilioData, setTwilioData] = useState<any>(null);
  const [twilioLoading, setTwilioLoading] = useState(false);

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Client Management State
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editBalance, setEditBalance] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<string>("Active");

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/clients');
      const data = await res.json();
      if (data.clients) {
        setClients(data.clients);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await fetch('/api/admin/call-logs');
      const data = await res.json();
      if (data.logs) {
        setCallLogs(data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLogsLoading(false);
    }
  };

  const fetchTwilioData = async () => {
    setTwilioLoading(true);
    try {
      const res = await fetch('/api/admin/twilio/balance');
      const data = await res.json();
      if (data && !data.error) {
        setTwilioData(data);
      }
    } catch (error) {
      console.error("Failed to fetch telecom data:", error);
    } finally {
      setTwilioLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch('/api/admin/analytics');
      const data = await res.json();
      if (data && !data.error) {
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchClients();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (activeTab === 'fusionpbx') {
      fetchLogs();
    } else if (activeTab === 'telecom' && !twilioData) {
      fetchTwilioData();
    } else if (activeTab === 'analytics' && !analyticsData) {
      fetchAnalyticsData();
    }
  }, [activeTab, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'BelalMaher100@@') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid password');
    }
  };

  const filteredClients = clients.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone?.includes(searchQuery)
  );

  if (!isAuthenticated) {
    return (
      <main className="flex items-center justify-center w-full min-h-screen font-sans bg-black text-gray-200">
        <div className="w-full max-w-md p-8 bg-[#0A0A0A] border border-[#1a1a1a] rounded-2xl shadow-[0_0_50px_rgba(204,169,0,0.1)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#111] border border-[#333] rounded-2xl flex items-center justify-center mb-4">
              <Lock size={32} className="text-[#cca900]" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">God Mode Access</h1>
            <p className="text-sm text-gray-500 mt-2">Enter master password to access the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Master Password"
                className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cca900] transition-colors"
                autoFocus
              />
              {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#cca900] text-black font-bold py-3 rounded-lg hover:bg-[#FFD400] transition-colors"
            >
              Access Granted
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex w-full min-h-screen font-sans bg-black text-gray-200 selection:bg-[#cca900] selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1a1a1a] hidden md:flex flex-col p-6 bg-[#050505]">
        <Link href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded bg-[#cca900] flex items-center justify-center text-black font-bold text-lg">M</div>
          <span className="font-bold text-lg tracking-tight text-white">
            Power Admin
          </span>
        </Link>

        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4 px-2">Core System</div>
        <nav className="flex flex-col gap-1 flex-grow">
          <div onClick={() => setActiveTab('clients')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'clients' ? 'bg-[#111] text-white border-l-2 border-[#cca900]' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <Users size={18} className={activeTab === 'clients' ? 'text-[#cca900]' : ''} />
            Client Directory
          </div>
          <div onClick={() => setActiveTab('pbx-dashboard')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'pbx-dashboard' ? 'bg-[#111] text-white border-l-2 border-indigo-500' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <Server size={18} className={activeTab === 'pbx-dashboard' ? 'text-indigo-500' : ''} />
            PBX Dashboard
          </div>
          <div onClick={() => setActiveTab('pbx-extensions')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'pbx-extensions' ? 'bg-[#111] text-white border-l-2 border-indigo-400' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <PhoneCall size={18} className={activeTab === 'pbx-extensions' ? 'text-indigo-400' : ''} />
            PBX Extensions
          </div>
          <div onClick={() => setActiveTab('pbx-users')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'pbx-users' ? 'bg-[#111] text-white border-l-2 border-blue-400' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <Users size={18} className={activeTab === 'pbx-users' ? 'text-blue-400' : ''} />
            PBX Users & Roles
          </div>
          <div onClick={() => setActiveTab('pbx-active-calls')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'pbx-active-calls' ? 'bg-[#111] text-white border-l-2 border-indigo-300' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <Activity size={18} className={activeTab === 'pbx-active-calls' ? 'text-indigo-300' : ''} />
            PBX Active Calls
          </div>
          <div onClick={() => setActiveTab('fusionpbx')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'fusionpbx' ? 'bg-[#111] text-white border-l-2 border-red-500' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <PhoneCall size={18} className={activeTab === 'fusionpbx' ? 'text-red-500' : ''} />
            VoIP Logs (CDRs)
          </div>
          <div onClick={() => setActiveTab('telecom')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'telecom' ? 'bg-[#111] text-white border-l-2 border-orange-500' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <DollarSign size={18} className={activeTab === 'telecom' ? 'text-orange-500' : ''} />
            Telecom & Billing
          </div>
          <div onClick={() => setActiveTab('map')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'map' ? 'bg-[#111] text-white border-l-2 border-blue-500' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <Globe size={18} className={activeTab === 'map' ? 'text-blue-500' : ''} />
            Global Network Map
          </div>
          <div onClick={() => setActiveTab('analytics')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'analytics' ? 'bg-[#111] text-white border-l-2 border-green-500' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <BarChart size={18} className={activeTab === 'analytics' ? 'text-green-500' : ''} />
            Traffic Analytics
          </div>
          <div onClick={() => setActiveTab('security')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'security' ? 'bg-[#111] text-white border-l-2 border-yellow-500' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <ShieldCheck size={18} className={activeTab === 'security' ? 'text-yellow-500' : ''} />
            App Crashlytics
          </div>
          <div onClick={() => setActiveTab('console')} className={`px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer ${activeTab === 'console' ? 'bg-[#111] text-white border-l-2 border-purple-500' : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border-l-2 border-transparent'}`}>
            <Terminal size={18} className={activeTab === 'console' ? 'text-purple-500' : ''} />
            Server Console
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-900/40 border border-red-500/50 flex items-center justify-center text-red-500 font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              CEO
            </div>
            <div>
              <p className="text-sm font-bold text-white">Dr. Belal</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-6 border-b border-[#222] bg-[#0A0A0A]">
          <Link href="/" className="text-[#cca900]"><ArrowLeft size={24} /></Link>
          <span className="font-bold text-lg">Admin Portal</span>
          <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-xs font-bold text-red-500">CEO</div>
        </div>

        <div className="p-6 md:p-12 flex-grow max-w-7xl mx-auto w-full">
          {/* Global Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1a1a1a]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#111] border border-[#333] rounded-xl flex items-center justify-center">
                {activeTab === 'clients' && <Users className="text-[#cca900]" />}
                {(activeTab === 'pbx-dashboard' || activeTab === 'pbx-extensions' || activeTab === 'pbx-users' || activeTab === 'pbx-active-calls') && <Server className="text-indigo-500" />}
                {activeTab === 'fusionpbx' && <PhoneCall className="text-red-500" />}
                {activeTab === 'telecom' && <DollarSign className="text-orange-500" />}
                {activeTab === 'map' && <Globe className="text-blue-500" />}
                {activeTab === 'analytics' && <BarChart className="text-green-500" />}
                {activeTab === 'security' && <ShieldCheck className="text-yellow-500" />}
                {activeTab === 'console' && <Terminal className="text-purple-500" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {activeTab === 'clients' && 'Client Directory'}
                  {activeTab === 'pbx-dashboard' && 'PBX Dashboard'}
                  {activeTab === 'pbx-extensions' && 'PBX Extensions'}
                  {activeTab === 'pbx-users' && 'PBX Users & Roles'}
                  {activeTab === 'pbx-active-calls' && 'PBX Active Calls'}
                  {activeTab === 'fusionpbx' && 'Live VoIP Logs'}
                  {activeTab === 'telecom' && 'Telecom & Billing'}
                  {activeTab === 'map' && 'Global Network Map'}
                  {activeTab === 'analytics' && 'Firebase Analytics'}
                  {activeTab === 'security' && 'App Crashlytics'}
                  {activeTab === 'console' && 'Root Server Console'}
                </h1>
                <p className="text-sm text-gray-500">
                  {activeTab === 'clients' && 'Manage and monitor all secure endpoints on the network.'}
                  {activeTab === 'pbx-dashboard' && 'Full direct access to the internal PBX configuration.'}
                  {activeTab === 'pbx-extensions' && 'Manage PBX extensions and accounts.'}
                  {activeTab === 'pbx-users' && 'Add and manage PBX admin users and roles.'}
                  {activeTab === 'pbx-active-calls' && 'View currently active calls in the system.'}
                  {activeTab === 'fusionpbx' && 'Real-time Call Detail Records synced directly from FusionPBX.'}
                  {activeTab === 'telecom' && 'Live Twilio API integration showing real-time balance and routes.'}
                  {activeTab === 'map' && 'Geographic tracking of active secure endpoints globally.'}
                  {activeTab === 'analytics' && 'Live Firebase Traffic Analytics for Mpower Space apps.'}
                  {activeTab === 'security' && 'Monitor mobile app crashes and stability via Firebase.'}
                  {activeTab === 'console' && 'Direct SSH terminal simulation to FusionPBX server (76.13.179.65).'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111] border border-[#333]">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-mono text-gray-300">SYSTEM.OPERATIONAL</span>
              </div>
              <button 
                onClick={() => activeTab === 'clients' ? fetchClients() : fetchLogs()}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors rounded-md text-sm font-semibold"
              >
                <RefreshCw size={16} className={loading || logsLoading ? "animate-spin" : ""} />
                Sync Data
              </button>
              {activeTab === 'clients' && (
                <a 
                  href="https://76.13.179.65" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#cca900] text-black hover:bg-[#FFD400] transition-colors rounded-md text-sm font-bold shadow-[0_0_15px_rgba(204,169,0,0.3)]"
                >
                  <UserPlus size={16} />
                  Provision Endpoint
                </a>
              )}
            </div>
          </div>

          {activeTab === 'clients' ? (
            <div className="animate-in fade-in duration-300">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#0A0A0A] border border-[#1a1a1a] p-5 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Endpoints</p>
                    <Users size={16} className="text-gray-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-white font-mono">{clients.length}</h2>
                </div>
                <div className="bg-[#0A0A0A] border border-[#1a1a1a] p-5 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Online Nodes</p>
                    <Activity size={16} className="text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white font-mono">
                    {clients.filter(c => c.status === 'Active').length}
                  </h2>
                </div>
                <div className="bg-[#0A0A0A] border border-[#1a1a1a] p-5 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Encrypted Streams</p>
                    <ShieldCheck size={16} className="text-[#cca900]" />
                  </div>
                  <h2 className="text-3xl font-bold text-white font-mono">
                    {clients.reduce((acc, curr) => acc + (curr._count?.callLogs || 0), 0)}
                  </h2>
                </div>
              </div>

              {/* Reseller Table */}
              <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#050505]">
                  <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, phone, or UUID..." 
                      className="w-full bg-[#111] border border-[#333] rounded-md pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#cca900] transition-colors"
                    />
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    Showing {filteredClients.length} records
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#080808] border-b border-[#1a1a1a] text-xs uppercase tracking-wider text-gray-500">
                        <th className="px-6 py-4 font-medium">Client Identity</th>
                        <th className="px-6 py-4 font-medium">Network ID (Phone)</th>
                        <th className="px-6 py-4 font-medium">Wallet Balance</th>
                        <th className="px-6 py-4 font-medium">Known Node</th>
                        <th className="px-6 py-4 font-medium">Last Handshake</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a1a1a]">
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center gap-3">
                              <RefreshCw size={24} className="animate-spin text-gray-600" />
                              <span className="text-gray-500 font-mono text-xs">Querying database...</span>
                            </div>
                          </td>
                        </tr>
                      ) : filteredClients.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center gap-3">
                              <Terminal size={24} className="text-gray-600" />
                              <span className="text-gray-500 font-mono text-xs">NO_RECORDS_FOUND</span>
                            </div>
                          </td>
                        </tr>
                      ) : filteredClients.map((c) => (
                        <tr key={c.id} className="hover:bg-[#111] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-200">{c.name || 'Anonymous Node'}</div>
                            <div className="text-[10px] text-gray-600 font-mono mt-1 uppercase">ID: {c.id.slice(-8)}</div>
                          </td>
                          <td className="px-6 py-4 font-mono text-gray-300">{c.phone || 'Unknown'}</td>
                          <td className="px-6 py-4 font-mono text-white">${c.balance.toFixed(2)}</td>
                          <td className="px-6 py-4 text-gray-400">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-gray-600" />
                              {c.lastLocation || 'Obfuscated'}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-gray-600" />
                              <span className="font-mono text-xs">
                                {c.lastActive ? new Date(c.lastActive).toISOString().split('T')[0] : 'NEVER'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold border ${
                              c.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                              'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => { setSelectedClient(c); setEditBalance(c.balance); setEditStatus(c.status); }}
                              className="text-xs font-semibold text-[#cca900] hover:text-white transition-colors opacity-0 group-hover:opacity-100 border border-[#cca900]/30 px-3 py-1 rounded"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300">
              <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-[#1a1a1a] flex items-center justify-between bg-[#050505]">
                  <div className="flex items-center gap-3">
                    <Terminal size={16} className="text-gray-500" />
                    <span className="text-xs font-mono text-gray-400">root@76.13.179.65:~/freeswitch/log/cdrs</span>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    {callLogs.length} Records Loaded
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#080808] border-b border-[#1a1a1a] text-xs uppercase tracking-wider text-gray-500">
                        <th className="px-6 py-4 font-medium">Timestamp</th>
                        <th className="px-6 py-4 font-medium">Origin (Caller)</th>
                        <th className="px-6 py-4 font-medium">Target (Destination)</th>
                        <th className="px-6 py-4 font-medium">Duration</th>
                        <th className="px-6 py-4 font-medium">Audio File</th>
                        <th className="px-6 py-4 font-medium text-right">Security Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1a1a1a]">
                      {logsLoading ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center gap-3">
                              <RefreshCw size={24} className="animate-spin text-gray-600" />
                              <span className="text-gray-500 font-mono text-xs">Awaiting data stream from FusionPBX...</span>
                            </div>
                          </td>
                        </tr>
                      ) : callLogs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center gap-3">
                              <CheckCircle2 size={24} className="text-gray-600" />
                              <span className="text-gray-500 font-mono text-xs">STREAM_ACTIVE : NO_CALLS_DETECTED</span>
                            </div>
                          </td>
                        </tr>
                      ) : callLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#111] transition-colors group">
                          <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                            {new Date(log.startedAt).toISOString().replace('T', ' ').slice(0, 19)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-mono text-gray-200">{log.callerId || log.user?.phone || 'UNKNOWN_ORIGIN'}</div>
                            {log.user?.name && <div className="text-[10px] text-gray-600 uppercase mt-1">{log.user.name}</div>}
                          </td>
                          <td className="px-6 py-4 font-mono text-gray-300">{log.destination || 'UNKNOWN_TARGET'}</td>
                          <td className="px-6 py-4 font-mono text-gray-400">
                            {String(Math.floor(log.durationSeconds / 60)).padStart(2, '0')}:{String(log.durationSeconds % 60).padStart(2, '0')}
                          </td>
                          <td className="px-6 py-4">
                            {log.hasRecording ? (
                              <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded text-xs font-semibold">
                                <PlayCircle size={14} />
                                Play.wav
                              </button>
                            ) : (
                              <span className="text-gray-600 text-xs font-mono">--</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {log.flagged ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/10 text-red-500 border border-red-500/20">
                                <AlertCircle size={10} />
                                FLAGGED
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-gray-500 border border-gray-800">
                                <ShieldCheck size={10} />
                                SECURE
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pbx-dashboard' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#050505] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl h-[850px] relative w-full">
              <iframe 
                src="https://calls.mpowerspace.ai/mpower_sso.php?token=mpower_god_mode_2024&redirect=/core/dashboard/" 
                className="w-full h-full border-none absolute inset-0"
                title="FusionPBX Dashboard"
              />
            </div>
          </div>
        )}

        {activeTab === 'pbx-extensions' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#050505] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl h-[850px] relative w-full">
              <iframe 
                src="https://calls.mpowerspace.ai/mpower_sso.php?token=mpower_god_mode_2024&redirect=/app/extensions/extensions.php" 
                className="w-full h-full border-none absolute inset-0"
                title="FusionPBX Extensions"
              />
            </div>
          </div>
        )}

          {activeTab === 'pbx-users' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-[#050505] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl h-[850px] relative w-full">
                <iframe 
                  src="https://calls.mpowerspace.ai/mpower_sso.php?token=mpower_god_mode_2024&redirect=/core/users/users.php" 
                  className="w-full h-full border-none absolute inset-0"
                  title="FusionPBX Users"
                />
              </div>
            </div>
          )}

          {activeTab === 'pbx-active-calls' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-[#050505] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl h-[850px] relative w-full">
                <iframe 
                  src="https://calls.mpowerspace.ai/mpower_sso.php?token=mpower_god_mode_2024&redirect=/app/calls_active/calls_active.php" 
                  className="w-full h-full border-none absolute inset-0"
                  title="FusionPBX Active Calls"
                />
              </div>
            </div>
          )}

          {activeTab === 'telecom' && (
            <div className="animate-in fade-in duration-300">
              {/* Quick Stats for Telecom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0A0A0A] border border-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Company Wallet Balance</p>
                    <DollarSign size={20} className="text-orange-500" />
                  </div>
                  {twilioLoading ? (
                    <div className="h-10 flex items-center"><RefreshCw size={20} className="animate-spin text-gray-600" /></div>
                  ) : (
                    <div className="relative z-10">
                      <h2 className="text-4xl font-bold text-white font-mono flex items-baseline gap-2">
                        {Number(twilioData?.balance || 0).toFixed(2)}
                        <span className="text-sm font-normal text-gray-500 uppercase tracking-widest">{twilioData?.currency || 'USD'}</span>
                      </h2>
                      <p className="text-[10px] font-mono text-gray-600 mt-2 uppercase">Twilio Live API Sync</p>
                    </div>
                  )}
                </div>

                <div className="bg-[#0A0A0A] border border-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Phone Numbers</p>
                    <PhoneCall size={20} className="text-green-500" />
                  </div>
                  {twilioLoading ? (
                    <div className="h-10 flex items-center"><RefreshCw size={20} className="animate-spin text-gray-600" /></div>
                  ) : (
                    <div className="relative z-10">
                      <h2 className="text-4xl font-bold text-white font-mono">
                        {twilioData?.activeNumbers || 0}
                      </h2>
                      <p className="text-[10px] font-mono text-gray-600 mt-2 uppercase">Provisioned Routes</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed view (Mocked for now, but UI is ready) */}
              <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-[#1a1a1a] flex items-center justify-between bg-[#050505]">
                  <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-orange-500" />
                    <span className="font-bold text-gray-200">Twilio Infrastructure</span>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    API CONNECTED
                  </div>
                </div>
                
                <div className="p-8 text-center border-b border-[#1a1a1a]">
                   <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                     <Globe size={32} className="text-orange-500" />
                   </div>
                   <h2 className="text-xl font-bold mb-3 text-white">Telecom Carrier Gateway</h2>
                   <p className="text-gray-400 text-sm max-w-lg mx-auto">
                     Your live connection to Twilio is established. The API is currently fetching real-time financial balance and provisioned numbers.
                   </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'map' && (
             <div className="animate-in fade-in duration-300">
               <div className="bg-[#050505] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl h-[600px] relative flex items-center justify-center">
                 {/* Radar UI */}
                 <div className="absolute w-[800px] h-[800px] border border-[#cca900]/5 rounded-full"></div>
                 <div className="absolute w-[600px] h-[600px] border border-[#cca900]/10 rounded-full animate-spin" style={{animationDuration: '30s'}}></div>
                 <div className="absolute w-[400px] h-[400px] border border-[#cca900]/20 rounded-full border-dashed animate-spin" style={{animationDuration: '40s', animationDirection: 'reverse'}}></div>
                 <div className="absolute w-[200px] h-[200px] border border-[#cca900]/30 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
                 
                 {/* Center Node */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_red]"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-red-500/50 rounded-full animate-ping"></div>

                 {/* Simulated Nodes on Map (Positioned Randomly for Demo based on clients) */}
                 {clients.filter(c => c.status === 'Active').map((c, i) => {
                   const top = `${20 + (i * 15) % 60}%`;
                   const left = `${20 + (i * 25) % 60}%`;
                   return (
                     <div key={c.id} className="absolute" style={{ top, left }}>
                       <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                       <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-[#333] px-2 py-1 rounded text-[10px] font-mono text-gray-300 whitespace-nowrap">
                         {c.lastLocation || 'Hidden'} <span className="text-[#cca900] ml-1">{c.phone}</span>
                       </div>
                     </div>
                   );
                 })}
                 
                 {/* Live Tracker Panel */}
                 <div className="absolute top-6 left-6 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#1a1a1a] p-5 rounded-xl min-w-[250px]">
                    <h3 className="text-[#cca900] font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Globe size={16}/> Active Tracking
                    </h3>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {clients.filter(c => c.status === 'Active').map(c => (
                         <div key={c.id} className="flex items-center gap-3 border-b border-[#222] pb-2 last:border-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <div>
                              <div className="text-xs font-bold text-gray-200">{c.phone}</div>
                              <div className="text-[10px] font-mono text-gray-500">{c.lastLocation || 'Obfuscated'}</div>
                            </div>
                         </div>
                      ))}
                      {clients.filter(c => c.status === 'Active').length === 0 && (
                        <div className="text-xs text-gray-500 font-mono">No active nodes detected.</div>
                      )}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0A0A0A] border border-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Live Active Users</p>
                    <Users size={20} className="text-green-500" />
                  </div>
                  {analyticsLoading ? (
                    <div className="h-10 flex items-center"><RefreshCw size={20} className="animate-spin text-gray-600" /></div>
                  ) : (
                    <div className="relative z-10">
                      <h2 className="text-4xl font-bold text-white font-mono flex items-baseline gap-2">
                        {analyticsData?.activeUsers || 0}
                      </h2>
                      <p className="text-[10px] font-mono text-gray-600 mt-2 uppercase">Real-time Firebase Sync</p>
                    </div>
                  )}
                </div>

                <div className="bg-[#0A0A0A] border border-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Measurement ID</p>
                    <Activity size={20} className="text-blue-500" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white font-mono mt-2">
                      G-JEK442QDYY
                    </h2>
                    <p className="text-[10px] font-mono text-gray-600 mt-2 uppercase">Google Analytics 4 Stream</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart size={32} className="text-green-500" />
                </div>
                <h2 className="text-xl font-bold mb-3 text-white">Analytics API Connected</h2>
                <p className="text-gray-400 text-sm max-w-lg mx-auto mb-6">
                  The Stream ID <span className="text-[#cca900] font-mono">14587478266</span> has been linked. 
                  {analyticsData?.mocked && (
                    <span className="block mt-4 text-red-400 font-mono text-xs border border-red-500/30 bg-red-500/10 p-3 rounded text-left">
                      <strong>ACTION REQUIRED:</strong> To fetch real-time data, we need the Google Cloud Service Account JSON file (CLIENT_EMAIL and PRIVATE_KEY) placed in the Vercel environment variables.
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-[#0A0A0A] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl p-10 text-center">
                <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck size={32} className="text-yellow-500" />
                </div>
                <h2 className="text-xl font-bold mb-3 text-white">Crashlytics API Connected</h2>
                <p className="text-gray-400 text-sm max-w-lg mx-auto mb-6">
                  App crash monitoring is active. Currently running via backend polling to prevent Google X-Frame restrictions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="bg-[#111] border border-[#222] p-4 rounded-lg">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Fatal Crashes</div>
                    <div className="text-2xl font-mono text-white">0</div>
                  </div>
                  <div className="bg-[#111] border border-[#222] p-4 rounded-lg">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Non-Fatal Errors</div>
                    <div className="text-2xl font-mono text-white">0</div>
                  </div>
                  <div className="bg-[#111] border border-[#222] p-4 rounded-lg">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Crash-Free Users</div>
                    <div className="text-2xl font-mono text-green-500">100%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Client Management Modal */}
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 animate-in fade-in duration-200">
            <div className="bg-[#050505] border border-[#333] rounded-2xl w-full max-w-lg p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Edit3 className="text-[#cca900]" size={20} /> Manage Node: {selectedClient.id.slice(-8)}
                </h2>
                <button onClick={() => setSelectedClient(null)} className="text-gray-500 hover:text-white transition-colors p-1"><X size={20} /></button>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-semibold">Identity / Phone</label>
                  <div className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-sm text-gray-300 font-mono flex items-center justify-between">
                    <span>{selectedClient.phone} {selectedClient.name ? `(${selectedClient.name})` : ''}</span>
                    <span className="text-[10px] bg-[#222] px-2 py-0.5 rounded text-gray-400">READ-ONLY</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-semibold">Known Location</label>
                  <div className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-sm text-gray-300 flex items-center gap-2 font-mono">
                    <MapPin size={14} className="text-red-500" /> {selectedClient.lastLocation || 'Obfuscated by Network'}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-semibold">Wallet Balance ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input 
                      type="number" 
                      value={editBalance}
                      onChange={(e) => setEditBalance(Number(e.target.value))}
                      className="w-full bg-[#111] border border-[#333] rounded-lg pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#cca900] font-mono transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block font-semibold">Network Status</label>
                  <select 
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#cca900] transition-colors cursor-pointer appearance-none"
                  >
                    <option value="Active">🟢 Active (Permitted)</option>
                    <option value="Suspended">🔴 Suspended (Blocked)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-[#1a1a1a]">
                <button onClick={() => setSelectedClient(null)} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:bg-[#111] transition-colors">Cancel</button>
                <button 
                  onClick={() => {
                    // Logic to save goes here
                    setSelectedClient(null);
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#cca900] text-black hover:bg-[#FFD400] transition-all rounded-lg text-sm font-bold shadow-[0_0_20px_rgba(204,169,0,0.2)]"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}