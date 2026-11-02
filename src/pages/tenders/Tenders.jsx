import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gavel,
  PlusCircle,
  Search,
  Filter,
  Eye,
  Calendar,
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Shield,
  ArrowRight,
  ExternalLink,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

export default function Tenders() {
  const navigate = useNavigate();
  const { tenders, addTender, addToast } = useApp();
  const { currentRole } = useAuth();

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedTender, setSelectedTender] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Tender Form State
  const [newTender, setNewTender] = useState({
    title: '',
    category: 'IT Hardware & Infrastructure',
    department: 'Engineering & IT Directorate',
    estimatedBudget: 5000000,
    submissionDeadline: '',
    quantity: 10,
    unit: 'Units',
    deliveryTimeline: '14 calendar days from award',
    deliveryLocation: 'Dhaka Tech Hub, Gulshan-2, Dhaka',
    description: '',
    technicalSpecs: '',
    eligibilityCriteria: 'Minimum 3 years experience, verified BIN/TIN, ISO 9001 certification.',
    evaluationCriteria: 'Technical compliance (40%), Total price (35%), Delivery SLA (25%)',
    requiredDocumentsText: 'Trade License\nTIN/BIN Certificate\nOEM Manufacturer Authorization Form\nTechnical Compliance Matrix'
  });

  const categories = [
    'All',
    'IT Hardware & Infrastructure',
    'Enterprise Networking',
    'Ergonomic Furniture',
    'Software & Cyber Security',
    'Industrial Equipment'
  ];

  const tabs = ['All', 'Published', 'Under Evaluation', 'Awarded', 'Draft'];

  // Summary counts
  const totalCount = tenders.length;
  const publishedCount = tenders.filter(t => t.status === 'Published').length;
  const underEvalCount = tenders.filter(t => t.status === 'Under Evaluation').length;
  const awardedCount = tenders.filter(t => t.status === 'Awarded').length;

  const filteredTenders = useMemo(() => {
    return tenders.filter(t => {
      const matchesSearch =
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab = activeTab === 'All' ? true : t.status.toLowerCase() === activeTab.toLowerCase();
      const matchesCat = categoryFilter === 'All' ? true : t.category.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesTab && matchesCat;
    });
  }, [tenders, searchTerm, activeTab, categoryFilter]);

  const handleCreateTenderSubmit = (e) => {
    e.preventDefault();
    if (!newTender.title.trim() || !newTender.submissionDeadline) {
      addToast('Please provide tender title and submission deadline.', 'error');
      return;
    }

    const payload = {
      ...newTender,
      budgetFormatted: `BDT ${Number(newTender.estimatedBudget).toLocaleString()}`,
      requiredDocuments: newTender.requiredDocumentsText.split('\n').filter(Boolean),
      status: 'Published'
    };

    addTender(payload);
    setShowCreateModal(false);
    setNewTender({
      title: '',
      category: 'IT Hardware & Infrastructure',
      department: 'Engineering & IT Directorate',
      estimatedBudget: 5000000,
      submissionDeadline: '',
      quantity: 10,
      unit: 'Units',
      deliveryTimeline: '14 calendar days from award',
      deliveryLocation: 'Dhaka Tech Hub, Gulshan-2, Dhaka',
      description: '',
      technicalSpecs: '',
      eligibilityCriteria: 'Minimum 3 years experience, verified BIN/TIN, ISO 9001 certification.',
      evaluationCriteria: 'Technical compliance (40%), Total price (35%), Delivery SLA (25%)',
      requiredDocumentsText: 'Trade License\nTIN/BIN Certificate\nOEM Manufacturer Authorization Form\nTechnical Compliance Matrix'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tender Management & Anonymous Bidding</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Double-Blind Protocol
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish procurement tenders, invite accredited vendors, and conduct sealed anonymous bid evaluations.
          </p>
        </div>

        {currentRole !== 'approver' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Tender</span>
          </button>
        )}
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Tenders</span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{totalCount}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Full lifecycle registry</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Published / Active</span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <Gavel className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-teal-600 mt-2 block">{publishedCount}</span>
          <span className="text-[11px] text-teal-700/80 mt-0.5 block">Open for vendor bidding</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Under Evaluation</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-amber-600 mt-2 block">{underEvalCount}</span>
          <span className="text-[11px] text-amber-700/80 mt-0.5 block">Anonymous bids sealed</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Awarded</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-emerald-600 mt-2 block">{awardedCount}</span>
          <span className="text-[11px] text-emerald-700/80 mt-0.5 block">Contract PO generated</span>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tender ID, title..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tenders Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Tender ID</th>
                <th className="py-3 px-4">Tender Title & Scope</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Published</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4 text-center">Bids Received</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTenders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">
                    No tenders match current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTenders.map((tender) => (
                  <tr
                    key={tender.id}
                    onClick={() => setSelectedTender(tender)}
                    className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-700 whitespace-nowrap">
                      {tender.id}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors block line-clamp-1">
                        {tender.title}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        Budget: {tender.budgetFormatted} • {tender.quantity} {tender.unit}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      {tender.category}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {tender.publicationDate}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {tender.submissionDeadline}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        {tender.receivedBidsCount} bids
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={tender.status} />
                    </td>

                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedTender(tender)}
                          className="p-1.5 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                          title="View Tender Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => navigate(`/tenders/${tender.id}/evaluation`)}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white border border-teal-200 transition-all flex items-center gap-1 cursor-pointer"
                          title="Evaluate Anonymous Bids"
                        >
                          <Shield className="w-3 h-3" />
                          <span>Evaluation</span>
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

      {/* Tender Detail Modal */}
      {selectedTender && (
        <Modal
          isOpen={!!selectedTender}
          onClose={() => setSelectedTender(null)}
          title={`Tender Dossier — ${selectedTender.id}`}
          subtitle={`${selectedTender.title} • Sealed Bidding Active`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4 text-xs text-slate-600">
            {/* Top Banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Estimated Budget Ceiling</span>
                <span className="text-xl font-bold font-mono text-slate-900">{selectedTender.budgetFormatted}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Submission Deadline: {selectedTender.submissionDeadline} • Department: {selectedTender.department}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={selectedTender.status} />
                <button
                  onClick={() => {
                    navigate(`/tenders/${selectedTender.id}/evaluation`);
                    setSelectedTender(null);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Open Anonymous Evaluation</span>
                </button>
              </div>
            </div>

            {/* Scope & Technical Specs */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 text-xs">Scope of Procurement</h4>
              <p className="p-3 bg-white rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                {selectedTender.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 text-xs">Technical Specifications</h4>
              <p className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-700 leading-relaxed">
                {selectedTender.technicalSpecs}
              </p>
            </div>

            {/* Criteria & Required Docs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">Eligibility Criteria</span>
                <p className="text-[11px] text-slate-600">{selectedTender.eligibilityCriteria}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-xs">Evaluation Weighting</span>
                <p className="text-[11px] text-slate-600">{selectedTender.evaluationCriteria}</p>
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2 text-xs">Required Bidding Documents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(selectedTender.requiredDocuments || []).map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-white">
                    <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="text-slate-800 font-medium text-[11px]">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Tender Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create & Publish Procurement Tender"
        subtitle="Initiate competitive sealed bidding for organizational requirements"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleCreateTenderSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Tender Title *</label>
            <input
              type="text"
              required
              value={newTender.title}
              onChange={(e) => setNewTender({ ...newTender, title: e.target.value })}
              placeholder="e.g. Enterprise Cloud-Ready Laptops & Developer Workstations"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Procurement Category</label>
              <select
                value={newTender.category}
                onChange={(e) => setNewTender({ ...newTender, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Estimated Budget Ceiling (BDT)</label>
              <input
                type="number"
                value={newTender.estimatedBudget}
                onChange={(e) => setNewTender({ ...newTender, estimatedBudget: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-right focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Submission Deadline *</label>
              <input
                type="date"
                required
                value={newTender.submissionDeadline}
                onChange={(e) => setNewTender({ ...newTender, submissionDeadline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Quantity & Unit</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={newTender.quantity}
                  onChange={(e) => setNewTender({ ...newTender, quantity: Number(e.target.value) })}
                  className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-center focus:outline-none"
                />
                <input
                  type="text"
                  value={newTender.unit}
                  onChange={(e) => setNewTender({ ...newTender, unit: e.target.value })}
                  placeholder="Units, Sets, etc."
                  className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Scope Description *</label>
            <textarea
              rows={2}
              required
              value={newTender.description}
              onChange={(e) => setNewTender({ ...newTender, description: e.target.value })}
              placeholder="Describe requirements and operational background..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Technical Specifications *</label>
            <textarea
              rows={2}
              required
              value={newTender.technicalSpecs}
              onChange={(e) => setNewTender({ ...newTender, technicalSpecs: e.target.value })}
              placeholder="Item-by-item technical specs (processor, RAM, storage, SLA)..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Required Documents (One per line)</label>
            <textarea
              rows={3}
              value={newTender.requiredDocumentsText}
              onChange={(e) => setNewTender({ ...newTender, requiredDocumentsText: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-[11px] focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all cursor-pointer"
            >
              Publish Tender
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

