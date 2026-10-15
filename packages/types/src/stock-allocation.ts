/**
 * Stock Allocation & Transfer type definitions
 */

/**
 * Stock allocation status
 */
export type StockTransferStatus = "pending" | "completed" | "cancelled";

/**
 * Stock allocation interface (product in a warehouse)
 */
export interface StockAllocation {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  reservedQuantity: number;
  userId: string;
  createdAt: string;
  updatedAt: string | null;
  // Extended with relations
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  warehouse?: {
    id: string;
    name: string;
  };
}

/**
 * Stock transfer interface
 */
export interface StockTransfer {
  id: string;
  productId: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  quantity: number;
  status: StockTransferStatus;
  notes: string | null;
  userId: string;
  createdAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  // Extended with relations
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  fromWarehouse?: {
    id: string;
    name: string;
  };
  toWarehouse?: {
    id: string;
    name: string;
  };
}

/**
 * Create stock allocation input
 */
export interface CreateStockAllocationInput {
  productId: string;
  warehouseId: string;
  quantity: number;
}

/**
 * Update stock allocation input
 */
export interface UpdateStockAllocationInput {
  quantity?: number;
}

/**
 * Create stock transfer input
 */
export interface CreateStockTransferInput {
  productId: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  quantity: number;
  notes?: string;
}

/**
 * Stock by warehouse summary
 */
export interface WarehouseStockSummary {
  warehouseId: string;
  warehouseName: string;
  totalProducts: number;
  totalQuantity: number;
  totalReserved: number;
  totalValue: number;
}

/**
 * Stock movement types — one row per stock change (Phase 3 audit trail).
 * delta = on-hand change; reservedDelta = reservation change.
 */
export type StockMovementType =
  | "receive"
  | "reserve"
  | "release"
  | "commit"
  | "restore"
  | "transfer_in"
  | "transfer_out"
  | "adjust"
  | "import";

/** Related entity that caused a movement. */
export type StockMovementRefType =
  | "order"
  | "transfer"
  | "import"
  | "manual"
  | "seed";

/**
 * Stock movement (immutable audit record)
 */
export interface StockMovement {
  id: string;
  productId: string;
  warehouseId: string | null;
  type: StockMovementType;
  delta: number;
  reservedDelta: number;
  refType: StockMovementRefType | null;
  refId: string | null;
  userId: string;
  notes: string | null;
  createdAt: string;
  // Extended with relations
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  warehouse?: {
    id: string;
    name: string;
  };
}

/**
 * Input for recording a stock movement
 */
export interface CreateStockMovementInput {
  productId: string;
  warehouseId?: string | null;
  type: StockMovementType;
  delta?: number;
  reservedDelta?: number;
  refType?: StockMovementRefType | null;
  refId?: string | null;
  userId: string;
  notes?: string | null;
}

/** Structured inventory discrepancy reason codes (Phase 1 — INV-002.05). */
export type StockAdjustmentReason =
  | "DAMAGED"
  | "SHRINKAGE"
  | "CYCLE_COUNT_VARIANCE"
  | "FOUND"
  | "CUSTOMER_RETURN"
  | "EXPIRY"
  | "DATA_CORRECTION";

export interface CreateStockAdjustmentInput {
  productId: string;
  warehouseId?: string | null;
  newQuantity: number;
  reason: StockAdjustmentReason;
  notes?: string;
}

export interface StockAdjustmentResponse {
  state: {
    quantity: number;
    reservedQuantity: number;
  };
  delta: number;
  reason: StockAdjustmentReason;
}

