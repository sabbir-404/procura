// Procura Enterprise Mock Data
// Realistic enterprise SaaS dataset for AI-Powered Procurement & Supplier Management Platform

export const initialSummaryMetrics = {
  totalSpend: "BDT 12.8M",
  totalSpendNum: 12845000,
  spendComparison: "+8.4% vs last quarter",
  pendingApprovals: 18,
  pendingApprovalsTrend: "4 high priority requests",
  activePOs: 42,
  activePOsTrend: "6 scheduled for delivery this week",
  activeSuppliers: 126,
  activeSuppliersTrend: "94.2% on-time fulfillment rate",
  costSavings: "BDT 1.45M",
  avgProcurementCycle: "4.8 days",
  supplierPerformanceScore: "94.6%"
};

export const monthlySpendData = [
  { month: "May 2026", spend: 1850000, budget: 2100000, savings: 250000 },
  { month: "Jun 2026", spend: 2040000, budget: 2200000, savings: 160000 },
  { month: "Jul 2026", spend: 1920000, budget: 2000000, savings: 180000 },
  { month: "Aug 2026", spend: 2280000, budget: 2400000, savings: 220000 },
  { month: "Sep 2026", spend: 2350000, budget: 2500000, savings: 270000 },
  { month: "Oct 2026", spend: 2405000, budget: 2600000, savings: 370000 },
];

export const spendByCategoryData = [
  { name: "IT Hardware & Cloud", value: 4880000, percentage: 38, color: "#0d9488" }, // teal
  { name: "Facilities & MRO", value: 3080000, percentage: 24, color: "#3b82f6" },    // blue
  { name: "Software Licenses", value: 2310000, percentage: 18, color: "#6366f1" },  // indigo
  { name: "Professional Services", value: 1540000, percentage: 12, color: "#f59e0b" }, // amber
  { name: "Office & Stationery", value: 1035000, percentage: 8, color: "#10b981" },   // emerald
];

export const topSuppliersSpendData = [
  { name: "TechSource Ltd.", spend: 3850000, orders: 42, category: "IT Hardware" },
  { name: "Bengal Micro Systems", spend: 2720000, orders: 28, category: "Enterprise Networking" },
  { name: "Padma Industrial Supply", spend: 2150000, orders: 36, category: "Industrial Equipment" },
  { name: "Apex Digital Solutions", spend: 1840000, orders: 19, category: "Workstations & Display" },
  { name: "GreenDesk Workspace Ltd.", spend: 1285000, orders: 14, category: "Ergonomic Furniture" },
];

export const statusDistributionData = [
  { status: "Approved & Issued", count: 84, color: "#0d9488" },
  { status: "Pending Approval", count: 18, color: "#f59e0b" },
  { status: "Under Review", count: 14, color: "#6366f1" },
  { status: "In Fulfillment", count: 26, color: "#3b82f6" },
  { status: "Completed", count: 142, color: "#10b981" },
];

export const aiDashboardInsights = [
  {
    id: "ai-1",
    type: "cost_alert",
    badge: "Budget Alert",
    title: "Office supply spending increased by 12% this month",
    description: "Dhaka HQ administrative printing and consumable purchases accelerated faster than standard quarterly baseline. Consider batching via Preferred Supplier agreement.",
    actionText: "Review Consumable POs",
    impact: "+BDT 142,000 variance",
    severity: "warning"
  },
  {
    id: "ai-2",
    type: "optimization",
    badge: "Consolidation Opportunity",
    title: "Three purchase requests have potential for supplier consolidation",
    description: "Engineering and Operations submitted separate workstation requests for Dell XPS laptops. Consolidating into RFQ-2026-092 unlocks 7.5% volume tier discount.",
    actionText: "Consolidate Requisitions",
    impact: "Estimated BDT 210,000 savings",
    severity: "success"
  },
  {
    id: "ai-3",
    type: "vendor_rate",
    badge: "Price Opportunity",
    title: "Preferred supplier offers a lower price for frequently purchased items",
    description: "TechSource Ltd. updated contracted pricing on Cisco SFP+ transceivers and CAT6A bulk spools, offering 9.2% lower rates than the pending non-contract quote.",
    actionText: "Apply Contract Pricing",
    impact: "BDT 85,000 instant saving",
    severity: "info"
  }
];

