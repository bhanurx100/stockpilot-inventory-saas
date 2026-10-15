export const colors = {
  light: {
    canvas: "0 0% 100%",
    surface: "0 0% 100%",
    "surface-subtle": "240 20% 99%",
    "surface-raised": "0 0% 100%",
    "surface-glass": "0 0% 100%",
    foreground: "240 10% 12%",
    "foreground-muted": "240 5% 42%",
    "foreground-subtle": "240 4% 56%",
    border: "240 6% 88%",
    "border-strong": "240 5% 76%",
    primary: "347 78% 46%",
    "primary-hover": "347 76% 40%",
    "primary-foreground": "0 0% 100%",
    secondary: "240 18% 95%",
    "secondary-foreground": "240 10% 16%",
    muted: "240 16% 95%",
    "muted-foreground": "240 5% 42%",
    accent: "258 70% 96%",
    "accent-foreground": "258 58% 32%",
    brand: "347 78% 46%",
    "brand-hover": "347 76% 40%",
    "brand-soft": "347 86% 97%",
    "brand-foreground": "347 70% 30%",
    info: "199 89% 42%",
    "info-hover": "199 88% 36%",
    "info-soft": "198 90% 96%",
    "info-foreground": "201 90% 25%",
    violet: "258 70% 52%",
    "violet-hover": "258 68% 44%",
    "violet-soft": "258 70% 96%",
    "violet-foreground": "258 58% 32%",
    success: "158 64% 32%",
    "success-hover": "158 66% 26%",
    "success-soft": "152 70% 95%",
    "success-foreground": "158 72% 20%",
    warning: "35 92% 42%",
    "warning-hover": "30 90% 34%",
    "warning-soft": "42 100% 94%",
    "warning-foreground": "28 88% 24%",
    danger: "0 72% 48%",
    "danger-hover": "0 70% 40%",
    "danger-soft": "0 86% 97%",
    "danger-foreground": "0 65% 30%",
    destructive: "0 72% 48%",
    "destructive-foreground": "0 0% 100%",
    overlay: "240 10% 8%",
    skeleton: "240 12% 91%",
    "chart-1": "347 78% 58%",
    "chart-2": "199 89% 52%",
    "chart-3": "158 64% 42%",
    "chart-4": "35 92% 52%",
    "chart-5": "258 70% 62%",
  },
  dark: {
    canvas: "240 11% 5%",
    surface: "240 10% 7%",
    "surface-subtle": "240 9% 10%",
    "surface-raised": "240 9% 12%",
    "surface-glass": "240 10% 9%",
    foreground: "0 0% 96%",
    "foreground-muted": "240 5% 70%",
    "foreground-subtle": "240 4% 60%",
    border: "240 7% 20%",
    "border-strong": "240 6% 32%",
    primary: "347 82% 64%",
    "primary-hover": "347 82% 70%",
    "primary-foreground": "347 70% 12%",
    secondary: "240 7% 16%",
    "secondary-foreground": "0 0% 96%",
    muted: "240 7% 15%",
    "muted-foreground": "240 5% 70%",
    accent: "258 32% 20%",
    "accent-foreground": "258 80% 84%",
    brand: "347 82% 64%",
    "brand-hover": "347 82% 70%",
    "brand-soft": "347 38% 16%",
    "brand-foreground": "347 90% 86%",
    info: "199 90% 60%",
    "info-hover": "199 90% 66%",
    "info-soft": "200 42% 16%",
    "info-foreground": "198 90% 84%",
    violet: "258 70% 68%",
    "violet-hover": "258 70% 74%",
    "violet-soft": "258 32% 20%",
    "violet-foreground": "258 80% 84%",
    success: "158 68% 48%",
    "success-hover": "158 68% 56%",
    "success-soft": "158 38% 14%",
    "success-foreground": "158 72% 82%",
    warning: "38 94% 56%",
    "warning-hover": "38 94% 62%",
    "warning-soft": "35 45% 15%",
    "warning-foreground": "40 96% 84%",
    danger: "0 78% 62%",
    "danger-hover": "0 78% 68%",
    "danger-soft": "0 38% 16%",
    "danger-foreground": "0 90% 86%",
    destructive: "0 72% 48%",
    "destructive-foreground": "0 0% 100%",
    overlay: "240 14% 3%",
    skeleton: "240 7% 18%",
    "chart-1": "347 82% 64%",
    "chart-2": "199 90% 60%",
    "chart-3": "158 68% 48%",
    "chart-4": "38 94% 56%",
    "chart-5": "258 70% 68%",
  },
} as const;

