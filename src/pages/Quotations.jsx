import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Shield,
  CreditCard,
  Star,
  Download,
  Eye,
  MessageSquare,
  Check,
  ChevronDown,
  AlertTriangle,
  Info,
  DollarSign,
  TrendingUp,
  FileText,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export default function Quotations() {
  const navigate = useNavigate();
  const { rfq, selectRfqSupplier, selectedSupplierForRfq, addToast } = useApp();

  const [activeRfqId, setActiveRfqId] = useState(rfq.rfqId);
  const [selectedQuoteForModal, setSelectedQuoteForModal] = useState(null);
  const [confirmingSupplier, setConfirmingSupplier] = useState(null);
  const [clarificationSupplier, setClarificationSupplier] = useState(null);
  const [clarificationMessage, setClarificationMessage] = useState('');
  const [selectionNote, setSelectionNote] = useState('Authorized based on balanced AI procurement evaluation: superior SLA & 7-day turnaround.');

  const quotes = rfq.quotations;
  const ai = rfq.aiRecommendation;

  const handleSelectConfirm = () => {
    if (!confirmingSupplier) return;
    selectRfqSupplier(confirmingSupplier.supplierName);
    setConfirmingSupplier(null);
  };

  const handleSendClarification = (e) => {
    e.preventDefault();
    if (!clarificationMessage.trim()) return;
    addToast(`Clarification request transmitted to ${clarificationSupplier.supplierName} portal.`, 'success');
    setClarificationSupplier(null);
    setClarificationMessage('');
  };

  const handleDownload = (supplierName) => {
    addToast(`Downloading official quotation document from ${supplierName}...`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quotation Comparison & AI Decision Support</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Multi-Attribute Evaluation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate competitive vendor bids side-by-side using multi-dimensional cost, SLA, and reliability analysis.
          </p>
        </div>

        {/* Active RFQ Selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Active Tender:</span>
          <select
            value={activeRfqId}
            onChange={(e) => setActiveRfqId(e.target.value)}
            className="text-xs font-bold text-teal-800 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="RFQ-2026-088">RFQ-2026-088: Developer Laptops (45 units)</option>
            <option value="RFQ-2026-085">RFQ-2026-085: Core Datacenter Switches</option>
            <option value="RFQ-2026-079">RFQ-2026-079: Ergonomic Sit-Stand Desks</option>
          </select>
        </div>
      </div>

      {/* RFQ Tender Overview Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-xs">
          {/* Col 1 */}
          <div className="pr-2 space-y-1">
            <span className="text-[11px] text-slate-600 uppercase font-semibold">Tender Reference</span>
            <div className="font-bold text-slate-900 font-mono text-sm">{rfq.rfqId}</div>
            <p className="text-[11px] text-slate-600 line-clamp-1">{rfq.title}</p>
          </div>

          {/* Col 2 */}
          <div className="md:px-4 pt-3 md:pt-0 space-y-1">
            <span className="text-[11px] text-slate-600 uppercase font-semibold">Department & Scope</span>
            <div className="font-semibold text-slate-900">{rfq.department}</div>
            <p className="text-[11px] text-slate-600">Requested by: {rfq.requestedBy}</p>
          </div>

          {/* Col 3 */}
          <div className="md:px-4 pt-3 md:pt-0 space-y-1">
            <span className="text-[11px] text-slate-600 uppercase font-semibold">Approved Budget Limit</span>
            <div className="font-bold text-slate-900 font-mono text-sm">{rfq.budgetLimit}</div>
            <p className="text-[11px] text-emerald-600 font-medium">Bids within allocation</p>
          </div>

          {/* Col 4 */}
          <div className="md:pl-4 pt-3 md:pt-0 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-600 uppercase font-semibold block">Bidding Participation</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-slate-900">{rfq.receivedQuotationsCount} Quotes</span>
                <span className="text-[11px] text-slate-600">from {rfq.invitedSuppliersCount} invited</span>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-teal-50 text-teal-700 font-semibold text-[11px] border border-teal-200">
              Quorum Met
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-xl">
          <Info className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            <strong className="text-slate-800">Specifications:</strong> {rfq.itemSpecifications}
          </span>
        </div>
      </div>

      {/* AI-Powered Recommendation Panel (FLAGSHIP COMPONENT) */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 text-white shadow-elevated border border-teal-700/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
                <Sparkles className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    AI Decision Recommendation Engine
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-200 border border-teal-400/30 uppercase tracking-wider">
                    {ai.badgeText}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Multi-variable synthesized scoring across price, lead time, historical reliability, and enterprise warranty
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs text-right">
                <span className="text-[10px] text-teal-200 block uppercase font-semibold">AI Match Score</span>
                <span className="text-sm font-bold text-white font-mono">{ai.confidenceScore}</span>
              </div>
            </div>
          </div>

          {/* Rationale Callout */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-teal-200">
                  Recommended Supplier: {ai.recommendedSupplier}
                </h4>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  "Although this supplier is not the lowest-cost option (BDT 6,750,000 vs BDT 6,480,000 from Bengal Micro Systems), it provides a decisively stronger combination of <strong>rapid 7-day turnaround</strong>, <strong>36-month on-site mission SLA</strong>, and superior <strong>98.4% historical delivery fulfillment</strong>."
                </p>
              </div>
            </div>

            {/* 4 Key Decision Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
              {ai.keyReasons.map((reason, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                  <span className="font-semibold text-teal-300 block mb-1">{reason.title}</span>
                  <p className="text-[11px] text-slate-300 leading-snug">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Score breakdown across suppliers */}
          <div className="pt-1 flex flex-col md:flex-row items-center justify-between text-xs text-slate-300 gap-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="text-[11px] text-slate-300">{ai.disclaimer}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirmingSupplier(quotes[0])}
                className="px-4 py-2 text-xs font-bold text-slate-900 bg-teal-300 hover:bg-teal-200 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4 text-slate-900" />
                <span>Award to {ai.recommendedSupplier}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quotation Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Side-by-Side Quotation Comparison</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              3 verified formal bids received against RFQ-2026-088 criteria
            </p>
          </div>
          {selectedSupplierForRfq && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Selected Supplier: {selectedSupplierForRfq}</span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Supplier & Specs</th>
                <th className="py-3 px-4 text-right">Quoted Unit Price</th>
                <th className="py-3 px-4 text-right">Total Bid (BDT)</th>
                <th className="py-3 px-4 text-center">Delivery Time</th>
                <th className="py-3 px-4">Warranty & Support</th>
                <th className="py-3 px-4">Payment Terms</th>
                <th className="py-3 px-4 text-center">Vendor Rating</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotes.map((q) => {
                const isSelected = selectedSupplierForRfq === q.supplierName;

                return (
                  <tr
                    key={q.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-teal-50/50'
                        : q.isAiRecommended
                        ? 'bg-teal-50/20 hover:bg-teal-50/40'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Supplier */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 border ${
                            q.isAiRecommended
                              ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                              : 'bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        >
                          {q.logoInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-slate-900 text-xs">{q.supplierName}</span>
                            {q.isAiRecommended && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 border border-teal-300">
                                AI Top Pick
                              </span>
                            )}
                            {isSelected && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{q.specDetails}</p>
                        </div>
                      </div>
                    </td>

                    {/* Unit Price */}
                    <td className="py-4 px-4 text-right font-mono font-medium text-slate-800">
                      BDT {q.unitPriceBDT.toLocaleString()}
                    </td>

                    {/* Total Amount + Indicator */}
                    <td className="py-4 px-4 text-right">
                      <div className="font-mono font-bold text-slate-900 text-sm">
                        BDT {q.totalAmountBDT.toLocaleString()}
                      </div>
                      {q.isLowestPrice && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          Lowest Price (-4.0%)
                        </span>
                      )}
                    </td>

                    {/* Delivery Time + Indicator */}
                    <td className="py-4 px-4 text-center">
                      <div className="font-semibold text-slate-800">{q.deliveryTime}</div>
                      {q.isFastestDelivery && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                          Fastest (7 Days)
                        </span>
                      )}
                    </td>

                    {/* Warranty */}
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {q.warranty}
                    </td>

                    {/* Payment Terms */}
                    <td className="py-4 px-4 text-slate-600 font-mono text-[11px]">
                      {q.paymentTerms}
                    </td>

                    {/* Vendor Rating */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-1 font-semibold text-slate-900 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/70">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{q.supplierRating}</span>
                      </div>
                      <div className="text-[10px] text-slate-600 mt-0.5">{q.historicalReliability} on-time</div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <StatusBadge status={isSelected ? 'Approved' : q.quotationStatus} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedQuoteForModal(q)}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                          title="View Full Quotation & Scoring"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDownload(q.supplierName)}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                          title="Download Quote PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setClarificationSupplier(q)}
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                          title="Request Clarification"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setConfirmingSupplier(q)}
                          className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-teal-600 hover:bg-teal-700 text-white'
                          }`}
                        >
                          {isSelected ? 'Awarded' : 'Select'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Supplier Selection */}
      {confirmingSupplier && (
        <Modal
          isOpen={!!confirmingSupplier}
          onClose={() => setConfirmingSupplier(null)}
          title={`Confirm Supplier Award — ${confirmingSupplier.supplierName}`}
          subtitle={`RFQ-2026-088 • Total Contract Value: BDT ${confirmingSupplier.totalAmountBDT.toLocaleString()}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Commitment Confirmation</span>
                <span>
                  Awarding this quotation will establish {confirmingSupplier.supplierName} as the primary supplier for RFQ-2026-088 and automatically generate Purchase Order draft PO-2026-105.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Unit Price:</span>
                <span className="font-bold text-slate-800">BDT {confirmingSupplier.unitPriceBDT.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Committed Delivery:</span>
                <span className="font-bold text-slate-800">{confirmingSupplier.deliveryTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Warranty SLA:</span>
                <span className="font-bold text-slate-800">{confirmingSupplier.warranty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Terms:</span>
                <span className="font-bold text-slate-800">{confirmingSupplier.paymentTerms}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Procurement Award Justification / Minutes</label>
              <textarea
                rows={3}
                value={selectionNote}
                onChange={(e) => setSelectionNote(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setConfirmingSupplier(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSelectConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all cursor-pointer"
              >
                Confirm Award & Generate PO
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Quote Detail Modal */}
      {selectedQuoteForModal && (
        <Modal
          isOpen={!!selectedQuoteForModal}
          onClose={() => setSelectedQuoteForModal(null)}
          title={`Quotation Assessment — ${selectedQuoteForModal.supplierName}`}
          subtitle={`${selectedQuoteForModal.id} • Bid Submitted Oct 2026`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Total Bid Value</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  BDT {selectedQuoteForModal.totalAmountBDT.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  BDT {selectedQuoteForModal.unitPriceBDT.toLocaleString()} / unit (45 units)
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">AI Evaluation Score</span>
                <span className="text-base font-bold text-teal-700 font-mono">
                  {selectedQuoteForModal.score} / 100
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Historical On-Time: {selectedQuoteForModal.historicalReliability}
                </span>
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Multi-Factor Score Breakdown
              </h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-0.5">
                    <span>Price Competitiveness</span>
                    <span>{selectedQuoteForModal.scoreBreakdown?.priceScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${selectedQuoteForModal.scoreBreakdown?.priceScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-0.5">
                    <span>Delivery SLA & Lead Time</span>
                    <span>{selectedQuoteForModal.scoreBreakdown?.deliveryScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${selectedQuoteForModal.scoreBreakdown?.deliveryScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-0.5">
                    <span>Supplier Historical Reliability</span>
                    <span>{selectedQuoteForModal.scoreBreakdown?.reliabilityScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${selectedQuoteForModal.scoreBreakdown?.reliabilityScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-0.5">
                    <span>Warranty & Enterprise Support</span>
                    <span>{selectedQuoteForModal.scoreBreakdown?.warrantyScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${selectedQuoteForModal.scoreBreakdown?.warrantyScore}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                Hardware Specification Proposal
              </h4>
              <p className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 leading-relaxed font-mono text-[11px]">
                {selectedQuoteForModal.specDetails}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Clarification Request Modal */}
      {clarificationSupplier && (
        <Modal
          isOpen={!!clarificationSupplier}
          onClose={() => setClarificationSupplier(null)}
          title={`Request Clarification — ${clarificationSupplier.supplierName}`}
          subtitle={`RFQ-2026-088 • Vendor Representative Portal`}
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSendClarification} className="space-y-4 text-xs">
            <p className="text-slate-600">
              Submit technical or commercial inquiries regarding quotation terms directly to the vendor's enterprise bidding contact.
            </p>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Inquiry Message *</label>
              <textarea
                rows={4}
                required
                value={clarificationMessage}
                onChange={(e) => setClarificationMessage(e.target.value)}
                placeholder="e.g. Please confirm if the quoted 36-month SLA covers accidental spill damage and battery replacement in Year 2..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setClarificationSupplier(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all cursor-pointer"
              >
                Send Clarification Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

