import { storageService } from './storageService';
import { initialPurchaseOrders } from '../data/mockData';

export const purchaseOrderService = {
  getPurchaseOrders() {
    return storageService.get(storageService.KEYS.PURCHASE_ORDERS, initialPurchaseOrders);
  },

  getPOById(id) {
    const list = this.getPurchaseOrders();
    return list.find(p => p.id === id) || null;
  },

  createPO(payload) {
    const list = this.getPurchaseOrders();
    const newId = `PO-2026-${Math.floor(105 + Math.random() * 50)}`;
    const newPO = {
      ...payload,
      id: newId,
      orderDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'Unpaid',
      orderStatus: payload.orderStatus || 'Issued',
      trackingNumber: `EXP-TRK-${Math.floor(1000 + Math.random() * 9000)}`,
      timeline: [
        { status: 'Draft Created', date: 'Just now', completed: true },
        { status: 'Approved & Issued', date: 'Just now', completed: true },
        { status: 'In Production / Processing', date: 'Est. Next 3 days', completed: false },
        { status: 'Delivered & Verified', date: `Est. ${payload.deliveryDate || 'Next week'}`, completed: false }
      ]
    };

    const updated = [newPO, ...list];
    storageService.set(storageService.KEYS.PURCHASE_ORDERS, updated);
    return newPO;
  },

  updatePOStatus(id, orderStatus, paymentStatus = null) {
    const list = this.getPurchaseOrders();
    const updated = list.map(p => {
      if (p.id === id) {
        return {
          ...p,
          orderStatus,
          ...(paymentStatus ? { paymentStatus } : {})
        };
      }
      return p;
    });
    storageService.set(storageService.KEYS.PURCHASE_ORDERS, updated);
    return updated;
  }
};

