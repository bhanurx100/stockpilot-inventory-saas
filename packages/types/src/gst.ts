/**
 * India GST (Goods and Services Tax) & Wholesale Compliance Domain Types (Phase 7)
 */

export interface IndianStateCode {
  code: string; // 2-digit state code (e.g. "27" for Maharashtra, "29" for Karnataka)
  name: string;
}

export type GstTaxType = "intra_state" | "inter_state";

export interface GstTaxBreakdown {
  taxableAmount: number;
  taxRatePercent: number;
  taxType: GstTaxType;
  cgstRatePercent: number;
  cgstAmount: number;
  sgstRatePercent: number;
  sgstAmount: number;
  igstRatePercent: number;
  igstAmount: number;
  totalTax: number;
  totalAmountWithTax: number;
}

export interface GstLineItemTaxResult {
  productId?: string;
  productName: string;
  hsnCode?: string | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  taxRatePercent: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTax: number;
  totalAmount: number;
}

export interface GstInvoiceCalculationResult {
  supplierGstin?: string | null;
  supplierStateCode: string;
  customerGstin?: string | null;
  customerStateCode: string;
  taxType: GstTaxType;
  items: GstLineItemTaxResult[];
  taxableSubtotal: number;
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
  totalTax: number;
  grandTotal: number;
}

export interface DeliveryChallanData {
  challanNumber: string;
  date: string;
  transferId: string;
  /** Legal name of the ISSUING company (SystemConfig `company_name`), presented as the consignor. */
  companyName?: string | null;
  /** Registered address of the issuing company (SystemConfig `company_address`). */
  companyAddress?: string | null;
  dispatchReason: "inter_warehouse_transfer" | "job_work" | "demo_supply" | "exhibition";
  sourceWarehouse: {
    name: string;
    address?: string | null;
    gstin?: string | null;
    stateCode: string;
  };
  destinationWarehouse: {
    name: string;
    address?: string | null;
    gstin?: string | null;
    stateCode: string;
  };
  transporterName?: string | null;
  vehicleNumber?: string | null;
  ewayBillNumber?: string | null;
  items: Array<{
    productName: string;
    sku: string;
    hsnCode?: string | null;
    quantity: number;
    unitPrice: number;
    totalValue: number;
  }>;
  totalQuantity: number;
  totalValue: number;
  notes?: string | null;
}

export interface EWayBillVerification {
  valid: boolean;
  ewayBillNumber: string;
  formattedNumber: string;
  error?: string;
}
