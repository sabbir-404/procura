import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  User,
  LogOut,
  RefreshCw,
  Sliders,
  ExternalLink,
  Layers,
  Store,
  Gavel
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications, markNotificationRead, resetDemoState, addToast } = useApp();
  const { currentUser, currentRole, switchRole, allRoles } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const routeTitles = {
    '/': { title: 'Procurement Dashboard', section: 'Overview' },
    '/dashboard': { title: 'Procurement Dashboard', section: 'Overview' },
    '/requisitions': { title: 'Requisitions Management', section: 'Purchasing' },
    '/requisitions/create': { title: 'Create New Requisition', section: 'Requisitions' },
    '/tenders': { title: 'Tender Management & Bidding', section: 'Tenders' },
    '/suppliers': { title: 'Supplier Directory & Management', section: 'Vendors' },
    '/quotations': { title: 'Quotations & AI Comparison', section: 'RFQs' },
    '/purchase-orders': { title: 'Purchase Orders', section: 'Orders' },
    '/approvals': { title: 'Approval Center', section: 'Workflows' },
    '/analytics': { title: 'Procurement Analytics & Intelligence', section: 'Reports' },
    '/notifications': { title: 'Notification Center', section: 'Alerts' },
    '/settings': { title: 'System & Organization Settings', section: 'Preferences' },
    '/vendor/dashboard': { title: 'Vendor Portal Overview', section: 'Vendor' },
    '/vendor/tenders': { title: 'Available Tenders for Bidding', section: 'Vendor' },
    '/vendor/my-bids': { title: 'My Submitted Bids', section: 'Vendor' },
  };

  const getPageInfo = () => {
    if (location.pathname.includes('/tenders/') && location.pathname.includes('/evaluation')) {
      return { title: 'Anonymous Bid Evaluation Dossier', section: 'Tenders & Bidding' };
    }
    if (location.pathname.includes('/vendor/tenders/') && location.pathname.includes('/submit-bid')) {
      return { title: 'Submit Competitive Sealed Bid', section: 'Vendor Portal' };
    }
    return routeTitles[location.pathname] || { title: 'Procurement Platform', section: 'Procura' };
  };

  const currentRoute = getPageInfo();
  const unreadNotifs = (notifications || []).filter(n => !n.read);

  const handleRoleChange = (roleKey) => {
    switchRole(roleKey);
    setShowRoleSwitcher(false);
    addToast(`Switched active perspective to: ${allRoles.find(r => r.key === roleKey)?.roleLabel}`, 'info');

    // Route dynamically based on new role
    if (roleKey === 'vendor') {
      navigate('/vendor/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    addToast(`Searching registry for: "${searchQuery}"...`, 'info');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Breadcrumb & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Procura</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 font-normal">{currentRoute.section}</span>
          <span className="text-slate-400">/</span>
        </div>
        <h1 className="text-base font-bold text-slate-900 tracking-tight truncate max-w-sm">
          {currentRoute.title}
        </h1>
      </div>

      {/* Right Tools: Role Switcher, Search, Notifications, Help, User */}
      <div className="flex items-center gap-3">
        {/* Prominent Demo Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100/70 border border-teal-200 text-teal-900 transition-all text-xs font-semibold shadow-2xs cursor-pointer"
            title="Switch Demo User Role"
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[11px] text-teal-700 uppercase tracking-wider font-bold">Role:</span>
            <span>{currentUser.roleLabel.split(' ')[0]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-teal-600" />
          </button>

          {showRoleSwitcher && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-elevated border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3.5 py-1.5 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Demo Perspective
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Experience Procura from different institutional roles
                </p>
              </div>

              <div className="p-1 space-y-1">
                {allRoles.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => handleRoleChange(r.key)}
                    className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      currentRole === r.key
                        ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="p-1.5 rounded-md bg-white border border-slate-200 shrink-0 mt-0.5">
                      {r.key === 'vendor' ? (
                        <Store className="w-3.5 h-3.5 text-teal-600" />
                      ) : r.key === 'approver' ? (
                        <Shield className="w-3.5 h-3.5 text-indigo-600" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 truncate">
                      <div className="font-semibold text-slate-900 leading-tight">{r.roleLabel}</div>
                      <div className="text-[11px] text-slate-500 truncate">{r.name} • {r.organization}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:block relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tenders, bids, POs (⌘K)..."
            className="w-56 pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </form>

        <div className="h-5 w-[1px] bg-slate-200" />

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-elevated border border-slate-200/90 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {unreadNotifs.length} unread
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {(notifications || []).slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      navigate(n.link);
                      setShowNotifications(false);
                    }}
                    className={`p-3 text-xs cursor-pointer transition-colors ${
                      n.read ? 'hover:bg-slate-50 opacity-80' : 'bg-teal-50/20 hover:bg-teal-50/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-900 leading-tight">{n.title}</span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    navigate('/notifications');
                    setShowNotifications(false);
                  }}
                  className="text-xs font-semibold text-teal-700 hover:underline"
                >
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Modal trigger */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Procurement Platform Guidelines & Anonymous Bidding"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-colors text-left cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                {currentUser.roleLabel.split(' ')[0]}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-elevated border border-slate-200/90 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {currentUser.roleLabel}
                </span>
              </div>

              <div className="py-1 text-xs text-slate-700">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                >
                  <span>Profile & Preferences</span>
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    resetDemoState();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-amber-700 hover:bg-amber-50 flex items-center justify-between cursor-pointer"
                >
                  <span>Reset Demo Data</span>
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={() => {
                    navigate('/login');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center justify-between cursor-pointer"
                >
                  <span>Switch Role / Sign Out</span>
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guide & Compliance Modal */}
      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="Procura Platform Architecture & Anonymous Bidding Rules"
        subtitle="Standard Operating Guidelines & Business Rules"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
            <h4 className="font-semibold text-teal-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-600" />
              Anonymous Bidding Protocol (Double-Blind Evaluation)
            </h4>
            <p className="text-teal-800 leading-relaxed">
              To prevent procurement bias, all submitted tender bids are automatically assigned an obfuscated token (e.g. <code>BIDDER-7041</code>). Evaluators review technical specifications, delivery guarantees, and pricing proposals without access to company identities.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 text-sm">Strict Anonymity Business Rules:</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Vendor identities are strictly withheld from evaluation committee screens during bidding and initial review.</li>
              <li>Vendors can access and inspect their own submissions, but competitor bids remain completely sealed and confidential.</li>
              <li>Identity reveal is restricted to authorized committee officers and strictly requires a documented business justification.</li>
              <li>All identity disclosure actions are recorded in an indelible audit log with user, timestamp, and justification reason.</li>
            </ul>
          </div>
        </div>
      </Modal>
    </header>
  );
}