export const initialRequisitions = [
  {
    id: "REQ-2026-0891",
    title: "Dell Precision 5680 Workstations for Engineering Team",
    requestedBy: "Tariqul Islam",
    department: "Engineering",
    requestDate: "2026-10-28",
    requiredDate: "2026-11-15",
    estimatedAmount: 1850000,
    priority: "High",
    status: "Pending",
    justification: "Equipping 10 new senior backend and AI pipeline engineers joining Q4 expansion.",
    preferredSupplier: "TechSource Ltd.",
    deliveryLocation: "Dhaka Tech Hub, Gulshan-2, Dhaka 1212",
    items: [
      { id: 1, name: "Dell Precision 5680 (i9, 64GB, 2TB SSD, RTX 4080)", description: "Enterprise Workstation", quantity: 10, unit: "Units", unitPrice: 185000, totalPrice: 1850000 }
    ],
    history: [
      { step: "Requisition Submitted", by: "Tariqul Islam", date: "2026-10-28 09:30 AM", status: "completed" },
      { step: "Department Head Review", by: "Dr. Farhana Rahman", date: "2026-10-28 02:15 PM", status: "completed" },
      { step: "Procurement Committee Approval", by: "Alex Morgan", date: "Pending", status: "current" },
      { step: "Purchase Order Issuance", by: "Procurement Ops", date: "Pending", status: "pending" }
    ]
  },
  {
    id: "REQ-2026-0888",
    title: "Cisco Catalyst 9300 48-Port PoE+ Core Switches",
    requestedBy: "Sabbir Hossain",
    department: "Information Technology",
    requestDate: "2026-10-27",
    requiredDate: "2026-11-10",
    estimatedAmount: 920000,
    priority: "Critical",
    status: "Under Review",
    justification: "Replacement of end-of-life access layer switches at the Gazipur primary data facility.",
    preferredSupplier: "Bengal Micro Systems",
    deliveryLocation: "Gazipur Tech Center, Board Bazar, Gazipur",
    items: [
      { id: 1, name: "Cisco Catalyst C9300-48P-A", description: "48-port PoE+, Network Advantage", quantity: 2, unit: "Units", unitPrice: 460000, totalPrice: 920000 }
    ],
    history: [
      { step: "Requisition Submitted", by: "Sabbir Hossain", date: "2026-10-27 11:20 AM", status: "completed" },
      { step: "Technical Feasibility Validated", by: "Infrastructure Lead", date: "2026-10-27 04:45 PM", status: "completed" },
      { step: "Financial Controller Review", by: "Finance Directorate", date: "In Progress", status: "current" }
    ]
  },
  {
    id: "REQ-2026-0885",
    title: "Ergonomic Mesh Task Chairs & Height Adjustable Desks",
    requestedBy: "Nusrat Jahan",
    department: "Facilities & Admin",
    requestDate: "2026-10-25",
    requiredDate: "2026-11-20",
    estimatedAmount: 485000,
    priority: "Medium",
    status: "Approved",
    justification: "Health and occupational safety upgrade for Customer Experience operations floor.",
    preferredSupplier: "GreenDesk Workspace Ltd.",
    deliveryLocation: "Banani Office Level 6, Road 11, Dhaka",
    items: [
      { id: 1, name: "Ergonomic High-Back Task Chair (Lumbar Support)", description: "Breathable mesh, 4D armrest", quantity: 20, unit: "Units", unitPrice: 14500, totalPrice: 290000 },
      { id: 2, name: "Dual-Motor Electric Sit-Stand Desk Frame (140x70cm)", description: "Preset memory controller", quantity: 10, unit: "Units", unitPrice: 19500, totalPrice: 195000 }
    ],
    history: [
      { step: "Submitted", by: "Nusrat Jahan", date: "2026-10-25 10:00 AM", status: "completed" },
      { step: "Approved by Admin Director", by: "Kamrul Ahsan", date: "2026-10-26 11:30 AM", status: "completed" },
      { step: "PO Generated", by: "PO-2026-104", date: "2026-10-26 03:00 PM", status: "completed" }
    ]
  },
  {
    id: "REQ-2026-0880",
    title: "Enterprise Annual Cloud Security & Endpoint Protection License",
    requestedBy: "Mustafa Kamal",
    department: "Information Technology",
    requestDate: "2026-10-24",
    requiredDate: "2026-11-01",
    estimatedAmount: 1350000,
    priority: "High",
    status: "Approved",
    justification: "Annual renewal for CrowdStrike Falcon Endpoint XDR license across 350 enterprise nodes.",
    preferredSupplier: "TechSource Ltd.",
    deliveryLocation: "Electronic License Delivery / Cloud Portal",
    items: [
      { id: 1, name: "CrowdStrike Falcon Enterprise XDR (1-Yr Term)", description: "Endpoint Detection & Incident Response", quantity: 350, unit: "Licenses", unitPrice: 3857, totalPrice: 1350000 }
    ],
    history: [
      { step: "Submitted", by: "Mustafa Kamal", date: "2026-10-24 08:45 AM", status: "completed" },
      { step: "Procurement Approval", by: "Alex Morgan", date: "2026-10-24 04:00 PM", status: "completed" }
    ]
  },
  {
    id: "REQ-2026-0876",
    title: "Heavy Duty Diesel Standby Generator Maintenance Overhaul",
    requestedBy: "Tanvir Ahmed",
    department: "Operations",
    requestDate: "2026-10-22",
    requiredDate: "2026-11-05",
    estimatedAmount: 620000,
    priority: "Medium",
    status: "Completed",
    justification: "Mandatory 500-hour service and alternator bearing replacement for 250kVA standby genset.",
    preferredSupplier: "Padma Industrial Supply",
    deliveryLocation: "Chattogram Terminal Depot, Port Access Road, Chattogram",
    items: [
      { id: 1, name: "Cummins 250kVA Comprehensive Maintenance Kit", description: "Filters, synthetic oil, fuel injectors, calibration", quantity: 1, unit: "Package", unitPrice: 620000, totalPrice: 620000 }
    ],
    history: [
      { step: "Approved & Completed", by: "Alex Morgan", date: "2026-10-23 02:00 PM", status: "completed" }
    ]
  },
  {
    id: "REQ-2026-0872",
    title: "Q4 High-Yield Laser Toner Cartridges & Copier Paper Pallets",
    requestedBy: "Rashed Chowdhury",
    department: "Facilities & Admin",
    requestDate: "2026-10-20",
    requiredDate: "2026-10-30",
    estimatedAmount: 185000,
    priority: "Low",
    status: "Rejected",
    justification: "Standard quarterly restock for general documentation and contract printing.",
    preferredSupplier: "Meghna Stationery & Consumables",
    deliveryLocation: "Dhaka Gulshan HQ Level 3",
    items: [
      { id: 1, name: "HP LaserJet Enterprise Toner Cartridge (Black/Cyan/Magenta/Yellow)", description: "High yield OEM pack", quantity: 6, unit: "Sets", unitPrice: 22000, totalPrice: 132000 },
      { id: 2, name: "Double A Premium 80GSM A4 Box (5 Reams/Box)", description: "Multi-purpose copy paper", quantity: 35, unit: "Boxes", unitPrice: 1514, totalPrice: 53000 }
    ],
    history: [
      { step: "Submitted", by: "Rashed Chowdhury", date: "2026-10-20 09:15 AM", status: "completed" },
      { step: "Rejected by Finance Controller", by: "Afsana Begum", date: "2026-10-21 11:00 AM", status: "rejected", note: "Over-budget for Q4 consumables; existing reserve stock covers through Dec." }
    ]
  },
  {
    id: "REQ-2026-0869",
    title: "Smart Conference Room 4K Interactive Displays (75-inch)",
    requestedBy: "Mahmud Hasan",
    department: "Marketing & Comms",
    requestDate: "2026-10-18",
    requiredDate: "2026-11-12",
    estimatedAmount: 760000,
    priority: "Medium",
    status: "Under Review",
    justification: "Upgrading executive client boardroom and marketing briefing suite with multi-touch collaboration screens.",
    preferredSupplier: "Apex Digital Solutions",
    deliveryLocation: "Gulshan Corporate Centre, Level 11, Dhaka",
    items: [
      { id: 1, name: "Samsung Flip Pro 75\" 4K UHD Interactive Whiteboard", description: "Built-in OPS PC, optical pen, mobile floor stand", quantity: 2, unit: "Units", unitPrice: 380000, totalPrice: 760000 }
    ],
    history: [
      { step: "Submitted", by: "Mahmud Hasan", date: "2026-10-18 01:20 PM", status: "completed" },
      { step: "Procurement Assessment", by: "Alex Morgan", date: "2026-10-19 10:00 AM", status: "current" }
    ]
  }
];

