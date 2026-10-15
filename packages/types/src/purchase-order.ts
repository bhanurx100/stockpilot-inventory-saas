/**
 * Shared Purchase Order and Goods Receipt Note (GRN) contracts for Web and Native Mobile.
 */
export type PurchaseOrderStatus =
  | "draft"
  | "issued"
  | "partially_received"
  | "received"
  | "cancelled";

export type PurchaseOrderMatchStatus =
  | "pending"
  | "matched"
  | "variance";

export interface PurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  productId: string;
  productName: string;
  sku?: string | null;
  quantity: number;
  receivedQuantity: number;
  damagedQuantity: number;
  unitCost: number;
  subtotal: number;
  createdAt: Date | string;
}

export interface GoodsReceiptItem {
  id: string;
  goodsReceiptId: string;
  purchaseOrderItemId: string;
  productId: string;
  receivedQuantity: number;
  damagedQuantity: number;
  notes?: string | null;
  createdAt: Date | string;
}

export interface GoodsReceipt {
  id: string;
  grnNumber: string;
  purchaseOrderId: string;
  warehouseId: string;
  receivedById: string;
  carrier?: string | null;
  trackingNumber?: string | null;
  billOfLading?: string | null;
  damagePhotoUrl?: string | null;
  notes?: string | null;
  status: "completed" | "cancelled";
  createdAt: Date | string;
  items?: GoodsReceiptItem[];
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  userId: string;
  supplierId: string;
  warehouseId: string;
  status: PurchaseOrderStatus;
  orderDate: Date | string;
  expectedDeliveryDate?: Date | string | null;
  subtotal: number;
  tax?: number | null;
  shipping?: number | null;
  total: number;
  notes?: string | null;
  matchStatus: PurchaseOrderMatchStatus;
  vendorInvoiceNumber?: string | null;
  vendorBilledAmount?: number | null;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
  createdBy: string;
  updatedBy?: string | null;
  items?: PurchaseOrderItem[];
  receipts?: GoodsReceipt[];
  supplier?: {
    id: string;
    name: string;
    email?: string | null;
    leadTimeDays?: number | null;
  };
  warehouse?: {
    id: string;
    name: string;
  };
}

export interface CreatePOLineItemInput {
  productId: string;
  quantity: number;
  unitCost: number;
}

export interface CreatePurchaseOrderInput {
  supplierId: string;
  warehouseId: string;
  expectedDeliveryDate?: string | null;
  notes?: string | null;
  items: CreatePOLineItemInput[];
}

export interface ReceivePOLineItemInput {
  purchaseOrderItemId: string;
  productId: string;
  receivedQuantity: number;
  damagedQuantity?: number;
  notes?: string | null;
}

export interface ReceivePurchaseOrderInput {
  carrier?: string | null;
  trackingNumber?: string | null;
  billOfLading?: string | null;
  damagePhotoUrl?: string | null;
  notes?: string | null;
  idempotencyKey?: string | null;
  allowOverage?: boolean;
  items: ReceivePOLineItemInput[];
}
