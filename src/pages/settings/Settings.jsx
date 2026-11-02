import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Building2,
  User,
  Shield,
  Bell,
  Sliders,
  RefreshCw,
  CheckCircle2,
  Save,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/Modal';

export default function Settings() {
  const { currentUser, currentRole } = useAuth();
  const { resetDemoState, addToast } = useApp();

  const [activeTab, setActiveTab] = useState('profile');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    title: currentUser.title,
    department: currentUser.department,
    phone: currentUser.phone
  });

  const [orgData, setOrgData] = useState({
    name: currentUser.organization,
    tin: 'TIN-4892019482',
    bin: 'BIN-002948194',
    address: 'Gulshan Corporate Centre, Level 14, Road 11, Dhaka 1212',
    currency: 'BDT (৳)',
    fiscalYear: 'July 1 – June 30'
  });

  const [procurementRules, setProcurementRules] = useState({
    dofpLeadLimit: 500000,
    dofpDirectorLimit: 5000000,
    enforceAnonymousBidding: true,
    requireQuorumMinBids: 3,
    autoAuditIdentityDisclosure: true
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    addToast('Profile preferences updated in session.', 'success');
  };

  const handleSaveOrg = (e) => {
    e.preventDefault();
    addToast('Organization settings updated.', 'success');
  };

  const handleSaveRules = (e) => {
    e.preventDefault();
    addToast('Procurement governance rules updated.', 'success');
  };

  const handleConfirmReset = () => {
    resetDemoState();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System & Organization Settings</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage institutional profile, delegation thresholds, anonymous bidding rules, and demo data states.
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-3.5 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('organization')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'organization'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Organization Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('procurement')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'procurement'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Procurement Governance & DOFP</span>
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs max-w-3xl space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">User Profile & Authority</h3>
              <p className="text-xs text-slate-500 mt-0.5">Active session: {currentUser.roleLabel}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Authority Limit: {currentUser.spendAuthority || 'N/A'}
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Corporate Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Professional Title</label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Assigned Department</label>
                <input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Organization */}
      {activeTab === 'organization' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs max-w-3xl space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Institutional Entity Information</h3>
            <p className="text-xs text-slate-500 mt-0.5">Corporate identity, tax identification, and accounting period</p>
          </div>

          <form onSubmit={handleSaveOrg} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Organization Name</label>
                <input
                  type="text"
                  value={orgData.name}
                  onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Operating Currency</label>
                <input
                  type="text"
                  disabled
                  value={orgData.currency}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Taxpayer Identification (TIN)</label>
                <input
                  type="text"
                  value={orgData.tin}
                  onChange={(e) => setOrgData({ ...orgData, tin: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Business Identification (BIN)</label>
                <input
                  type="text"
                  value={orgData.bin}
                  onChange={(e) => setOrgData({ ...orgData, bin: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-semibold text-slate-700">Headquarters Address</label>
                <input
                  type="text"
                  value={orgData.address}
                  onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Entity Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Governance & Anonymous Bidding */}
      {activeTab === 'procurement' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs max-w-3xl space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Procurement Governance & Bidding Rules</h3>
            <p className="text-xs text-slate-500 mt-0.5">Delegation of Financial Powers and Anonymous Evaluation enforcement</p>
          </div>

          <form onSubmit={handleSaveRules} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Department Lead DOFP Limit (BDT)</label>
                <input
                  type="number"
                  value={procurementRules.dofpLeadLimit}
                  onChange={(e) => setProcurementRules({ ...procurementRules, dofpLeadLimit: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-right"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Procurement Director DOFP Limit (BDT)</label>
                <input
                  type="number"
                  value={procurementRules.dofpDirectorLimit}
                  onChange={(e) => setProcurementRules({ ...procurementRules, dofpDirectorLimit: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-right"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-slate-900 block">Enforce Anonymous Bidding Protocol</span>
                  <span className="text-[11px] text-slate-500">Automatically obfuscate vendor company identities during tender evaluations</span>
                </div>
                <input
                  type="checkbox"
                  checked={procurementRules.enforceAnonymousBidding}
                  onChange={(e) => setProcurementRules({ ...procurementRules, enforceAnonymousBidding: e.target.checked })}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
              </label>

              <div className="border-t border-slate-200" />

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-bold text-slate-900 block">Mandatory Identity Disclosure Audit</span>
                  <span className="text-[11px] text-slate-500">Require written justification and record all identity reveals into the immutable log</span>
                </div>
                <input
                  type="checkbox"
                  checked={procurementRules.autoAuditIdentityDisclosure}
                  onChange={(e) => setProcurementRules({ ...procurementRules, autoAuditIdentityDisclosure: e.target.checked })}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
              </label>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Governance Parameters</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <Modal
          isOpen={showResetConfirm}
          onClose={() => setShowResetConfirm(false)}
          title="Restore Demo Data to Factory State?"
          subtitle="Clear LocalStorage and Re-seed Factory Requisitions, Tenders & Bids"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs text-slate-600 py-1">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Confirm Dataset Reset</span>
                <p className="text-[11px] mt-0.5 leading-relaxed">
                  This will reset all newly added requisitions, submitted bids, identity reveals, and custom suppliers back to the default Procura demo dataset.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
