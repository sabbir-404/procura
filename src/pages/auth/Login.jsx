import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Shield,
  User,
  Store,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Building2,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { loginAs, allRoles } = useAuth();
  const { addToast } = useApp();

  const [email, setEmail] = useState('alex.morgan@apexcorp.com.bd');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleStandardSubmit = (e) => {
    e.preventDefault();
    loginAs('admin');
    addToast('Signed in as Organization Administrator (Alex Morgan)', 'success');
    navigate('/dashboard');
  };

  const handleSelectDemoRole = (roleKey) => {
    loginAs(roleKey);
    const selected = allRoles.find(r => r.key === roleKey);
    addToast(`Authenticated as ${selected.roleLabel} (${selected.name})`, 'success');
    if (roleKey === 'vendor') {
      navigate('/vendor/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-800 relative overflow-hidden font-sans">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <Sparkles className="w-6 h-6 text-slate-950" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Procura</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          AI-Powered Procurement Platform
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Sign in to access corporate tenders, vendor management, and anonymous bidding
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl z-10 px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-slate-200">
          {/* Quick Demo Role Switcher */}
          <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Instant Demo Access (Select Role)
              </span>
              <span className="text-[10px] text-teal-700 bg-teal-100 font-semibold px-2 py-0.5 rounded-full">
                No Password Required
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Explore role-based navigation and functionality without real backend credentials:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {allRoles.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleSelectDemoRole(r.key)}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-xs transition-all text-left group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-teal-50 text-slate-700 group-hover:text-teal-700 transition-colors shrink-0 mt-0.5">
                    {r.key === 'vendor' ? (
                      <Store className="w-4 h-4" />
                    ) : r.key === 'approver' ? (
                      <Shield className="w-4 h-4" />
                    ) : r.key === 'procurement_officer' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <Building2 className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 block truncate">
                      {r.roleLabel}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">{r.name}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{r.organization}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold">Or enter credentials</span>
            </div>
          </div>

          {/* Standard Form */}
          <form className="space-y-4 text-xs" onSubmit={handleStandardSubmit}>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Corporate Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-600">Remember session</span>
              </label>

              <button
                type="button"
                onClick={() => addToast('Password reset link simulated to corporate email', 'info')}
                className="font-semibold text-teal-700 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Procura</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-4 text-[11px] text-center text-slate-400">
            Frontend Demonstration Prototype • Backend authentication & RBAC integration pending
          </p>
        </div>
      </div>
    </div>
  );
}
