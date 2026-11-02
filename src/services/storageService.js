// Centralized LocalStorage Service & Demo Data Seeder

import { initialRequisitions, initialSuppliers, initialPurchaseOrders, initialApprovals } from '../data/mockData';
import { INITIAL_TENDERS } from '../data/tenders';
import { INITIAL_BIDS, INITIAL_AUDIT_LOGS } from '../data/bids';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';
import { DEMO_USERS } from '../data/users';

const KEYS = {
  CURRENT_USER: 'procura_current_user_role',
  REQUISITIONS: 'procura_requisitions_data',
  TENDERS: 'procura_tenders_data',
  BIDS: 'procura_bids_data',
  SUPPLIERS: 'procura_suppliers_data',
  PURCHASE_ORDERS: 'procura_purchase_orders_data',
  APPROVALS: 'procura_approvals_data',
  NOTIFICATIONS: 'procura_notifications_data',
  AUDIT_LOGS: 'procura_audit_logs_data',
};

export const storageService = {
  get(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn(`LocalStorage read error for ${key}:`, e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`LocalStorage write error for ${key}:`, e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  },

  // Reset demo data back to clean factory state
  resetAllDemoData() {
    try {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify('admin'));
      localStorage.setItem(KEYS.REQUISITIONS, JSON.stringify(initialRequisitions));
      localStorage.setItem(KEYS.TENDERS, JSON.stringify(INITIAL_TENDERS));
      localStorage.setItem(KEYS.BIDS, JSON.stringify(INITIAL_BIDS));
      localStorage.setItem(KEYS.SUPPLIERS, JSON.stringify(initialSuppliers));
      localStorage.setItem(KEYS.PURCHASE_ORDERS, JSON.stringify(initialPurchaseOrders));
      localStorage.setItem(KEYS.APPROVALS, JSON.stringify(initialApprovals));
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
      return true;
    } catch (e) {
      console.error('Failed to reset demo data', e);
      return false;
    }
  },

  KEYS
};

