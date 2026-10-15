/**
 * Order-related type definitions
 */

/**
 * Order status types
 */
export type OrderStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * Payment status types
 */
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "partial";

/**
 * Shipping address interface
 */
export interface ShippingAddress {
  street: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
}

/**
 * Billing address interface
 */
export interface BillingAddress {
  street: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
}

/**
 * Order item interface
 * Represents a single item in an order
 */
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  sku?: string | null;
  quantity: number;
  pickedQuantity?: number;
  price: number;
  subtotal: number;
  createdAt: Date;
  /** Category ID for link to category detail (from product) */
  categoryId?: string | null;
  /** Supplier ID for link to supplier detail (from product) */
  supplierId?: string | null;
}

/**
 * Order interface
 * Matches Prisma Order model
 */
export interface Order {
  id: string;
  orderNumber: string;
  userId: string; // User who created the order (admin/warehouse user)
  clientId?: string | null; // Client who placed the order (optional)
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  tax?: number | null;
  shipping?: number | null;
  discount?: number | null;
  total: number;
  shippingAddress?: ShippingAddress | null;
  billingAddress?: BillingAddress | null;
  notes?: string | null;
  fulfillmentWarehouseId?: string | null;
  trackingNumber?: string | null;
  trackingCarrier?: string | null;
  trackingUrl?: string | null;
  labelUrl?: string | null;
  estimatedDelivery?: Date | null;
  pickedAt?: Date | null;
  packedAt?: Date | null;
  shippedAt?: Date | null;
  deliveredAt?: Date | null;
  cancelledAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date | null;
  createdBy: string;
  updatedBy?: string | null;
  items: OrderItem[]; // Order items (populated via relation)
  /** Placer name/email when shipping has none (e.g. from User who placed order) */
  placedByName?: string | null;
  /** Placer email from User (for detail page when shipping has no email) */
  placedByEmail?: string | null;
  /** Product owner name (for client view — who owns the products) */
  productOwnerName?: string | null;
  /** Product owner email (for client view) */
  productOwnerEmail?: string | null;
  /** Product owner(s) for items in this order (for Parties section) */
  orderProductOwners?: { userId: string; name: string | null; email: string }[];
  /** Linked invoice when order has an invoice (for admin detail link) */
  invoiceForOrder?: {
    id: string;
    invoiceNumber: string;
    paymentLink?: string | null;
    amountDue?: number | null;
  } | null;
}

/**
 * Create order input
 * Used when creating a new order
 */
export interface CreateOrderInput {
  clientId?: string; // Optional client ID (for future client portal)
  warehouseId?: string; // Optional fulfillment warehouse (availability-checked per allocation)
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress?: ShippingAddress;
  billingAddress?: BillingAddress;
  tax?: number;
  shipping?: number;
  discount?: number;
  notes?: string;
}

/**
 * Update order input
 * Used when updating an existing order
 */
export interface UpdateOrderInput {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  shippingAddress?: ShippingAddress;
  billingAddress?: BillingAddress;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  notes?: string;
}

/**
 * Order filters
 * Used for filtering orders in list view
 */
export interface OrderFilters {
  status?: OrderStatus | OrderStatus[];
  paymentStatus?: PaymentStatus | PaymentStatus[];
  userId?: string;
  clientId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface OrderListQuery {
  page?: number;
  limit?: number;
  status?: OrderStatus | OrderStatus[];
  paymentStatus?: PaymentStatus | PaymentStatus[];
  search?: string;
}

export interface OrderListResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const ORDER_TRACKING_CARRIERS = [
  "usps",
  "ups",
  "fedex",
  "dhl",
  "bluedart",
  "delhivery",
  "other",
] as const;

export type OrderTrackingCarrier = (typeof ORDER_TRACKING_CARRIERS)[number];

export interface PickListItem {
  orderId: string;
  orderNumber: string;
  orderItemId: string;
  productId: string;
  productName: string;
  sku: string;
  barcode?: string;
  quantityRequested: number;
  pickedQuantity: number;
  remainingQuantity: number;
  warehouseId?: string;
  warehouseName?: string;
  locationBin?: string;
  status: "pending" | "partially_picked" | "picked";
}

export interface OrderPickList {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  totalItems: number;
  totalRequested: number;
  totalPicked: number;
  progressPercentage: number;
  warehouseName?: string;
  items: PickListItem[];
  generatedAt: string;
}

export interface ScanPickInput {
  barcodeOrSku: string;
  quantity?: number;
  warehouseId?: string;
}

export interface ScanPickResult {
  ok: boolean;
  orderId: string;
  item: PickListItem;
  totalPicked: number;
  totalRequested: number;
  isOrderFullyPicked: boolean;
  orderStatus: OrderStatus;
  message: string;
}

export type OrderTimelineEventType =
  | "order_created"
  | "stock_reserved"
  | "order_confirmed"
  | "picking_started"
  | "item_picked"
  | "order_packed"
  | "invoice_issued"
  | "payment_received"
  | "payment_partial"
  | "shipping_label_created"
  | "order_shipped"
  | "order_delivered"
  | "order_cancelled"
  | "stock_released"
  | "refund_issued"
  | "audit_event";

export interface OrderTimelineEvent {
  id: string;
  type: OrderTimelineEventType;
  title: string;
  description: string;
  timestamp: string; // ISO string
  actor?: {
    id?: string;
    name?: string;
    role?: string;
  };
  status: "completed" | "current" | "pending" | "failed";
  badgeVariant: "default" | "success" | "warning" | "destructive" | "info";
  metadata?: Record<string, unknown>;
}

export interface OrderTimelineResponse {
  orderId: string;
  orderNumber: string;
  currentStatus: OrderStatus;
  timeline: OrderTimelineEvent[];
}