export const initialSuppliers = [
  {
    id: "SUP-001",
    name: "TechSource Ltd.",
    category: "IT Hardware & Cloud",
    contactPerson: "Arifur Rahman",
    email: "arif.rahman@techsource-bd.com",
    phone: "+880 1711-489201",
    location: "Gulshan-1, Dhaka",
    division: "Dhaka",
    rating: 4.9,
    totalOrders: 142,
    totalSpendBDT: 14200000,
    status: "Preferred",
    onTimeDelivery: "98.4%",
    qualityScore: "99.1%",
    contractExpires: "2027-06-30",
    tags: ["Tier-1 Partner", "Dell OEM", "Cisco Premier", "ISO 9001"],
    aiSummary: "Top-tier reliability with lowest dispute frequency (0.4%). Outstanding enterprise SLA compliance. Negotiated master discount active until mid-2027.",
    recentOrders: [
      { po: "PO-2026-098", amount: "BDT 1,850,000", date: "2026-10-12", status: "Delivered" },
      { po: "PO-2026-081", amount: "BDT 3,240,000", date: "2026-09-04", status: "Delivered" },
      { po: "PO-2026-064", amount: "BDT 980,000", date: "2026-08-18", status: "Delivered" }
    ]
  },
  {
    id: "SUP-002",
    name: "Bengal Micro Systems",
    category: "Enterprise Networking",
    contactPerson: "Sultana Parveen",
    email: "s.parveen@bengalmicro.net",
    phone: "+880 1819-204510",
    location: "Kawran Bazar, Dhaka",
    division: "Dhaka",
    rating: 4.7,
    totalOrders: 86,
    totalSpendBDT: 9400000,
    status: "Active",
    onTimeDelivery: "95.1%",
    qualityScore: "97.4%",
    contractExpires: "2027-02-28",
    tags: ["Networking Specialist", "Juniper Partner", "HP Aruba"],
    aiSummary: "Extremely competitive on core optical switches and structured cabling. Lead time is slightly longer (avg 14 days) but pricing is 4-6% below market average.",
    recentOrders: [
      { po: "PO-2026-101", amount: "BDT 840,000", date: "2026-10-19", status: "In Fulfillment" },
      { po: "PO-2026-077", amount: "BDT 1,220,000", date: "2026-08-28", status: "Delivered" }
    ]
  },
  {
    id: "SUP-003",
    name: "Padma Industrial Supply",
    category: "Industrial & MRO Equipment",
    contactPerson: "Kamrul Ahsan",
    email: "kamrul@padmaindustrial.com.bd",
    phone: "+880 1912-330419",
    location: "Board Bazar, Gazipur",
    division: "Gazipur",
    rating: 4.8,
    totalOrders: 115,
    totalSpendBDT: 8750000,
    status: "Preferred",
    onTimeDelivery: "97.2%",
    qualityScore: "98.5%",
    contractExpires: "2026-12-31",
    tags: ["Heavy Machinery", "Power Systems", "MRO Consumables"],
    aiSummary: "Dependable regional partner for power generation, electrical spares, and industrial safety infrastructure. High responsiveness during emergency call-outs.",
    recentOrders: [
      { po: "PO-2026-095", amount: "BDT 620,000", date: "2026-10-08", status: "Delivered" },
      { po: "PO-2026-068", amount: "BDT 1,450,000", date: "2026-08-11", status: "Delivered" }
    ]
  },
  {
    id: "SUP-004",
    name: "Apex Digital Solutions",
    category: "Workstations & Peripherals",
    contactPerson: "Tanvir Hossain",
    email: "tanvir.h@apexdigital-ctg.com",
    phone: "+880 1713-998822",
    location: "Agrabad C/A, Chattogram",
    division: "Chattogram",
    rating: 4.6,
    totalOrders: 64,
    totalSpendBDT: 5600000,
    status: "Active",
    onTimeDelivery: "93.8%",
    qualityScore: "96.2%",
    contractExpires: "2027-04-15",
    tags: ["Audio Visual", "Interactive Displays", "Port Logistics"],
    aiSummary: "Primary vendor for coastal operations and port facilities in Chattogram. Provides rapid on-site technician dispatch within the commercial zone.",
    recentOrders: [
      { po: "PO-2026-089", amount: "BDT 760,000", date: "2026-09-22", status: "Delivered" }
    ]
  },
  {
    id: "SUP-005",
    name: "GreenDesk Workspace Ltd.",
    category: "Ergonomic Furniture",
    contactPerson: "Nafisa Anjum",
    email: "nafisa@greendesk.com.bd",
    phone: "+880 1678-112233",
    location: "Banani, Dhaka",
    division: "Dhaka",
    rating: 4.3,
    totalOrders: 14,
    totalSpendBDT: 1285000,
    status: "Under Evaluation",
    onTimeDelivery: "91.5%",
    qualityScore: "94.0%",
    contractExpires: "2026-11-30",
    tags: ["Eco-friendly", "Ergonomics", "BIFMA Certified"],
    aiSummary: "Recent vendor enrolled under sustainable office furniture initiative. Excellent aesthetic and ergonomic quality; monitoring adherence to 10-day SLA.",
    recentOrders: [
      { po: "PO-2026-104", amount: "BDT 485,000", date: "2026-10-26", status: "Issued" }
    ]
  },
  {
    id: "SUP-006",
    name: "Navana Logistics & Fleet",
    category: "Logistics & Transport",
    contactPerson: "Jamil Chowdhury",
    email: "fleet.ops@navanalogistics.com",
    phone: "+880 1755-776655",
    location: "Tejgaon I/A, Dhaka",
    division: "Dhaka",
    rating: 4.5,
    totalOrders: 52,
    totalSpendBDT: 3450000,
    status: "Active",
    onTimeDelivery: "92.0%",
    qualityScore: "95.5%",
    contractExpires: "2027-08-31",
    tags: ["Inter-district Freight", "Cold Chain", "GPS Tracked"],
    aiSummary: "Handles inter-facility haulage between Dhaka headquarters and regional hubs in Chattogram and Bogura with live GPS telematics.",
    recentOrders: [
      { po: "PO-2026-092", amount: "BDT 310,000", date: "2026-10-02", status: "Delivered" }
    ]
  },
  {
    id: "SUP-007",
    name: "Meghna Stationery & Consumables",
    category: "Office Supplies",
    contactPerson: "Sayeedur Rahman",
    email: "sayeed@meghnastationery.com",
    phone: "+880 1822-445566",
    location: "Tongi, Gazipur",
    division: "Gazipur",
    rating: 4.4,
    totalOrders: 98,
    totalSpendBDT: 1850000,
    status: "Active",
    onTimeDelivery: "96.0%",
    qualityScore: "93.8%",
    contractExpires: "2026-12-15",
    tags: ["Paper Consumables", "Bulk Supplies", "Net 30"],
    aiSummary: "High volume supplier for routine paperwork and archival stationery. Consistently delivers within 48 hours for standard catalog items.",
    recentOrders: [
      { po: "PO-2026-071", amount: "BDT 112,000", date: "2026-08-20", status: "Delivered" }
    ]
  },
  {
    id: "SUP-008",
    name: "Delta Safety & Security Tech",
    category: "Security & Facility Systems",
    contactPerson: "Enamul Haque",
    email: "enamul@deltasafety.com.bd",
    phone: "+880 1715-667788",
    location: "Narayanganj City",
    division: "Narayanganj",
    rating: 4.7,
    totalOrders: 39,
    totalSpendBDT: 2950000,
    status: "Active",
    onTimeDelivery: "94.5%",
    qualityScore: "98.0%",
    contractExpires: "2027-05-31",
    tags: ["Access Control", "CCTV", "Fire Suppression"],
    aiSummary: "Specialized in biometric access gates, thermal monitoring, and FM-200 fire suppression canisters for server environments.",
    recentOrders: [
      { po: "PO-2026-062", amount: "BDT 420,000", date: "2026-07-29", status: "Delivered" }
    ]
  }
];

