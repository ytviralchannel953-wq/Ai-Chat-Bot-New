import React, { useState, useEffect } from 'react';
import { Activity, LayoutDashboard, MessageSquare, Menu, X, Loader2 } from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import { Dashboard } from './components/Dashboard';
import { WhopService } from './services/whop';
import { WhopUser } from './types';

// Define views
type View = 'dashboard' | 'chat';

function App() {
  const [currentView, setCurrentView] = useState<View>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Whop State
  const [isLoading, setIsLoading] = useState(true);
  const [hasWhopPass, setHasWhopPass] = useState(false);
  const [user, setUser] = useState<WhopUser | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Initialize Whop Authentication
  useEffect(() => {
    const initWhop = async () => {
      try {
        const [isValid, userProfile] = await Promise.all([
          WhopService.validateLicense(),
          WhopService.getUser()
        ]);
        
        setHasWhopPass(isValid);
        setUser(userProfile);
      } catch (error) {
        console.error("Failed to initialize Whop:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initWhop();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200 font-sans">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-slate-800 rounded-md border border-slate-700"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-40 w-64 h-full bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-emerald-500" />
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">AI Chat Bot</h1>
              <p className="text-xs text-slate-500">AI Analytics</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'dashboard' 
                ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          
          <button 
            onClick={() => setCurrentView('chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'chat' 
                ? 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <MessageSquare size={18} />
            AI Analyst
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full relative flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center px-6 justify-between lg:justify-end">
          <div className="lg:hidden ml-8">
            <span className="font-semibold text-white">AI Chat Bot</span>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-4 lg:p-6 max-w-7xl mx-auto w-full">
          {currentView === 'chat' && <ChatInterface isPro={hasWhopPass} />}
          {currentView === 'dashboard' && <Dashboard />}
        </div>
      </main>
    </div>
  );
}

export default App;