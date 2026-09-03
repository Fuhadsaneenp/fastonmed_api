import { config } from "../config.js";
import type { Client, ContactPerson, Invoice } from "../types.js";
import { today } from "../utils/http.js";

type ZohoContactRaw = {
  contact_id: string;
  contact_name: string;
  company_name?: string;
  customer_sub_type?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
  vat_reg_no?: string;
  tax_reg_no?: string;
  outstanding_receivable_amount?: number;
  billing_address?: { address?: string; city?: string; state?: string; zip?: string };
  contact_persons?: {
    contact_person_id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    designation?: string;
    department?: string;
  }[];
  status?: string;
};

type ZohoInvoiceRaw = {
  invoice_id: string;
  invoice_number: string;
  customer_id: string;
  customer_name: string;
  total: number;
  status: string;
  date?: string;
  due_date?: string;
  line_items?: { name?: string; item_name?: string; quantity?: number; rate?: number; item_total?: number }[];
};

async function readJson(resp: Response) {
  const text = await resp.text();
  return text ? JSON.parse(text) : {};
}

async function getAccessToken() {
  const { clientId, clientSecret, refreshToken, accountsUrl } = config.zoho;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho credentials are missing. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN.");
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token"
  });

  const resp = await fetch(`${accountsUrl}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });
  const json = await readJson(resp);
  if (!resp.ok || !json.access_token) {
    throw new Error(json.error_description || json.error || "Could not create Zoho access token");
  }
  return json.access_token as string;
}

async function zohoGet(path: string, accessToken: string) {
  const url = new URL(`${config.zoho.apiBaseUrl}/books/v3/${path}`);
  if (config.zoho.organizationId) url.searchParams.set("organization_id", config.zoho.organizationId);

  const resp = await fetch(url.toString(), {
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      Accept: "application/json"
    }
  });
  const json = await readJson(resp);
  if (!resp.ok) throw new Error(json.message || `Zoho API failed for ${path}`);
  return json;
}

function invoiceStatus(status: string): Invoice["status"] {
  const normalized = status.toLowerCase();
  if (normalized === "paid") return "Paid";
  if (normalized === "overdue") return "Overdue";
  if (normalized === "draft") return "Draft";
  return "Pending";
}

function orgType(contact: ZohoContactRaw): Client["orgType"] {
  const text = `${contact.customer_sub_type || ""} ${contact.company_name || contact.contact_name}`.toLowerCase();
  if (text.includes("clinic")) return "Clinic";
  if (text.includes("lab") || text.includes("diagnostic")) return "Diagnostic Centre";
  if (text.includes("pharmacy")) return "Pharmacy";
  if (text.includes("government") || text.includes("authority")) return "Government Institution";
  return "Hospital";
}

function department(value?: string): ContactPerson["department"] {
  const text = (value || "").toLowerCase();
  if (text.includes("purchase") || text.includes("procure")) return "Purchase";
  if (text.includes("biomed") || text.includes("engineer")) return "Biomedical Engineering";
  if (text.includes("doctor") || text.includes("clinical")) return "Doctor";
  if (text.includes("finance") || text.includes("account")) return "Finance";
  if (text.includes("admin")) return "Administration";
  if (text.includes("it")) return "IT";
  return "Management";
}

export async function fetchZohoBooksData() {
  const accessToken = await getAccessToken();
  const contactsJson = await zohoGet("contacts", accessToken);
  const invoicesJson = await zohoGet("invoices", accessToken);

  const clients = (contactsJson.contacts || []).map((contact: ZohoContactRaw): Client => {
    const name = contact.company_name || contact.contact_name || "Healthcare Facility";
    const phone = contact.mobile || contact.phone || "";
    const email = contact.email || "";
    const contacts = (contact.contact_persons || []).map((person): ContactPerson => {
      const personName = `${person.first_name || ""} ${person.last_name || ""}`.trim() || person.email || "Contact";
      return {
        id: person.contact_person_id || `zp-${contact.contact_id}`,
        clientId: contact.contact_id,
        clientName: name,
        name: personName,
        designation: person.designation || "Key Contact",
        department: department(`${person.department || ""} ${person.designation || ""}`),
        phone: person.mobile || person.phone || phone,
        whatsapp: person.mobile || person.phone || phone,
        email: person.email || email,
        lastContacted: today()
      };
    });

    return {
      id: contact.contact_id,
      name,
      orgType: orgType(contact),
      status: contact.status === "active" ? "Existing Customer" : "Prospect",
      address: contact.billing_address?.address || "",
      city: contact.billing_address?.city || "Dubai",
      state: contact.billing_address?.state || "Dubai",
      phone,
      phones: phone ? [phone] : [],
      email,
      emails: email ? [email] : [],
      website: contact.website,
      gst: contact.tax_reg_no || contact.vat_reg_no,
      vatNumber: contact.tax_reg_no || contact.vat_reg_no,
      source: "Direct Enquiry",
      assignedTo: "Sales Team",
      createdAt: today(),
      contacts,
      purchases: [],
      requirements: [],
      totalRevenue: contact.outstanding_receivable_amount || 0
    };
  });

  const invoices = (invoicesJson.invoices || []).map((invoice: ZohoInvoiceRaw): Invoice => ({
    id: invoice.invoice_id,
    invoiceNumber: invoice.invoice_number,
    clientId: invoice.customer_id,
    clientName: invoice.customer_name,
    amount: invoice.total || 0,
    status: invoiceStatus(invoice.status || ""),
    dueDate: invoice.due_date || today(),
    createdAt: invoice.date || today(),
    items: (invoice.line_items || []).map((item) => ({
      product: item.name || item.item_name || "Zoho Books Item",
      qty: item.quantity || 1,
      rate: item.rate || 0,
      amount: item.item_total || (item.quantity || 1) * (item.rate || 0)
    }))
  }));

  return {
    clients,
    people: (clients as Client[]).flatMap((client: Client) => client.contacts),
    invoices
  };
}
