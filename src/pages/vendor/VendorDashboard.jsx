import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  Gavel,
  Send,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { tenders, bids, addToast } = useApp();
  const { currentUser } = useAuth();

  // Filter vendor's own bids strictly
  const myBids = bids.filter(b => b.vendorId === (currentUser.companyId || 'SUP-001'));
  const availableTenders = tenders.filter(t => t.status === 'Published');
  const awardedBids = myBids.filter(b => b.status === 'Awarded');
  const underEvalBids = myBids.filter(b => b.status === 'Under Evaluation' || b.status === 'Submitted');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Welcome back, {currentUser.name}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Verified Vendor Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Corporate Representative for <strong className="text-slate-800">{currentUser.organization}</strong> • Access published tenders, submit sealed competitive bids, and manage submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/vendor/tenders')}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Gavel className="w-4 h-4" />
            <span>Explore Active Tenders</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Available Tenders"
          value={availableTenders.length}
          comparison="Open for bidding"
          trendPositive={true}
          icon={Gavel}
          accentColor="teal"
          subtext="Eligible categories"
        />
        <StatCard
          title="My Submitted Bids"
          value={myBids.length}
          comparison={`${underEvalBids.length} under evaluation`}
          trendPositive={true}
          icon={Send}
          accentColor="blue"
          subtext="Double-blind sealed"
        />
        <StatCard
          title="Awarded Contracts"
          value={awardedBids.length || 1}
          comparison="BDT 3.5M lifetime"
          trendPositive={true}
          icon={Award}
          accentColor="emerald"
          subtext="Master supplier agreement"
        />
        <StatCard
          title="Vendor Quality Score"
          value="99.1%"
          comparison="Tier-1 Partner"
          trendPositive={true}
          icon={ShieldCheck}
          accentColor="indigo"
          subtext="98.4% on-time SLA"
        />
      </div>

      {/* 2 Column: Available Tenders for Bidding & My Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Available Tenders */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Available Tenders for Bidding</h3>
                <p className="text-xs text-slate-500 mt-0.5">Competitive tenders currently open for bid submission</p>
              </div>
              <button
                onClick={() => navigate('/vendor/tenders')}
                className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all ({availableTenders.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {availableTenders.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-teal-300 transition-all space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {t.id}
                    </span>
                    <span className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Deadline: {t.submissionDeadline}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {t.title}
                  </h4>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-800">Budget: {t.budgetFormatted}</span>
                    <button
                      onClick={() => navigate(`/vendor/tenders/${t.id}/submit-bid`)}
                      className="px-3 py-1 rounded-md text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer"
                    >
                      Submit Bid →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: My Submitted Bids (Strictly confidential to this vendor) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">My Registered Bids</h3>
                <p className="text-xs text-slate-500 mt-0.5">Sealed bids submitted by {currentUser.organization}</p>
              </div>
              <button
                onClick={() => navigate('/vendor/my-bids')}
                className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View My Bids</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {myBids.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No bids submitted yet. Explore available tenders to submit a quotation.
                </div>
              ) : (
                myBids.map((bid) => (
                  <div
                    key={bid.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-700 text-xs">{bid.id}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded border border-slate-200">
                          Token: {bid.bidderId}
                        </span>
                      </div>
                      <StatusBadge status={bid.status} />
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {bid.tenderTitle}
                    </h4>

                    <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
                      <span>Submitted: {bid.submissionDate}</span>
                      <span className="font-mono font-bold text-slate-900">
                        BDT {bid.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-[11px] text-teal-700 flex items-center justify-between bg-teal-50/50 p-2 rounded-lg border border-teal-100">
                      <span>Lead Time: {bid.deliveryFormatted} • {bid.warranty}</span>
                      <span className="font-semibold text-slate-600">Sealed</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Double-Blind Privacy Guarantee: Competitors' bids and prices are never revealed.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
