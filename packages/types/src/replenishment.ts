/**
 * Replenishment Domain Types (Phase 6 — Explainable & Transparent Replenishment)
 * Pure domain contracts for velocity calculations, lead time variance, dynamic safety buffers,
 * plain-language formula transparency, and draft PO generation.
 */

export interface ReplenishmentParameters {
  leadTimeDaysOverride?: number | null;
  safetyBufferDaysOverride?: number | null;
  serviceLevelZScore?: number; // Default 1.65 (95% service level)
  minOrderQuantity?: number;
  packSize?: number;
}

export interface ReplenishmentCalculationStep {
  label: string;
  expression: string;
  value: number | string;
  explanation: string;
}

export interface ReplenishmentExplanation {
  formula: string;
  steps: ReplenishmentCalculationStep[];
  textSummary: string;
}

export interface ReplenishmentConfidenceBreakdown {
  score: number; // 0 - 100
  rating: "high" | "medium" | "low";
  factors: {
    historyLengthDays: number;
    salesVolatilityCV: number; // Coefficient of Variation (stdDev / mean)
    supplierLeadTimeReliabilityPct: number; // On-time delivery rate
  };
  explanation: string;
}

export interface ReplenishmentRecommendation {
  productId: string;
  productName: string;
  sku: string;
  warehouseId?: string | null;
  warehouseName?: string | null;
  supplierId: string;
  supplierName: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  onOrderQuantity: number; // Currently inbound from open POs

  // Velocity Metrics
  dailySalesVelocity7d: number;
  dailySalesVelocity14d: number;
  dailySalesVelocity30d: number;
  blendedVelocity: number; // Smoothed demand velocity per day
  demandStdDev: number; // Demand standard deviation

  // Supplier Metrics
  promisedLeadTimeDays: number;
  actualAvgLeadTimeDays: number;
  leadTimeVarianceDays: number; // Difference between actual & promised
  effectiveLeadTimeDays: number; // Used in formula

  // Buffer & Thresholds
  safetyBufferDays: number;
  safetyStockUnits: number; // Buffer units to protect against demand/supply spikes
  reorderPointUnits: number; // (Velocity * LeadTime) + SafetyStock
  suggestedReorderQuantity: number; // Max(0, ReorderPoint + TargetHorizonCoverage - (Available + OnOrder))
  estimatedReorderCost: number; // suggestedReorderQuantity * unitCost
  /**
   * True when `estimatedReorderCost` was derived from a modelled unit cost rather than
   * an agreed supplier price. The UI must label the outlay as an estimate and the draft
   * PO must disclose that its unit cost needs confirmation before issuing.
   */
  unitCostIsEstimated: boolean;

  // Status & Urgency
  reorderStatus: "urgent" | "soon" | "healthy" | "overstocked";
  daysUntilStockout: number | null;
  stockoutDate: string | null;

  // Explainability
  confidence: ReplenishmentConfidenceBreakdown;
  explanation: ReplenishmentExplanation;
  parameters: ReplenishmentParameters;
}

export interface ReplenishmentSummary {
  generatedAt: string;
  totalProductsAssessed: number;
  urgentReplenishmentCount: number;
  soonReplenishmentCount: number;
  totalSuggestedCost: number;
  recommendations: ReplenishmentRecommendation[];
}

export interface GenerateDraftPOInput {
  productId: string;
  warehouseId: string;
  quantity: number;
  unitCost?: number;
  notes?: string;
}

export interface GenerateDraftPOResult {
  purchaseOrderId: string;
  poNumber: string;
  supplierId: string;
  warehouseId: string;
  totalQuantity: number;
  totalAmount: number;
  expectedDeliveryDate: string | null;
  status: string;
}
