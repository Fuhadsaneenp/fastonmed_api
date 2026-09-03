import type { Database, User } from "../types.js";

export const demoUsers: User[] = [
  { id: "u-1", name: "Admin User", email: "admin@fastonmed.com", password: "admin123", role: "Admin" },
  { id: "u-2", name: "Fuhad P K", email: "fuhad@fastonmed.com", password: "growth123", role: "Growth Head" },
  { id: "u-3", name: "Arjun Menon", email: "arjun.menon@fastonmed.com", password: "sales123", role: "Sales Manager" }
];

export const seedDatabase: Database = {
  employees: [
    {
      id: "emp-1",
      name: "Arjun Menon",
      role: "Sales Manager",
      department: "Sales",
      phone: "+971 50 123 4567",
      email: "arjun.menon@fastonmed.com",
      joiningDate: "2021-03-15",
      assignedClients: ["c-1", "c-2"],
      performance: { leadsAssigned: 45, dealsClosed: 28, revenue: 850000, serviceTickets: 0, rating: 4.8 },
      status: "Active"
    },
    {
      id: "emp-2",
      name: "Rahul Kumar",
      role: "Biomedical Engineer",
      department: "Technical",
      phone: "+971 55 345 6789",
      email: "rahul.kumar@fastonmed.com",
      joiningDate: "2020-09-10",
      assignedClients: ["c-1"],
      performance: { leadsAssigned: 0, dealsClosed: 0, revenue: 0, serviceTickets: 87, rating: 4.9 },
      status: "Active"
    }
  ],
  clients: [
    {
      id: "c-1",
      name: "Cleveland Clinic Abu Dhabi",
      orgType: "Hospital",
      status: "Existing Customer",
      address: "Al Maryah Island, Hamdan Bin Mohammed St",
      city: "Abu Dhabi",
      state: "Abu Dhabi",
      phone: "+971 2 659 0200",
      phones: ["+971 2 659 0200"],
      email: "biomedical@clevelandclinicabudhabi.ae",
      emails: ["biomedical@clevelandclinicabudhabi.ae"],
      website: "https://clevelandclinicabudhabi.ae",
      gst: "100234567800003",
      vatNumber: "100234567800003",
      source: "Direct Enquiry",
      assignedTo: "emp-1",
      createdAt: "2026-01-10",
      totalRevenue: 850000,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Cleveland%20Clinic%20Abu%20Dhabi",
      tags: ["Tier-1", "Abu Dhabi", "VIP"],
      contacts: [
        {
          id: "ct-1",
          clientId: "c-1",
          clientName: "Cleveland Clinic Abu Dhabi",
          name: "Fatima Al Zaabi",
          designation: "Head of Medical Procurement",
          department: "Purchase",
          phone: "+971 50 987 1103",
          whatsapp: "+971 50 987 1103",
          email: "fatima.zaabi@clevelandclinicabudhabi.ae",
          lastContacted: "2026-09-01"
        }
      ],
      purchases: [
        {
          id: "pur-1",
          clientId: "c-1",
          productName: "ICU Ventilator SV-300",
          model: "SV-300",
          brand: "Mindray",
          quantity: 5,
          purchaseDate: "2024-01-10",
          invoiceNumber: "INV-2024-0012",
          warrantyPeriod: "3 Years",
          installationDate: "2024-01-18",
          assignedEngineer: "Rahul Kumar",
          amount: 570000
        }
      ],
      requirements: []
    },
    {
      id: "c-2",
      name: "American Hospital Dubai",
      orgType: "Hospital",
      status: "Existing Customer",
      address: "19th St, Oud Metha",
      city: "Dubai",
      state: "Dubai",
      phone: "+971 4 377 5500",
      email: "purchase@ahdubai.com",
      source: "Referral",
      assignedTo: "emp-1",
      createdAt: "2026-02-20",
      totalRevenue: 480000,
      contacts: [],
      purchases: [],
      requirements: [],
      tags: ["Dubai", "Radiology"]
    }
  ],
  people: [],
  leads: [
    {
      id: "l-1",
      clientId: "c-1",
      clientName: "Cleveland Clinic Abu Dhabi",
      contactName: "Fatima Al Zaabi",
      phone: "+971 50 987 1103",
      email: "fatima.zaabi@clevelandclinicabudhabi.ae",
      category: "Diagnostic Equipment",
      product: "ECG Machine 12-Lead",
      quantity: 3,
      estimatedValue: 65000,
      stage: "Negotiation",
      source: "Direct Enquiry",
      assignedTo: "Arjun Menon",
      assignedToId: "emp-1",
      priority: "High",
      notes: "Final SLA and maintenance discount negotiation",
      nextFollowUp: "2026-09-05",
      createdAt: "2026-08-10",
      updatedAt: "2026-09-02"
    }
  ],
  products: [
    {
      id: "p-1",
      name: "ICU Ventilator SV-300",
      category: "ICU Equipment",
      brand: "Mindray",
      model: "SV-300",
      supplier: "Mindray Middle East FZE",
      purchaseCost: 32000,
      sellingPrice: 45000,
      warrantyPeriod: "3 Years",
      amcAvailable: true,
      specifications: { Display: "12-inch touch screen", Battery: "4 hours backup" },
      inStock: 8,
      description: "Turbine-based ICU ventilator for pediatric and adult critical care",
      tags: ["ICU", "Ventilation"]
    }
  ],
  services: [
    {
      id: "st-1",
      ticketNumber: "TKT-2026-0145",
      clientId: "c-1",
      clientName: "Cleveland Clinic Abu Dhabi",
      equipment: "ICU Ventilator SV-300",
      model: "SV-300",
      serialNumber: "MR-SV300-20240120",
      complaint: "Oxygen sensor calibration error",
      priority: "Critical",
      status: "Assigned",
      assignedEngineerId: "emp-2",
      assignedEngineerName: "Rahul Kumar",
      visitDate: "2026-09-04",
      amcCovered: true,
      createdAt: "2026-09-02"
    }
  ],
  maintenanceContracts: [
    {
      id: "mc-1",
      contractNumber: "AMC-2024-0012",
      clientId: "c-1",
      clientName: "Cleveland Clinic Abu Dhabi",
      equipments: [
        { name: "ICU Ventilator x5", model: "SV-300", serialNumber: "MR-SV300-CCAD" }
      ],
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      amount: 95000,
      paymentStatus: "Paid",
      status: "Expiring Soon",
      serviceSchedule: ["2025-03-01", "2025-06-01", "2025-09-01", "2025-12-01"],
      assignedEngineerId: "emp-2",
      notes: "2026 renewal under review"
    }
  ],
  tasks: [
    {
      id: "task-1",
      title: "Follow-up call with Cleveland Clinic",
      type: "Call",
      assignedTo: "Arjun Menon",
      assignedToId: "emp-1",
      clientId: "c-1",
      clientName: "Cleveland Clinic Abu Dhabi",
      dueDate: "2026-09-05",
      dueTime: "10:00",
      priority: "High",
      status: "Pending",
      createdAt: "2026-09-02"
    }
  ],
  invoices: [
    {
      id: "inv-1",
      invoiceNumber: "INV-2026-0089",
      clientId: "c-1",
      clientName: "Cleveland Clinic Abu Dhabi",
      amount: 42000,
      status: "Pending",
      dueDate: "2026-09-30",
      createdAt: "2026-09-01",
      items: [{ product: "ECG Machine 12-Lead x3", qty: 3, rate: 14000, amount: 42000 }]
    }
  ]
};

seedDatabase.people = seedDatabase.clients.flatMap((client) =>
  client.contacts.map((contact) => ({ ...contact, clientId: client.id, clientName: client.name }))
);
