import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSpreadsheet,
  FileText,
  Users2,
  Scale,
  ShoppingBag,
  CheckSquare,
  BarChart3,
  Settings,
  Sparkles,
  Building2,
  ChevronLeft,
  ChevronRight,
  Gavel,
  Bell,
  Send,
  Store,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();
  const { approvals, tenders, notifications } = useApp();
  const { currentUser, currentRole } = useAuth();

  const pendingApprovalsCount = approvals.filter(a => a.status === 'Pending').length;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;
  const activeTendersCount = tenders.filter(t => t.status === 'Published' || t.status === 'Under Evaluation').length;

  // Role-specific navigation menus
  const getNavItems = () => {
    if (currentRole === 'vendor') {
      return [
        { name: 'Vendor Dashboard', to: '/vendor/dashboard', icon: LayoutDashboard },
        { name: 'Available Tenders', to: '/vendor/tenders', icon: Gavel, badgeCount: activeTendersCount },
        { name: 'My Submitted Bids', to: '/vendor/my-bids', icon: Send },
        { name: 'Notifications', to: '/notifications', icon: Bell, badgeCount: unreadNotifsCount },
        { name: 'Settings & Profile', to: '/settings', icon: Settings },
      ];
    }

    if (currentRole === 'approver') {
      return [
        { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
        { name: 'Approval Center', to: '/approvals', icon: CheckSquare, badgeCount: pendingApprovalsCount },
        { name: 'Tenders & Evaluation', to: '/tenders', icon: Gavel, badge: 'Anonymous' },
        { name: 'Quotations', to: '/quotations', icon: Scale, badge: 'AI Match' },
        { name: 'Procurement Analytics', to: '/analytics', icon: BarChart3 },
        { name: 'Notifications', to: '/notifications', icon: Bell, badgeCount: unreadNotifsCount },
        { name: 'Settings', to: '/settings', icon: Settings },
      ];
    }

    if (currentRole === 'procurement_officer') {
      return [
        { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
        { name: 'Requisitions', to: '/requisitions', icon: FileSpreadsheet },
        { name: 'Tenders & Bidding', to: '/tenders', icon: Gavel, badgeCount: activeTendersCount },
        { name: 'Suppliers Directory', to: '/suppliers', icon: Users2 },
        { name: 'Quotations & AI', to: '/quotations', icon: Scale, badge: 'AI Match' },
        { name: 'Purchase Orders', to: '/purchase-orders', icon: ShoppingBag },
        { name: 'Notifications', to: '/notifications', icon: Bell, badgeCount: unreadNotifsCount },
        { name: 'Settings', to: '/settings', icon: Settings },
      ];
    }

    // Default / Admin: Full organizational suite
    return [
      { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
      { name: 'Requisitions', to: '/requisitions', icon: FileSpreadsheet },
      { name: 'Tenders & Bidding', to: '/tenders', icon: Gavel, badgeCount: activeTendersCount },
      { name: 'Suppliers Directory', to: '/suppliers', icon: Users2 },
      { name: 'Quotations', to: '/quotations', icon: Scale, badge: 'AI Match' },
      { name: 'Purchase Orders', to: '/purchase-orders', icon: ShoppingBag },
      { name: 'Approval Center', to: '/approvals', icon: CheckSquare, badgeCount: pendingApprovalsCount },
      { name: 'Analytics', to: '/analytics', icon: BarChart3 },
      { name: 'Notifications', to: '/notifications', icon: Bell, badgeCount: unreadNotifsCount },
      { name: 'Settings', to: '/settings', icon: Settings },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`bg-white border-r border-slate-200/90 flex flex-col shrink-0 select-none h-screen sticky top-0 z-30 transition-all duration-200 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between">
        <NavLink to={currentRole === 'vendor' ? '/vendor/dashboard' : '/dashboard'} className="flex items-center gap-3 group overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-5 h-5 text-teal-100" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900 tracking-tight">Procura</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60 uppercase tracking-wider">
                  AI SaaS
                </span>
              </div>
              <span className="text-[11px] text-slate-600 font-medium -mt-0.5">Procurement Platform</span>
            </div>
          )}
        </NavLink>

        {setIsCollapsed && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              {currentRole === 'vendor' ? 'Vendor Portal' : 'Navigation'}
            </span>
            <span className="text-[10px] font-medium text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
              {currentUser.roleLabel.split(' ')[0]}
            </span>
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/dashboard' || item.to === '/vendor/dashboard'
              ? location.pathname === item.to || (item.to === '/dashboard' && location.pathname === '/')
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.name}
              to={item.to}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center ${
                isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3.5 py-2.5'
              } rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-teal-50/80 text-teal-800 font-semibold border border-teal-200/60 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-teal-600' : 'text-slate-600'
                  }`}
                />
                {!isCollapsed && <span>{item.name}</span>}
              </div>

              {!isCollapsed && item.badge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-teal-100/70 text-teal-700 border border-teal-200/60">
                  {item.badge}
                </span>
              )}

              {!isCollapsed && item.badgeCount > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  {item.badgeCount}
                </span>
              )}

              {isCollapsed && item.badgeCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2" />
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Organization / Role Profile Footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
              {currentRole === 'vendor' ? <Store className="w-4 h-4 text-teal-700" /> : <Building2 className="w-4 h-4 text-teal-700" />}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-slate-800 leading-tight truncate">
                  {currentUser.organization}
                </span>
                <span className="text-[10px] text-teal-700 font-medium truncate">
                  {currentUser.roleLabel}
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-200/60 mt-1.5">
              <span>Currency: BDT (৳)</span>
              <span className="font-medium text-slate-700">Online</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
