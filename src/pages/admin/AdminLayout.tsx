import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  BookOpen, 
  Users, 
  MessageSquareQuote, 
  Inbox, 
  Settings, 
  LayoutDashboard, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ChevronRight
} from 'lucide-react';
import { PravinLogo } from '../../components/PravinLogo';
import { useData } from '../../context/DataContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { leads } = useData();

  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Properties', path: '/admin/properties', icon: Building2 },
    { label: 'Market Insights', path: '/admin/blog', icon: BookOpen },
    { label: 'Team & Advisors', path: '/admin/team', icon: Users },
    { label: 'Client Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'Inquiries & Leads', path: '/admin/leads', icon: Inbox, badge: newLeadsCount },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('pr_admin_auth');
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;
  const currentNavItem = navItems.find(item => item.path === location.pathname);
  const currentTitle = currentNavItem ? currentNavItem.label : 'Control Panel';

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#121316] flex flex-col md:flex-row font-sans selection:bg-[#FDE8D7] selection:text-[#9A3412]">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#121316] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-neutral-800 text-neutral-300"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <PravinLogo variant="light" textSize="text-lg" />
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/leads"
            className="relative p-2 rounded-xl bg-neutral-800 text-neutral-200"
          >
            <Bell className="w-4 h-4" />
            {newLeadsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C86D2F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {newLeadsCount}
              </span>
            )}
          </Link>
          <Link 
            to="/" 
            target="_blank" 
            className="text-xs bg-white text-[#121316] px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5 shadow-sm"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Luxury Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#121316] text-white flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out shrink-0 border-r border-neutral-800/60 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Brand */}
          <div className="p-6 border-b border-neutral-800/80 flex items-center justify-between">
            <PravinLogo variant="light" textSize="text-xl" />
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-xl hover:bg-neutral-800 text-neutral-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto flex-grow no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#FDE8D7] text-[#121316] shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${active ? 'text-[#121316]' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      active ? 'bg-[#121316] text-white' : 'bg-[#C86D2F] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-neutral-800/80 bg-[#0E0F12]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FDE8D7] text-[#121316] flex items-center justify-center font-bold text-sm shadow-xs">
                  PK
                </div>
                <div className="text-left leading-snug">
                  <p className="text-sm font-medium text-white">Pravin K.</p>
                  <p className="text-xs text-neutral-400 font-normal">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto bg-[#F8F9FA]">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-neutral-200/80 px-6 sm:px-8 lg:px-10 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-neutral-400 font-normal">Admin</span>
            <ChevronRight className="w-4 h-4 text-neutral-300" />
            <span className="font-semibold text-neutral-900">{currentTitle}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/leads"
              className="relative px-3.5 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium"
            >
              <Bell className="w-4 h-4 text-neutral-500" />
              <span>Inquiries</span>
              {newLeadsCount > 0 && (
                <span className="bg-[#C86D2F] text-white text-[11px] px-2 py-0.2 rounded-full font-bold">
                  {newLeadsCount}
                </span>
              )}
            </Link>

            <Link
              to="/"
              target="_blank"
              className="bg-[#121316] hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Container */}
        <div className="p-6 sm:p-8 lg:p-10 flex-1 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </div>

      </main>

    </div>
  );
}
