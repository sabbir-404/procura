import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  comparison,
  trendPositive = true,
  icon: Icon,
  accentColor = 'teal',
  subtext
}) {
  const colorMap = {
    teal: {
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-100',
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
    }
  };

  const currentTheme = colorMap[accentColor] || colorMap.teal;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg ${currentTheme.bg} ${currentTheme.text} flex items-center justify-center border ${currentTheme.border}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
      </div>

      {(comparison || subtext) && (
        <div className="mt-2.5 flex items-center text-xs gap-1.5 text-slate-600">
          {comparison && (
            <span
              className={`inline-flex items-center gap-0.5 font-medium ${
                trendPositive ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {trendPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {comparison}
            </span>
          )}
          {subtext && <span className="text-slate-500">{subtext}</span>}
        </div>
      )}
    </div>
  );
}

