import { storageService } from './storageService';
import { initialSuppliers } from '../data/mockData';

export const supplierService = {
  getSuppliers() {
    return storageService.get(storageService.KEYS.SUPPLIERS, initialSuppliers);
  },

  getSupplierById(id) {
    const list = this.getSuppliers();
    return list.find(s => s.id === id) || null;
  },

  createSupplier(payload) {
    const list = this.getSuppliers();
    const newId = `SUP-0${list.length + 1 < 10 ? '0' + (list.length + 1) : list.length + 1}`;
    const newSupplier = {
      ...payload,
      id: newId,
      totalOrders: 0,
      totalSpendBDT: 0,
      rating: 4.8,
      onTimeDelivery: '100%',
      qualityScore: '99%',
      contractExpires: '2027-12-31',
      status: payload.status || 'Active',
      aiSummary: 'Newly registered vendor. Verified documentation and corporate identity.',
      recentOrders: []
    };

    const updated = [newSupplier, ...list];
    storageService.set(storageService.KEYS.SUPPLIERS, updated);
    return newSupplier;
  },

  updateSupplier(id, updates) {
    const list = this.getSuppliers();
    const updated = list.map(s => (s.id === id ? { ...s, ...updates } : s));
    storageService.set(storageService.KEYS.SUPPLIERS, updated);
    return updated;
  }
};
