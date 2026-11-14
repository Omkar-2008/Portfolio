/**
 * Electrical model for the distribution-board figure. Pure functions, no DOM.
 *
 * Single-phase 230 V supply. Each circuit draws a real (P) and reactive (Q)
 * power; the ammeter reads |ΣP + jΣQ| / V. The motor is started direct-on-line,
 * so for a moment it draws about six times its full-load current.
 */

export const VOLTS = 230;

export type Circuit = {
  name: string;
  rating: string;
  watts: number;
  pf: number;
  /** Direct-on-line start: multiple of full-load current at t = 0. */
  inrush?: number;
};

export const CIRCUITS: Circuit[] = [
  { name: "Lighting", rating: "B6", watts: 100, pf: 1 },
  { name: "Sockets", rating: "B16", watts: 1000, pf: 0.95 },
  { name: "Heater", rating: "B16", watts: 2000, pf: 1 },
  // 0.5 HP (373 W shaft) at 75 % efficiency → 497 W input, pf 0.8 → 2.7 A
  { name: "Motor", rating: "C10", watts: 497, pf: 0.8, inrush: 6 },
];

/** Seconds for the motor's starting current to decay by 1/e. */
export const INRUSH_TAU = 0.35;

const reactive = (c: Circuit) => c.watts * Math.tan(Math.acos(c.pf));

export type BoardState = {
  main: boolean;
  /** Per-circuit breaker state, index 0..3. */
  on: boolean[];
  /** Seconds since each circuit was last energised (for inrush). */
  since: number[];
};

export function live(state: BoardState, index: number) {
  return state.main && state.on[index];
}

/** True line current in amperes, including any motor starting surge. */
export function lineCurrent(state: BoardState) {
  let p = 0;
  let q = 0;
  CIRCUITS.forEach((c, i) => {
    if (!live(state, i)) return;
    const surge = c.inrush ? 1 + (c.inrush - 1) * Math.exp(-(state.since[i] ?? 9) / INRUSH_TAU) : 1;
    p += c.watts * surge;
    q += reactive(c) * surge;
  });
  return Math.hypot(p, q) / VOLTS;
}

/** Steady real power in watts (what the readout reports alongside current). */
export function realPower(state: BoardState) {
  return CIRCUITS.reduce((sum, c, i) => sum + (live(state, i) ? c.watts : 0), 0);
}

export function readoutOf(state: BoardState, amps: number) {
  const count = CIRCUITS.filter((_, i) => live(state, i)).length;
  if (!state.main) return `isolated · 0.0 A`;
  return `${count}/4 live · ${amps.toFixed(1)} A · ${(realPower(state) / 1000).toFixed(2)} kW`;
}
