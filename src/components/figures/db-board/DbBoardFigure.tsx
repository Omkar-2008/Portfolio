import { useEffect, useRef } from "react";

import { lineOnTop, translateAlong, type Projection } from "@/lib/iso-kit";
import { DB_SVG, DB_VIEW } from "./art.generated";
import { CIRCUITS, lineCurrent, live, readoutOf, type BoardState } from "./model";

const P = DB_VIEW.P as unknown as Projection;
const [MX, MY] = DB_VIEW.METER;
const [PX, PY] = DB_VIEW.MOTOR;

function needleAt(amps: number) {
  const clamped = Math.max(-0.4, Math.min(DB_VIEW.FULL_SCALE + 0.6, amps));
  const a = DB_VIEW.ARC_FROM + (clamped / DB_VIEW.FULL_SCALE) * DB_VIEW.ARC_SPAN;
  const reach = DB_VIEW.METER_R - 5;
  return lineOnTop(
    [MX - Math.sin(a) * 4, MY + Math.cos(a) * 4],
    [MX + Math.sin(a) * reach, MY - Math.cos(a) * reach],
    DB_VIEW.METER_TOP + 0.3,
    P,
  );
}

function pulleyAt(turn: number) {
  const a = turn * Math.PI * 2;
  const r = DB_VIEW.PULLEY_R - 1;
  return lineOnTop(
    [PX + Math.sin(a) * 2.4, PY - Math.cos(a) * 2.4],
    [PX + Math.sin(a) * r, PY - Math.cos(a) * r],
    DB_VIEW.PULLEY_Z,
    P,
  );
}

/** Idle tour: build the load up circuit by circuit, then trip the isolator. */
const TOUR: Array<[number, boolean]> = [
  [0, true],
  [1, true],
  [2, true],
  [3, true],
  [4, true],
  [0, false],
  [1, false],
  [2, false],
  [3, false],
  [4, false],
];
const TOUR_STEP = 1.9;

const INITIAL: BoardState = { main: false, on: [false, false, false, false], since: [9, 9, 9, 9] };
const RESTING_READOUT = readoutOf(INITIAL, 0);

type Props = { className?: string };

/**
 * Fig 01 — a lab wiring trainer board drawn with the Anatomy kit. Click a
 * breaker (or press 0–4) to switch circuits; the moving-coil ammeter follows
 * the true line current, including the motor's direct-on-line starting kick.
 */
