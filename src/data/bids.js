// Centralized Bids Dataset for Procura (Anonymous Bidding Engine)

export const INITIAL_BIDS = [
  {
    id: "BID-088-01",
    tenderId: "TND-2026-088",
    tenderTitle: "Enterprise Cloud-Ready Laptops & Developer Workstations (45 Units)",
    bidderId: "BIDDER-7041", // Anonymous token displayed to evaluators
    vendorId: "SUP-001",
    vendorCompany: "TechSource Ltd.", // Hidden in evaluation view unless revealed
    submittedBy: "Arifur Rahman",
    submissionDate: "2026-10-24 14:30",
    totalAmount: 6750000,
    unitPrice: 150000,
    deliveryDays: 7,
    deliveryFormatted: "7 Business Days",
    warranty: "36 Months On-site 24/7 SLA (Accidental Damage Protection)",
    paymentTerms: "Net 45 Days",
    technicalCompliance: "Compliant (100% Meets Specs)",
    financialCompliance: "Within Budget (-6.25% vs Ceiling)",
    status: "Under Evaluation", // Draft, Submitted, Under Evaluation, Clarification Required, Awarded, Unsuccessful, Withdrawn
    evaluationScore: 94.6,
    scoreBreakdown: {
      technical: 96,
      financial: 88,
      slaWarranty: 98,
      reliability: 96
    },
    itemsProposed: [
      {
        name: "Dell Latitude 7450 / Precision Mobile Workstation",
        specs: "Intel Core i9-14900H, 32GB LPDDR5x, 1TB NVMe Gen4, 14\" QHD+ 400 nits, Dell ProSupport Plus 3-Yr Onsite",
        quantity: 45,
        unitPrice: 150000,
        totalPrice: 6750000
      }
    ],
    technicalProposalText: "Full compliance with enterprise grade developer workstation criteria. Includes expedited air-freight batching to guarantee 7-day deployment with automated BIOS provisioning.",
    technicalDocName: "Technical_Proposal_DellPrecision_Tier1.pdf",
    financialDocName: "Commercial_Quotation_BOQ_Signed.pdf",
    identityRevealed: false,
    revealJustification: null,
    revealedBy: null,
    revealTimestamp: null,
    evaluatorNotes: "Superior on-site enterprise SLA coverage. 7-day turnaround matches onboarding deadline. Favorable Net-45 credit terms.",
    clarifications: []
  },
  {
    id: "BID-088-02",
    tenderId: "TND-2026-088",
    tenderTitle: "Enterprise Cloud-Ready Laptops & Developer Workstations (45 Units)",
    bidderId: "BIDDER-8820",
    vendorId: "SUP-002",
    vendorCompany: "Bengal Micro Systems",
    submittedBy: "Sultana Parveen",
    submissionDate: "2026-10-25 10:15",
    totalAmount: 6480000,
    unitPrice: 144000,
    deliveryDays: 18,
    deliveryFormatted: "18 Business Days",
    warranty: "24 Months Depot Service (Carry-in after Year 1)",
    paymentTerms: "Net 30 Days",
    technicalCompliance: "Compliant (Meets Specs)",
    financialCompliance: "Lowest Bid (-10.0% vs Ceiling)",
    status: "Under Evaluation",
    evaluationScore: 87.2,
    scoreBreakdown: {
      technical: 88,
      financial: 98,
      slaWarranty: 78,
      reliability: 85
    },
    itemsProposed: [
      {
        name: "Lenovo ThinkPad T14 Gen 5",
        specs: "Intel Core Ultra 7 155H, 32GB RAM, 1TB SSD, 14\" WUXGA IPS, 2-Year Lenovo Premier Support",
        quantity: 45,
        unitPrice: 144000,
        totalPrice: 6480000
      }
    ],
    technicalProposalText: "Reliable ThinkPad corporate fleet proposal with lowest cost structure. Lead time is 18 business days due to sea transit batching.",
    technicalDocName: "Technical_Specs_Lenovo_T14.pdf",
    financialDocName: "Financial_Proposal_Breakdown.pdf",
    identityRevealed: false,
    revealJustification: null,
    revealedBy: null,
    revealTimestamp: null,
    evaluatorNotes: "Lowest unit pricing (BDT 144k). Lead time is 18 business days which is longer than requested 10 days.",
    clarifications: []
  },
  {
    id: "BID-088-03",
    tenderId: "TND-2026-088",
    tenderTitle: "Enterprise Cloud-Ready Laptops & Developer Workstations (45 Units)",
    bidderId: "BIDDER-9310",
    vendorId: "SUP-004",
    vendorCompany: "Apex Digital Solutions",
    submittedBy: "Tanvir Hossain",
    submissionDate: "2026-10-25 16:45",
    totalAmount: 6885000,
    unitPrice: 153000,
    deliveryDays: 12,
    deliveryFormatted: "12 Business Days",
    warranty: "36 Months Standard Replacement",
    paymentTerms: "Net 30 Days",
    technicalCompliance: "Compliant (Meets Specs)",
    financialCompliance: "Within Budget (-4.37% vs Ceiling)",
    status: "Under Evaluation",
    evaluationScore: 82.5,
    scoreBreakdown: {
      technical: 86,
      financial: 84,
      slaWarranty: 82,
      reliability: 78
    },
    itemsProposed: [
      {
        name: "HP EliteBook 840 G11",
        specs: "Intel Core Ultra 7, 32GB DDR5, 1TB SSD, HP Care Pack Onsite NBD",
        quantity: 45,
        unitPrice: 153000,
        totalPrice: 6885000
      }
    ],
    technicalProposalText: "HP EliteBook commercial fleet with HP Wolf Security suite integrated.",
    technicalDocName: "HP_EliteBook_SpecSheet_Signed.pdf",
    financialDocName: "Price_Quotation_TND088.pdf",
    identityRevealed: false,
    revealJustification: null,
    revealedBy: null,
    revealTimestamp: null,
    evaluatorNotes: "Standard compliant bid with comprehensive security software preloaded.",
    clarifications: []
  },
  {
    id: "BID-085-01",
    tenderId: "TND-2026-085",
    tenderTitle: "Datacenter Access & Distribution Core Switches (Cisco Catalyst)",
    bidderId: "BIDDER-4109",
    vendorId: "SUP-001",
    vendorCompany: "TechSource Ltd.",
    submittedBy: "Arifur Rahman",
    submissionDate: "2026-10-28 11:20",
    totalAmount: 2280000,
    unitPrice: 570000,
    deliveryDays: 10,
    deliveryFormatted: "10 Days",
    warranty: "Cisco SmartNet 8x5xNBD (3-Year)",
    paymentTerms: "Net 30 Days",
    technicalCompliance: "Compliant",
    financialCompliance: "Within Budget",
    status: "Submitted",
    evaluationScore: 92.0,
    itemsProposed: [
      {
        name: "Cisco Catalyst C9300-48P-A",
        specs: "48-port PoE+, Network Advantage, 4x 10G SFP+ uplink module",
        quantity: 4,
        unitPrice: 570000,
        totalPrice: 2280000
      }
    ],
    technicalDocName: "Cisco_Catalyst_Proposal_TechSource.pdf",
    financialDocName: "BOQ_Cisco_Switches.pdf",
    identityRevealed: false,
    clarifications: []
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "AUD-1001",
    tenderId: "TND-2026-077",
    action: "BIDDER_IDENTITY_REVEALED",
    bidderId: "BIDDER-3310",
    revealedCompany: "TechSource Ltd.",
    performedBy: "Alex Morgan (CPO)",
    reason: "Final commercial contract award following committee sign-off on technical compliance score 96/100.",
    timestamp: "2026-10-10 11:42 AM",
    ipAddress: "10.0.12.44 (Internal Gateway)"
  }
];

