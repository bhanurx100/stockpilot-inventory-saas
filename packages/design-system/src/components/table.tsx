"use client";

import * as React from "react";
import { cn } from "@stockpilot/utils";

type TableElement = HTMLTableElement;
type TableSectionElement = HTMLTableSectionElement;
type TableRowElement = HTMLTableRowElement;
type TableHeaderCellElement = HTMLTableCellElement;
type TableCellElement = HTMLTableCellElement;

const TableLabelsContext = React.createContext<readonly string[]>([]);

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join(" ").replace(/\s+/g, " ").trim();
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }
  return "";
}

function getColumnLabel(columnId: string): string {
  return columnId
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_.:\-\s]+/g, " ")
    .trim()
    .replace(/^./, (character) => character.toUpperCase());
}

function getHeaderLabels(node: React.ReactNode): string[] {
  if (!React.isValidElement<{ children?: React.ReactNode }>(node)) {
    if (Array.isArray(node)) {
      return node.flatMap(getHeaderLabels);
    }
    return [];
  }
  if (node.type === TableHead) {
    return [getTextContent(node.props.children)];
  }
  return getHeaderLabels(node.props.children);
}

const Table = React.forwardRef<
  TableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => {
  const labels = getHeaderLabels(children);
  return (
    <div
      data-responsive-table=""
      className="stockpilot-table-container relative w-full overflow-auto"
    >
      <TableLabelsContext.Provider value={labels}>
        <table
          ref={ref}
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        >
          {children}
        </table>
      </TableLabelsContext.Provider>
    </div>
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  TableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  TableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  TableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr:last-child]:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  TableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => {
  const labels = React.useContext(TableLabelsContext);
  const responsiveCells = React.Children.map(children, (child, index) => {
    if (!React.isValidElement<Record<string, unknown>>(child)) {
      return child;
    }
    const explicitLabel = child.props["data-label"];
    const label =
      typeof explicitLabel === "string" ? explicitLabel : labels[index] ?? "";
    return React.cloneElement(child, { "data-label": label });
  });
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    >
      {responsiveCells}
    </tr>
  );
});
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  TableHeaderCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-11 whitespace-nowrap px-3 py-2 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  TableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-3 py-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  getColumnLabel,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
