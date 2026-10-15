export const FORECAST_HORIZONS = [7, 14, 30, 90] as const;
export type ForecastHorizon = (typeof FORECAST_HORIZONS)[number];
export const FORECAST_METHODS = [
  "moving_average",
  "weighted_moving_average",
  "exponential",
  "seasonal",
] as const;
export type ForecastMethod = (typeof FORECAST_METHODS)[number];
export const FORECAST_SCOPES = ["global", "warehouse"] as const;
export type ForecastScope = (typeof FORECAST_SCOPES)[number];
export const FORECAST_RISKS = [
  "urgent",
  "soon",
  "normal",
  "overstocked",
] as const;
export type ForecastRisk = (typeof FORECAST_RISKS)[number];
export const FORECAST_SORTS = [
  "stockout",
  "demand",
  "confidence",
  "name",
] as const;
export type ForecastSort = (typeof FORECAST_SORTS)[number];
export interface ProductSalesHistory {
  productId: string;
  productName: string;
  sku: string;
  warehouseId?: string | null;
  dailySales: { date: string; quantity: number }[];
  totalSold: number;
  averageDailySales: number;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
}
export interface ForecastSeriesPoint {
  date: string;
  actual: number | null;
  predicted: number;
}
export interface ProductDemandForecast {
  productId: string;
  productName: string;
  sku: string;
  warehouseId?: string | null;
  currentStock: number;
  availableStock: number;
  averageDailySales: number;
  predictedDailySales: number;
  horizonDays: number;
  method: ForecastMethod;
  series: ForecastSeriesPoint[];
  daysUntilStockout: number | null;
  stockoutDate: string | null;
  reorderRecommendation: "urgent" | "soon" | "normal" | "overstocked";
  suggestedReorderQuantity: number;
  confidenceScore: number;
  trend: "increasing" | "decreasing" | "stable";
  trendChangePct: number;
}
export interface SalesAnomaly {
  productId: string;
  productName: string;
  sku: string;
  warehouseId?: string | null;
  date: string;
  actualQuantity: number;
  expectedQuantity: number;
  deviation: number;
  anomalyType: "spike" | "drop" | "unusual_pattern";
  severity: "low" | "medium" | "high";
}
export interface ForecastingSummary {
  generatedAt: string;
  horizonDays: number;
  method: ForecastMethod;
  scope: ForecastScope;
  warehouseId?: string | null;
  totalProducts: number;
  productsAtRisk: number;
  productsOverstocked: number;
  anomaliesDetected: number;
  forecasts: ProductDemandForecast[];
  anomalies: SalesAnomaly[];
  aiInsights?: string;
  snapshotId?: string | null;
}
export interface TrendAnalysis {
  trend: "increasing" | "decreasing" | "stable";
  percentageChange: number;
  periodDays: number;
}
export interface ForecastQuery {
  horizonDays: number;
  method: ForecastMethod;
  warehouseId?: string | null;
  page: number;
  limit: number;
  risk?: ForecastRisk | null;
  search?: string | null;
  sort?: ForecastSort | null;
}
export interface ForecastPaginatedResponse {
  generatedAt: string;
  horizonDays: number;
  method: ForecastMethod;
  scope: ForecastScope;
  warehouseId?: string | null;
  totalProducts: number;
  productsAtRisk: number;
  productsOverstocked: number;
  anomaliesDetected: number;
  forecasts: ProductDemandForecast[];
  anomalies: SalesAnomaly[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  snapshotId?: string | null;
  aiInsights?: string;
}
export interface ForecastSnapshotRecord {
  id: string;
  userId: string;
  scope: string;
  warehouseId: string | null;
  horizonDays: number;
  algorithm: string;
  summary: ForecastingSummary;
  generatedAt: string;
}
export interface ForecastSnapshotListResponse {
  snapshots: ForecastSnapshotRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export const FORECAST_CHART_QUESTIONS = {
  stockoutRisk: "Which products run out first within the selected horizon?",
  demandVsStock: "Does predicted demand exceed available stock per product?",
  anomalyTimeline: "When did daily sales deviate abnormally from the average?",
} as const;