export function DbBoardFigure({ className = "" }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const readout = readoutRef.current;
    if (!stage || !readout) return;
    const svg = stage.querySelector("svg");
    if (!svg) return;

    const q = <T extends Element>(sel: string) => svg.querySelector<T>(sel);
    const levers = [0, 1, 2, 3, 4].map((i) => q<SVGGElement>(`[data-lever="${i}"]`));
    const breakers = [0, 1, 2, 3, 4].map((i) => q<SVGGElement>(`[data-breaker="${i}"]`));
    const wires = [0, 1, 2, 3, 4].map((i) => q<SVGGElement>(`[data-wire="${i}"]`));
    const loads = [1, 2, 3, 4].map((i) => q<SVGGElement>(`[data-load="${i}"]`));
    const needle = q<SVGPathElement>('[data-part="needle"]');
    const pulley = q<SVGPathElement>('[data-part="pulley"]');
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const state: BoardState = {
      main: false,
      on: [false, false, false, false],
      since: [9, 9, 9, 9],
    };
    const lever: number[] = [0, 0, 0, 0, 0]; // eased 0..1 positions
    const needleS = { at: 0, rate: 0 };
    let spin = 0;
    let spinRate = 0;
    let touring = !still.matches;
    let clock = 0;
    let tourIndex = 0;
    let visible = false;
    let frame = 0;
    let last = 0;
    let idle = 0;

    const isOn = (i: number) => (i === 0 ? state.main : Boolean(state.on[i - 1]));
    const set = (i: number, value: boolean) => {
      if (i === 0) {
        if (value && !state.main) state.since = state.since.map(() => 0);
        state.main = value;
      } else {
        if (value && !state.on[i - 1]) state.since[i - 1] = 0;
        state.on[i - 1] = value;
      }
      paintState();
      run();
    };

    function paintState() {
      for (let i = 0; i < 5; i++) {
        const on = isOn(i);
        breakers[i]?.toggleAttribute("data-on", on);
        breakers[i]?.setAttribute("aria-pressed", String(on));
        const energised = i === 0 ? true : live(state, i - 1);
        wires[i]?.toggleAttribute("data-on", i === 0 ? true : energised);
        if (i > 0) loads[i - 1]?.toggleAttribute("data-on", energised);
      }
    }

    function draw(amps: number) {
      for (let i = 0; i < 5; i++) {
        levers[i]?.setAttribute(
          "transform",
          translateAlong(P, [0, DB_VIEW.LEVER_THROW * (lever[i] ?? 0), 0]),
        );
      }
      needle?.setAttribute("d", needleAt(needleS.at));
      pulley?.setAttribute("d", pulleyAt(spin));
      const text = readoutOf(state, amps);
      if (readout!.textContent !== text) readout!.textContent = text;
      stage!.setAttribute("aria-valuetext", text);
    }

    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      const calm = still.matches;

      if (touring) {
        clock += dt;
        if (clock >= TOUR_STEP) {
          clock = 0;
          const [i, value] = TOUR[tourIndex % TOUR.length]!;
          tourIndex++;
          set(i, value);
        }
      }

      state.since = state.since.map((s) => s + dt);
      const amps = lineCurrent(state);

      // Levers: quick snap, as a real toggle
      let moving = false;
      for (let i = 0; i < 5; i++) {
        const target = isOn(i) ? 1 : 0;
        const was = lever[i] ?? 0;
        const now = calm ? target : was + (target - was) * (1 - Math.exp(-dt / 0.06));
        lever[i] = Math.abs(target - now) < 0.002 ? target : now;
        if (lever[i] !== target) moving = true;
      }

      // Moving-coil movement: under-damped second-order system (ζ ≈ 0.55)
      if (calm) {
        needleS.at = amps;
        needleS.rate = 0;
      } else {
        const wn = 9;
        const zeta = 0.55;
        for (let s = 0; s < 4; s++) {
          const h = dt / 4;
          needleS.rate += (wn * wn * (amps - needleS.at) - 2 * zeta * wn * needleS.rate) * h;
          needleS.at += needleS.rate * h;
        }
      }
      const settled = Math.abs(amps - needleS.at) < 0.005 && Math.abs(needleS.rate) < 0.005;

      // Motor pulley: spins up when live, coasts down when cut
      const motorLive = live(state, 3);
      const want = motorLive && !calm ? 1.6 : 0;
      spinRate += (want - spinRate) * (1 - Math.exp(-dt / (motorLive ? 0.5 : 1.2)));
      if (Math.abs(spinRate) < 0.002 && !motorLive) spinRate = 0;
      spin = (spin + spinRate * dt) % 1;

      draw(amps);
      const surging = state.since.some((s, i) => live(state, i) && CIRCUITS[i]?.inrush && s < 3);
      const busy = touring || moving || !settled || spinRate !== 0 || surging;
      frame = visible && busy ? requestAnimationFrame(tick) : 0;
    }

    function run() {
      if (!frame && visible) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    }

    const takeOver = () => {
      touring = false;
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        touring = !still.matches;
        clock = 0;
        run();
      }, 9000);
    };

    const onClick = (event: MouseEvent) => {
      const hit = (event.target as Element).closest("[data-breaker]");
      if (!hit) return;
      const i = Number(hit.getAttribute("data-breaker"));
      takeOver();
      set(i, !isOn(i));
    };
    const onKey = (event: KeyboardEvent) => {
      const i = Number(event.key);
      if (!Number.isInteger(i) || i < 0 || i > 4 || event.key === " ") return;
      event.preventDefault();
      takeOver();
      set(i, !isOn(i));
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[entries.length - 1]?.isIntersecting ?? false;
        if (visible) run();
        else if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "80px 0px" },
    );
    io.observe(stage);
    svg.addEventListener("click", onClick);
    stage.addEventListener("keydown", onKey);
    paintState();
    draw(0);

    return () => {
      io.disconnect();
      svg.removeEventListener("click", onClick);
      stage.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
      window.clearTimeout(idle);
    };
  }, []);

  return (
    <figure className={`iso db-figure ${className}`} data-theme="light">
      <div className="iso-plate db-plate">
        <div className="iso-plate-corners" aria-hidden="true">
          <span className="iso-plate-corner" data-corner="fig">
            Fig 01
          </span>
          <span className="iso-plate-corner" data-corner="title">
            Distribution board
          </span>
          <span className="iso-plate-corner" data-corner="hint">
            Click a breaker
          </span>
          <span ref={readoutRef} className="iso-plate-corner" data-corner="readout" data-readout>
            {RESTING_READOUT}
          </span>
        </div>
        <div
          ref={stageRef}
          className="iso-stage"
          tabIndex={0}
          role="group"
          aria-label="Distribution trainer board. Press 0 for the main isolator, 1 to 4 for the lighting, socket, heater and motor breakers."
          aria-valuetext={RESTING_READOUT}
          dangerouslySetInnerHTML={{ __html: DB_SVG }}
        />
      </div>
    </figure>
  );
}
