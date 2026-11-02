import { storageService } from './storageService';
import { INITIAL_TENDERS } from '../data/tenders';
import { INITIAL_BIDS, INITIAL_AUDIT_LOGS } from '../data/bids';

export const tenderService = {
  getTenders() {
    return storageService.get(storageService.KEYS.TENDERS, INITIAL_TENDERS);
  },

  getTenderById(id) {
    const tenders = this.getTenders();
    return tenders.find(t => t.id === id) || null;
  },

  createTender(tenderPayload) {
    const tenders = this.getTenders();
    const newId = `TND-2026-0${Math.floor(90 + Math.random() * 90)}`;
    const newTender = {
      ...tenderPayload,
      id: newId,
      publicationDate: new Date().toISOString().split('T')[0],
      invitedVendorsCount: tenderPayload.invitedVendorsCount || 0,
      receivedBidsCount: 0,
      status: tenderPayload.status || 'Published',
      isAnonymous: true,
      timeline: [
        { step: 'Tender Drafted', date: new Date().toISOString().split('T')[0], done: true },
        { step: 'Tender Published', date: new Date().toISOString().split('T')[0], done: true, active: true },
        { step: 'Bid Submissions', date: `Until ${tenderPayload.submissionDeadline}`, done: false },
        { step: 'Anonymous Evaluation', date: 'Pending', done: false }
      ]
    };

    const updated = [newTender, ...tenders];
    storageService.set(storageService.KEYS.TENDERS, updated);
    return newTender;
  },

  updateTenderStatus(id, status) {
    const tenders = this.getTenders();
    const updated = tenders.map(t => (t.id === id ? { ...t, status } : t));
    storageService.set(storageService.KEYS.TENDERS, updated);
    return updated;
  },

  // Anonymous Bids
  getBidsForTender(tenderId) {
    const allBids = storageService.get(storageService.KEYS.BIDS, INITIAL_BIDS);
    return allBids.filter(b => b.tenderId === tenderId);
  },

  // Masked Bids for Anonymous Evaluation View (hides company names unless revealed)
  getAnonymousBidsForTender(tenderId) {
    const bids = this.getBidsForTender(tenderId);
    return bids.map(bid => {
      if (bid.identityRevealed) {
        return bid; // Already revealed with audit justification
      }
      return {
        ...bid,
        vendorCompany: `[CONFIDENTIAL] ${bid.bidderId}`,
        submittedBy: '[PROTECTED BY ANONYMOUS PROTOCOL]',
        vendorId: '[MASKED]'
      };
    });
  },

  // Restricted Identity Disclosure Action
  revealBidderIdentity(tenderId, bidderId, performedBy, reason) {
    const allBids = storageService.get(storageService.KEYS.BIDS, INITIAL_BIDS);
    const auditLogs = storageService.get(storageService.KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);

    let targetBid = null;
    const updatedBids = allBids.map(bid => {
      if (bid.tenderId === tenderId && bid.bidderId === bidderId) {
        targetBid = bid;
        return {
          ...bid,
          identityRevealed: true,
          revealJustification: reason,
          revealedBy: performedBy,
          revealTimestamp: new Date().toLocaleString()
        };
      }
      return bid;
    });

    if (targetBid) {
      const newAudit = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        tenderId,
        action: 'BIDDER_IDENTITY_REVEALED',
        bidderId,
        revealedCompany: targetBid.vendorCompany,
        performedBy,
        reason,
        timestamp: new Date().toLocaleString(),
        ipAddress: '10.0.14.88 (Enterprise Internal)'
      };

      storageService.set(storageService.KEYS.BIDS, updatedBids);
      storageService.set(storageService.KEYS.AUDIT_LOGS, [newAudit, ...auditLogs]);
      return { success: true, bid: targetBid, audit: newAudit };
    }

    return { success: false };
  },

  // Save evaluator comments and criteria marks
  saveBidEvaluation(bidId, evaluationUpdates) {
    const allBids = storageService.get(storageService.KEYS.BIDS, INITIAL_BIDS);
    const updated = allBids.map(bid => {
      if (bid.id === bidId) {
        return {
          ...bid,
          ...evaluationUpdates
        };
      }
      return bid;
    });
    storageService.set(storageService.KEYS.BIDS, updated);
    return updated;
  },

  getAuditLogs(tenderId = null) {
    const logs = storageService.get(storageService.KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    if (tenderId) {
      return logs.filter(l => l.tenderId === tenderId);
    }
    return logs;
  }
};
