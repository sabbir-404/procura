import React, { useState, useMemo } from 'react';
import {
  Users2,
  PlusCircle,
  Search,
  Filter,
  Star,
  Building,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sparkles,
  Award,
  Clock,
  TrendingUp,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export default function Suppliers() {
  const { suppliers, addSupplier, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Supplier Form State
  const [newSupplierData, setNewSupplierData] = useState({
    name: '',
    category: 'IT Hardware & Cloud',
    contactPerson: '',
    email: '',
    phone: '',
    location: 'Gulshan, Dhaka',
    status: 'Active'
  });

  // Summary Metrics
  const totalCount = suppliers.length;
  const activeCount = suppliers.filter(s => s.status === 'Active' || s.status === 'Preferred').length;
  const preferredCount = suppliers.filter(s => s.status === 'Preferred').length;
  const underEvalCount = suppliers.filter(s => s.status === 'Under Evaluation').length;

  const categories = [
    'All',
    'IT Hardware & Cloud',
    'Enterprise Networking',
    'Industrial & MRO Equipment',
    'Workstations & Peripherals',
    'Ergonomic Furniture',
    'Logistics & Transport',
    'Office Supplies',
    'Security & Facility Systems'
  ];

  const statuses = ['All', 'Preferred', 'Active', 'Under Evaluation', 'Inactive'];

  // Filtered suppliers
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(sup => {
      const matchesSearch =
        sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sup.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sup.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        categoryFilter === 'All' ? true : sup.category.toLowerCase().includes(categoryFilter.toLowerCase());

      const matchesStat =
        statusFilter === 'All' ? true : sup.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesCat && matchesStat;
    });
  }, [suppliers, searchTerm, categoryFilter, statusFilter]);

  const handleCreateSupplier = (e) => {
    e.preventDefault();
    if (!newSupplierData.name.trim() || !newSupplierData.contactPerson.trim() || !newSupplierData.email.trim()) {
      addToast('Please fill in required supplier information.', 'error');
      return;
    }

    addSupplier({
      name: newSupplierData.name,
      category: newSupplierData.category,
      contactPerson: newSupplierData.contactPerson,
      email: newSupplierData.email,
      phone: newSupplierData.phone || '+880 1700-000000',
      location: newSupplierData.location,
      division: newSupplierData.location.includes('Dhaka') ? 'Dhaka' : 'Regional',
      status: newSupplierData.status,
      tags: ['Verified Vendor', 'Tax Compliant']
    });

    setShowAddModal(false);
    setNewSupplierData({
      name: '',
      category: 'IT Hardware & Cloud',
      contactPerson: '',
      email: '',
      phone: '',
      location: 'Gulshan, Dhaka',
      status: 'Active'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Supplier Management</h2>
          <p className="text-xs text-slate-500 mt-1">
            Centralized directory of verified corporate vendors, SLAs, performance ratings, and contract metrics.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Suppliers</span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{totalCount}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Approved vendor registry</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Suppliers</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-emerald-600 mt-2 block">{activeCount}</span>
          <span className="text-[11px] text-emerald-700/80 mt-0.5 block">Currently fulfilling orders</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Preferred Suppliers</span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-teal-600 mt-2 block">{preferredCount}</span>
          <span className="text-[11px] text-teal-700/80 mt-0.5 block">Master discount agreements</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Under Evaluation</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-purple-600 mt-2 block">{underEvalCount}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Trial probationary period</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search suppliers by name, contact, city..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {categories.map(c => (
              <option key={c} value={c}>Category: {c}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {statuses.map(s => (
              <option key={s} value={s}>Status: {s}</option>
            ))}
          </select>

          {(searchTerm || categoryFilter !== 'All' || statusFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setStatusFilter('All');
              }}
              className="text-xs text-teal-700 hover:underline px-2 py-1 font-medium cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Supplier Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-center">Rating</th>
                <th className="py-3 px-4 text-center">Total Orders</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.map((sup) => (
                <tr
                  key={sup.id}
                  onClick={() => setSelectedSupplier(sup)}
                  className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-300/80 shrink-0 group-hover:border-teal-400 transition-colors">
                        {(sup.name || 'SP').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors block">
                          {sup.name}
                        </span>
                        <span className="text-[11px] text-slate-600 font-mono">{sup.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {sup.category}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{sup.contactPerson}</div>
                    <div className="text-[11px] text-slate-600">{sup.email}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{sup.location}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1 font-semibold text-slate-900 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/70">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{sup.rating.toFixed(1)}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-800">
                    {sup.totalOrders}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={sup.status} />
                  </td>

                  <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedSupplier(sup)}
                      className="px-2.5 py-1 rounded bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 border border-slate-200 transition-colors text-xs font-semibold cursor-pointer"
                    >
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Profile Modal */}
      {selectedSupplier && (
        <Modal
          isOpen={!!selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
          title={`Supplier Profile — ${selectedSupplier.name}`}
          subtitle={`${selectedSupplier.category} • Contract Active`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5 text-xs text-slate-600">
            {/* Top Info Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {(selectedSupplier.name || 'SP').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{selectedSupplier.name}</h3>
                    <StatusBadge status={selectedSupplier.status} />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {selectedSupplier.id} • Registered Regional Enterprise Supplier
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-600 block uppercase font-bold">Reliability</span>
                  <span className="text-xs font-bold text-teal-700">{selectedSupplier.onTimeDelivery}</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-600 block uppercase font-bold">Quality</span>
                  <span className="text-xs font-bold text-indigo-700">{selectedSupplier.qualityScore}</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-600 block uppercase font-bold">Score</span>
                  <span className="text-xs font-bold text-amber-600 flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {selectedSupplier.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Supplier Insights Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-50/60 via-white to-white border border-teal-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-teal-800 font-semibold mb-1">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>AI Vendor Performance Intelligence</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedSupplier.aiSummary}
              </p>
            </div>

            {/* Contact & Agreement Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] text-slate-600 block">Primary Contact</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{selectedSupplier.contactPerson}</span>
                <span className="text-[11px] text-slate-600">{selectedSupplier.phone}</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] text-slate-600 block">Corporate Email</span>
                <span className="font-semibold text-slate-900 block mt-0.5 truncate">{selectedSupplier.email}</span>
                <span className="text-[11px] text-slate-600">Verified domain</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] text-slate-600 block">Dispatch Location</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{selectedSupplier.location}</span>
                <span className="text-[11px] text-slate-600">{selectedSupplier.division} Hub</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] text-slate-600 block">Contract Validity</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{selectedSupplier.contractExpires}</span>
                <span className="text-[11px] text-emerald-600 font-medium">Valid & Active</span>
              </div>
            </div>

            {/* Recent Orders History */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Recent Purchase Orders ({selectedSupplier.recentOrders?.length || 0})
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">PO Number</th>
                      <th className="py-2 px-3">Order Amount</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3 text-center">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(selectedSupplier.recentOrders || []).map((o, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-3 font-mono font-semibold text-teal-700">{o.po}</td>
                        <td className="py-2 px-3 font-mono font-bold text-slate-800">{o.amount}</td>
                        <td className="py-2 px-3 text-slate-500">{o.date}</td>
                        <td className="py-2 px-3 text-center">
                          <StatusBadge status={o.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add New Supplier Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Onboard New Supplier"
        subtitle="Register and verify enterprise vendor for corporate procurement"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleCreateSupplier} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Company Name *</label>
            <input
              type="text"
              required
              value={newSupplierData.name}
              onChange={(e) => setNewSupplierData({ ...newSupplierData, name: e.target.value })}
              placeholder="e.g. Dhaka Electronics & Instruments Ltd."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Category *</label>
              <select
                value={newSupplierData.category}
                onChange={(e) => setNewSupplierData({ ...newSupplierData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="IT Hardware & Cloud">IT Hardware & Cloud</option>
                <option value="Enterprise Networking">Enterprise Networking</option>
                <option value="Industrial & MRO Equipment">Industrial & MRO Equipment</option>
                <option value="Workstations & Peripherals">Workstations & Peripherals</option>
                <option value="Ergonomic Furniture">Ergonomic Furniture</option>
                <option value="Logistics & Transport">Logistics & Transport</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Initial Status</label>
              <select
                value={newSupplierData.status}
                onChange={(e) => setNewSupplierData({ ...newSupplierData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Active">Active</option>
                <option value="Under Evaluation">Under Evaluation</option>
                <option value="Preferred">Preferred</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Contact Person *</label>
              <input
                type="text"
                required
                value={newSupplierData.contactPerson}
                onChange={(e) => setNewSupplierData({ ...newSupplierData, contactPerson: e.target.value })}
                placeholder="e.g. Mahbubul Alam"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Phone</label>
              <input
                type="text"
                value={newSupplierData.phone}
                onChange={(e) => setNewSupplierData({ ...newSupplierData, phone: e.target.value })}
                placeholder="+880 1711-XXXXXX"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Email Address *</label>
              <input
                type="email"
                required
                value={newSupplierData.email}
                onChange={(e) => setNewSupplierData({ ...newSupplierData, email: e.target.value })}
                placeholder="contact@company.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Location / City *</label>
              <input
                type="text"
                required
                value={newSupplierData.location}
                onChange={(e) => setNewSupplierData({ ...newSupplierData, location: e.target.value })}
                placeholder="e.g. Motijheel C/A, Dhaka"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all cursor-pointer"
            >
              Register Supplier
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

