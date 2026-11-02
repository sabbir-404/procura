import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Gavel,
  Shield,
  UploadCloud,
  FileText,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Save,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';

export default function SubmitBid() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tenders, submitBid, addToast } = useApp();
  const { currentUser } = useAuth();

  const tender = tenders.find(t => t.id === id) || tenders[0];

  // Bid Form State
  const [formData, setFormData] = useState({
    unitPrice: 150000,
    deliveryDays: 7,
    warranty: '36 Months On-site SLA (24/7 Response with Accidental Damage Protection)',
    paymentTerms: 'Net 45 Days',
    technicalProposalText: 'We propose Tier-1 enterprise hardware meeting and exceeding all stated requirements. Dedicated technical team on standby in Dhaka with buffer stock spares.',
    agreedToTerms: false
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'OEM_Manufacturer_Authorization_Form_MAF.pdf', size: '1.4 MB' },
    { name: 'Technical_Compliance_Matrix_Signed.pdf', size: '2.1 MB' },
    { name: 'Itemized_Commercial_BOQ_Proposal.pdf', size: '890 KB' }
  ]);

  const [confirmationModal, setConfirmationModal] = useState({ open: false, bid: null });

  const totalBidAmount = formData.unitPrice * (tender.quantity || 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      addToast('Please confirm the legal integrity and compliance declaration.', 'error');
      return;
    }

    if (formData.unitPrice <= 0) {
      addToast('Please provide a valid unit price.', 'error');
      return;
    }

    const payload = {
      tenderId: tender.id,
      tenderTitle: tender.title,
      vendorId: currentUser.companyId || 'SUP-001',
      vendorCompany: currentUser.organization,
      submittedBy: currentUser.name,
      totalAmount: totalBidAmount,
      unitPrice: Number(formData.unitPrice),
      deliveryDays: Number(formData.deliveryDays),
      deliveryFormatted: `${formData.deliveryDays} Business Days`,
      warranty: formData.warranty,
      paymentTerms: formData.paymentTerms,
      technicalProposalText: formData.technicalProposalText,
      itemsProposed: [
        {
          name: tender.title,
          specs: tender.technicalSpecs,
          quantity: tender.quantity || 1,
          unitPrice: Number(formData.unitPrice),
          totalPrice: totalBidAmount
        }
      ]
    };

    const newBid = submitBid(payload);
    setConfirmationModal({ open: true, bid: newBid });
  };

  const handleSaveDraft = () => {
    addToast('Bid draft saved locally. Complete and submit before tender deadline.', 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/vendor/tenders')}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Back to Tenders"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Submit Competitive Sealed Bid</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                <Lock className="w-3 h-3 text-teal-600" />
                Sealed Envelope Protocol
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tender: <strong className="text-slate-800">{tender.id}</strong> — {tender.title}
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
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {/* Sealed Bidding Notice */}
      <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-start gap-3">
        <Shield className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold block text-sm">Anonymous Bidding Token Assignment</span>
          Upon submission, Procura's security engine will seal your financial and technical proposal and assign a randomized anonymous token (e.g. <code>BIDDER-XXXX</code>). The evaluation committee will assess your proposal without access to your corporate identity until formal award qualification.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Tender Scope & Vendor Identification */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">1. Tender Details & Vendor Registry</h3>
            <p className="text-xs text-slate-500 mt-0.5">Verified participating company information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Tender Scope</span>
              <div className="font-bold text-slate-900">{tender.title}</div>
              <div className="text-slate-600">Category: {tender.category}</div>
              <div className="font-mono text-teal-700 font-bold">
                Ceiling: {tender.budgetFormatted} ({tender.quantity} {tender.unit})
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Bidding Entity</span>
              <div className="font-bold text-slate-900">{currentUser.organization}</div>
              <div className="text-slate-600">Authorized Officer: {currentUser.name}</div>
              <div className="text-slate-500">Corporate Email: {currentUser.email}</div>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Proposal */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">2. Technical Proposal & Compliance Statement</h3>
            <p className="text-xs text-slate-500 mt-0.5">Detailed specification response against tender criteria</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Technical Overview & Methodology *</label>
              <textarea
                rows={3}
                required
                value={formData.technicalProposalText}
                onChange={(e) => setFormData({ ...formData, technicalProposalText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Committed Delivery SLA (Business Days) *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.deliveryDays}
                  onChange={(e) => setFormData({ ...formData, deliveryDays: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-center focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Warranty & Support SLA *</label>
                <input
                  type="text"
                  required
                  value={formData.warranty}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Financial Proposal & Item Pricing */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">3. Financial Proposal & Pricing Schedule</h3>
            <p className="text-xs text-slate-500 mt-0.5">All figures in Bangladesh Taka (BDT) inclusive of customs and duties</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Quoted Unit Price (BDT) *</label>
              <input
                type="number"
                min="1"
                required
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-right focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Quantity Required</label>
              <input
                type="text"
                disabled
                value={`${tender.quantity || 1} ${tender.unit || 'Units'}`}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono text-center"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Payment Terms *</label>
              <select
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Net 45 Days">Net 45 Days</option>
                <option value="Net 30 Days">Net 30 Days</option>
                <option value="100% on Inspection & Sign-off">100% on Inspection & Sign-off</option>
                <option value="20% Advance, 80% on Delivery">20% Advance, 80% on Delivery</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900 text-sm block">Total Financial Quotation</span>
              <span className="text-[11px] text-slate-500">Subject to committee price normalization</span>
            </div>
            <span className="text-xl font-bold font-mono text-teal-800">
              BDT {totalBidAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Section 4: Document Uploads & Declaration */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">4. Supporting Documents & Integrity Declaration</h3>
            <p className="text-xs text-slate-500 mt-0.5">Attach required OEM certifications and compliance schedules</p>
          </div>

          <div
            onClick={() => addToast('File upload dialog opened (mock)', 'info')}
            className="border-2 border-dashed border-slate-200 hover:border-teal-400 rounded-xl p-5 text-center bg-slate-50/50 hover:bg-teal-50/20 transition-all cursor-pointer"
          >
            <UploadCloud className="w-6 h-6 text-teal-600 mx-auto mb-1.5" />
            <p className="text-xs font-semibold text-slate-800">Click to upload supplementary schedules or agreements</p>
            <p className="text-[11px] text-slate-500 mt-0.5">PDF or ZIP up to 50MB</p>
          </div>

          <div className="space-y-1.5">
            {uploadedFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span className="font-medium text-slate-800">{f.name}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{f.size}</span>
              </div>
            ))}
          </div>

          {/* Legal Integrity Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs">
              <input
                type="checkbox"
                required
                checked={formData.agreedToTerms}
                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="text-slate-700 leading-relaxed">
                I hereby declare that this sealed bid proposal is legally binding, fully conforms to the technical specifications of {tender.id}, and does not violate corporate anti-collusion policies. I agree to the Procura Double-Blind Anonymous Bidding Protocol.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/vendor/tenders')}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Sealed Bid</span>
          </button>
        </div>
      </form>

      {/* Submission Confirmation Modal */}
      {confirmationModal.open && confirmationModal.bid && (
        <Modal
          isOpen={confirmationModal.open}
          onClose={() => {
            setConfirmationModal({ open: false, bid: null });
            navigate('/vendor/my-bids');
          }}
          title="Sealed Bid Registered Successfully!"
          subtitle="Procura Anonymous Bidding Engine Confirmation"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-center text-xs text-slate-600 py-2">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">Bid Confirmed & Sealed</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your proposal has been successfully registered for {tender.id}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Anonymous Bidder Token:</span>
                <span className="font-mono font-bold text-teal-700">{confirmationModal.bid.bidderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bid Reference ID:</span>
                <span className="font-mono font-bold text-slate-800">{confirmationModal.bid.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Quoted Amount:</span>
                <span className="font-mono font-bold text-slate-900">
                  BDT {confirmationModal.bid.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Submission Timestamp:</span>
                <span className="font-medium text-slate-700">{confirmationModal.bid.submissionDate}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Your company identity will remain hidden from evaluators during the scoring phase.
            </p>

            <button
              onClick={() => {
                setConfirmationModal({ open: false, bid: null });
                navigate('/vendor/my-bids');
              }}
              className="w-full py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              View My Submitted Bids
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
