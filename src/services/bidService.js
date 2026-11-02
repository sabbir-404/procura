import { storageService } from './storageService';
import { INITIAL_BIDS } from '../data/bids';
import { tenderService } from './tenderService';

export const bidService = {
  getAllBids() {
    return storageService.get(storageService.KEYS.BIDS, INITIAL_BIDS);
  },

  // Strictly filter bids by vendor ID so vendors only see their own bids!
  getBidsByVendor(vendorId) {
    const allBids = this.getAllBids();
    return allBids.filter(b => b.vendorId === vendorId);
  },

  getBidById(bidId) {
    const allBids = this.getAllBids();
    return allBids.find(b => b.id === bidId) || null;
  },

  // Vendor submits a new bid
  submitBid(bidPayload) {
    const allBids = this.getAllBids();
    const newBidId = `BID-${bidPayload.tenderId.replace('TND-', '')}-${Math.floor(10 + Math.random() * 89)}`;
    const randomToken = Math.floor(1000 + Math.random() * 9000);
    const newBidderId = `BIDDER-${randomToken}`;

    const newBid = {
      ...bidPayload,
      id: newBidId,
      bidderId: newBidderId,
      submissionDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Submitted',
      evaluationScore: 0,
      technicalCompliance: 'Pending Evaluation',
      financialCompliance: 'Sealed & Validated',
      identityRevealed: false,
      revealJustification: null,
      revealedBy: null,
      revealTimestamp: null,
      evaluatorNotes: 'Awaiting technical compliance audit.',
      clarifications: []
    };

    const updated = [newBid, ...allBids];
    storageService.set(storageService.KEYS.BIDS, updated);

    // Increment received bids count on the tender
    const tenders = tenderService.getTenders();
    const updatedTenders = tenders.map(t => {
      if (t.id === bidPayload.tenderId) {
        return {
          ...t,
          receivedBidsCount: (t.receivedBidsCount || 0) + 1
        };
      }
      return t;
    });
    storageService.set(storageService.KEYS.TENDERS, updatedTenders);

    return newBid;
  },

  withdrawBid(bidId) {
    const allBids = this.getAllBids();
    const updated = allBids.map(b => (b.id === bidId ? { ...b, status: 'Withdrawn' } : b));
    storageService.set(storageService.KEYS.BIDS, updated);
    return updated;
  }
};
