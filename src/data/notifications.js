// Centralized Notifications Dataset for Procura

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-001",
    category: "Approvals",
    title: "Requisition REQ-2026-0891 Awaiting Review",
    message: "Tariqul Islam submitted Dell Precision Workstations (BDT 1,850,000) requiring your director sign-off.",
    timestamp: "25 mins ago",
    read: false,
    link: "/approvals",
    priority: "high",
    targetRole: ["admin", "approver"]
  },
  {
    id: "NOTIF-002",
    category: "Tenders",
    title: "New Bid Received for TND-2026-088",
    message: "A new sealed anonymous bid (Token: BIDDER-9310) was registered for the Developer Laptops tender.",
    timestamp: "2 hours ago",
    read: false,
    link: "/tenders/TND-2026-088/evaluation",
    priority: "medium",
    targetRole: ["admin", "procurement_officer", "approver"]
  },
  {
    id: "NOTIF-003",
    category: "Vendor",
    title: "Bid Registered: BID-088-01 (TechSource Ltd.)",
    message: "Your submission for TND-2026-088 was confirmed and assigned anonymous token BIDDER-7041.",
    timestamp: "1 day ago",
    read: true,
    link: "/vendor/my-bids",
    priority: "normal",
    targetRole: ["vendor"]
  },
  {
    id: "NOTIF-004",
    category: "Purchase Orders",
    title: "Purchase Order PO-2026-104 Issued",
    message: "PO-2026-104 for Ergonomic Furniture has been issued to GreenDesk Workspace Ltd.",
    timestamp: "1 day ago",
    read: true,
    link: "/purchase-orders",
    priority: "normal",
    targetRole: ["admin", "procurement_officer"]
  },
  {
    id: "NOTIF-005",
    category: "Tenders",
    title: "New Tender Published: Cisco Switches (TND-2026-085)",
    message: "TND-2026-085 has been published. Eligible tier-1 networking vendors are invited to bid.",
    timestamp: "3 days ago",
    read: true,
    link: "/vendor/tenders",
    priority: "medium",
    targetRole: ["vendor", "admin", "procurement_officer"]
  },
  {
    id: "NOTIF-006",
    category: "AI Insights",
    title: "Consolidation Opportunity Detected",
    message: "3 independent workstation requisitions identified with potential volume discount of BDT 210,000.",
    timestamp: "3 days ago",
    read: true,
    link: "/quotations",
    priority: "low",
    targetRole: ["admin", "procurement_officer"]
  }
];

