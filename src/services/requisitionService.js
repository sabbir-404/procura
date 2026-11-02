import { storageService } from './storageService';
import { initialRequisitions } from '../data/mockData';

export const requisitionService = {
  getRequisitions() {
    return storageService.get(storageService.KEYS.REQUISITIONS, initialRequisitions);
  },

  getRequisitionById(id) {
    const list = this.getRequisitions();
    return list.find(r => r.id === id) || null;
  },

  createRequisition(payload) {
    const list = this.getRequisitions();
    const newId = `REQ-2026-0${Math.floor(892 + Math.random() * 50)}`;
    const newReq = {
      ...payload,
      id: newId,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      history: [
        {
          step: 'Requisition Submitted',
          by: payload.requestedBy || 'Procurement User',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' Just now',
          status: 'completed'
        },
        {
          step: 'Department Head Review',
          by: 'Assigned Approver',
          date: 'In Review',
          status: 'current'
        }
      ]
    };

    const updated = [newReq, ...list];
    storageService.set(storageService.KEYS.REQUISITIONS, updated);
    return newReq;
  },

  updateRequisition(id, updates) {
    const list = this.getRequisitions();
    const updated = list.map(r => (r.id === id ? { ...r, ...updates } : r));
    storageService.set(storageService.KEYS.REQUISITIONS, updated);
    return updated;
  },

  deleteRequisition(id) {
    const list = this.getRequisitions();
    const updated = list.filter(r => r.id !== id);
    storageService.set(storageService.KEYS.REQUISITIONS, updated);
    return updated;
  }
};

