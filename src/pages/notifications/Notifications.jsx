import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Clock,
  Gavel,
  CheckSquare,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const { currentRole } = useAuth();

  const [filterTab, setFilterTab] = useState('All');

  const filteredNotifs = notifications.filter(n => {
    if (filterTab === 'Unread') return !n.read;
    if (filterTab === 'Approvals') return n.category === 'Approvals';
    if (filterTab === 'Tenders') return n.category === 'Tenders' || n.category === 'Vendor';
    if (filterTab === 'Orders') return n.category === 'Purchase Orders';
    return true;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Approvals':
        return <CheckSquare className="w-4 h-4 text-amber-600" />;
      case 'Tenders':
        return <Gavel className="w-4 h-4 text-teal-600" />;
      case 'Vendor':
        return <Gavel className="w-4 h-4 text-teal-600" />;
      case 'Purchase Orders':
        return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notification Center</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              {notifications.filter(n => !n.read).length} Unread
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time procurement alerts, tender bid submissions, clarification notices, and approval status updates.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Check className="w-3.5 h-3.5 text-teal-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-3">
        {['All', 'Unread', 'Approvals', 'Tenders', 'Orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterTab === tab
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {filteredNotifs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No notifications in this view.
          </div>
        ) : (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markNotificationRead(item.id);
                navigate(item.link);
              }}
              className={`p-4 transition-colors flex items-start justify-between gap-3 cursor-pointer ${
                item.read ? 'hover:bg-slate-50' : 'bg-teal-50/20 hover:bg-teal-50/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 shrink-0 mt-0.5">
                  {getCategoryIcon(item.category)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-xs">{item.title}</span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                    )}
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-1.5 py-0.2 rounded">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  <span className="text-[11px] text-slate-400 block mt-1.5">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(item.id);
                  }}
                  className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