export const rfqComparisonData = {
  rfqId: "RFQ-2026-088",
  title: "Enterprise Cloud-Ready Laptops & Developer Workstations (45 units)",
  department: "Engineering & IT Operations",
  requestedBy: "Tariqul Islam (Lead Architect)",
  budgetLimit: "BDT 7,200,000",
  submissionDeadline: "2026-10-30",
  invitedSuppliersCount: 5,
  receivedQuotationsCount: 3,
  itemSpecifications: "45 units of high-performance developer laptops: Core i9 14th Gen or Apple M3 Pro equivalent, 32GB RAM min, 1TB NVMe Gen4 SSD, 3-Year Enterprise On-Site Warranty.",
  
  quotations: [
    {
      id: "QUO-088-A",
      supplierId: "SUP-001",
      supplierName: "TechSource Ltd.",
      logoInitials: "TS",
      unitPriceBDT: 150000,
      totalAmountBDT: 6750000,
      deliveryTime: "7 Business Days",
      deliveryDaysNum: 7,
      warranty: "36 Months On-site SLA (24/7)",
      paymentTerms: "Net 45 Days",
      supplierRating: 4.9,
      historicalReliability: "98.4%",
      quotationStatus: "Recommended",
      isLowestPrice: false,
      isFastestDelivery: true,
      isHighestRating: true,
      isAiRecommended: true,
      score: 94.6,
      scoreBreakdown: {
        priceScore: 88,
        reliabilityScore: 99,
        deliveryScore: 98,
        warrantyScore: 96,
        termsScore: 92
      },
      specDetails: "Dell Latitude 7450 / Precision Mobile, 32GB DDR5, 1TB NVMe, Dell ProSupport Plus with Accidental Damage Protection."
    },
    {
      id: "QUO-088-B",
      supplierId: "SUP-002",
      supplierName: "Bengal Micro Systems",
      logoInitials: "BM",
      unitPriceBDT: 144000,
      totalAmountBDT: 6480000,
      deliveryTime: "18 Business Days",
      deliveryDaysNum: 18,
      warranty: "24 Months Depot Service",
      paymentTerms: "Net 30 Days",
      supplierRating: 4.7,
      historicalReliability: "95.1%",
      quotationStatus: "Competitive",
      isLowestPrice: true,
      isFastestDelivery: false,
      isHighestRating: false,
      isAiRecommended: false,
      score: 87.2,
      scoreBreakdown: {
        priceScore: 98,
        reliabilityScore: 92,
        deliveryScore: 74,
        warrantyScore: 82,
        termsScore: 90
      },
      specDetails: "Lenovo ThinkPad T14 Gen 5, 32GB LPDDR5x, 1TB NVMe, Lenovo Premier Support (Carry-in after Year 1)."
    },
    {
      id: "QUO-088-C",
      supplierId: "SUP-004",
      supplierName: "Apex Digital Solutions",
      logoInitials: "AD",
      unitPriceBDT: 153000,
      totalAmountBDT: 6885000,
      deliveryTime: "12 Business Days",
      deliveryDaysNum: 12,
      warranty: "36 Months Standard Replacement",
      paymentTerms: "Net 30 Days",
      supplierRating: 4.6,
      historicalReliability: "93.8%",
      quotationStatus: "Standard",
      isLowestPrice: false,
      isFastestDelivery: false,
      isHighestRating: false,
      isAiRecommended: false,
      score: 82.5,
      scoreBreakdown: {
        priceScore: 84,
        reliabilityScore: 89,
        deliveryScore: 86,
        warrantyScore: 88,
        termsScore: 86
      },
      specDetails: "HP EliteBook 840 G11, 32GB RAM, 1TB SSD, HP Care Pack Onsite Next Business Day Response."
    }
  ],

  aiRecommendation: {
    recommendedSupplier: "TechSource Ltd.",
    confidenceScore: "94.6 / 100",
    badgeText: "Best Overall Value & Enterprise SLA",
    headline: "Optimal balance of on-site mission SLA, fastest lead time, and favorable working capital terms",
    keyReasons: [
      {
        title: "Mitigated Operational Risk",
        desc: "Includes 36-month 24/7 on-site SLA with accidental damage protection, preventing developer downtime estimated at BDT 420,000/yr vs depot repair."
      },
      {
        title: "Accelerated Delivery (7 Days)",
        desc: "Fulfills onboarding milestone 11 days sooner than Bengal Micro Systems (18 days), enabling new hire productivity on day 1."
      },
      {
        title: "Extended Cash Flow (Net 45)",
        desc: "Net 45 terms offer 15 additional days of working capital float compared to standard Net 30 quotations."
      },
      {
        title: "Total Cost of Ownership",
        desc: "Although initial quote is BDT 270,000 (4.0%) higher than Bengal Micro's lowest bid, total warranty coverage and included docking hubs offset the delta by BDT 340,000."
      }
    ],
    disclaimer: "Illustrative AI evaluation based on historical supplier metrics and multi-factor decision weighting. Final procurement approval rests with the designated signing authority."
  }
};

