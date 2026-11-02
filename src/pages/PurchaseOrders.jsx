import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  PlusCircle,
  Search,
  Filter,
  Eye,
  Printer,
  Download,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Layers,
  ChevronLeft,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export default function PurchaseOrders() {
  const { purchaseOrders, suppliers, addPurchaseOrder, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedPO, setSelectedPO] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form state for creating PO
  const [newPOData, setNewPOData] = useState({
    supplier: 'TechSource Ltd.',
    department: 'Engineering',
    deliveryDate: '',
    deliveryLocation: 'Dhaka Tech Hub, Gulshan-2, Dhaka',
    itemName: 'Enterprise Workstations & Accessories',
    quantity: 5,
    unitPrice: 150000
  });

  const statuses = ['All', 'Draft', 'Awaiting Approval', 'Issued', 'Processing', 'Shipped', 'Delivered', 'Completed'];
  const departments = ['All', 'Engineering', 'Information Technology', 'Facilities & Admin', 'Operations', 'Marketing', 'Logistics', 'Human Resources'];

  // Summary counts
  const totalCount = purchaseOrders.length;
  const pendingCount = purchaseOrders.filter(p => p.orderStatus === 'Awaiting Approval' || p.orderStatus === 'Draft').length;
  const inProgressCount = purchaseOrders.filter(p => p.orderStatus === 'Issued' || p.orderStatus === 'Processing' || p.orderStatus === 'Shipped').length;
  const completedCount = purchaseOrders.filter(p => p.orderStatus === 'Delivered' || p.orderStatus === 'Completed').length;

  const filteredOrders = useMemo(() => {
    return purchaseOrders.filter(po => {
      const matchesSearch =
        po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (po.trackingNumber && po.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === 'All' ? true : po.orderStatus.toLowerCase() === statusFilter.toLowerCase();

      const matchesDept =
        deptFilter === 'All' ? true : po.department.toLowerCase() === deptFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [purchaseOrders, searchTerm, statusFilter, deptFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newPOData.supplier || !newPOData.deliveryDate || !newPOData.itemName) {
      addToast('Please complete all required purchase order details.', 'error');
      return;
    }

    const total = newPOData.quantity * newPOData.unitPrice;
    addPurchaseOrder({
      supplier: newPOData.supplier,
      department: newPOData.department,
      deliveryDate: newPOData.deliveryDate,
      deliveryLocation: newPOData.deliveryLocation,
      totalAmount: total,
      items: [
        {
          name: newPOData.itemName,
          qty: newPOData.quantity,
          unitPrice: newPOData.unitPrice,
          total: total
        }
      ]
    });

    setShowCreateModal(false);
  };

  const handlePrint = (poId) => {
    addToast(`Preparing Purchase Order ${poId} print preview format...`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Purchase Orders</h2>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative corporate purchase commitments, delivery tracking, payment states, and vendor receipts.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Purchase Order</span>
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Purchase Orders</span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{totalCount}</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Binding order registry</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Orders</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-amber-600 mt-2 block">{pendingCount}</span>
          <span className="text-[11px] text-amber-600/80 mt-0.5 block">Approval pending sign-off</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-blue-600 mt-2 block">{inProgressCount}</span>
          <span className="text-[11px] text-blue-700/80 mt-0.5 block">Issued or in transit</span>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-bold text-emerald-600 mt-2 block">{completedCount}</span>
          <span className="text-[11px] text-emerald-700/80 mt-0.5 block">Delivered & verified</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by PO Number, vendor, tracking..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {statuses.map(s => (
              <option key={s} value={s}>Status: {s}</option>
            ))}
          </select>

          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {departments.map(d => (
              <option key={d} value={d}>Dept: {d}</option>
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

      {/* PO Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">PO Number</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Est. Delivery</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-center">Payment</th>
                <th className="py-3 px-4 text-center">Order Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedOrders.map((po) => (
                <tr
                  key={po.id}
                  onClick={() => setSelectedPO(po)}
                  className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                    {po.id}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {po.supplier}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {po.orderDate}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                    {po.deliveryDate}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    {po.department}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                    BDT {po.totalAmount.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={po.paymentStatus} />
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={po.orderStatus} />
                  </td>

                  <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedPO(po)}
                        className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                        title="View PO Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrint(po.id)}
                        className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                        title="Print / Export PO"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-700">{Math.min(filteredOrders.length, (currentPage - 1) * itemsPerPage + 1)}</strong> to{' '}
            <strong className="text-slate-700">{Math.min(filteredOrders.length, currentPage * itemsPerPage)}</strong> of{' '}
            <strong className="text-slate-700">{filteredOrders.length}</strong> purchase orders
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

      {/* PO Detail View Modal */}
      {selectedPO && (
        <Modal
          isOpen={!!selectedPO}
          onClose={() => setSelectedPO(null)}
          title={`Purchase Order — ${selectedPO.id}`}
          subtitle={`Issued to ${selectedPO.supplier} • Tracking: ${selectedPO.trackingNumber || 'Pending Dispatch'}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-5 text-xs text-slate-600">
            {/* Header Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-bold block">Purchase Order Total</span>
                <span className="text-lg font-bold font-mono text-slate-900">
                  BDT {selectedPO.totalAmount.toLocaleString()}
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Order Date: {selectedPO.orderDate} • Delivery: {selectedPO.deliveryDate}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={selectedPO.orderStatus} />
                <button
                  onClick={() => handlePrint(selectedPO.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Print PO</span>
                </button>
              </div>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Assigned Supplier</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{selectedPO.supplier}</span>
                <span className="text-[11px] text-slate-500">Corporate Master Vendor</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Receiving Destination</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{selectedPO.deliveryLocation || 'Dhaka Corporate Hub'}</span>
                <span className="text-[11px] text-slate-500">{selectedPO.department} Receiving</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Payment State</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{selectedPO.paymentStatus}</span>
                <span className="text-[11px] text-slate-500">Accounts Payable Scheduled</span>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Contracted Items & Quantities
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Item Description</th>
                      <th className="py-2 px-3 text-center">Quantity</th>
                      <th className="py-2 px-3 text-right">Unit Price</th>
                      <th className="py-2 px-3 text-right">Total (BDT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(selectedPO.items || []).map((itm, i) => (
                      <tr key={i}>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{itm.name}</td>
                        <td className="py-2.5 px-3 text-center font-mono">{itm.qty}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                          BDT {itm.unitPrice?.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                          BDT {itm.total?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Timeline Tracker */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Order Fulfillment Timeline
              </h4>
              <div className="space-y-2 border-l-2 border-slate-200 pl-4 ml-2">
                {(selectedPO.timeline || []).map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                        step.completed ? 'bg-teal-500' : 'bg-slate-300'
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${step.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.status}
                      </span>
                      <span className="text-[11px] text-slate-500">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Create PO Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Generate New Purchase Order"
        subtitle="Create an authorized binding order commitment to a registered supplier"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Vendor / Supplier *</label>
              <select
                value={newPOData.supplier}
                onChange={(e) => setNewPOData({ ...newPOData, supplier: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                {suppliers.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Department *</label>
              <select
                value={newPOData.department}
                onChange={(e) => setNewPOData({ ...newPOData, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Engineering">Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Facilities & Admin">Facilities & Admin</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Delivery Deadline *</label>
              <input
                type="date"
                required
                value={newPOData.deliveryDate}
                onChange={(e) => setNewPOData({ ...newPOData, deliveryDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Destination Location</label>
              <input
                type="text"
                value={newPOData.deliveryLocation}
                onChange={(e) => setNewPOData({ ...newPOData, deliveryLocation: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Item Description *</label>
            <input
              type="text"
              required
              value={newPOData.itemName}
              onChange={(e) => setNewPOData({ ...newPOData, itemName: e.target.value })}
              placeholder="e.g. Dell Precision Workstations (10 units)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Quantity</label>
              <input
                type="number"
                min="1"
                value={newPOData.quantity}
                onChange={(e) => setNewPOData({ ...newPOData, quantity: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-center focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Unit Price (BDT)</label>
              <input
                type="number"
                min="0"
                value={newPOData.unitPrice}
                onChange={(e) => setNewPOData({ ...newPOData, unitPrice: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-right focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-bold">
            <span className="text-slate-700">Total Purchase Commitment:</span>
            <span className="text-teal-700 font-mono text-sm">
              BDT {(newPOData.quantity * newPOData.unitPrice).toLocaleString()}
            </span>
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
              Issue Purchase Order
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

