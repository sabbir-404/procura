import React from 'react';

export default function StatusBadge({ status, type = 'status' }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  // Status mapping
  const styles = {
    // Requisitions & POs & Approvals
    pending: 'bg-amber-50 text-amber-700 border-amber-200/80',
    'under review': 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    'awaiting approval': 'bg-amber-50 text-amber-700 border-amber-200/80',
    approved: 'bg-teal-50 text-teal-700 border-teal-200/80',
    issued: 'bg-blue-50 text-blue-700 border-blue-200/80',
    processing: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    shipped: 'bg-sky-50 text-sky-700 border-sky-200/80',
    delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    rejected: 'bg-rose-50 text-rose-700 border-rose-200/80',
    cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
    draft: 'bg-slate-100 text-slate-600 border-slate-200',

    // Suppliers
    preferred: 'bg-teal-50 text-teal-700 border-teal-200/80 font-medium',
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    'under evaluation': 'bg-purple-50 text-purple-700 border-purple-200/80',
    inactive: 'bg-slate-100 text-slate-500 border-slate-200',

    // Priorities
    critical: 'bg-rose-50 text-rose-700 border-rose-200/80 font-semibold',
    high: 'bg-orange-50 text-orange-700 border-orange-200/80 font-medium',
    medium: 'bg-blue-50 text-blue-700 border-blue-200/80',
    low: 'bg-slate-100 text-slate-600 border-slate-200',

    // Quotation AI
    recommended: 'bg-teal-100 text-teal-800 border-teal-300 font-semibold',
    competitive: 'bg-blue-50 text-blue-700 border-blue-200',
    standard: 'bg-slate-100 text-slate-600 border-slate-200',

    // Payment statuses
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    unpaid: 'bg-amber-50 text-amber-700 border-amber-200',
    partial: 'bg-blue-50 text-blue-700 border-blue-200',
    'net 30 pending': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  const badgeClass = styles[normalized] || 'bg-slate-100 text-slate-700 border-slate-200';

  const dotColors = {
    pending: 'bg-amber-500',
    'under review': 'bg-indigo-500',
    'awaiting approval': 'bg-amber-500',
    approved: 'bg-teal-500',
    issued: 'bg-blue-500',
    processing: 'bg-cyan-500',
    shipped: 'bg-sky-500',
    delivered: 'bg-emerald-500',
    completed: 'bg-emerald-500',
    rejected: 'bg-rose-500',
    cancelled: 'bg-slate-400',
    draft: 'bg-slate-400',
    preferred: 'bg-teal-500',
    active: 'bg-emerald-500',
    'under evaluation': 'bg-purple-500',
    inactive: 'bg-slate-400',
    critical: 'bg-rose-500',
    high: 'bg-orange-500',
    medium: 'bg-blue-500',
    low: 'bg-slate-400',
    recommended: 'bg-teal-600',
    paid: 'bg-emerald-500',
    unpaid: 'bg-amber-500',
  };

  const dotColor = dotColors[normalized] || 'bg-slate-400';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border ${badgeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
}