export const initialPurchaseOrders = [
  {
    id: "PO-2026-104",
    requisitionId: "REQ-2026-0885",
    supplier: "GreenDesk Workspace Ltd.",
    orderDate: "2026-10-26",
    deliveryDate: "2026-11-08",
    department: "Facilities & Admin",
    totalAmount: 485000,
    paymentStatus: "Unpaid",
    orderStatus: "Issued",
    trackingNumber: "GD-EXP-8890",
    deliveryLocation: "Banani Office Level 6, Dhaka",
    items: [
      { name: "Ergonomic High-Back Task Chair", qty: 20, unitPrice: 14500, total: 290000 },
      { name: "Dual-Motor Electric Sit-Stand Desk Frame", qty: 10, unitPrice: 19500, total: 195000 }
    ],
    timeline: [
      { status: "Draft Created", date: "2026-10-26 10:00 AM", completed: true },
      { status: "Finance Approved", date: "2026-10-26 01:30 PM", completed: true },
      { status: "PO Issued to Vendor", date: "2026-10-26 03:00 PM", completed: true },
      { status: "In Production / Packing", date: "Est. 2026-11-01", completed: false },
      { status: "Shipped & Dispatched", date: "Est. 2026-11-06", completed: false },
      { status: "Delivered & Inspected", date: "Est. 2026-11-08", completed: false }
    ]
  },
  {
    id: "PO-2026-101",
    requisitionId: "REQ-2026-0878",
    supplier: "Bengal Micro Systems",
    orderDate: "2026-10-21",
    deliveryDate: "2026-11-04",
    department: "Information Technology",
    totalAmount: 840000,
    paymentStatus: "Net 30 Pending",
    orderStatus: "Processing",
    trackingNumber: "BMS-TRK-7712",
    deliveryLocation: "Gazipur Tech Center, Gazipur",
    items: [
      { name: "Aruba CX 6200F 24G 4SFP+ Switch", qty: 4, unitPrice: 210000, total: 840000 }
    ],
    timeline: [
      { status: "Draft Created", date: "2026-10-21 09:00 AM", completed: true },
      { status: "Finance Approved", date: "2026-10-21 11:45 AM", completed: true },
      { status: "PO Issued to Vendor", date: "2026-10-21 02:30 PM", completed: true },
      { status: "In Production / Processing", date: "2026-10-23 10:15 AM", completed: true },
      { status: "Shipped & Dispatched", date: "Est. 2026-11-02", completed: false },
      { status: "Delivered & Inspected", date: "Est. 2026-11-04", completed: false }
    ]
  },
  {
    id: "PO-2026-098",
    requisitionId: "REQ-2026-0865",
    supplier: "TechSource Ltd.",
    orderDate: "2026-10-12",
    deliveryDate: "2026-10-19",
    department: "Engineering",
    totalAmount: 1850000,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingNumber: "TS-EXP-5541",
    deliveryLocation: "Gulshan Tech Hub, Dhaka",
    items: [
      { name: "Dell Precision 5680 Workstation", qty: 10, unitPrice: 185000, total: 1850000 }
    ],
    timeline: [
      { status: "Draft Created", date: "2026-10-12 08:30 AM", completed: true },
      { status: "Finance Approved", date: "2026-10-12 11:00 AM", completed: true },
      { status: "PO Issued to Vendor", date: "2026-10-12 02:00 PM", completed: true },
      { status: "Shipped & Dispatched", date: "2026-10-16 09:30 AM", completed: true },
      { status: "Delivered & Inspected", date: "2026-10-19 03:45 PM", completed: true }
    ]
  },
  {
    id: "PO-2026-095",
    requisitionId: "REQ-2026-0852",
    supplier: "Padma Industrial Supply",
    orderDate: "2026-10-08",
    deliveryDate: "2026-10-18",
    department: "Operations",
    totalAmount: 620000,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingNumber: "PIS-CAR-3301",
    deliveryLocation: "Chattogram Terminal Depot",
    items: [
      { name: "Cummins 250kVA Service Spares & Overhaul", qty: 1, unitPrice: 620000, total: 620000 }
    ],
    timeline: [
      { status: "Issued & Confirmed", date: "2026-10-08", completed: true },
      { status: "Delivered & Verified", date: "2026-10-18", completed: true }
    ]
  },
  {
    id: "PO-2026-092",
    requisitionId: "REQ-2026-0849",
    supplier: "Navana Logistics & Fleet",
    orderDate: "2026-10-02",
    deliveryDate: "2026-10-06",
    department: "Logistics",
    totalAmount: 310000,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingNumber: "NAV-FLT-209",
    deliveryLocation: "Inter-hub Freight Transit",
    items: [
      { name: "Scheduled Refrigerated Courier Run (Dhaka-Ctg-Bogura)", qty: 6, unitPrice: 51666, total: 310000 }
    ],
    timeline: [
      { status: "Delivered & Logged", date: "2026-10-06", completed: true }
    ]
  },
  {
    id: "PO-2026-089",
    requisitionId: "REQ-2026-0840",
    supplier: "Apex Digital Solutions",
    orderDate: "2026-09-22",
    deliveryDate: "2026-10-05",
    department: "Marketing",
    totalAmount: 760000,
    paymentStatus: "Partial",
    orderStatus: "Shipped",
    trackingNumber: "APX-EXP-9923",
    deliveryLocation: "Gulshan Executive Boardroom",
    items: [
      { name: "Samsung Flip Pro 75\" 4K Interactive Displays", qty: 2, unitPrice: 380000, total: 760000 }
    ],
    timeline: [
      { status: "PO Issued", date: "2026-09-22", completed: true },
      { status: "In Transit via Courier", date: "2026-09-28", completed: true },
      { status: "Customs / Port Clearance", date: "2026-10-02", completed: true },
      { status: "Final Delivery Pending", date: "Est. 2026-10-31", completed: false }
    ]
  },
  {
    id: "PO-2026-086",
    requisitionId: "REQ-2026-0835",
    supplier: "TechSource Ltd.",
    orderDate: "2026-09-18",
    deliveryDate: "2026-10-01",
    department: "Engineering",
    totalAmount: 940000,
    paymentStatus: "Unpaid",
    orderStatus: "Awaiting Approval",
    trackingNumber: "TS-PRE-1120",
    deliveryLocation: "Gulshan Tech Hub, Dhaka",
    items: [
      { name: "NVIDIA RTX 6000 Ada Generation GPU (48GB)", qty: 1, unitPrice: 940000, total: 940000 }
    ],
    timeline: [
      { status: "Draft Prepared", date: "2026-09-18", completed: true },
      { status: "Pending Finance Directorate Signature", date: "Pending", completed: false }
    ]
  },
  {
    id: "PO-2026-082",
    requisitionId: "REQ-2026-0820",
    supplier: "Meghna Stationery & Consumables",
    orderDate: "2026-09-10",
    deliveryDate: "2026-09-14",
    department: "Human Resources",
    totalAmount: 88000,
    paymentStatus: "Paid",
    orderStatus: "Completed",
    trackingNumber: "MEG-DS-4410",
    deliveryLocation: "HQ Central Store Room",
    items: [
      { name: "Employee Onboarding Welcome Packs & Stationery", qty: 50, unitPrice: 1760, total: 88000 }
    ],
    timeline: [
      { status: "Fulfilled & Invoiced", date: "2026-09-14", completed: true }
    ]
  }
];

