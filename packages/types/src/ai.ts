export type AiRole = "admin" | "user" | "warehouse" | "supplier" | "client";

export type AiToolName =
  | "inventory"
  | "sales"
  | "supplier"
  | "warehouse"
  | "forecast"
  | "invoice"
  | "order";

export type AiProposalTool =
  | "reorder.suggest"
  | "transfer.suggest"
  | "invoice.remind"
  | "order.review"
  | "stock.adjust";

export type AiProposalStatus =
  | "draft"
  | "confirmed"
  | "rejected"
  | "executed"
  | "expired";

export const AI_CONTEXT_TOOLS: readonly AiToolName[] = [
  "inventory",
  "sales",
  "supplier",
  "warehouse",
  "forecast",
  "invoice",
  "order",
];

export const AI_PROPOSAL_TOOLS: readonly AiProposalTool[] = [
  "reorder.suggest",
  "transfer.suggest",
  "invoice.remind",
  "order.review",
  "stock.adjust",
];

export const AI_TOOL_PERMISSIONS: Record<AiToolName, readonly AiRole[]> = {
  inventory: ["admin", "user", "warehouse"],
  sales: ["admin", "user"],
  supplier: ["admin", "user", "supplier"],
  warehouse: ["admin", "user", "warehouse"],
  forecast: ["admin", "user"],
  invoice: ["admin", "user", "client"],
  order: ["admin", "user", "warehouse", "supplier", "client"],
};

export const AI_PROPOSAL_PERMISSIONS: Record<AiProposalTool, readonly AiRole[]> = {
  "reorder.suggest": ["admin", "user"],
  "transfer.suggest": ["admin", "user", "warehouse"],
  "invoice.remind": ["admin", "user"],
  "order.review": ["admin", "user", "warehouse", "supplier", "client"],
  "stock.adjust": ["admin", "user", "warehouse"],
};

export interface AiInventoryLine {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  reservedQuantity: number;
  available: number;
  price: number;
  value: number;
}

export interface AiSalesLine {
  orderId: string;
  total: number;
  status: string;
  createdAt: string;
  itemCount: number;
}

export interface AiSupplierLine {
  supplierId: string;
  name: string;
  productCount: number;
  leadTimeDays: number | null;
}

export interface AiWarehouseLine {
  warehouseId: string;
  name: string;
  quantity: number;
  reservedQuantity: number;
  available: number;
}

export interface AiForecastLine {
  productId: string;
  productName: string;
  sku: string;
  availableStock: number;
  averageDailySales: number;
  predictedDailySales: number;
  daysUntilStockout: number | null;
  suggestedReorderQuantity: number;
}

export interface AiInvoiceLine {
  invoiceId: string;
  invoiceNumber: string;
  status: string;
  total: number;
  amountDue: number;
}

export interface AiOrderLine {
  orderId: string;
  orderNumber: string;
  status: string;
  total: number;
}

export interface AiContextPacket {
  role: AiRole;
  allowedTools: AiToolName[];
  deniedTools: AiToolName[];
  inventory: AiInventoryLine[];
  sales: AiSalesLine[];
  suppliers: AiSupplierLine[];
  warehouses: AiWarehouseLine[];
  forecasts: AiForecastLine[];
  invoices: AiInvoiceLine[];
  orders: AiOrderLine[];
  generatedAt: string;
}

export interface AiCalculations {
  totalProducts: number;
  totalUnits: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalOrders: number;
  totalRevenue: number;
  overdueInvoices: number;
  amountDue: number;
  atRiskProducts: number;
  suggestedReorders: Array<{
    productId: string;
    productName: string;
    sku: string;
    daysUntilStockout: number | null;
    suggestedQuantity: number;
  }>;
}

export interface AiRecommendation {
  tool: AiProposalTool;
  title: string;
  summary: string;
  rationale: string;
  args: Record<string, unknown>;
  confidence: number;
}

export interface AiAskRequest {
  question: string;
}

export interface AiAskResult {
  context: AiContextPacket;
  calculations: AiCalculations;
  recommendations: AiRecommendation[];
  llmAvailable: boolean;
  llmText: string | null;
}

export interface AiProposalInput {
  tool: AiProposalTool;
  title: string;
  summary?: string;
  rationale?: string;
  args: Record<string, unknown>;
  idempotencyKey?: string;
}

export interface AiProposalRecord {
  id: string;
  userId: string;
  tool: string;
  title: string;
  summary: string | null;
  rationale: string | null;
  args: Record<string, unknown>;
  status: AiProposalStatus;
  idempotencyKey: string;
  expiresAt: string;
  confirmedAt: string | null;
  executedAt: string | null;
  result: Record<string, unknown> | null;
  createdAt: string;
}

export function normalizeAiRole(role: string | null | undefined): AiRole {
  switch ((role ?? "").toLowerCase()) {
    case "admin":
      return "admin";
    case "warehouse":
      return "warehouse";
    case "supplier":
      return "supplier";
    case "client":
      return "client";
    default:
      return "user";
  }
}

export function isAiToolAllowed(tool: AiToolName, role: AiRole): boolean {
  return AI_TOOL_PERMISSIONS[tool].includes(role);
}

export function isProposalToolAllowed(tool: AiProposalTool, role: AiRole): boolean {
  return AI_PROPOSAL_PERMISSIONS[tool].includes(role);
}
