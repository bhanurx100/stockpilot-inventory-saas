export type SupplierOnboardingStatus = "pending" | "approved" | "suspended";

export interface Supplier {
  id: string;
  name: string;
  userId: string;
  status: boolean;
  description?: string | null;
  notes?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  paymentTerms?: string | null;
  leadTimeDays?: number | null;
  onboardingStatus: SupplierOnboardingStatus;
  verified: boolean;
  marketplaceVisible: boolean;
  ratingAverage: number;
  ratingCount: number;
  performanceScore: number;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
  createdBy: string;
  updatedBy?: string | null;
  isGlobalDemo?: boolean;
  creator?: { name: string; email: string } | null;
  updater?: { name: string; email: string } | null;
  statistics?: {
    totalProducts: number;
    totalQuantitySold: number;
    totalRevenue: number;
    uniqueOrders: number;
    totalValue: number;
  } | null;
  products?: Array<{
    id: string;
    name: string;
    imageUrl?: string | null;
    sku?: string | null;
    quantity?: number;
    price?: number;
  }> | null;
  recentOrders?: Array<{
    id: string;
    orderId: string;
    orderNumber: string;
    productName: string;
    productSku?: string | null;
    quantity: number;
    price: number;
    orderDate: string;
    subtotal: number;
    proportionalAmount?: number;
    orderTotal?: number;
    orderStatus: string;
  }> | null;
  ratings?: SupplierRatingSummary | null;
}

export interface CreateSupplierInput {
  name: string;
  userId: string;
  status?: boolean;
  description?: string | null;
  notes?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  paymentTerms?: string | null;
  leadTimeDays?: number | null;
  onboardingStatus?: SupplierOnboardingStatus;
  verified?: boolean;
  marketplaceVisible?: boolean;
}

export interface UpdateSupplierInput {
  id: string;
  name?: string;
  status?: boolean;
  description?: string | null;
  notes?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  paymentTerms?: string | null;
  leadTimeDays?: number | null;
  onboardingStatus?: SupplierOnboardingStatus;
  verified?: boolean;
  marketplaceVisible?: boolean;
}

export interface SupplierFilters {
  search?: string;
  status?: "all" | "active" | "inactive";
  verified?: "all" | "verified" | "unverified";
  onboardingStatus?: "all" | SupplierOnboardingStatus;
  country?: string;
  minRating?: number;
  sort?: "name" | "rating" | "performance" | "recent";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  marketplaceOnly?: boolean;
}

export interface SupplierListResponse {
  suppliers: Supplier[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SupplierRating {
  id: string;
  supplierId: string;
  userId: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  orderId?: string | null;
  status: string;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
}

export interface SupplierRatingSummary {
  average: number;
  count: number;
  distribution: Record<string, number>;
  recent: SupplierRating[];
}

export interface CreateSupplierRatingInput {
  supplierId: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  orderId?: string | null;
}

export interface SupplierComparisonEntry {
  supplier: Supplier;
  productCount: number;
  orderCount: number;
  totalValue: number;
}

export interface SupplierComparisonResponse {
  entries: SupplierComparisonEntry[];
  bestRatedId: string | null;
  fastestLeadTimeId: string | null;
  topPerformanceId: string | null;
}

export interface SupplierDeleteBlockers {
  error: string;
  blockers: string[];
  messages: string[];
  productCount: number;
  orderCount: number;
}

export interface ClientDirectoryEntry {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  orderCount: number;
  invoiceCount: number;
  totalSpent: number;
}

export interface ClientDirectoryResponse {
  clients: ClientDirectoryEntry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  orderCount: number;
  invoiceCount: number;
  totalSpent: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: string;
  }>;
}