export const initialApprovals = [
  {
    id: "APP-2026-041",
    requisitionId: "REQ-2026-0891",
    description: "Dell Precision 5680 Workstations for Engineering Team (10 units)",
    requestedBy: "Tariqul Islam",
    department: "Engineering",
    amount: 1850000,
    submittedDate: "2026-10-28",
    priority: "High",
    status: "Pending",
    justification: "Critical hardware provisioning for incoming Q4 backend distributed systems engineers.",
    items: [
      { name: "Dell Precision 5680 i9/64GB/2TB/RTX 4080", qty: 10, unitPrice: 185000, total: 1850000 }
    ],
    attachments: [
      { name: "Engineering_Headcount_Q4_Budget_Signoff.pdf", size: "1.4 MB" },
      { name: "Dell_OEM_Tier1_Partner_Quote.pdf", size: "840 KB" }
    ],
    approvalChain: [
      { role: "Direct Manager", name: "Dr. Farhana Rahman (VP Eng)", status: "Approved", date: "2026-10-28 02:15 PM", comment: "Verified headcount allocation. Essential for training pipelines." },
      { role: "Finance Director", name: "Alex Morgan (You)", status: "Pending", date: "Awaiting Action", comment: "" },
      { role: "Chief Operating Officer", name: "Ziaur Rahman (COO)", status: "Pending", date: "Scheduled", comment: "" }
    ]
  },
  {
    id: "APP-2026-040",
    requisitionId: "REQ-2026-0888",
    description: "Cisco Catalyst 9300 48-Port PoE+ Core Switches (2 units)",
    requestedBy: "Sabbir Hossain",
    department: "Information Technology",
    amount: 920000,
    submittedDate: "2026-10-27",
    priority: "Critical",
    status: "Pending",
    justification: "Emergency replacement of failing Gazipur datacenter distribution switch experiencing intermittent packet drops.",
    items: [
      { name: "Cisco Catalyst C9300-48P-A PoE+", qty: 2, unitPrice: 460000, total: 920000 }
    ],
    attachments: [
      { name: "Datacenter_Switch_Incident_Report_Oct2026.pdf", size: "2.8 MB" }
    ],
    approvalChain: [
      { role: "IT Operations Lead", name: "Mustafa Kamal", status: "Approved", date: "2026-10-27 12:30 PM", comment: "Failover risk is unacceptable without these replacements." },
      { role: "Procurement Committee", name: "Alex Morgan (You)", status: "Pending", date: "Awaiting Action", comment: "" }
    ]
  },
  {
    id: "APP-2026-039",
    requisitionId: "REQ-2026-0885",
    description: "Ergonomic Mesh Task Chairs & Sit-Stand Workstations",
    requestedBy: "Nusrat Jahan",
    department: "Facilities & Admin",
    amount: 485000,
    submittedDate: "2026-10-25",
    priority: "Medium",
    status: "Approved",
    justification: "Ergonomic furniture refresh for customer operations floor following ergonomics assessment.",
    items: [
      { name: "Ergonomic High-Back Task Chair", qty: 20, unitPrice: 14500, total: 290000 },
      { name: "Sit-Stand Electric Desk Frame", qty: 10, unitPrice: 19500, total: 195000 }
    ],
    attachments: [
      { name: "Ergonomic_Assessment_Report.pdf", size: "1.1 MB" }
    ],
    approvalChain: [
      { role: "Facilities Head", name: "Kamrul Ahsan", status: "Approved", date: "2026-10-25 04:00 PM", comment: "Within FY26 workplace wellness budget." },
      { role: "Procurement Committee", name: "Alex Morgan (You)", status: "Approved", date: "2026-10-26 11:30 AM", comment: "Approved. Vendor agreed to assembly support." }
    ]
  },
  {
    id: "APP-2026-038",
    requisitionId: "REQ-2026-0880",
    description: "Enterprise Cloud Security & Endpoint Protection (350 Nodes)",
    requestedBy: "Mustafa Kamal",
    department: "Information Technology",
    amount: 1350000,
    submittedDate: "2026-10-24",
    priority: "High",
    status: "Approved",
    justification: "Annual renewal of critical perimeter and endpoint protection licenses.",
    items: [
      { name: "CrowdStrike Falcon Enterprise XDR (350 Nodes)", qty: 350, unitPrice: 3857, total: 1350000 }
    ],
    attachments: [
      { name: "Security_Audit_Renewal_Signoff.pdf", size: "950 KB" }
    ],
    approvalChain: [
      { role: "CISO", name: "Dr. Tariq Mahmood", status: "Approved", date: "2026-10-24 10:00 AM", comment: "Zero compromise on SOC compliance." },
      { role: "Procurement Committee", name: "Alex Morgan (You)", status: "Approved", date: "2026-10-24 04:00 PM", comment: "Approved at pre-negotiated tier." }
    ]
  },
  {
    id: "APP-2026-037",
    requisitionId: "REQ-2026-0872",
    description: "Q4 Laser Toner Cartridges & Copier Paper Pallets",
    requestedBy: "Rashed Chowdhury",
    department: "Facilities & Admin",
    amount: 185000,
    submittedDate: "2026-10-20",
    priority: "Low",
    status: "Rejected",
    justification: "Quarterly consumable order.",
    items: [
      { name: "Toner and Copier Pallets", qty: 41, unitPrice: 4512, total: 185000 }
    ],
    attachments: [
      { name: "Consumable_Inventory_Log.xlsx", size: "320 KB" }
    ],
    approvalChain: [
      { role: "Procurement Committee", name: "Alex Morgan (You)", status: "Rejected", date: "2026-10-21 11:00 AM", comment: "Current reserves sufficient through Dec 2026. Re-evaluate in Q1." }
    ]
  }
];

