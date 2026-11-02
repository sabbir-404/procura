import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Clock,
  Award,
  Sparkles,
  Filter,
  Calendar,
  Layers,
  ArrowUpRight,
  PieChart as PieIcon,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import StatCard from '../components/StatCard';
import AiInsightCard from '../components/AiInsightCard';
import {
  monthlySpendData,
  spendByCategoryData,
  topSuppliersSpendData,
  statusDistributionData,
  analyticsHistoricalData
} from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function Analytics() {
  const { metrics, addToast } = useApp();

  const [dateRange, setDateRange] = useState('Last 6 Months');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const formatBDT = (val) => {
    if (val >= 1000000) return `BDT ${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `BDT ${(val / 1000).toFixed(0)}k`;
    return `BDT ${val}`;
  };

  // Filter category data if selected
  const displayedCategoryData = selectedCategory === 'All'
    ? spendByCategoryData
    : spendByCategoryData.filter(c => c.name.toLowerCase().includes(selectedCategory.toLowerCase()));

  const aiAnalyticsInsights = [
    {
      id: "ai-an-1",
      badge: "Category Dominance",
      title: "IT equipment represents the largest share of procurement spending",
      description: "IT Hardware and Cloud infrastructure accounts for 38% (BDT 4.88M) of all corporate outlays. Dell and Cisco renewals constitute 72% of this segment.",
      actionText: "Examine Hardware Contracts",
      impact: "38% of total expenditure",
      severity: "info"
    },
    {
      id: "ai-an-2",
      badge: "Variance Alert",
      title: "Office supply expenses increased compared to previous month",
      description: "Consumable paper and toner requisitions grew by +12.4% MoM across regional facilities. Recommended action: enforce quarterly bulk ordering to retain tiered discounts.",
      actionText: "Set Threshold Cap",
      impact: "+12.4% MoM spike",
      severity: "warning"
    },
    {
      id: "ai-an-3",
      badge: "Savings Discovery",
      title: "Consolidating recurring purchases will unlock volume savings",
      description: "Multiple departments order ergonomic workstations independently. Batching into semi-annual RFQ tenders projected to save BDT 210,000 in FY26 Q4.",
      actionText: "Initiate Batch Sourcing",
      impact: "Est. BDT 210k potential",
      severity: "success"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Date / Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Procurement Analytics & Intelligence</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Live BI Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data-driven strategic purchasing insights, spend categorization, vendor benchmarks, and realized savings.
          </p>
        </div>

        {/* Global Analytics Filters */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-1.5 px-2 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                addToast(`Analytics time range updated to ${e.target.value}`, 'info');
              }}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months (FY26)</option>
              <option value="Year to Date">Year to Date (YTD)</option>
              <option value="Previous Fiscal Year">Previous Fiscal Year</option>
            </select>
          </div>

          <div className="h-4 w-[1px] bg-slate-200" />

          <div className="flex items-center gap-1.5 px-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                addToast(`Filtered analytics view for: ${e.target.value}`, 'info');
              }}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="IT Hardware">IT Hardware</option>
              <option value="Facilities">Facilities & MRO</option>
              <option value="Software">Software Licenses</option>
              <option value="Office">Office & Stationery</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Procurement Spend"
          value={metrics.totalSpend}
          comparison="+8.4% vs last period"
          trendPositive={true}
          icon={DollarSign}
          accentColor="teal"
          subtext="Budget: BDT 14.5M"
        />
        <StatCard
          title="Realized Cost Savings"
          value={metrics.costSavings}
          comparison="+18.2% negotiated"
          trendPositive={true}
          icon={TrendingUp}
          accentColor="emerald"
          subtext="Target exceeded by 4.2%"
        />
        <StatCard
          title="Average Procurement Cycle"
          value={metrics.avgProcurementCycle}
          comparison="-1.2 days faster"
          trendPositive={true}
          icon={Clock}
          accentColor="blue"
          subtext="Industry benchmark: 6.0d"
        />
        <StatCard
          title="Supplier Performance Score"
          value={metrics.supplierPerformanceScore}
          comparison="98.4% SLA adherence"
          trendPositive={true}
          icon={Award}
          accentColor="indigo"
          subtext="126 active vendors"
        />
      </div>

      {/* Row 1 Visualizations: Monthly Spend Trend & Spending by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Monthly Spend Trend (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">1. Monthly Spending Trend & Variance</h3>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  Target Controlled
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Trajectory of total procurement disbursements against authorized budget ceilings (BDT)
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
                  <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatBDT} />
                <Tooltip formatter={(val) => [`BDT ${val.toLocaleString()}`, '']} />
                <Area
                  type="monotone"
                  dataKey="spend"
                  name="Expenditure"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  fill="url(#analyticsGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="budget"
                  name="Budget"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Spending by Category (Donut Chart - 1 col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-slate-900">2. Spending by Category</h3>
            <p className="text-xs text-slate-500 mt-0.5">Capital distribution across procurement categories</p>
          </div>

          <div className="h-52 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayedCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {displayedCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`BDT ${val.toLocaleString()}`, 'Category Spend']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Spend</span>
              <span className="text-sm font-bold font-mono text-slate-800">12.8M</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {spendByCategoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-700 font-medium">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-500 font-medium">BDT {(cat.value / 1000000).toFixed(1)}M</span>
                  <span className="font-bold text-slate-800 w-8 text-right font-mono">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 Visualizations: Top Suppliers, Status Distribution & Monthly Savings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 3: Top Suppliers by Spending (Horizontal Bar Chart) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">3. Top Suppliers by Spend</h3>
            <p className="text-xs text-slate-500 mt-0.5">Top enterprise vendors by cumulative contract payments</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topSuppliersSpendData}
                margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} tickFormatter={formatBDT} />
                <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} width={110} />
                <Tooltip formatter={(val) => [`BDT ${val.toLocaleString()}`, 'Spend']} />
                <Bar dataKey="spend" fill="#0d9488" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] text-slate-400 text-center block mt-2">
            TechSource accounts for 30% of total annual outsourced procurement
          </span>
        </div>

        {/* Chart 4: Procurement Status Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">4. Requisition Status Flow</h3>
            <p className="text-xs text-slate-500 mt-0.5">Volume of transactions progressing through authorization phases</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="status" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`status-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] text-slate-400 text-center block mt-2">
            142 fulfilled requisitions with zero critical SLA breaches
          </span>
        </div>

        {/* Chart 5: Monthly Cost Savings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">5. Realized Cost Savings (BDT)</h3>
            <p className="text-xs text-slate-500 mt-0.5">Commercial negotiations vs volume discount capture</p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsHistoricalData.monthlySavings} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} tickFormatter={formatBDT} />
                <Tooltip formatter={(val) => [`BDT ${val.toLocaleString()}`, 'Savings']} />
                <Bar dataKey="negotiated" name="Negotiated" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="volumeDiscount" name="Volume Tier" fill="#5eead4" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] text-teal-700 font-semibold text-center block mt-2">
            Total FY26 savings reached BDT 1,450,000 (+18.2% YOY)
          </span>
        </div>
      </div>

      {/* Row 3: AI Spending Insights Panel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/70">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">AI Spending Insights & Strategy Recommendations</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Predictive pattern detection derived from sample expenditure records
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            3 Strategic Insights
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiAnalyticsInsights.map((insight) => (
            <AiInsightCard
              key={insight.id}
              badge={insight.badge}
              title={insight.title}
              description={insight.description}
              actionText={insight.actionText}
              impact={insight.impact}
              severity={insight.severity}
              onAction={() => addToast(`Executing AI strategy workflow for: ${insight.title}`, 'success')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

