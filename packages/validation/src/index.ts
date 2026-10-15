/**
 * @stockpilot/validation — shared Zod schemas (platform-neutral, no Next imports).
 * Web + mobile validate the same contracts.
 */
export {
  productSchema,
  createProductSchema,
  updateProductSchema,
  calculateProductStatus,
  type ProductFormData,
} from "./product";
export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type RegisterFormData,
  type LoginFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
} from "./auth";
export { createCategorySchema, updateCategorySchema, type CategoryFormData } from "./category";
export {
  createSupplierSchema,
  updateSupplierSchema,
  patchSupplierSchema,
  supplierOnboardingSchema,
  createSupplierRatingSchema,
  supplierFiltersSchema,
  supplierCompareSchema,
  SUPPLIER_ONBOARDING_STATUSES,
  type SupplierFormData,
  type UpdateSupplierFormData,
  type SupplierFiltersInput,
  type CreateSupplierRatingFormData,
} from "./supplier";
export {
  createOrderSchema,
  updateOrderSchema,
  shippingAddressSchema,
  billingAddressSchema,
  orderItemSchema,
  orderListQuerySchema,
  scanPickSchema,
  shipOrderSchema,
  type CreateOrderFormData,
  type UpdateOrderFormData,
  type ScanPickInput,
  type ShipOrderInput,
} from "./order";
export {
  createInvoiceSchema,
  updateInvoiceSchema,
  type CreateInvoiceFormData,
  type UpdateInvoiceFormData,
} from "./invoice";
export {
  createSupportTicketSchema,
  createSupportTicketReplySchema,
  updateSupportTicketSchema,
  type CreateSupportTicketFormData,
  type UpdateSupportTicketFormData,
} from "./support-ticket";
export {
  createProductReviewSchema,
  updateProductReviewSchema,
  type CreateProductReviewFormData,
  type UpdateProductReviewFormData,
} from "./product-review";
export {
  updateUserAdminSchema,
  createUserAdminSchema,
  type UpdateUserAdminFormData,
  type CreateUserAdminFormData,
} from "./user-management";
export {
  createStockAllocationSchema,
  updateStockAllocationSchema,
  createStockTransferSchema,
  stockAdjustmentReasonSchema,
  createStockAdjustmentSchema,
  type CreateStockAllocationFormData,
  type UpdateStockAllocationFormData,
  type CreateStockTransferFormData,
  type CreateStockAdjustmentFormData,
} from "./stock-allocation";
export {
  createWarehouseSchema,
  updateWarehouseSchema,
  warehouseFiltersSchema,
  WAREHOUSE_TYPES,
  type WarehouseType,
  type CreateWarehouseFormData,
  type UpdateWarehouseFormData,
  type WarehouseFiltersInput,
} from "./warehouse";
export {
  moneySchema,
  optionalMoneySchema,
} from "./money";
export {
  aiToolNameSchema,
  aiProposalToolSchema,
  aiProposalStatusSchema,
  aiAskSchema,
  aiProposalCreateSchema,
  aiProposalActionSchema,
  aiProposalListQuerySchema,
  aiTransferExecuteSchema,
  aiStockAdjustExecuteSchema,
  aiInvoiceRemindExecuteSchema,
  aiOrderReviewExecuteSchema,
  aiReorderExecuteSchema,
  type AiAskFormData,
  type AiProposalCreateFormData,
  type AiProposalActionFormData,
  type AiProposalListQuery,
  type AiTransferExecuteFormData,
  type AiStockAdjustExecuteFormData,
  type AiInvoiceRemindExecuteFormData,
  type AiOrderReviewExecuteFormData,
  type AiReorderExecuteFormData,
} from "./ai";
export {
  shippoWebhookSchema,
  type ShippoWebhookInput,
  checkoutMetadataSchema,
  type CheckoutMetadataInput,
  emailQueueJobSchema,
  type EmailQueueJobInput,
} from "./webhooks";
export {
  poLineItemSchema,
  createPurchaseOrderSchema,
  updatePurchaseOrderSchema,
  receivePOLineItemSchema,
  receivePurchaseOrderSchema,
  threeWayMatchSchema,
  type CreatePurchaseOrderFormData,
  type UpdatePurchaseOrderFormData,
  type ReceivePurchaseOrderFormData,
  type ThreeWayMatchFormData,
} from "./purchase-order";
export {
  actionResolutionTypeSchema,
  transferRebalanceParamsSchema,
  restockPoParamsSchema,
  expeditePoParamsSchema,
  reconcileVarianceParamsSchema,
  resolveActionSchema,
  actionFilterSchema,
  type ResolveActionFormData,
  type ActionFilterInput,
  type TransferRebalanceParams,
  type RestockPoParams,
  type ExpeditePoParams,
  type ReconcileVarianceParams,
} from "./action-center";
export {
  replenishmentParamsSchema,
  replenishmentQuerySchema,
  generateDraftPOSchema,
  type ReplenishmentParamsFormData,
  type ReplenishmentQueryInput,
  type GenerateDraftPOFormData,
} from "./replenishment";
export {
  INDIAN_STATE_CODES,
  GSTIN_REGEX,
  HSN_SAC_REGEX,
  EWAY_BILL_REGEX,
  validateGSTIN,
  validateHSN,
  validateEWayBill,
  gstinSchema,
  optionalGstinSchema,
  hsnCodeSchema,
  optionalHsnCodeSchema,
  ewayBillSchema,
  optionalEwayBillSchema,
  gstCalculationItemSchema,
  gstInvoiceCalculateSchema,
  generateDeliveryChallanSchema,
} from "./gst";