export function hslChannelsToHex(channels: string): string {
  const [hueValue = "0", saturationValue = "0", lightnessValue = "0"] =
    channels.trim().split(/\s+/);
  const hue = (((Number.parseFloat(hueValue) || 0) % 360) + 360) % 360 / 360;
  const saturation = (Number.parseFloat(saturationValue) || 0) / 100;
  const lightness = (Number.parseFloat(lightnessValue) || 0) / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const secondary = chroma * (1 - Math.abs(((hue * 60) % 120) - 60) / 60);
  const match = lightness - chroma / 2;
  const sector = Math.floor(hue * 6) % 6;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (sector === 0) {
    red = chroma;
    green = secondary;
  } else if (sector === 1) {
    red = secondary;
    green = chroma;
  } else if (sector === 2) {
    green = chroma;
    blue = secondary;
  } else if (sector === 3) {
    green = secondary;
    blue = chroma;
  } else if (sector === 4) {
    red = secondary;
    blue = chroma;
  } else {
    red = chroma;
    blue = secondary;
  }

  return `#${[red, green, blue]
    .map((channel) =>
      Math.round((channel + match) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`.toUpperCase();
}

export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    display: "var(--font-poppins), var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
  },
  fontSize: {
    caption: "0.75rem",
    body: "1rem",
    title: "1.5rem",
    heading: "clamp(1.75rem, 2vw, 2.25rem)",
  },
  lineHeight: {
    tight: "1.2",
    body: "1.5",
    relaxed: "1.7",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

export const spacing = {
  "touch-target": "2.75rem",
  "control-sm": "2.75rem",
  "control": "2.75rem",
  "control-lg": "3rem",
  "page-inline": "clamp(1rem, 3vw, 2rem)",
  "page-block": "clamp(1.5rem, 4vw, 2.5rem)",
  "section": "clamp(1.5rem, 3vw, 2rem)",
  "card": "clamp(1rem, 2vw, 1.5rem)",
  "stack-sm": "0.5rem",
  stack: "1rem",
  "stack-lg": "1.5rem",
} as const;

export const radius = {
  control: "0.625rem",
  card: "0.875rem",
  panel: "1rem",
  pill: "9999px",
} as const;

export const shadows = {
  subtle: "var(--shadow-subtle)",
  card: "var(--shadow-card)",
  raised: "var(--shadow-raised)",
  overlay: "var(--shadow-overlay)",
} as const;

export const motion = {
  duration: {
    instant: "0ms",
    fast: "140ms",
    normal: "220ms",
    slow: "320ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    enter: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export const breakpoints = {
  mobile: "640px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
  ultrawide: "1536px",
} as const;

export const layout = {
  headerHeight: "4rem",
  contentMax: "80rem",
  sidebarWidth: "16rem",
  sidebarCompactWidth: "4rem",
  contentGutter: "clamp(1rem, 3vw, 2rem)",
} as const;

export const accessibility = {
  touchTarget: "2.75rem",
  focusRingWidth: "2px",
  focusRingOffset: "2px",
} as const;

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
  breakpoints,
  layout,
  accessibility,
} as const;

export type SemanticColor = keyof (typeof colors)["light"];
export type SemanticTone =
  | "neutral"
  | "brand"
  | "info"
  | "success"
  | "warning"
  | "danger";
