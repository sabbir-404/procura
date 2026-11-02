import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  ArrowRight,
  Shield,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

export default function MyBids() {
  const navigate = useNavigate();
  const { bids, addToast } = useApp();
  const { currentUser } = useAuth();

  const [selectedBid, setSelectedBid] = useState(null);

  // Strictly filter only this vendor's bids
  const vendorCompanyId = currentUser.companyId || 'SUP-001';
  const myBids = bids.filter(b => b.vendorId === vendorCompanyId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Submitted Bids</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Vendor Confidential Registry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track the status of bids submitted by <strong className="text-slate-800">{currentUser.organization}</strong> across competitive tenders.
          </p>
        </div>

        <button
          onClick={() => navigate('/vendor/tenders')}
          className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Submit New Bid</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Bids</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">{myBids.length}</span>
          <span className="text-[11px] text-slate-500">Registered on platform</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Under Evaluation</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">
            {myBids.filter(b => b.status === 'Under Evaluation' || b.status === 'Submitted').length}
          </span>
          <span className="text-[11px] text-amber-600/80">Double-blind evaluation</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Awarded</span>
          <span className="text-2xl font-bold text-teal-600 mt-1 block">
            {myBids.filter(b => b.status === 'Awarded').length}
          </span>
          <span className="text-[11px] text-teal-700/80">PO generated</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Privacy Standard</span>
          <span className="text-2xl font-bold text-indigo-600 mt-1 block">100%</span>
          <span className="text-[11px] text-indigo-600/80">Competitor bids sealed</span>
        </div>
      </div>

      {/* Bids Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Bid Reference ID</th>
                <th className="py-3 px-4">Anonymous Token</th>
                <th className="py-3 px-4">Tender Title</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4 text-right">Quoted Amount</th>
                <th className="py-3 px-4 text-center">Committed SLA</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myBids.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">
                    No bids recorded for your company. Browse available tenders to participate.
                  </td>
                </tr>
              ) : (
                myBids.map((bid) => (
                  <tr
                    key={bid.id}
                    onClick={() => setSelectedBid(bid)}
                    className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                      {bid.id}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 font-semibold">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {bid.bidderId}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs font-semibold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                      {bid.tenderTitle}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {bid.submissionDate}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      BDT {bid.totalAmount.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-center text-slate-700">
                      {bid.deliveryFormatted}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={bid.status} />
                    </td>

                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedBid(bid)}
                          className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                          title="View My Submission"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bid Details Modal */}
      {selectedBid && (
        <Modal
          isOpen={!!selectedBid}
          onClose={() => setSelectedBid(null)}
          title={`My Bid Submission — ${selectedBid.id}`}
          subtitle={`Tender: ${selectedBid.tenderTitle}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Total Bid Amount</span>
                <span className="font-mono font-bold text-slate-900 text-base">
                  BDT {selectedBid.totalAmount.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Unit: BDT {selectedBid.unitPrice.toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Anonymous Bidder Token</span>
                <span className="font-mono font-bold text-teal-700 text-base">{selectedBid.bidderId}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Assigned by Procura Double-Blind Engine
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-xs">Technical Overview</span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {selectedBid.technicalProposalText}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block text-xs">Delivery Timeline</span>
                <p className="text-slate-700 text-[11px] mt-0.5">{selectedBid.deliveryFormatted}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block text-xs">Payment Terms</span>
                <p className="text-slate-700 text-[11px] mt-0.5">{selectedBid.paymentTerms}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block text-xs">Warranty Guarantee</span>
              <p className="text-slate-700 text-[11px] mt-0.5">{selectedBid.warranty}</p>
            </div>

            <p className="text-[11px] text-slate-400 text-center italic">
              Competitor bid pricing and proposals are sealed under the Procura Anonymous Bidding Protocol.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

