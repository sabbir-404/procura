import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  Paperclip,
  Eye,
  Check,
  X,
  MessageSquare,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export default function Approvals() {
  const { approvals, approveApproval, rejectApproval, addToast } = useApp();

  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [decisionModal, setDecisionModal] = useState({ open: false, type: '', item: null });
  const [decisionComment, setDecisionComment] = useState('');

  // Summary counts
  const pendingCount = approvals.filter(a => a.status === 'Pending').length;
  const approvedCount = approvals.filter(a => a.status === 'Approved').length;
  const rejectedCount = approvals.filter(a => a.status === 'Rejected').length;
  const avgCycle = "1.4 days";

  // Filtered requests by active tab
  const filteredApprovals = useMemo(() => {
    if (activeTab === 'All') return approvals;
    return approvals.filter(a => a.status.toLowerCase() === activeTab.toLowerCase());
  }, [approvals, activeTab]);

  const handleOpenDecision = (type, item, e) => {
    if (e) e.stopPropagation();
    setDecisionModal({ open: true, type, item });
    setDecisionComment(
      type === 'approve'
        ? 'Verified departmental budget and technical specs. Approved for issuance.'
        : type === 'reject'
        ? 'Declined due to budget ceiling constraints for Q4.'
        : 'Please provide secondary quotation comparison before proceeding.'
    );
  };

  const handleConfirmDecision = () => {
    const { type, item } = decisionModal;
    if (!item) return;

    if (type === 'approve') {
      approveApproval(item.id, decisionComment);
    } else if (type === 'reject') {
      rejectApproval(item.id, decisionComment);
    } else {
      addToast(`Change request returned to ${item.requestedBy}: "${decisionComment}"`, 'info');
    }

    setDecisionModal({ open: false, type: '', item: null });
    if (selectedApproval && selectedApproval.id === item.id) {
      setSelectedApproval(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Approval Center</h2>
          <p className="text-xs text-slate-500 mt-1">
            Centralized decision workflow to evaluate, authorize, or return internal procurement requests without navigating multiple sections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
            Role: <strong className="text-teal-700">Procurement Director (Alex Morgan)</strong>
          </span>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Awaiting My Action</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-amber-600 mt-2 block">{pendingCount}</span>
          <span className="text-[11px] text-amber-700/80 mt-0.5 block">Requires formal sign-off</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Approved This Month</span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-teal-600 mt-2 block">{approvedCount}</span>
          <span className="text-[11px] text-teal-700/80 mt-0.5 block">Total BDT 4.1M authorized</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Rejected Requests</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-rose-600 mt-2 block">{rejectedCount}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Within policy thresholds</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Approval Cycle</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{avgCycle}</span>
          <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">35% faster than benchmark</span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {['Pending', 'All', 'Approved', 'Rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>{tab}</span>
            {tab === 'Pending' && pendingCount > 0 && (
              <span className={`ml-2 px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab ? 'bg-teal-700 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Approval Requests Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Requested By</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-right">Amount (BDT)</th>
                <th className="py-3 px-4 text-center">Submitted</th>
                <th className="py-3 px-4 text-center">Priority</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApprovals.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-400">
                    No approval requests under "{activeTab}" status.
                  </td>
                </tr>
              ) : (
                filteredApprovals.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedApproval(req)}
                    className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                      {req.id}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors block line-clamp-1">
                        {req.description}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">Ref: {req.requisitionId}</span>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {req.requestedBy}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {req.department}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      BDT {req.amount.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-center text-slate-500 whitespace-nowrap">
                      {req.submittedDate}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={req.priority} />
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={req.status} />
                    </td>

                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      {req.status === 'Pending' ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={(e) => handleOpenDecision('approve', req, e)}
                            className="p-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white transition-colors"
                            title="Approve Request"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleOpenDecision('reject', req, e)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Reject Request"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleOpenDecision('changes', req, e)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                            title="Request Changes"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedApproval(req)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Panel Modal */}
      {selectedApproval && (
        <Modal
          isOpen={!!selectedApproval}
          onClose={() => setSelectedApproval(null)}
          title={`Procurement Sign-off Dossier — ${selectedApproval.id}`}
          subtitle={`Requested by ${selectedApproval.requestedBy} (${selectedApproval.department})`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5 text-xs text-slate-600">
            {/* Top Stat Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Authorization Value</span>
                <span className="text-xl font-bold font-mono text-slate-900">
                  BDT {selectedApproval.amount.toLocaleString()}
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Submitted: {selectedApproval.submittedDate} • Requisition ID: {selectedApproval.requisitionId}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={selectedApproval.priority} />
                <StatusBadge status={selectedApproval.status} />
              </div>
            </div>

            {/* Business Justification */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Executive Business Justification
              </h4>
              <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                {selectedApproval.justification}
              </p>
            </div>

            {/* Requested Items */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Itemized Line Breakdown
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Item Name</th>
                      <th className="py-2 px-3 text-center">Qty</th>
                      <th className="py-2 px-3 text-right">Unit Price</th>
                      <th className="py-2 px-3 text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(selectedApproval.items || []).map((itm, i) => (
                      <tr key={i}>
                        <td className="py-2 px-3 font-semibold text-slate-800">{itm.name}</td>
                        <td className="py-2 px-3 text-center font-mono">{itm.qty}</td>
                        <td className="py-2 px-3 text-right font-mono text-slate-600">
                          BDT {itm.unitPrice?.toLocaleString()}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                          BDT {itm.total?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Submitted Documentation & Attachments
              </h4>
              <div className="flex flex-wrap gap-2">
                {(selectedApproval.attachments || []).map((att, i) => (
                  <div
                    key={i}
                    onClick={() => addToast(`Opening preview for ${att.name}`, 'info')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-teal-600" />
                    <span className="font-medium text-slate-800">{att.name}</span>
                    <span className="text-[11px] text-slate-400">({att.size})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-tier Approval History */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Multi-Tier Approval Routing Chain
              </h4>
              <div className="space-y-3 border-l-2 border-slate-200 pl-4 ml-2">
                {(selectedApproval.approvalChain || []).map((tier, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                        tier.status === 'Approved'
                          ? 'bg-teal-500'
                          : tier.status === 'Rejected'
                          ? 'bg-rose-500'
                          : 'bg-amber-400'
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{tier.role}: {tier.name}</span>
                      <StatusBadge status={tier.status} />
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{tier.date}</span>
                    {tier.comment && (
                      <p className="text-[11px] text-slate-600 mt-1 bg-slate-50 p-2 rounded border border-slate-200/60 italic">
                        "{tier.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions if Pending */}
            {selectedApproval.status === 'Pending' && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenDecision('changes', selectedApproval)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Request Changes
                </button>
                <button
                  onClick={() => handleOpenDecision('reject', selectedApproval)}
                  className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                >
                  Reject Request
                </button>
                <button
                  onClick={() => handleOpenDecision('approve', selectedApproval)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all cursor-pointer"
                >
                  Approve Requisition
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Decision Confirmation Dialog */}
      {decisionModal.open && decisionModal.item && (
        <Modal
          isOpen={decisionModal.open}
          onClose={() => setDecisionModal({ open: false, type: '', item: null })}
          title={`Confirm Decision: ${
            decisionModal.type === 'approve'
              ? 'Approve Request'
              : decisionModal.type === 'reject'
              ? 'Reject Request'
              : 'Request Clarification / Changes'
          }`}
          subtitle={`${decisionModal.item.id} • ${decisionModal.item.description}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <p className="leading-relaxed">
              {decisionModal.type === 'approve'
                ? `You are signing off on BDT ${decisionModal.item.amount.toLocaleString()} for ${decisionModal.item.department}. A binding Purchase Order workflow will be initiated.`
                : decisionModal.type === 'reject'
                ? `You are rejecting this procurement request. The requester will be notified of the business grounds for decline.`
                : `Specify what adjustments, supplementary quotes, or specifications are required from ${decisionModal.item.requestedBy}.`}
            </p>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Official Decision Minutes / Comment</label>
              <textarea
                rows={3}
                value={decisionComment}
                onChange={(e) => setDecisionComment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setDecisionModal({ open: false, type: '', item: null })}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecision}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-sm transition-all cursor-pointer ${
                  decisionModal.type === 'approve'
                    ? 'bg-teal-600 hover:bg-teal-700'
                    : decisionModal.type === 'reject'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Confirm {decisionModal.type === 'approve' ? 'Approval' : decisionModal.type === 'reject' ? 'Rejection' : 'Request'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

