import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSummaryMetrics, monthlySpendData, spendByCategoryData, topSuppliersSpendData, rfqComparisonData } from '../data/mockData';
import { requisitionService } from '../services/requisitionService';
import { tenderService } from '../services/tenderService';
import { bidService } from '../services/bidService';
import { supplierService } from '../services/supplierService';
import { purchaseOrderService } from '../services/purchaseOrderService';
import { approvalService } from '../services/approvalService';
import { notificationService } from '../services/notificationService';
import { storageService } from '../services/storageService';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [metrics, setMetrics] = useState(initialSummaryMetrics);
  const [requisitions, setRequisitions] = useState(() => requisitionService.getRequisitions());
  const [tenders, setTenders] = useState(() => tenderService.getTenders());
  const [bids, setBids] = useState(() => bidService.getAllBids());
  const [suppliers, setSuppliers] = useState(() => supplierService.getSuppliers());
  const [purchaseOrders, setPurchaseOrders] = useState(() => purchaseOrderService.getPurchaseOrders());
  const [approvals, setApprovals] = useState(() => approvalService.getApprovals());
  const [notifications, setNotifications] = useState(() => notificationService.getNotifications());
  const [auditLogs, setAuditLogs] = useState(() => tenderService.getAuditLogs());
  const [toasts, setToasts] = useState([]);
  const [selectedSupplierForRfq, setSelectedSupplierForRfq] = useState(null);

  // Toast Notification Manager
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Requisitions
  const addRequisition = (newReq) => {
    const created = requisitionService.createRequisition(newReq);
    setRequisitions(requisitionService.getRequisitions());

    // Also trigger approval item
    const newApproval = {
      id: `APP-2026-0${Math.floor(42 + Math.random() * 50)}`,
      requisitionId: created.id,
      description: created.title,
      requestedBy: created.requestedBy,
      department: created.department,
      amount: created.estimatedAmount,
      submittedDate: created.requestDate,
      priority: created.priority,
      status: 'Pending',
      justification: created.justification,
      items: created.items,
      attachments: [{ name: 'Procurement_Specs_Quote_Request.pdf', size: '1.2 MB' }],
      approvalChain: [
        { role: 'Requester Verification', name: created.requestedBy, status: 'Approved', date: 'Just now', comment: 'Self-certified within quarterly budget.' },
        { role: 'Procurement Committee', name: 'Director Sign-off', status: 'Pending', date: 'Awaiting Action', comment: '' }
      ]
    };
    const currentApps = approvalService.getApprovals();
    storageService.set(storageService.KEYS.APPROVALS, [newApproval, ...currentApps]);
    setApprovals(approvalService.getApprovals());

    notificationService.addNotification({
      category: 'Requisitions',
      title: `Requisition ${created.id} Submitted`,
      message: `${created.title} (${created.department}) submitted for approval.`,
      link: '/approvals',
      priority: 'high',
      targetRole: ['admin', 'approver']
    });
    setNotifications(notificationService.getNotifications());

    addToast(`Requisition ${created.id} submitted successfully!`, 'success');
    return created;
  };

  const deleteRequisition = (id) => {
    requisitionService.deleteRequisition(id);
    setRequisitions(requisitionService.getRequisitions());
    addToast(`Requisition ${id} cancelled.`, 'info');
  };

  // Tenders
  const addTender = (tenderPayload) => {
    const created = tenderService.createTender(tenderPayload);
    setTenders(tenderService.getTenders());

    notificationService.addNotification({
      category: 'Tenders',
      title: `New Tender Published: ${created.title}`,
      message: `Tender ${created.id} published under ${created.category}. Bidding open.`,
      link: `/vendor/tenders`,
      priority: 'medium',
      targetRole: ['vendor', 'admin', 'procurement_officer']
    });
    setNotifications(notificationService.getNotifications());

    addToast(`Tender ${created.id} published successfully!`, 'success');
    return created;
  };

  // Vendor Bid Submission
  const submitBid = (bidPayload) => {
    const created = bidService.submitBid(bidPayload);
    setBids(bidService.getAllBids());
    setTenders(tenderService.getTenders());

    notificationService.addNotification({
      category: 'Tenders',
      title: `New Anonymous Bid Received: ${created.bidderId}`,
      message: `Sealed bid submitted for ${created.tenderTitle}. Assigned Token ${created.bidderId}.`,
      link: `/tenders/${created.tenderId}/evaluation`,
      priority: 'medium',
      targetRole: ['admin', 'procurement_officer', 'approver']
    });
    setNotifications(notificationService.getNotifications());

    addToast(`Bid submitted successfully! Anonymous Token: ${created.bidderId}`, 'success');
    return created;
  };

  // Restricted Identity Disclosure
  const revealBidderIdentity = (tenderId, bidderId, performedBy, reason) => {
    const result = tenderService.revealBidderIdentity(tenderId, bidderId, performedBy, reason);
    if (result.success) {
      setBids(bidService.getAllBids());
      setAuditLogs(tenderService.getAuditLogs());
      addToast(`Identity disclosed for ${bidderId} (${result.bid.vendorCompany}). Logged to audit trail.`, 'info');
    }
    return result;
  };

  // Save Bid Evaluation
  const saveBidEvaluation = (bidId, evaluationUpdates) => {
    tenderService.saveBidEvaluation(bidId, evaluationUpdates);
    setBids(bidService.getAllBids());
    addToast('Evaluation scores & comments updated.', 'success');
  };

  // Suppliers
  const addSupplier = (newSup) => {
    const created = supplierService.createSupplier(newSup);
    setSuppliers(supplierService.getSuppliers());
    addToast(`Supplier ${created.name} added to directory!`, 'success');
    return created;
  };

  const updateSupplier = (id, updates) => {
    supplierService.updateSupplier(id, updates);
    setSuppliers(supplierService.getSuppliers());
    addToast(`Supplier updated successfully.`, 'success');
  };

  // Purchase Orders
  const addPurchaseOrder = (newPO) => {
    const created = purchaseOrderService.createPO(newPO);
    setPurchaseOrders(purchaseOrderService.getPurchaseOrders());

    notificationService.addNotification({
      category: 'Purchase Orders',
      title: `Purchase Order ${created.id} Generated`,
      message: `PO issued to ${created.supplier} for BDT ${created.totalAmount.toLocaleString()}`,
      link: '/purchase-orders',
      priority: 'normal',
      targetRole: ['admin', 'procurement_officer']
    });
    setNotifications(notificationService.getNotifications());

    addToast(`Purchase Order ${created.id} issued successfully!`, 'success');
    return created;
  };

  // Approvals
  const approveApproval = (appId, approverName, comment = '') => {
    approvalService.approve(appId, approverName, comment);
    setApprovals(approvalService.getApprovals());
    setRequisitions(requisitionService.getRequisitions());
    addToast(`Request ${appId} approved successfully!`, 'success');
  };

  const rejectApproval = (appId, rejecterName, reason = '') => {
    approvalService.reject(appId, rejecterName, reason);
    setApprovals(approvalService.getApprovals());
    setRequisitions(requisitionService.getRequisitions());
    addToast(`Request ${appId} rejected.`, 'info');
  };

  const requestChanges = (appId, requesterName, comment) => {
    approvalService.requestChanges(appId, requesterName, comment);
    setApprovals(approvalService.getApprovals());
    addToast(`Changes requested for ${appId}.`, 'info');
  };

  // Notifications
  const markNotificationRead = (id) => {
    notificationService.markAsRead(id);
    setNotifications(notificationService.getNotifications());
  };

  const markAllNotificationsRead = () => {
    notificationService.markAllAsRead();
    setNotifications(notificationService.getNotifications());
    addToast('All notifications marked as read', 'info');
  };

  // Reset entire application demo state
  const resetDemoState = () => {
    storageService.resetAllDemoData();
    setRequisitions(requisitionService.getRequisitions());
    setTenders(tenderService.getTenders());
    setBids(bidService.getAllBids());
    setSuppliers(supplierService.getSuppliers());
    setPurchaseOrders(purchaseOrderService.getPurchaseOrders());
    setApprovals(approvalService.getApprovals());
    setNotifications(notificationService.getNotifications());
    setAuditLogs(tenderService.getAuditLogs());
    addToast('Demo dataset has been restored to factory default state.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        metrics,
        requisitions,
        tenders,
        bids,
        suppliers,
        purchaseOrders,
        approvals,
        notifications,
        auditLogs,
        toasts,
        selectedSupplierForRfq,
        setSelectedSupplierForRfq,
        addToast,
        removeToast,
        addRequisition,
        deleteRequisition,
        addTender,
        submitBid,
        revealBidderIdentity,
        saveBidEvaluation,
        addSupplier,
        updateSupplier,
        addPurchaseOrder,
        approveApproval,
        rejectApproval,
        requestChanges,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoState,
        rfq: rfqComparisonData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
