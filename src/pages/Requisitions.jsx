import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  FileCheck,
  CheckCircle2,
  Clock,
  XCircle,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Layers,
  Building,
  User,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export default function Requisitions() {
  const navigate = useNavigate();
  const { requisitions, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedReq, setSelectedReq] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Department list
  const departments = ['All', 'Engineering', 'Information Technology', 'Facilities & Admin', 'Operations', 'Marketing & Comms'];

  // Statuses
  const statuses = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected', 'Completed'];

  // Summary counts
  const totalCount = requisitions.length;
  const pendingCount = requisitions.filter(r => r.status === 'Pending' || r.status === 'Under Review').length;
  const approvedCount = requisitions.filter(r => r.status === 'Approved' || r.status === 'Completed').length;
  const rejectedCount = requisitions.filter(r => r.status === 'Rejected').length;

  // Filtered requisitions
  const filteredRequisitions = useMemo(() => {
    return requisitions.filter(item => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ? true : item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDept =
        deptFilter === 'All' ? true : item.department.toLowerCase() === deptFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [requisitions, searchTerm, statusFilter, deptFilter]);

  const totalPages = Math.ceil(filteredRequisitions.length / itemsPerPage) || 1;
  const paginatedData = filteredRequisitions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Requisitions Management</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track, filter, and audit internal procurement requests across departments and expenditure thresholds.
          </p>
        </div>

        <button
          onClick={() => navigate('/requisitions/create')}
          className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Requisition</span>
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Requests</span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{totalCount}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Active organizational pool</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Review</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-amber-600 mt-2 block">{pendingCount}</span>
          <span className="text-[11px] text-amber-600/80 mt-0.5 block">Awaiting sign-off</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Approved Requests</span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-teal-600 mt-2 block">{approvedCount}</span>
          <span className="text-[11px] text-teal-700/80 mt-0.5 block">Cleared for PO issuance</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Rejected Requests</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-rose-600 mt-2 block">{rejectedCount}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Budget or policy declined</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by ID, item name, requester..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {statuses.map(st => (
              <option key={st} value={st}>Status: {st}</option>
            ))}
          </select>

          {/* Department Dropdown */}
          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {departments.map(dp => (
              <option key={dp} value={dp}>Dept: {dp}</option>
            ))}
          </select>

          {(searchTerm || statusFilter !== 'All' || deptFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setDeptFilter('All');
                setCurrentPage(1);
              }}
              className="text-xs text-teal-700 hover:underline px-2 py-1 font-medium cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Professional Data Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Requisition ID</th>
                <th className="py-3 px-4">Item / Description</th>
                <th className="py-3 px-4">Requested By</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Estimated Amount</th>
                <th className="py-3 px-4 text-center">Priority</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-400">
                    No requisitions found matching current filter parameters.
                  </td>
                </tr>
              ) : (
                paginatedData.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedReq(req)}
                    className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-teal-700">
                      {req.id}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                        {req.title}
                      </div>
                      <div className="text-[11px] text-slate-600 line-clamp-1">
                        {req.items?.length || 1} line item(s) • {req.items?.[0]?.name}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {req.requestedBy}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {req.department}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {req.requestDate}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      BDT {req.estimatedAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={req.priority} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedReq(req)}
                          className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => addToast(`Requisition ${req.id} cloned to new draft`, 'info')}
                          className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                          title="More options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-700">{Math.min(filteredRequisitions.length, (currentPage - 1) * itemsPerPage + 1)}</strong> to{' '}
            <strong className="text-slate-700">{Math.min(filteredRequisitions.length, currentPage * itemsPerPage)}</strong> of{' '}
            <strong className="text-slate-700">{filteredRequisitions.length}</strong> requisitions
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReq && (
        <Modal
          isOpen={!!selectedReq}
          onClose={() => setSelectedReq(null)}
          title={`Requisition Details — ${selectedReq.id}`}
          subtitle={`${selectedReq.title} • Submitted by ${selectedReq.requestedBy}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5 text-xs text-slate-600">
            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div>
                <span className="text-[11px] text-slate-600 block">Department</span>
                <span className="font-semibold text-slate-900">{selectedReq.department}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-600 block">Requested Date</span>
                <span className="font-semibold text-slate-900">{selectedReq.requestDate}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-600 block">Required By</span>
                <span className="font-semibold text-slate-900">{selectedReq.requiredDate || 'Urgent'}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-600 block">Current Status</span>
                <div className="mt-0.5">
                  <StatusBadge status={selectedReq.status} />
                </div>
              </div>
            </div>

            {/* Justification */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Business Justification
              </h4>
              <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                {selectedReq.justification || 'Standard departmental replenishment for quarterly target operations.'}
              </p>
            </div>

            {/* Line Items */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Requested Line Items
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Item Description</th>
                      <th className="py-2 px-3 text-center">Qty</th>
                      <th className="py-2 px-3 text-right">Unit Price</th>
                      <th className="py-2 px-3 text-right">Total (BDT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(selectedReq.items || []).map((itm, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-3">
                          <span className="font-semibold text-slate-900 block">{itm.name}</span>
                          <span className="text-[11px] text-slate-600">{itm.description}</span>
                        </td>
                        <td className="py-2 px-3 text-center font-mono">
                          {itm.quantity} {itm.unit || 'Units'}
                        </td>
                        <td className="py-2 px-3 text-right font-mono text-slate-700">
                          BDT {itm.unitPrice?.toLocaleString()}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                          BDT {itm.totalPrice?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                    <tr>
                      <td colSpan="3" className="py-2 px-3 text-right text-slate-700">
                        Estimated Grand Total:
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-teal-700 text-sm">
                        BDT {selectedReq.estimatedAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Approval Flow Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Approval Routing History
              </h4>
              <div className="space-y-2 border-l-2 border-slate-200 pl-4 ml-2">
                {(selectedReq.history || []).map((hist, i) => (
                  <div key={i} className="relative">
                    <span
                      className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                        hist.status === 'completed'
                          ? 'bg-teal-500'
                          : hist.status === 'rejected'
                          ? 'bg-rose-500'
                          : 'bg-amber-400'
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{hist.step}</span>
                      <span className="text-[11px] text-slate-600">{hist.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Assigned: {hist.by}</p>
                    {hist.note && (
                      <p className="text-[11px] text-rose-600 mt-0.5 italic">Note: {hist.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

