import { Plus } from "lucide-react";

type GridOverlayProps = {
  /** Vertical line positions, as % of canvas width */
  columns: number[];
  /** Horizontal line positions, as % of canvas height */
  rows: number[];
  className?: string;
};

/** Editorial grid: hairline rules with tiny plus marks at every intersection. */
export function GridOverlay({ columns, rows, className = "" }: GridOverlayProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {columns.map((x) => (
        <span
          key={`v-${x}`}
          className="grid-line-v absolute top-0 bottom-0 w-px bg-grid"
          style={{ left: `${x}%` }}
        />
      ))}
      {rows.map((y) => (
        <span
          key={`h-${y}`}
          className="grid-line-h absolute left-0 right-0 h-px bg-grid"
          style={{ top: `${y}%` }}
        />
      ))}
      {columns.flatMap((x) =>
        rows.map((y) => (
          <Plus
            key={`p-${x}-${y}`}
            strokeWidth={1.5}
            className="grid-plus absolute size-3 -translate-x-1/2 -translate-y-1/2 text-on-canvas/60"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        )),
      )}
    </div>
  );
}
