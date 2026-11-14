import type { ReactNode } from "react";

import type { ProjectArt as ArtKind } from "@/data/profile";

/**
 * Hand-built schematic illustrations for each project, drawn on a 400×250 sheet.
 * Base linework uses currentColor; the orange `.trace-flow` overlays animate
 * "current" along the main conductors when the card is hovered.
 */
export function ProjectArt({ kind, className = "" }: { kind: Exclude<ArtKind, "arduino">; className?: string }) {
  const Art = ART[kind];
  return (
    <svg
      viewBox="0 0 400 250"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <Art />
    </svg>
  );
}

const ACCENT = "var(--primary)";

/** Round trig output so server (Node) and browser render identical path strings. */
const f = (n: number) => n.toFixed(2);

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill="currentColor"
      stroke="none"
      fillOpacity={0.55}
      fontSize={9}
      letterSpacing="0.12em"
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
    >
      {children}
    </text>
  );
}

/** Same path again in orange, dashed and animated on hover. */
function Flow({ d }: { d: string }) {
  return <path d={d} className="trace-flow" stroke={ACCENT} strokeWidth={2} />;
}

function Breaker({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 7} y={y - 7} width={14} height={14} fill="var(--ink-2)" />
      <path d={`M${x - 4} ${y - 4}l8 8m0-8l-8 8`} />
    </g>
  );
}

/* ---------- 02 · Single-line diagram ---------- */
function Sld() {
  const feeders = [95, 165, 235, 305];
  const loads = ["M", "L", "M", "S"];
  return (
    <g>
      {/* Transformer */}
      <path d="M200 14v16" />
      <circle cx={200} cy={40} r={11} />
      <circle cx={200} cy={55} r={11} />
      <Label x={222} y={50} anchor="start">TR-1</Label>
      <path d="M200 66v22m0 14v14" />
      <Breaker x={200} y={95} />
      <Label x={214} y={98} anchor="start">MCCB</Label>
      {/* Busbar */}
      <path d="M60 118h280" strokeWidth={4} stroke={ACCENT} />
      <Label x={346} y={121} anchor="start">BUS</Label>
      {feeders.map((x, i) => (
        <g key={x}>
          <path d={`M${x} 118v26m0 14v26`} />
          <Breaker x={x} y={151} />
          <circle cx={x} cy={196} r={11} />
          <text x={x} y={199.5} textAnchor="middle" fontSize={10} fontWeight={700} fill="currentColor" stroke="none">
            {loads[i]}
          </text>
          <Label x={x} y={228}>{`F-0${i + 1}`}</Label>
        </g>
      ))}
      {/* Earth */}
      <path d="M340 118v40m-12 0h24m-18 6h12m-6 6h0" />
      <Label x={340} y={188}>PE</Label>
      <Flow d="M200 14v52m0 22v30M60 118h280" />
      <Flow d={feeders.map((x) => `M${x} 118v67`).join("")} />
    </g>
  );
}

/* ---------- 03 · SPWM ---------- */
const SPWM = (() => {
  const x0 = 24;
  const w = 352;
  const periods = 22;
  const P = w / periods;
  const sineY = (x: number) => 78 - 40 * Math.sin(((x - x0) / w) * Math.PI * 4);
  let carrier = `M${x0} 118`;
  let pulses = `M${x0} 216`;
  for (let k = 0; k < periods; k++) {
    const a = x0 + k * P;
    carrier += `L${a + P / 2} 38L${a + P} 118`;
    const mid = a + P / 2;
    const duty = (Math.sin(((mid - x0) / w) * Math.PI * 4) + 1) / 2;
    const half = (duty * P) / 2;
    pulses += `H${(mid - half).toFixed(1)}V176H${(mid + half).toFixed(1)}V216`;
  }
  pulses += `H${x0 + w}`;
  let sine = "";
  for (let x = x0; x <= x0 + w; x += 4) sine += `${x === x0 ? "M" : "L"}${x} ${sineY(x).toFixed(1)}`;
  return { carrier, pulses, sine };
})();

