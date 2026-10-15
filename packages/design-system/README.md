# StockPilot Design System

`@stockpilot/design-system` is the shared source for web and native consumers.

## Tokens

`tokens` contains semantic colors, typography, spacing, radius, shadows, motion, and breakpoints. Colors provide light and dark values as HSL channels. Web CSS variables live in `src/styles.css`; native clients consume the TypeScript token object directly.

## Shared components

The package exports 15 shared components: Button, Input, Textarea, Label, Badge, Card, Skeleton, Progress, Select, Checkbox, Switch, Dialog, Tabs, Tooltip, and Table. Table is responsive by default and turns every row into a labeled card at 640px and below.

## Patterns

The package exports eight patterns:

1. PageHeader
2. MetricGrid
3. FilterBar
4. ActivityTimeline
5. InsightCard
6. DetailHeader
7. MobileActionBar
8. StatePanel

StatePanel is the eighth pattern because products, orders, invoices, warehouses, transfers, support, history, and portal lists all need the same loading, empty, error, and retry presentation. Centralizing those states keeps recovery actions consistent and prevents blank or oversized mobile screens.

## Interaction baseline

Controls use a minimum 44px target. Form controls retain a 16px font size to prevent mobile browser zoom. Motion honors reduced-motion preferences, and the mobile action bar accounts for device safe areas.
