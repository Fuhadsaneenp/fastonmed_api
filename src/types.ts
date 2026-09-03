export type OrgType =
  | "Hospital"
  | "Clinic"
  | "Laboratory"
  | "Pharmacy"
  | "Diagnostic Centre"
  | "Government Institution"
  | string;

export type ClientStatus = "Lead" | "Prospect" | "Existing Customer" | "Lost Customer";
export type LeadSource =
  | "Meta Ads"
  | "Google Ads"
  | "Website"
  | "Referral"
  | "Exhibition"
  | "Direct Enquiry"
  | "Sales Visit"
  | "WhatsApp";

export type Department =
  | "Purchase"
  | "Biomedical Engineering"
  | "Administration"
  | "Finance"
  | "Doctor"
  | "Management"
  | "IT";

export type ContactPerson = {
  id: string;
  clientId?: string;
  clientName?: string;
  name: string;
  designation: string;
  department: Department;
  phone: string;
  whatsapp?: string;
  email: string;
  notes?: string;
  lastContacted?: string;
};

export type Client = {
  id: string;
  name: string;
  orgType: OrgType;
  status: ClientStatus;
  address: string;
  city: string;
  state: string;
  phone: string;
  phones?: string[];
  email: string;
  emails?: string[];
  website?: string;
  gst?: string;
  vatNumber?: string;
  source: LeadSource;
  assignedTo: string;
  createdAt: string;
  contacts: ContactPerson[];
  purchases: Purchase[];
  requirements: Requirement[];
  tags?: string[];
  totalRevenue: number;
  googleMapsUrl?: string;
};

export type Purchase = {
  id: string;
  clientId: string;
  productName: string;
  model: string;
  brand: string;
  quantity: number;
  purchaseDate: string;
  invoiceNumber: string;
  warrantyPeriod: string;
  installationDate: string;
  assignedEngineer: string;
  amount: number;
};

export type Requirement = {
  id: string;
  clientId: string;
  product: string;
  quantity: number;
  budget?: number;
  requirementDate: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  salesPersonId: string;
  status: "Open" | "In Progress" | "Quoted" | "Closed";
  notes?: string;
};

export type PipelineStage =
  | "New Lead"
  | "Contacted"
  | "Requirement Collected"
  | "Quotation Sent"
  | "Demo Scheduled"
  | "Negotiation"
  | "PO Received"
  | "Installation Pending"
  | "Completed"
  | "Lost Deal";

export type Lead = {
  id: string;
  clientId?: string;
  clientName: string;
  contactName: string;
  phone: string;
  email: string;
  category?: string;
  product: string;
  quantity: number;
  estimatedValue: number;
  stage: PipelineStage;
  source: LeadSource;
  assignedTo: string;
  assignedToId: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  notes: string;
  nextFollowUp?: string;
  createdAt: string;
  updatedAt: string;
  lostReason?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  supplier: string;
  purchaseCost: number;
  sellingPrice: number;
  warrantyPeriod: string;
  amcAvailable: boolean;
  specifications: Record<string, string>;
  inStock: number;
  description: string;
  tags?: string[];
};

export type ServiceTicket = {
  id: string;
  ticketNumber: string;
  clientId: string;
  clientName: string;
  equipment: string;
  model: string;
  serialNumber: string;
  complaint: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status:
    | "New Request"
    | "Assigned"
    | "Visit Scheduled"
    | "Under Repair"
    | "Waiting Parts"
    | "Completed"
    | "Closed";
  assignedEngineerId: string;
  assignedEngineerName: string;
  visitDate?: string;
  spareParts?: string[];
  engineerNotes?: string;
  customerFeedback?: number;
  createdAt: string;
  resolvedAt?: string;
  amcCovered: boolean;
};

export type MaintenanceContract = {
  id: string;
  contractNumber: string;
  clientId: string;
  clientName: string;
  equipments: { name: string; model: string; serialNumber: string }[];
  startDate: string;
  endDate: string;
  amount: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
  status: "Active" | "Expired" | "Expiring Soon" | "Pending Renewal";
  serviceSchedule: string[];
  assignedEngineerId: string;
  notes?: string;
};

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  joiningDate: string;
  assignedClients: string[];
  performance: {
    leadsAssigned: number;
    dealsClosed: number;
    revenue: number;
    serviceTickets: number;
    rating: number;
  };
  status: "Active" | "Inactive";
};

export type Task = {
  id: string;
  title: string;
  type: string;
  assignedTo: string;
  assignedToId: string;
  clientId?: string;
  clientName?: string;
  dueDate: string;
  dueTime?: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  notes?: string;
  createdAt: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  dueDate: string;
  createdAt: string;
  items: { product: string; qty: number; rate: number; amount: number }[];
};

export type Database = {
  clients: Client[];
  people: ContactPerson[];
  leads: Lead[];
  products: Product[];
  services: ServiceTicket[];
  maintenanceContracts: MaintenanceContract[];
  tasks: Task[];
  employees: Employee[];
  invoices: Invoice[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};
