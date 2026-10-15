/**
 * Audit Log types
 */

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "login"
  | "login_failed"
  | "logout"
  | "password_reset_requested"
  | "password_reset"
  | "password_reset_failed"
  | "view"
  | "export"
  | "import"
| "send"
  | "payment"
  | "refund"
  | "verify"
  | "unverify"
  | "onboarding-transition"
  | "anonymize"
  | "ship"
  | "settings_change";

export type AuditEntityType =
  | "product"
  | "order"
  | "invoice"
  | "user"
  | "supplier"
  | "category"
  | "warehouse"
  | "stock_allocation"
  | "stock_transfer"
  | "ticket"
  | "review"
  | "system_config"
  | "auth"
  | "payment"
  | "ai_proposal"
  | "purchase_order"
  | "stock_movement"
  | "action_center";

export interface AuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId?: string | null;
  details?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
  // Populated fields (from API)
  user?: {
    id: string;
    name?: string | null;
    username?: string;
    email: string;
  };
}

export interface CreateAuditLogInput {
  userId: string;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditLogFilters {
  userId?: string;
  action?: AuditAction;
  entityType?: AuditEntityType;
  startDate?: string;
  endDate?: string;
}
