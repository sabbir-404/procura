import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gavel,
  Search,
  Filter,
  Clock,
  Calendar,
  Layers,
  FileText,
  Eye,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

export default function VendorTenders() {
  const navigate = useNavigate();
  const { tenders } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTender, setSelectedTender] = useState(null);

  // Filter only published / open tenders
  const publishedTenders = tenders.filter(t => t.status === 'Published');

  const filtered = publishedTenders.filter(t => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'All' ? true : t.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Available Tenders for Bidding</h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse corporate tenders open for sealed competitive bidding. Submit technical and commercial proposals directly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
            {publishedTenders.length} Open for Participation
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search active tenders by title, keyword, ID..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="All">All Categories</option>
            <option value="IT Hardware">IT Hardware & Infrastructure</option>
            <option value="Enterprise Networking">Enterprise Networking</option>
            <option value="Ergonomic Furniture">Ergonomic Furniture</option>
          </select>
        </div>
      </div>

      {/* Tender Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tender) => (
          <div
            key={tender.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {tender.id}
                </span>
                <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Due: {tender.submissionDeadline}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {tender.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {tender.description}
              </p>

              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold text-slate-800">{tender.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Budget Ceiling:</span>
                  <span className="font-mono font-bold text-teal-700">{tender.budgetFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quantity Required:</span>
                  <span className="font-semibold text-slate-800">{tender.quantity} {tender.unit}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedTender(tender)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Full Tender Dossier</span>
              </button>

              <button
                onClick={() => navigate(`/vendor/tenders/${tender.id}/submit-bid`)}
                className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Submit Bid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tender Details Modal */}
      {selectedTender && (
        <Modal
          isOpen={!!selectedTender}
          onClose={() => setSelectedTender(null)}
          title={`Tender Requirements — ${selectedTender.id}`}
          subtitle={selectedTender.title}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Budget Ceiling</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{selectedTender.budgetFormatted}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Submission Deadline</span>
                <span className="font-semibold text-rose-600">{selectedTender.submissionDeadline}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Technical Specifications</h4>
              <p className="p-3 bg-white rounded-lg border border-slate-200 font-mono text-[11px] leading-relaxed">
                {selectedTender.technicalSpecs}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Eligibility Criteria</h4>
              <p className="p-3 bg-white rounded-lg border border-slate-200 leading-relaxed">
                {selectedTender.eligibilityCriteria}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Required Bidding Documents</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                {(selectedTender.requiredDocuments || []).map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedTender(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigate(`/vendor/tenders/${selectedTender.id}/submit-bid`);
                  setSelectedTender(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Proceed to Bid Submission →
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

