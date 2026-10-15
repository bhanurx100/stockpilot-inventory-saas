export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string | null;
  role?: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isCheckingAuth: boolean;
  refreshSession: () => Promise<void>;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  userName?: string;
  userEmail: string;
  userRole?: string;
  token?: string;
  user?: User;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  resetToken: string;
  password: string;
}

export type EmailNotificationType =
  | "lowStockAlerts"
  | "stockOutNotifications"
  | "inventoryReports"
  | "productExpirationWarnings"
  | "orderConfirmations"
  | "invoiceEmails"
  | "shippingNotifications"
  | "orderStatusUpdates";

export interface EmailPreferences {
  lowStockAlerts: boolean;
  stockOutNotifications: boolean;
  inventoryReports: boolean;
  productExpirationWarnings: boolean;
  orderConfirmations: boolean;
  invoiceEmails: boolean;
  shippingNotifications: boolean;
  orderStatusUpdates: boolean;
}

export const DEFAULT_EMAIL_PREFERENCES: EmailPreferences = {
  lowStockAlerts: true,
  stockOutNotifications: true,
  inventoryReports: true,
  productExpirationWarnings: true,
  orderConfirmations: true,
  invoiceEmails: true,
  shippingNotifications: true,
  orderStatusUpdates: true,
};

export interface UpdateEmailPreferencesInput {
  preferences: Partial<EmailPreferences>;
}
