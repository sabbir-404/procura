import React from 'react';
import { Sparkles, ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, ShieldAlert } from 'lucide-react';

export default function AiInsightCard({
  badge = "AI Insight",
  title,
  description,
  actionText,
  onAction,
  impact,
  severity = "info"
}) {
  const severityStyles = {
    warning: {
      border: "border-amber-200/90",
      badgeBg: "bg-amber-100 text-amber-800",
      accent: "text-amber-600",
      icon: AlertTriangle,
      bg: "bg-gradient-to-r from-amber-50/50 via-white to-white"
    },
    success: {
      border: "border-teal-200/90",
      badgeBg: "bg-teal-100 text-teal-800",
      accent: "text-teal-600",
      icon: TrendingUp,
      bg: "bg-gradient-to-r from-teal-50/40 via-white to-white"
    },
    info: {
      border: "border-indigo-200/90",
      badgeBg: "bg-indigo-100 text-indigo-800",
      accent: "text-indigo-600",
      icon: Sparkles,
      bg: "bg-gradient-to-r from-indigo-50/40 via-white to-white"
    }
  };

  const style = severityStyles[severity] || severityStyles.info;
  const IconComponent = style.icon;

  return (
    <div className={`rounded-xl p-4 border ${style.border} ${style.bg} shadow-sm transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-white shadow-xs border border-slate-200/60 text-teal-600">
            <Sparkles className="w-4 h-4 text-teal-600" />
          </span>
          <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${style.badgeBg}`}>
            {badge}
          </span>
        </div>
        {impact && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {impact}
          </span>
        )}
      </div>

      <h4 className="mt-2.5 text-sm font-semibold text-slate-900 leading-snug">
        {title}
      </h4>

      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
        {description}
      </p>

      {actionText && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onAction}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors group cursor-pointer"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <span className="text-[10px] text-slate-600 italic">Simulated recommendation</span>
        </div>
      )}
    </div>
  );
}

