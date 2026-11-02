import { storageService } from './storageService';
import { initialApprovals } from '../data/mockData';
import { requisitionService } from './requisitionService';

export const approvalService = {
  getApprovals() {
    return storageService.get(storageService.KEYS.APPROVALS, initialApprovals);
  },

  getApprovalById(id) {
    const list = this.getApprovals();
    return list.find(a => a.id === id) || null;
  },

  approve(appId, approverName, comment = '') {
    const list = this.getApprovals();
    let linkedReqId = null;

    const updated = list.map(app => {
      if (app.id === appId) {
        linkedReqId = app.requisitionId;
        return {
          ...app,
          status: 'Approved',
          approvalChain: app.approvalChain.map(step =>
            step.status === 'Pending' || step.role.includes('Committee')
              ? { ...step, status: 'Approved', date: 'Just now', comment: comment || `Approved by ${approverName}` }
              : step
          )
        };
      }
      return app;
    });

    storageService.set(storageService.KEYS.APPROVALS, updated);

    // Update corresponding requisition
    if (linkedReqId) {
      requisitionService.updateRequisition(linkedReqId, { status: 'Approved' });
    }

    return updated;
  },

  reject(appId, rejecterName, reason = '') {
    const list = this.getApprovals();
    let linkedReqId = null;

    const updated = list.map(app => {
      if (app.id === appId) {
        linkedReqId = app.requisitionId;
        return {
          ...app,
          status: 'Rejected',
          approvalChain: app.approvalChain.map(step =>
            step.status === 'Pending' || step.role.includes('Committee')
              ? { ...step, status: 'Rejected', date: 'Just now', comment: reason || `Declined by ${rejecterName}` }
              : step
          )
        };
      }
      return app;
    });

    storageService.set(storageService.KEYS.APPROVALS, updated);

    if (linkedReqId) {
      requisitionService.updateRequisition(linkedReqId, { status: 'Rejected' });
    }

    return updated;
  },

  requestChanges(appId, requesterName, comment) {
    const list = this.getApprovals();
    const updated = list.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'Pending',
          approvalChain: [
            ...app.approvalChain,
            { role: 'Change Request', name: requesterName, status: 'Pending Changes', date: 'Just now', comment }
          ]
        };
      }
      return app;
    });

    storageService.set(storageService.KEYS.APPROVALS, updated);
    return updated;
  }
};
