// Centralized Demo Users & Roles for Procura Enterprise Platform

export const DEMO_USERS = {
  admin: {
    id: "USR-001",
    name: "Alex Morgan",
    email: "alex.morgan@apexcorp.com.bd",
    role: "admin",
    roleLabel: "Organization Administrator",
    department: "Executive Procurement & Strategy",
    title: "Chief Procurement Officer (CPO)",
    organization: "Apex Enterprise Ltd.",
    location: "Gulshan Corporate Centre, Dhaka",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    spendAuthority: "BDT 50,000,000",
    phone: "+880 1711-889901"
  },
  procurement_officer: {
    id: "USR-002",
    name: "Farhan Ahmed",
    email: "farhan.ahmed@apexcorp.com.bd",
    role: "procurement_officer",
    roleLabel: "Senior Procurement Officer",
    department: "Sourcing & Tenders Directorate",
    title: "Lead Sourcing Specialist",
    organization: "Apex Enterprise Ltd.",
    location: "Gulshan-2, Dhaka",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    spendAuthority: "BDT 5,000,000",
    phone: "+880 1819-334455"
  },
  approver: {
    id: "USR-003",
    name: "Dr. Tariq Mahmood",
    email: "tariq.mahmood@apexcorp.com.bd",
    role: "approver",
    roleLabel: "Evaluation Committee Lead",
    department: "Finance & Technical Audits",
    title: "Director of Technical Evaluation & Governance",
    organization: "Apex Enterprise Ltd.",
    location: "Board Bazar Facility, Gazipur",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    spendAuthority: "BDT 20,000,000",
    phone: "+880 1912-778899"
  },
  vendor: {
    id: "USR-004",
    name: "Arifur Rahman",
    email: "arif.rahman@techsource-bd.com",
    role: "vendor",
    roleLabel: "Verified Vendor (Supplier)",
    department: "Enterprise Bidding & Client Accounts",
    title: "Corporate Accounts Director",
    companyId: "SUP-001",
    organization: "TechSource Ltd. (Vendor)",
    location: "Kawran Bazar Commercial Zone, Dhaka",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    supplierCategory: "IT Hardware & Cloud Infrastructure",
    phone: "+880 1711-489201"
  }
};

