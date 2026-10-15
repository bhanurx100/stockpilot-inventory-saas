/**
 * Role visibility matrix (ROADMAP §2 — Phase 6.5).
 *
 * The SAME matrix drives the native tab bar and the web navigation, so a screen
 * can never exist for one role and leak to another. Routes are hidden (not
 * merely disabled) and the API enforces the same rule server-side with 403.
 */

export type AppRole = "admin" | "warehouse" | "supplier" | "client" | "user";

export type ScreenKey =
  | "home"
  | "inventory"
  | "scan"
  | "products"
  | "orders"
  | "transfers"
  | "invoices"
  | "suppliers"
  | "warehouses"
  | "analytics"
  | "ai"
  | "customers"
  | "settings"
  | "support"
  | "account"
  | "activity"
  | "catalog";

export interface ScreenDefinition {
  key: ScreenKey;
  /** Route path in the native app. */
  path: string;
  label: string;
  icon: string;
  /** Minimum role required (used for API 403 parity checks). */
  roles: readonly AppRole[];
  /** Tab-bar visibility. Detail screens set this false. */
  tab: boolean;
}

export const SCREENS: readonly ScreenDefinition[] = [
  { key: "home", path: "/(tabs)/home", label: "Home", icon: "home", roles: ["admin", "warehouse", "supplier", "client", "user"], tab: true },
  { key: "inventory", path: "/(tabs)/inventory", label: "Inventory", icon: "boxes", roles: ["admin", "warehouse", "supplier", "user"], tab: true },
  { key: "scan", path: "/scan", label: "Scan", icon: "scan", roles: ["admin", "warehouse", "user"], tab: true },
  { key: "products", path: "/(tabs)/products", label: "Products", icon: "tag", roles: ["admin", "warehouse", "supplier", "user"], tab: true },
  { key: "orders", path: "/(tabs)/orders", label: "Orders", icon: "cart", roles: ["admin", "warehouse", "supplier", "client", "user"], tab: true },
  { key: "transfers", path: "/(tabs)/transfers", label: "Transfers", icon: "transfer", roles: ["admin", "warehouse", "user"], tab: true },
  { key: "invoices", path: "/(tabs)/invoices", label: "Invoices", icon: "receipt", roles: ["admin", "warehouse", "supplier", "client", "user"], tab: true },
  { key: "suppliers", path: "/(tabs)/suppliers", label: "Suppliers", icon: "truck", roles: ["admin", "supplier", "user"], tab: true },
  { key: "warehouses", path: "/(tabs)/warehouses", label: "Warehouses", icon: "warehouse", roles: ["admin", "warehouse", "user"], tab: true },
  { key: "analytics", path: "/analytics", label: "Analytics", icon: "chart", roles: ["admin", "user"], tab: false },
  { key: "ai", path: "/ai", label: "AI Brief", icon: "sparkles", roles: ["admin", "user"], tab: false },
  { key: "customers", path: "/customers", label: "Customers", icon: "users", roles: ["admin", "user"], tab: false },
  { key: "settings", path: "/settings", label: "Settings", icon: "settings", roles: ["admin", "user"], tab: false },
  { key: "support", path: "/support", label: "Support", icon: "help", roles: ["admin", "supplier", "client", "user"], tab: false },
  { key: "account", path: "/account", label: "Account", icon: "user", roles: ["client", "user"], tab: false },
  { key: "activity", path: "/activity", label: "Activity", icon: "activity", roles: ["admin", "warehouse", "user"], tab: false },
  { key: "catalog", path: "/(tabs)/catalog", label: "Catalog", icon: "grid", roles: ["client", "user"], tab: true },
] as const;

/** Normalize a raw role string from the API into the matrix vocabulary. */
export function normalizeRole(role: string | null | undefined): AppRole {
  switch ((role ?? "").toLowerCase()) {
    case "admin":
      return "admin";
    case "warehouse":
      return "warehouse";
    case "supplier":
      return "supplier";
    case "client":
      return "client";
    default:
      return "user";
  }
}

/** True when the role may see the screen at all. */
export function canAccess(role: AppRole, key: ScreenKey): boolean {
  const screen = SCREENS.find((s) => s.key === key);
  if (!screen) return false;
  return screen.roles.includes(role);
}

/** Screens shown in the role's tab bar, in matrix order. */
export function tabsForRole(role: AppRole): ScreenDefinition[] {
  return SCREENS.filter((screen) => screen.tab && screen.roles.includes(role));
}

/** The landing screen for a role (ROADMAP §2 first item per role). */
export function homeScreenForRole(role: AppRole): ScreenDefinition {
  return (
    SCREENS.find((screen) => screen.key === "home") ?? SCREENS[0]!
  );
}
