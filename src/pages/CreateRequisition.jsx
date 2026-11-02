import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Trash2,
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  Save,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CreateRequisition() {
  const navigate = useNavigate();
  const { addRequisition, suppliers, addToast } = useApp();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    requestedBy: 'Alex Morgan',
    requiredDate: '',
    priority: 'Medium',
    justification: '',
    preferredSupplier: '',
    deliveryLocation: 'Dhaka Tech Hub, Gulshan-2, Dhaka 1212',
    taxRate: 7.5 // 7.5% standard procurement VAT
  });

  // Dynamic Line Items
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'High-Performance Developer Laptop (Core i9, 32GB)',
      description: 'Workstations for upcoming software sprint expansion',
      quantity: 5,
      unit: 'Units',
      unitPrice: 165000,
      totalPrice: 825000
    }
  ]);

  // Uploaded files simulation
  const [attachments, setAttachments] = useState([
    { name: 'Hardware_Specifications_Q4.pdf', size: '1.8 MB' }
  ]);

  const [errors, setErrors] = useState({});

  // Item calculations
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    if (field === 'quantity' || field === 'unitPrice') {
      const q = parseFloat(field === 'quantity' ? value : updated[index].quantity) || 0;
      const p = parseFloat(field === 'unitPrice' ? value : updated[index].unitPrice) || 0;
      updated[index].totalPrice = q * p;
    }
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        name: '',
        description: '',
        quantity: 1,
        unit: 'Units',
        unitPrice: 0,
        totalPrice: 0
      }
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) {
      addToast('A requisition must contain at least one line item.', 'error');
      return;
    }
    setItems(items.filter((_, idx) => idx !== index));
  };

  // Calculations
  const subtotal = items.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
  const taxAmount = (subtotal * formData.taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  // Validation
  const validateForm = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Requisition title is required';
    if (!formData.department) errs.department = 'Department is required';
    if (!formData.requestedBy.trim()) errs.requestedBy = 'Requester name is required';
    if (!formData.requiredDate) errs.requiredDate = 'Required delivery date is required';
    if (!formData.justification.trim()) errs.justification = 'Business justification is required';

    // Validate items
    const hasInvalidItem = items.some(itm => !itm.name.trim() || itm.quantity <= 0 || itm.unitPrice <= 0);
    if (hasInvalidItem) {
      errs.items = 'All line items must have a valid item name, quantity > 0, and price > 0';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast('Please complete all required fields correctly before submitting.', 'error');
      return;
    }

    const payload = {
      title: formData.title,
      department: formData.department,
      requestedBy: formData.requestedBy,
      requiredDate: formData.requiredDate,
      priority: formData.priority,
      justification: formData.justification,
      preferredSupplier: formData.preferredSupplier || 'TechSource Ltd.',
      deliveryLocation: formData.deliveryLocation,
      estimatedAmount: Math.round(grandTotal),
      items: items.map(itm => ({ ...itm, totalPrice: itm.quantity * itm.unitPrice }))
    };

    addRequisition(payload);
    navigate('/requisitions');
  };

  const handleSaveDraft = () => {
    addToast('Requisition saved as draft in local cache.', 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/requisitions')}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Back to Requisitions"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create Requisition</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Draft and route a procurement request for multi-level organizational authorization.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>Save as Draft</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit for Approval</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Request Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">1. Request Information</h3>
            <p className="text-xs text-slate-500 mt-0.5">Core procurement intent and business justification</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Title (2 cols) */}
            <div className="md:col-span-2 space-y-1">
              <label className="font-semibold text-slate-700">
                Requisition Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Dell Precision 5680 Workstations for Engineering Team"
                className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.title && <p className="text-[11px] text-rose-500">{errors.title}</p>}
            </div>

            {/* Department */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">
                Department <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Engineering">Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Facilities & Admin">Facilities & Admin</option>
                <option value="Operations">Operations</option>
                <option value="Marketing & Comms">Marketing & Comms</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            {/* Requested By */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">
                Requested By <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.requestedBy}
                onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {/* Required Date */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">
                Required Delivery Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={formData.requiredDate}
                onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.requiredDate ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.requiredDate && <p className="text-[11px] text-rose-500">{errors.requiredDate}</p>}
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">
                Priority Level <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Low">Low — Standard Replenishment</option>
                <option value="Medium">Medium — Scheduled Need</option>
                <option value="High">High — Project Milestone Dependency</option>
                <option value="Critical">Critical — Immediate Operational Halting</option>
              </select>
            </div>

            {/* Justification (Full width) */}
            <div className="md:col-span-3 space-y-1">
              <label className="font-semibold text-slate-700">
                Business Justification & Impact <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.justification}
                onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                placeholder="Explain the operational necessity, ROI, or project requirement driving this requisition..."
                className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.justification ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.justification && <p className="text-[11px] text-rose-500">{errors.justification}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Item Details */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">2. Item Details & Specifications</h3>
              <p className="text-xs text-slate-500 mt-0.5">Specify individual goods, quantities, and anticipated pricing</p>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          {errors.items && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.items}</span>
            </div>
          )}

          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 relative space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-700">Line Item #{index + 1}</span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                  {/* Name (4 cols) */}
                  <div className="md:col-span-4 space-y-1">
                    <label className="font-medium text-slate-700">Item Name</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      placeholder="e.g. Dell Precision 5680"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  {/* Description (3 cols) */}
                  <div className="md:col-span-3 space-y-1">
                    <label className="font-medium text-slate-700">Specification / Notes</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="e.g. i9, 32GB RAM, 1TB SSD"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  {/* Quantity (1 col) */}
                  <div className="md:col-span-1 space-y-1">
                    <label className="font-medium text-slate-700">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-center font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  {/* Unit (1 col) */}
                  <div className="md:col-span-1 space-y-1">
                    <label className="font-medium text-slate-700">Unit</label>
                    <select
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      className="w-full px-1.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="Units">Units</option>
                      <option value="Boxes">Boxes</option>
                      <option value="Licenses">Licenses</option>
                      <option value="Sets">Sets</option>
                      <option value="Hours">Hours</option>
                    </select>
                  </div>

                  {/* Estimated Unit Price (2 cols) */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="font-medium text-slate-700">Unit Price (BDT)</label>
                    <input
                      type="number"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-right focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  {/* Line Total (1 col) */}
                  <div className="md:col-span-1 space-y-1 text-right">
                    <label className="font-medium text-slate-500">Line Total</label>
                    <div className="py-1.5 font-bold font-mono text-slate-900 text-xs truncate">
                      ৳{(item.totalPrice || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 & 4 (2 Columns: Additional Info & Cost Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section 3: Additional Information (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">3. Additional Information & Logistics</h3>
              <p className="text-xs text-slate-500 mt-0.5">Supplier preferences, delivery destination, and documentation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Preferred Supplier (Optional)</label>
                <select
                  value={formData.preferredSupplier}
                  onChange={(e) => setFormData({ ...formData, preferredSupplier: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                >
                  <option value="">-- No preference (Open for competitive quotes) --</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.category})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Delivery Location</label>
                <input
                  type="text"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  placeholder="e.g. Dhaka Gulshan Office or Chattogram Terminal"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              {/* Attachment Drag & Drop Look & Feel */}
              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-slate-700">Supporting Attachments</label>
                <div
                  onClick={() => addToast('File upload dialog opened (mock)', 'info')}
                  className="border-2 border-dashed border-slate-200 hover:border-teal-400 rounded-xl p-5 text-center bg-slate-50/50 hover:bg-teal-50/20 transition-all cursor-pointer"
                >
                  <UploadCloud className="w-7 h-7 text-teal-600 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-800">
                    Click to upload or drag and drop supporting documentation
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    PDF, DOCX, XLSX, or PNG up to 25MB (Vendor quotes, technical specs, budget approvals)
                  </p>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {attachments.map((file, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-600" />
                        <span className="font-medium">{file.name}</span>
                        <span className="text-[11px] text-slate-600">({file.size})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Cost Summary (1 col) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-sm font-bold text-slate-900">4. Cost Summary</h3>
                <p className="text-xs text-slate-500 mt-0.5">Calculated in Bangladesh Taka (BDT)</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal ({items.length} items):</span>
                  <span className="font-mono font-semibold text-slate-800">
                    BDT {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span>Estimated Tax / VAT:</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      7.5%
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-slate-800">
                    BDT {Math.round(taxAmount).toLocaleString()}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Total Estimated Amount</span>
                    <span className="text-[10px] text-slate-600">Subject to committee sign-off</span>
                  </div>
                  <span className="text-lg font-bold font-mono text-teal-700">
                    BDT {Math.round(grandTotal).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-teal-50/70 border border-teal-200/80 text-[11px] text-teal-900 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>DOFP Authorization Route</span>
                </div>
                <p className="text-teal-800 leading-relaxed">
                  Amount is within the Procurement Director approval threshold (&lt; BDT 5.0M). Multi-department sign-off will automatically trigger upon submission.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 mt-6 space-y-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Approval</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="w-1/2 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/requisitions')}
                  className="w-1/2 py-2 px-3 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

