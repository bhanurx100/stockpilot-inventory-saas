/**
 * Warehouse-related type definitions
 */

/**
 * Warehouse interface matching Prisma schema
 */
export interface Warehouse {
  id: string;
  name: string;
  address?: string | null;
  /** Registered GSTIN of THIS premises (Rule 55 challans print the real one). */
  gstin?: string | null;
  /** 2-digit Indian state code for place-of-supply determination. */
  stateCode?: string | null;
  type?: string | null;
  status: boolean;
  userId: string;
  /** ISO string over the wire (JSON), Date in server-only contexts. */
  createdAt: Date | string;
  updatedAt?: Date | string | null;
  createdBy: string;
  updatedBy?: string | null;
}

/**
 * Warehouse creation input
 */
export interface CreateWarehouseInput {
  name: string;
  address?: string | null;
  type?: string | null;
  status?: boolean;
}

/**
 * Warehouse update input
 */
export interface UpdateWarehouseInput {
  id: string;
  name?: string;
  address?: string | null;
  type?: string | null;
  status?: boolean;
}

/** Filters accepted by GET /api/warehouses. */
export interface WarehouseFilters {
  search?: string;
  status?: "all" | "active" | "inactive";
  type?: string;
  page?: number;
  limit?: number;
}

/** Paginated warehouse list response (Phase 8). */
export interface WarehouseListResponse {
  warehouses: Warehouse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** One stocked line inside a warehouse, with derived availability. */
export interface WarehouseStockLine {
  allocationId: string;
  productId: string;
  productName: string;
  sku: string | null;
  price: number;
  quantity: number;
  reservedQuantity: number;
  /** quantity − reservedQuantity; never negative. */
  availableQuantity: number;
  status: "out" | "low" | "available";
}

/** Aggregate stock health for a warehouse. */
export interface WarehouseHealthSummary {
  totalProducts: number;
  totalQuantity: number;
  availableQuantity: number;
  reservedQuantity: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalValue: number;
  /** 0–100 share of stocked lines in a healthy band. */
  healthPct: number;
}

/** Full stock view of a warehouse (GET /api/warehouses/:id/stock). */
export interface WarehouseStockDetail {
  warehouseId: string;
  warehouseName: string;
  health: WarehouseHealthSummary;
  lines: WarehouseStockLine[];
}

/** Per-warehouse transfer report (matrix 3.9, delivered in Phase 8). */
export interface WarehouseTransferReport {
  warehouseId: string;
  inboundTransfers: number;
  outboundTransfers: number;
  pendingInbound: number;
  pendingOutbound: number;
  completedInboundUnits: number;
  completedOutboundUnits: number;
  cancelledCount: number;
  netUnits: number;
}

/** Why a warehouse cannot be deleted (409 payload). */
export interface WarehouseDeleteBlockers {
  error: string;
  blockers: string[];
  messages: string[];
  stockUnits: number;
  reservedUnits: number;
  pendingTransfers: number;
}