function Vfd() {
  return (
    <g>
      <path d="M24 78h352M24 196h352" strokeOpacity={0.2} strokeDasharray="2 4" />
      <path d={SPWM.carrier} strokeOpacity={0.35} strokeWidth={1} />
      <path d={SPWM.sine} stroke={ACCENT} strokeWidth={2.5} />
      <path d={SPWM.pulses} />
      <Label x={24} y={26} anchor="start">CARRIER × SINE REF</Label>
      <Label x={376} y={26} anchor="end">5 — 60 HZ</Label>
      <Label x={24} y={240} anchor="start">GATE PULSE · V/F CONST.</Label>
      <Flow d={SPWM.pulses} />
    </g>
  );
}

/* ---------- 04 · Energy meter ---------- */
function Meter() {
  const cx = 105;
  const cy = 160;
  const r = 70;
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const a = Math.PI + (i / 10) * Math.PI;
    const inner = i % 5 === 0 ? r - 14 : r - 8;
    return `M${f(cx + Math.cos(a) * inner)} ${f(cy + Math.sin(a) * inner)}L${f(cx + Math.cos(a) * r)} ${f(cy + Math.sin(a) * r)}`;
  }).join("");
  const needle = Math.PI + 0.92 * Math.PI;
  const wave = (phase: number, amp: number) => {
    let d = "";
    for (let x = 220; x <= 380; x += 4) {
      const y = 140 - amp * Math.sin(((x - 220) / 160) * Math.PI * 3 - phase);
      d += `${x === 220 ? "M" : "L"}${x} ${y.toFixed(1)}`;
    }
    return d;
  };
  return (
    <g>
      <path d={`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`} strokeOpacity={0.35} strokeWidth={6} />
      <path d={`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${f(cx + Math.cos(needle) * r)} ${f(cy + Math.sin(needle) * r)}`} stroke={ACCENT} strokeWidth={6} />
      <path d={ticks} strokeOpacity={0.6} />
      <path d={`M${cx} ${cy}L${f(cx + Math.cos(needle) * (r - 20))} ${f(cy + Math.sin(needle) * (r - 20))}`} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={5} fill="currentColor" />
      <Label x={cx} y={cy + 26}>POWER FACTOR</Label>
      {/* V and I, phase-shifted */}
      <path d="M220 140h160" strokeOpacity={0.2} strokeDasharray="2 4" />
      <path d={wave(0, 42)} stroke={ACCENT} strokeWidth={2.5} />
      <path d={wave(0.5, 26)} strokeDasharray="5 4" />
      <Label x={220} y={76} anchor="start">V</Label>
      <Label x={236} y={76} anchor="start">— I · φ</Label>
      {/* Wireless uplink */}
      <path d="M352 50a14 14 0 0 1 20 0M347 44a21 21 0 0 1 30 0M342 38a28 28 0 0 1 40 0" strokeOpacity={0.7} />
      <circle cx={362} cy={58} r={2.5} fill="currentColor" />
      <Label x={330} y={32} anchor="end">MQTT</Label>
      <Flow d={wave(0, 42)} />
    </g>
  );
}

/* ---------- 05 · Star-delta ---------- */
function StarDelta() {
  const sc = { x: 100, y: 112 };
  const star = [
    [sc.x, sc.y - 52],
    [sc.x - 45, sc.y + 26],
    [sc.x + 45, sc.y + 26],
  ] as const;
  const tri = [
    [300, 60],
    [255, 138],
    [345, 138],
  ] as const;
  const starPath = star.map(([x, y]) => `M${sc.x} ${sc.y}L${x} ${y}`).join("");
  const triPath = `M${tri[0][0]} ${tri[0][1]}L${tri[1][0]} ${tri[1][1]}L${tri[2][0]} ${tri[2][1]}Z`;
  return (
    <g>
      <path d={starPath} strokeWidth={2} />
      {star.map(([x, y]) => <circle key={`s${x}${y}`} cx={x} cy={y} r={5} fill="var(--ink-2)" />)}
      <circle cx={sc.x} cy={sc.y} r={3.5} fill="currentColor" />
      <Label x={sc.x} y={170}>STAR · START</Label>

      <path d={triPath} strokeWidth={2} stroke={ACCENT} />
      {tri.map(([x, y]) => <circle key={`t${x}${y}`} cx={x} cy={y} r={5} fill="var(--ink-2)" stroke={ACCENT} />)}
      <Label x={300} y={170}>DELTA · RUN</Label>

      {/* Timer transition */}
      <path d="M160 104h76m-8-6l8 6-8 6" />
      <circle cx={198} cy={80} r={11} />
      <path d="M198 73v7l5 3" />
      <Label x={198} y={124}>T = 5 S</Label>

      {/* Contactors */}
      {["KM1 · MAIN", "KM2 · STAR", "KM3 · DELTA"].map((label, i) => (
        <g key={label}>
          <rect x={40 + i * 112} y={192} width={96} height={28} rx={3} strokeOpacity={0.6} />
          <Label x={88 + i * 112} y={209.5}>{label}</Label>
        </g>
      ))}
      <path d="M136 206h16M248 206h16" strokeDasharray="3 3" strokeOpacity={0.6} />
      <Flow d={triPath} />
    </g>
  );
}