export const initialRecentActivities = [
  {
    id: "ACT-01",
    title: "Requisition REQ-2026-0891 Submitted",
    user: "Tariqul Islam",
    department: "Engineering",
    time: "2 hours ago",
    amount: "BDT 1,850,000",
    status: "Pending"
  },
  {
    id: "ACT-02",
    title: "Purchase Order PO-2026-104 Issued",
    user: "Alex Morgan",
    department: "Facilities & Admin",
    time: "4 hours ago",
    amount: "BDT 485,000",
    status: "Issued"
  },
  {
    id: "ACT-03",
    title: "Quotation received from TechSource Ltd.",
    user: "System Notification",
    department: "Procurement",
    time: "6 hours ago",
    amount: "BDT 6,750,000",
    status: "Under Review"
  },
  {
    id: "ACT-04",
    title: "Delivery confirmed for PO-2026-098",
    user: "Warehouse Ops",
    department: "Logistics",
    time: "Yesterday",
    amount: "BDT 1,850,000",
    status: "Completed"
  },
  {
    id: "ACT-05",
    title: "Emergency Network Switch Approved",
    user: "Alex Morgan",
    department: "IT Infrastructure",
    time: "Yesterday",
    amount: "BDT 920,000",
    status: "Approved"
  }
];

export const pendingDashboardTasks = [
  {
    id: "tsk-1",
    title: "Review Urgent PO Requisition: Core Network Switches",
    type: "Approval",
    urgency: "High",
    due: "Today, 5:00 PM",
    amount: "BDT 920,000",
    link: "/approvals"
  },
  {
    id: "tsk-2",
    title: "Evaluate 3 Received Quotations for RFQ-2026-088 (Laptops)",
    type: "Quotation Decision",
    urgency: "High",
    due: "Tomorrow, 12:00 PM",
    amount: "BDT 6,750,000",
    link: "/quotations"
  },
  {
    id: "tsk-3",
    title: "Verify Delivery Inspection for PO-2026-101 (Aruba CX)",
    type: "Receiving Check",
    urgency: "Medium",
    due: "In 2 days",
    amount: "BDT 840,000",
    link: "/purchase-orders"
  },
  {
    id: "tsk-4",
    title: "Supplier Contract Renewal: GreenDesk Workspace Ltd.",
    type: "Compliance",
    urgency: "Normal",
    due: "In 5 days",
    amount: "Contract Review",
    link: "/suppliers"
  }
];

export const analyticsHistoricalData = {
  monthlySavings: [
    { month: "May", negotiated: 180000, volumeDiscount: 70000, total: 250000 },
    { month: "Jun", negotiated: 110000, volumeDiscount: 50000, total: 160000 },
    { month: "Jul", negotiated: 130000, volumeDiscount: 50000, total: 180000 },
    { month: "Aug", negotiated: 150000, volumeDiscount: 70000, total: 220000 },
    { month: "Sep", negotiated: 190000, volumeDiscount: 80000, total: 270000 },
    { month: "Oct", negotiated: 260000, volumeDiscount: 110000, total: 370000 },
  ],
  cycleTimesByDept: [
    { department: "Information Technology", days: 3.2, benchmark: 5.0 },
    { department: "Engineering", days: 3.8, benchmark: 5.0 },
    { department: "Facilities & Admin", days: 4.5, benchmark: 6.0 },
    { department: "Marketing & Comms", days: 5.4, benchmark: 6.0 },
    { department: "Operations", days: 6.1, benchmark: 7.0 },
  ]
};

