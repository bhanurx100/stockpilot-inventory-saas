/**
 * Action Center Operational Telemetry & Exception Queue Types (Phase 5).
 * Grounded in real database state (Orders, POs, StockMovements, Warehouse allocations).
 */

export type ActionExceptionType =
  | "stockout_risk"
  | "overdue_po"
  | "inventory_variance"
  | "rebalance_opportunity";

export type ActionSeverity = "danger" | "warning" | "info";

export type ActionResolutionType =
  | "rebalance_transfer"
  | "expedite_po"
  | "reconcile_variance"
  | "restock_po"
  | "dismiss";

export interface ActionSuggestedResolution {
  type: ActionResolutionType;
  label: string;
  payload?: Record<string, unknown>;
}

export interface ActionSecondaryLink {
  label: string;
  href: string;
}

export interface ActionException {
  id: string;
  type: ActionExceptionType;
  severity: ActionSeverity;
  title: string;
  description: string;
  impact: string;
  evidence: Record<string, unknown>;
  suggestedAction: ActionSuggestedResolution;
  secondaryAction?: ActionSecondaryLink;
  createdAt: string;
  entityId: string;
  entityType: "product" | "order" | "purchase_order" | "stock" | "stock_movement";
}

export interface ActionCenterTelemetryStats {
  totalInventoryUnits: number;
  activeHoldUnits: number;
  inboundShipmentsPending: number;
  stockoutRisksCount: number;
}

export interface ActionCenterSummary {
  totalExceptions: number;
  dangerCount: number;
  warningCount: number;
  infoCount: number;
  exceptions: ActionException[];
  telemetryStats: ActionCenterTelemetryStats;
  generatedAt: string;
}

/**
 * Persisted resolution state for an operational exception (Phase 5 — ACT-001).
 * Stores that an exception was resolved (dismissed / expedited / acknowledged /
 * restocked / rebalanced) so the queue can suppress resolved cards for a window
 * instead of re-deriving them from database state on every fetch.
 */
export interface ActionExceptionResolutionState {
  /** Stable domain exception id (e.g. "stockout-ord-<orderId>-<itemId>"). */
  exceptionId: string;
  /** Fully-qualified exception type that was resolved. */
  exceptionType: ActionExceptionType | string;
  /** Severity at time of resolution. */
  exceptionSeverity: ActionSeverity | string;
  /** Which resolution workflow was executed. */
  resolutionType: ActionResolutionType;
  /** Operator (user id) who executed the resolution. */
  resolvedById: string;
  /** Resolved entity id / type produced by the workflow (e.g. transfer id). */
  executedEntityId?: string | null;
  executedEntityType?: string | null;
  notes?: string | null;
  resolvedAt: string;
}

export interface ActionExceptionResolutionQuery {
  exceptionId: string;
  resolutionType: ActionResolutionType;
  exceptionType?: unknown;
  exceptionSeverity?: unknown;
  executedEntityId?: unknown;
  executedEntityType?: unknown;
  resolvedById: string;
  notes?: unknown;
  resolvedAt: Date | string | unknown;
}

export interface ResolveActionInput {
  exceptionId: string;
  resolutionType: ActionResolutionType;
  notes?: string;
  params?: Record<string, unknown>;
}

export interface ResolveActionResult {
  ok: boolean;
  actionId: string;
  message: string;
  executedEntityId?: string;
  executedEntityType?: string;
  /** ISO timestamp at which the resolved exception leaves the suppression window (if any). */
  suppressedUntil?: string;
}