/* ---------- 06 · Inverter ---------- */
function Inverter() {
  const sine = (() => {
    let d = "";
    for (let x = 300; x <= 380; x += 3) d += `${x === 300 ? "M" : "L"}${x} ${(125 - 34 * Math.sin(((x - 300) / 80) * Math.PI * 2)).toFixed(1)}`;
    return d;
  })();
  const sw = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x - 10} y={y - 14} width={20} height={28} rx={2} fill="var(--ink-2)" />
      <path d={`M${x - 4} ${y - 8}v16M${x - 10} ${y}h-8`} />
    </g>
  );
  return (
    <g>
      {/* Battery */}
      <path d="M40 70v40m0 30v40M28 110h24m-18 8h12m-18 8h24m-18 8h12" />
      <Label x={40} y={60}>12V DC</Label>
      {/* Rails */}
      <path d="M40 70h200M40 180h200" />
      {/* H-bridge legs */}
      <path d="M110 70v110M210 70v110" />
      {[sw(110, 96), sw(110, 154), sw(210, 96), sw(210, 154)]}
      {/* Output through LC filter */}
      <path d="M210 125h18" />
      <path d="M228 125c4-10 10-10 12 0c2-10 8-10 12 0c2-10 8-10 12 0" stroke={ACCENT} strokeWidth={2} />
      <path d="M264 125h14M278 125v16m-9 0h18m-18 6h18m-9 0v16" />
      <Label x={252} y={108}>L</Label>
      <Label x={296} y={150} anchor="start">C</Label>
      <path d="M278 125h18" />
      <path d={sine} stroke={ACCENT} strokeWidth={2.5} />
      <Label x={340} y={196}>230V · 50HZ</Label>
      <Label x={160} y={214}>H-BRIDGE · SPWM</Label>
      <Flow d="M40 70h200M210 70v110" />
      <Flow d={sine} />
    </g>
  );
}

/* ---------- 07 · Blueprint placeholder ---------- */
function Blueprint() {
  return (
    <g>
      <rect x={40} y={40} width={130} height={80} rx={4} strokeDasharray="6 6" strokeOpacity={0.6} />
      <rect x={230} y={40} width={130} height={80} rx={4} strokeDasharray="6 6" strokeOpacity={0.6} />
      <rect x={40} y={150} width={320} height={60} rx={4} strokeDasharray="6 6" strokeOpacity={0.6} />
      <path d="M170 80h60M105 120v30M295 120v30" strokeDasharray="3 5" strokeOpacity={0.5} />
      <Label x={105} y={84}>CONTROL</Label>
      <Label x={295} y={84}>DRAFTING</Label>
      <Label x={200} y={184}>WIRING · VERIFICATION</Label>
      {/* Dimension line */}
      <path d="M40 228h320M40 222v12M360 222v12" strokeOpacity={0.4} />
      <Label x={200} y={244}>TBD</Label>
      <g transform="rotate(-8 200 125)">
        <rect x={112} y={106} width={176} height={38} rx={4} stroke={ACCENT} strokeWidth={2} fill="var(--ink-2)" />
        <text x={200} y={131} textAnchor="middle" fill={ACCENT} stroke="none" fontSize={14} fontWeight={800} letterSpacing="0.18em">
          IN PREPARATION
        </text>
      </g>
    </g>
  );
}

const ART: Record<Exclude<ArtKind, "arduino">, () => ReactNode> = {
  sld: Sld,
  vfd: Vfd,
  meter: Meter,
  "star-delta": StarDelta,
  inverter: Inverter,
  blueprint: Blueprint,
};
