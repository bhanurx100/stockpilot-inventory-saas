import { cn } from "@stockpilot/utils";

/**
 * Shared visual recipes (visual-only layer).
 *
 * The application previously styled most surfaces with long inline gradient
 * strings (`bg-gradient-to-*`, `rounded-[28px]`, `backdrop-blur`), which made
 * dense screens read as noisy and decorative. These recipes centralise a calm,
 * flat language so screens stay consistent without repeating class soup:
 *
 *  - colour is reserved for *status* (success / warning / danger / info),
 *  - structure uses neutral surfaces + hairline borders,
 *  - elevation is subtle, never stacked gradients,
 *  - radius and spacing come from the shared tokens.
 */

/** Neutral content panel: flat surface, hairline border, subtle elevation. */
export const panelRecipe =
  "rounded-card border border-border/70 bg-card text-card-foreground shadow-subtle";

/** Panel used for secondary/tertiary content — recedes without extra color. */
export const panelMutedRecipe =
  "rounded-card border border-border/60 bg-surface-subtle text-foreground";

/** Panel that must visually separate from the page background. */
export const panelRaisedRecipe =
  "rounded-card border border-border/70 bg-surface-raised text-foreground shadow-card";

/** Header strip inside a panel — typographic only, never decorated. */
export const panelHeaderRecipe = "flex flex-col gap-1 border-b border-border/60 px-4 py-3 sm:px-5";

export const panelTitleRecipe =
  "text-sm font-semibold tracking-tight text-foreground";

export const panelBodyRecipe = "px-4 py-4 sm:px-5";

/** Toolbar/filter rail: neutral, no gradient, no blur. */
export const toolbarRecipe =
  "flex flex-col gap-3 rounded-card border border-border/60 bg-card p-3 shadow-subtle";

/** Full-width row container used by tables/lists inside a panel. */
export const stackRecipe = "flex flex-col gap-4";

/** Compact interactive control used where a custom Button variant is needed. */
export const controlRecipe =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

export type CalloutTone = "info" | "success" | "warning" | "danger";

const CALLOUT_TONES: Record<CalloutTone, string> = {
  info: "border-info/25 bg-info-soft text-info-foreground",
  success: "border-success/25 bg-success-soft text-success-foreground",
  warning: "border-warning/30 bg-warning-soft text-warning-foreground",
  danger: "border-danger/25 bg-danger-soft text-danger-foreground",
};

/**
 * Flat tinted callout for status messaging. Replaces the old
 * `bg-gradient-to-r from-{tone}-soft/50 via-…` banners with a single quiet tint.
 */
export function calloutRecipe(tone: CalloutTone, className?: string): string {
  return cn(
    "flex items-start gap-2 rounded-lg border px-3 py-2 text-sm",
    CALLOUT_TONES[tone],
    className,
  );
}

/** Neutral key/value row used in detail panels. */
export function dataRowRecipe(className?: string): string {
  return cn(
    "flex items-baseline justify-between gap-4 border-b border-border/50 py-2 last:border-b-0",
    className,
  );
}

export const dataLabelRecipe = "text-sm text-muted-foreground";
export const dataValueRecipe = "text-sm font-medium text-foreground";

/** Section title used between panels — small, quiet, uppercase-free. */
export const sectionTitleRecipe =
  "text-sm font-semibold tracking-tight text-foreground";
