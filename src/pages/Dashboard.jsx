import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Clock,
  ShoppingBag,
  Users2,
  PlusCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Gavel,
  Shield
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import AiInsightCard from '../components/AiInsightCard';
import {
  monthlySpendData,
  aiDashboardInsights,
  pendingDashboardTasks
} from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const { metrics, activities, tenders, addToast } = useApp();
  const { currentUser, currentRole } = useAuth();

  // If role is vendor, automatically redirect to Vendor Dashboard
  useEffect(() => {
    if (currentRole === 'vendor') {
      navigate('/vendor/dashboard', { replace: true });
    }
  }, [currentRole, navigate]);

  const formatBDT = (val) => {
    if (val >= 1000000) return `BDT ${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `BDT ${(val / 1000).toFixed(0)}k`;
    return `BDT ${val}`;
  };

  const activeTendersCount = tenders.filter(t => t.status === 'Published' || t.status === 'Under Evaluation').length;

  return (
    <div className="space-y-6">
      {/* 1. Welcome Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Good morning, {currentUser.name.split(' ')[0]}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              {currentUser.roleLabel}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {currentRole === 'approver'
              ? 'Here is your evaluation queue, pending requisitions, and double-blind anonymous tender bids requiring review.'
              : 'Here is your enterprise procurement overview, pending approvals, active tenders, and AI spending intelligence across divisions.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/tenders')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Gavel className="w-3.5 h-3.5 text-teal-600" />
            <span>Tenders & Bids ({activeTendersCount})</span>
          </button>

          <button
            onClick={() => navigate('/requisitions/create')}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Requisition</span>
          </button>
        </div>
      </div>

      {/* 2. Summary Statistics (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Procurement Spend"
          value={metrics.totalSpend}
          comparison={metrics.spendComparison}
          trendPositive={true}
          icon={DollarSign}
          accentColor="teal"
          subtext="FY 2026 YTD"
        />
        <StatCard
          title="Pending Approvals"
          value={metrics.pendingApprovals}
          comparison="4 high priority"
          trendPositive={false}
          icon={Clock}
          accentColor="amber"
          subtext="Requires sign-off"
        />
        <StatCard
          title="Active Tenders & POs"
          value={`${activeTendersCount} TND / ${metrics.activePOs} PO`}
          comparison="6 scheduled deliveries"
          trendPositive={true}
          icon={ShoppingBag}
          accentColor="blue"
          subtext="126 active suppliers"
        />
        <StatCard
          title="Realized Cost Savings"
          value={metrics.costSavings}
          comparison="18.2% negotiated"
          trendPositive={true}
          icon={TrendingUp}
          accentColor="emerald"
          subtext="Multi-bid optimization"
        />
      </div>

      {/* 3. Spending Overview & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Spending Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Spending Overview & Budget Trajectory</h3>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +6.8% Budget Efficiency
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Monthly actual procurement expenditure vs planned budget ceiling (May – Oct 2026)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-600" />
                Actual Spend
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-600 ml-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" />
                Budget Ceiling
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySpendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatBDT}
                />
                <Tooltip
                  formatter={(val) => [`BDT ${val.toLocaleString()}`, '']}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                />
                <Area
                  type="monotone"
                  dataKey="spend"
                  name="Actual Spend"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#spendGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="budget"
                  name="Allocated Budget"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-slate-500 block">October Spend</span>
              <span className="font-bold text-slate-800">BDT 2.40M</span>
            </div>
            <div>
              <span className="text-slate-500 block">Monthly Savings</span>
              <span className="font-bold text-teal-600">BDT 370k realized</span>
            </div>
            <div>
              <span className="text-slate-500 block">Forecast Q4</span>
              <span className="font-bold text-slate-800">Under Target (-4.2%)</span>
            </div>
          </div>
        </div>

        {/* Right Col: AI Procurement Insights */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/70">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Procurement Insights</h3>
                <span className="text-[10px] text-slate-500">Real-time pattern analysis</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              3 active alerts
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {aiDashboardInsights.map((insight) => (
              <AiInsightCard
                key={insight.id}
                badge={insight.badge}
                title={insight.title}
                description={insight.description}
                actionText={insight.actionText}
                impact={insight.impact}
                severity={insight.severity}
                onAction={() => {
                  if (insight.type === 'cost_alert') navigate('/purchase-orders');
                  else if (insight.type === 'optimization') navigate('/requisitions');
                  else navigate('/quotations');
                  addToast(`Opened workspace for: ${insight.title}`, 'info');
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom 2-Column: Recent Procurement Activity & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Procurement Activities</h3>
              <p className="text-xs text-slate-500 mt-0.5">Live audit trail of requisitions, approvals, and order dispatches</p>
            </div>
            <button
              onClick={() => navigate('/requisitions')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View all requisitions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between text-xs hover:bg-slate-50/70 px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0">
                    <FileText className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block leading-tight">{act.title}</span>
                    <span className="text-[11px] text-slate-500">
                      by <strong className="text-slate-700 font-medium">{act.user}</strong> • {act.department} • {act.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <span className="font-semibold text-slate-800 font-mono text-[11px]">{act.amount}</span>
                  <StatusBadge status={act.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks Section (1 col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Pending Actions</h3>
                <p className="text-xs text-slate-500 mt-0.5">Work items requiring your attention</p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                4 Pending
              </span>
            </div>

            <div className="space-y-2.5">
              {pendingDashboardTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => navigate(task.link)}
                  className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-teal-300 hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                      {task.type}
                    </span>
                    <span className="text-[10px] font-semibold text-rose-600">
                      {task.due}
                    </span>
                  </div>
                  <h4 className="mt-1.5 text-xs font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {task.title}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-slate-700 font-medium">{task.amount}</span>
                    <span className="inline-flex items-center gap-1 text-teal-600 font-medium group-hover:translate-x-0.5 transition-transform">
                      Review <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">All tasks synchronized</span>
            <button
              onClick={() => navigate('/approvals')}
              className="text-xs font-semibold text-teal-700 hover:underline cursor-pointer"
            >
              Open Approval Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
