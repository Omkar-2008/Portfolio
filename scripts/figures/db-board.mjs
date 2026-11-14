/**
 * Fig 01 — Distribution trainer board.
 *
 * Built with the Anatomy kit (scripts/figures/kit, MIT). A lab wiring trainer
 * board lies on the bench: a 2-pole isolator and four MCBs on a DIN rail feed a
 * lamp, a socket, a heater and a small induction motor. A moving-coil ammeter
 * reads the true total line current from the model in model.ts.
 *
 *   node scripts/figures/db-board.mjs           → writes the generated art module
 *   node scripts/figures/db-board.mjs --page    → also writes a standalone preview page
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";
import * as G from "./kit/lathe.mjs";
import { tubePieces, tubeSvg } from "./kit/tube.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(ROOT, "src", "components", "figures", "db-board", "art.generated.ts");

const WIDTH = 640;
const HEIGHT = 350;

/* ---------------- World layout ---------------- */

const BOARD = { x: -150, y: -80, w: 300, d: 160, r: 6 };
const BOARD_H = 8;
const FOOT_H = 4;

const MOD = 15; // one DIN module, in world units
const SHOULDER_TOP = 20;
const LEVER_H = 5;
const LEVER_OFF = -56.6; // lever centre y when OFF (towards the back)
const LEVER_THROW = 6; // travels +y (towards the viewer) when ON
const BODY_Y = -66;
const BODY_D = 28;
const FRONT_Y = BODY_Y + BODY_D; // −38: the face the outgoing cables leave from

// Isolator (two modules) + four MCBs
const BREAKERS = [
  { x: -124, w: MOD * 2, name: "Main isolator", rating: "40 A DP" },
  { x: -92, w: MOD, name: "Lighting", rating: "B6" },
  { x: -76, w: MOD, name: "Sockets", rating: "B16" },
  { x: -60, w: MOD, name: "Heater", rating: "B16" },
  { x: -44, w: MOD, name: "Motor", rating: "C10" },
];
const RAIL = { x: -132, y: -57, w: 106, d: 10, r: 0.5 };

const NEUTRAL = { x: -14, y: -66, w: 48, d: 6, r: 1 };
const EARTH = { x: -14, y: -52, w: 48, d: 6, r: 1 };

const METER = [96, -44];
const METER_BASE = { x: 68, y: -72, w: 56, d: 56, r: 5 };
const METER_R = 24;
const METER_Z = 6;
const METER_TOP = 15;
const FULL_SCALE = 20; // amperes
const ARC_MID = Math.atan2(-Math.cos((42 * Math.PI) / 180), Math.sin((42 * Math.PI) / 180)); // points "up" the screen
const ARC_SPAN = (135 * Math.PI) / 180;
const ARC_FROM = ARC_MID - ARC_SPAN / 2;

const LAMP = [-118, 40];
const SOCKET = { x: -84, y: 26, w: 30, d: 30, r: 3 };
const HEATER = { x: -40, y: 26, w: 56, d: 26, r: 2 };
const MOTOR = [55, 42];
const MOTOR_BASE = { x: 34, y: 24, w: 42, d: 36, r: 2 };
const PULLEY_Z = 44;
const PULLEY_R = 6.5;

const CABLE_R = 1.3;

/* ---------------- Camera ---------------- */

const P = k.fitProjection(
  [
    ...k.boxCorners(BOARD, -BOARD_H - FOOT_H, 0),
    [MOTOR[0], MOTOR[1], PULLEY_Z + 4],
    [LAMP[0], LAMP[1], 36],
    [BREAKERS[0].x, BODY_Y, SHOULDER_TOP + LEVER_H + 2],
  ],
  WIDTH,
  HEIGHT,
  { pad: 16, azimuth: 42 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const depth = (x, y, z = 0) => k.depthOf([x, y, z], P);
const byDepth = (points) => [...points].sort((a, b) => depth(a[0], a[1]) - depth(b[0], b[1]));
const screw = (x, y, z, r = 1.6) => L(k.ring(x, y, r, z, P, 14), { tone: "lo" }) + D([at([x, y, z])], { size: 0.45 });

/* ---------------- Parts ---------------- */

function board() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BOARD, -BOARD_H - FOOT_H, BOARD_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(BOARD, 18))) {
    out.push(S(k.cylinder(x, y, 7, -BOARD_H - FOOT_H, 1.4, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -BOARD_H - FOOT_H + 1.4, FOOT_H - 1.4, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(BOARD, -BOARD_H, BOARD_H, P, 8, 1.4), { tone: "mid", inner: L(k.sideSeam(BOARD, -3, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(BOARD, 5), 0, P), { tone: "faint" }));
  const corners = k.corners(BOARD, 10);
  out.push(corners.map(([x, y]) => screw(x, y, 0, 2.2)).join(""));

  // Ruler strip along the front edge: ticks hang from its inner edge
  const strip = { x: -128, y: BOARD.y + BOARD.d - 14, w: 192, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], { size: 0.4 }));

  // Label plate, front right: three rule lines stand for printed text
  const plate = { x: 92, y: 40, w: 44, d: 26, r: 2 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.8), 0.8, P, 4), { tone: "faint" }));
  out.push(
    L(k.lineOnTop([plate.x + 6, plate.y + 8], [plate.x + 34, plate.y + 8], 0.8, P), { tone: "mid", free: true }),
    L(k.lineOnTop([plate.x + 6, plate.y + 13], [plate.x + 28, plate.y + 13], 0.8, P), { tone: "lo", free: true }),
    L(k.lineOnTop([plate.x + 6, plate.y + 18], [plate.x + 20, plate.y + 18], 0.8, P), { tone: "lo", free: true }),
  );
  out.push(D([at([plate.x + 3.4, plate.y + 3.4, 0.8]), at([plate.x + plate.w - 3.4, plate.y + plate.d - 3.4, 0.8])], { size: 0.45 }));

  // Mounting slots along the back edge: closed outlines, so nothing ends in the air
  for (const x of [-60, 0, 40]) {
    out.push(L(k.planOutline({ x, y: BOARD.y + 6, w: 14, d: 3, r: 1.5 }, 0, P, 4), { tone: "lo" }));
  }
  return out.join("");
}

/** A cable lying on the board, leaving a breaker's front face. */
function cable(points, { tone = "mid", part = "" } = {}) {
  const route = G.fillet(points, 4, 7);
  const pieces = tubePieces(route, CABLE_R, P, { maxLength: 400 });
  const svg = pieces.map((piece) => tubeSvg(piece, { tone })).join("");
  return part ? `<g data-wire="${part}">${svg}</g>` : svg;
}

function wires() {
  const z = CABLE_R;
  const centre = (index) => BREAKERS[index].x + BREAKERS[index].w / 2;
  const rise = (x) => [
    [x, FRONT_Y, 5],
    [x, FRONT_Y + 5, 5],
    [x, FRONT_Y + 10, z],
  ];
  const out = [];
  // 1 Lighting → lamp holder
  out.push(cable([...rise(centre(1)), [centre(1), 6, z], [LAMP[0], 6, z], [LAMP[0], LAMP[1] - 12, z]], { part: "1" }));
  // 2 Sockets → socket plate
  out.push(cable([...rise(centre(2)), [centre(2), SOCKET.y, z]], { part: "2" }));
  // 3 Heater → heater base
  out.push(cable([...rise(centre(3)), [centre(3), -4, z], [-14, -4, z], [-14, HEATER.y, z]], { part: "3" }));
  // 4 Motor → motor base
  out.push(cable([...rise(centre(4)), [centre(4), -16, z], [MOTOR[0] - 4, -16, z], [MOTOR[0] - 4, MOTOR_BASE.y, z]], { part: "4" }));
  // Meter leads: from the neutral bar's end to the meter base
  out.push(cable([[NEUTRAL.x + NEUTRAL.w, NEUTRAL.y + 3, 3], [METER_BASE.x - 8, NEUTRAL.y + 3, 3], [METER_BASE.x, NEUTRAL.y + 3, 3]], { tone: "lo" }));
  // Supply cable: a gland on the left edge into the isolator's left face
  out.push(cable([[BOARD.x + 6, -52, 4], [BREAKERS[0].x, -52, 4]], { tone: "hi", part: "0" }));
  return out.join("");
}

function rail() {
  const out = [S(k.slabOf(RAIL, 0, 2.5, P, 2, 0.3), { tone: "mid" })];
  out.push(L(k.lineOnTop([RAIL.x, RAIL.y + 5], [RAIL.x + RAIL.w, RAIL.y + 5], 2.5, P), { tone: "faint" }));
  out.push(screw(RAIL.x + 3, RAIL.y + 5, 2.5, 1.2), screw(RAIL.x + RAIL.w - 3, RAIL.y + 5, 2.5, 1.2));
  // Cable gland on the board's left edge
  out.push(S(k.slabOf({ x: BOARD.x + 1, y: -58, w: 6, d: 12, r: 1.5 }, 0, 8, P, 3, 0.4), { tone: "mid" }));
  return out.join("");
}

function breaker(index) {
  const { x, w } = BREAKERS[index];
  const out = [];
  const body = { x, y: BODY_Y, w, d: BODY_D, r: 1.2 };
  const shoulder = { x: x + 0.6, y: -61, w: w - 1.2, d: 17, r: 1 };
  out.push(S(k.slabOf(body, 2.5, 11.5, P, 3, 0.5), { tone: "hi", crease: "lo", inner: L(k.sideSeam(body, 8, P, 3), { tone: "faint" }) }));
  out.push(S(k.slabOf(shoulder, 14, SHOULDER_TOP - 14, P, 3, 0.4), { tone: "hi", crease: "lo" }));
  // Terminal screws front and back, each in its own well
  for (const y of [BODY_Y + 2.6, FRONT_Y - 2.6]) {
    for (let pole = 0; pole < w / MOD; pole++) {
      const cx = x + MOD / 2 + pole * MOD;
      out.push(L(k.planOutline({ x: cx - 3, y: y - 1.8, w: 6, d: 3.6, r: 1 }, 14, P, 3), { tone: "faint" }));
      out.push(D([at([cx, y, 14])], { size: 0.5 }));
    }
  }
  // Lever slot and the rating window on the shoulder
  out.push(L(k.planOutline({ x: x + w / 2 - 3.6, y: LEVER_OFF - 3, w: 7.2, d: LEVER_THROW + 6, r: 1.2 }, SHOULDER_TOP, P, 3), { tone: "lo" }));
  out.push(L(k.planOutline({ x: x + 2.4, y: -48.4, w: w - 4.8, d: 3, r: 0.6 }, SHOULDER_TOP, P, 2), { tone: "faint" }));
  // ON/OFF state flag (a small window that shows the contact state)
  out.push(`<path data-flag="${index}" class="iso-line db-flag" data-tone="lo" d="${k.planOutline({ x: x + w - 4.4, y: -59, w: 2.4, d: 2.4, r: 0.6 }, SHOULDER_TOP, P, 2)}"/>`);
  // Lever, built OFF and moved by the live code
  const lever = { x: x + w / 2 - 2.8, y: LEVER_OFF - 1.6, w: 5.6, d: 3.2, r: 1 };
  const leverSvg = S(k.slabOf(lever, SHOULDER_TOP, LEVER_H, P, 2, 0.3), { tone: "hi", crease: "lo" });
  out.push(`<g data-lever="${index}">${leverSvg}</g>`);
  return `<g data-breaker="${index}" class="db-breaker">${out.join("")}</g>`;
}

function bar(plan, kind) {
  const out = [];
  for (const sx of [plan.x + 3, plan.x + plan.w - 9]) {
    out.push(S(k.slabOf({ x: sx, y: plan.y - 0.5, w: 6, d: plan.d + 1, r: 1 }, 0, 5, P, 2, 0.3), { tone: "lo" }));
  }
  out.push(S(k.slabOf(plan, 5, 3.5, P, 2, 0.4), { tone: kind === "earth" ? "mid" : "hi", crease: "lo" }));
  const holes = [];
  for (let i = 0; i < 7; i++) holes.push([plan.x + 6 + i * 6, plan.y + plan.d / 2]);
  out.push(D(holes.map(([hx, hy]) => at([hx, hy, 8.5])), { size: 0.55 }));
  out.push(L(holes.map(([hx, hy]) => k.ring(hx, hy, 1.5, 8.5, P, 12)).join(""), { tone: "lo" }));
  return out.join("");
}

function meter() {
  const [x, y] = METER;
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(METER_BASE, 2), 0, 0.1, P)}" style="filter:blur(3px)"/>`];
  out.push(S(k.slabOf(METER_BASE, 0, METER_Z, P, 6, 0.8), { tone: "mid" }));
  out.push(k.corners(METER_BASE, 4.5).map(([cx, cy]) => screw(cx, cy, METER_Z, 1.4)).join(""));
  // Terminal posts on the base, where the meter leads land
  out.push(S(k.cylinder(METER_BASE.x + 5, METER_BASE.y + 10, 2.2, METER_Z, 3, P, 16), { tone: "mid" }));
  out.push(S(k.cylinder(METER_BASE.x + 5, METER_BASE.y + 17, 2.2, METER_Z, 3, P, 16), { tone: "mid" }));
  // Bezel and dial face
  out.push(S(k.cylinder(x, y, METER_R, METER_Z, METER_TOP - METER_Z, P, 72, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(x, y, METER_R, METER_TOP - 3, METER_TOP, 90, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(x, y, METER_R, METER_TOP - 3, P, 40), { tone: "faint" }));
  out.push(L(k.ring(x, y, METER_R - 2.4, METER_TOP, P, 72), { tone: "lo" }));
  const ticks = k.radialTicks(x, y, METER_R - 4, 20, 5, METER_TOP, [1.4, 3], P, ARC_FROM, ARC_SPAN);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  // Arc the ticks hang from
  const arc = [];
  for (let i = 0; i <= 40; i++) {
    const a = ARC_FROM + (i / 40) * ARC_SPAN;
    arc.push([x + Math.sin(a) * (METER_R - 4), y - Math.cos(a) * (METER_R - 4)]);
  }
  out.push(L(k.onTop(arc, METER_TOP, P), { tone: "mid" }));
  // Red overload band past 16 A
  const red = [];
  for (let i = 0; i <= 12; i++) {
    const a = ARC_FROM + ((16 + (i / 12) * 4) / FULL_SCALE) * ARC_SPAN;
    red.push([x + Math.sin(a) * (METER_R - 5.2), y - Math.cos(a) * (METER_R - 5.2)]);
  }
  out.push(`<path class="iso-line db-overload" d="${k.onTop(red, METER_TOP, P)}"/>`);
  out.push(k.faceTextSvg(k.topMatrix([x + 2, y + 11], METER_TOP, P, "x"), "A", { size: 5, tone: "mid", anchor: "middle" }));
  // Zero-adjust screw
  out.push(screw(x - 2, y + 15, METER_TOP, 1.4));
  return out.join("");
}

function needleAt(amps) {
  const [x, y] = METER;
  const a = ARC_FROM + (Math.max(-0.4, Math.min(FULL_SCALE + 0.6, amps)) / FULL_SCALE) * ARC_SPAN;
  const reach = METER_R - 5;
  return k.lineOnTop([x - Math.sin(a) * 4, y + Math.cos(a) * 4], [x + Math.sin(a) * reach, y - Math.cos(a) * reach], METER_TOP + 0.3, P);
}

function lamp() {
  const [x, y] = LAMP;
  const base = { x: x - 12, y: y - 12, w: 24, d: 24, r: 3 };
  const out = [];
  out.push(S(k.slabOf(base, 0, 5, P, 4, 0.6), { tone: "mid" }));
  out.push(screw(base.x + 4, base.y + 4, 5, 1.2), screw(base.x + base.w - 4, base.y + base.d - 4, 5, 1.2));
  out.push(S(k.cylinder(x, y, 7.5, 5, 9, P, 40, 0.5), { tone: "mid" }));
  out.push(L(k.knurl(x, y, 7.5, 9, 14, 30, P), { tone: "lo" }));
  out.push(S(k.cylinder(x, y, 5, 14, 4, P, 32), { tone: "lo" }));
  out.push(L(k.sideArc(x, y, 5, 16, P, 20), { tone: "faint" }));
  // Soft glow sits behind the glass and only shows when the circuit is on
  const c = at([x, y, 27]);
  out.push(`<circle class="db-glow" cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="${(k.screenRise(1, P) * 22).toFixed(1)}"/>`);
  out.push(`<g class="db-bulb">${S(G.sphereOf([x, y, 27], 9.5, P), { tone: "hi" })}</g>`);
  return `<g data-load="1">${out.join("")}</g>`;
}

function socket() {
  const out = [];
  out.push(S(k.slabOf(SOCKET, 0, 5, P, 4, 0.6), { tone: "mid" }));
  const face = k.insetPlan(SOCKET, 3);
  out.push(S(k.slabOf(face, 5, 1.4, P, 4, 0.3), { tone: "hi", crease: "lo" }));
  const z = 6.4;
  const cx = SOCKET.x + 12;
  // Earth on top, live and neutral below, as on an Indian 6 A / 16 A socket
  out.push(`<path class="db-hole" d="${k.ring(cx, SOCKET.y + 8, 2.4, z, P, 18)}"/>`);
  out.push(`<path class="db-hole" d="${k.ring(cx - 5, SOCKET.y + 19, 1.6, z, P, 14)}"/>`);
  out.push(`<path class="db-hole" d="${k.ring(cx + 5, SOCKET.y + 19, 1.6, z, P, 14)}"/>`);
  // Rocker switch and its indicator
  const rocker = { x: SOCKET.x + 21, y: SOCKET.y + 8, w: 5, d: 12, r: 1 };
  out.push(S(k.slabOf(rocker, z, 2, P, 2, 0.3), { tone: "mid" }));
  out.push(`<circle class="db-led" cx="${at([SOCKET.x + 23.5, SOCKET.y + 23, z])[0].toFixed(1)}" cy="${at([SOCKET.x + 23.5, SOCKET.y + 23, z])[1].toFixed(1)}" r="1.1"/>`);
  out.push(screw(SOCKET.x + 6, SOCKET.y + SOCKET.d - 6, z, 1.1));
  return `<g data-load="2">${out.join("")}</g>`;
}

function heater() {
  const out = [];
  out.push(S(k.slabOf(HEATER, 0, 4, P, 3, 0.5), { tone: "lo" }));
  const posts = [HEATER.x + 6, HEATER.x + HEATER.w - 6];
  const cy = HEATER.y + 13;
  const cz = 14;
  out.push(S(k.cylinder(posts[0], cy, 3.6, 4, 15, P, 24, 0.4), { tone: "mid" }));
  out.push(L(k.sideArc(posts[0], cy, 3.6, 9, P, 14), { tone: "faint" }));
  const c = k.coil(posts[0], posts[1], [cy, cz], 3.3, 12, "x", P);
  out.push(`<path class="iso-line db-coil" data-tone="lo" d="${c.back}"/>`);
  out.push(S(k.slabOf({ x: posts[0] + 3, y: cy - 1.2, w: posts[1] - posts[0] - 6, d: 2.4, r: 1 }, cz - 1.2, 2.4, P, 2), { tone: "lo", crease: "none" }));
  out.push(`<path class="iso-line db-coil" data-tone="mid" d="${c.front}"/>`);
  out.push(S(k.cylinder(posts[1], cy, 3.6, 4, 15, P, 24, 0.4), { tone: "mid" }));
  out.push(L(k.sideArc(posts[1], cy, 3.6, 9, P, 14), { tone: "faint" }));
  // Terminal screws clamping the element's ends to each ceramic post
  out.push(D([at([posts[0], cy + 3.3, cz]), at([posts[1], cy + 3.3, cz])], { size: 0.7, tone: "hi" }));
  out.push(screw(HEATER.x + HEATER.w / 2, HEATER.y + HEATER.d - 4, 4, 1.1));
  return `<g data-load="3">${out.join("")}</g>`;
}

function motor() {
  const [x, y] = MOTOR;
  const out = [];
  out.push(S(k.slabOf(MOTOR_BASE, 0, 4, P, 3, 0.5), { tone: "lo" }));
  out.push(k.corners(MOTOR_BASE, 4).map(([cx, cy]) => screw(cx, cy, 4, 1.3)).join(""));
  out.push(S(k.cylinder(x, y, 14, 4, 3, P, 56), { tone: "mid" }));
  out.push(S(k.cylinder(x, y, 12.5, 7, 24, P, 56, 0.6), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(x, y, 12.5, 10, 28, 30, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(x, y, 12.5, 10, P, 30) + k.sideArc(x, y, 12.5, 28, P, 30), { tone: "faint" }));
  // Terminal box on the +x side
  out.push(S(k.slabOf({ x: x + 11, y: y - 6, w: 7, d: 12, r: 1 }, 12, 10, P, 2, 0.4), { tone: "mid" }));
  out.push(D([at([x + 14.5, y - 3, 22]), at([x + 14.5, y + 3, 22])], { size: 0.45 }));
  out.push(S(k.cylinder(x, y, 10, 31, 4, P, 48, 0.5), { tone: "mid" }));
  out.push(S(k.cylinder(x, y, 1.8, 35, PULLEY_Z - 35 - 4, P, 16), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(x, y, PULLEY_R, PULLEY_Z - 4, 4, P, 40, 0.4), { tone: "hi", crease: "lo" }));
  out.push(L(k.sideArc(x, y, PULLEY_R, PULLEY_Z - 2, P, 24), { tone: "lo" }));
  out.push(L(k.ring(x, y, 1.8, PULLEY_Z, P, 14), { tone: "mid" }));
  return `<g data-load="4">${out.join("")}</g>`;
}

function pulleyMark(turn) {
  const [x, y] = MOTOR;
  const a = turn * Math.PI * 2;
  return k.lineOnTop([x + Math.sin(a) * 2.4, y - Math.cos(a) * 2.4], [x + Math.sin(a) * (PULLEY_R - 1), y - Math.cos(a) * (PULLEY_R - 1)], PULLEY_Z, P);
}

/* ---------------- Assemble ---------------- */

const standing = [
  { key: depth(-80, BODY_Y + 14), svg: rail() },
  ...BREAKERS.map((b, i) => ({ key: depth(b.x + b.w / 2, BODY_Y + 14) + 0.001 * i, svg: breaker(i) })),
  { key: depth(NEUTRAL.x + 24, NEUTRAL.y + 3), svg: bar(NEUTRAL, "neutral") },
  { key: depth(EARTH.x + 24, EARTH.y + 3), svg: bar(EARTH, "earth") },
  { key: depth(METER[0], METER[1]), svg: meter() + `<path data-part="needle" class="iso-line db-needle" data-tone="lit" data-free="start" d="${needleAt(0)}"/>` },
  { key: depth(LAMP[0], LAMP[1]), svg: lamp() },
  { key: depth(SOCKET.x + 15, SOCKET.y + 15), svg: socket() },
  { key: depth(HEATER.x + 28, HEATER.y + 13), svg: heater() },
  { key: depth(MOTOR[0], MOTOR[1]), svg: motor() + `<path data-part="pulley" class="iso-line" data-tone="mid" data-free="start" d="${pulleyMark(0)}"/>` },
].sort((a, b) => a.key - b.key);

const body = [board(), wires(), ...standing.map((item) => item.svg)].join("");

const label =
  "A lab wiring trainer board. A two-pole main isolator and four miniature circuit breakers sit on a DIN rail beside a neutral bar and an earth bar. Cables run from the breakers to a lamp, a socket, a heating element and a small induction motor, and a moving-coil ammeter reads the total line current.";

const svg = k.figureSvg({ width: WIDTH, height: HEIGHT, label, body, className: "db-svg" });

/* ---------------- Emit ---------------- */

const live = {
  P,
  METER,
  METER_R,
  METER_TOP,
  FULL_SCALE,
  ARC_FROM,
  ARC_SPAN,
  MOTOR,
  PULLEY_R,
  PULLEY_Z,
  LEVER_THROW,
};

const banner = "// Generated by scripts/figures/db-board.mjs — do not edit by hand.\n";
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(
  OUT,
  `${banner}/* eslint-disable */\nexport const DB_SVG = ${JSON.stringify(svg)};\n\nexport const DB_VIEW = ${JSON.stringify(live)} as const;\n\nexport const DB_BREAKERS = ${JSON.stringify(BREAKERS.map(({ name, rating }) => ({ name, rating })))} as const;\n`,
);
console.log("wrote", OUT, `(${(svg.length / 1024).toFixed(1)} kB)`);

if (process.argv.includes("--page")) {
  const page = k.pageHtml({
    title: "Distribution trainer board",
    theme: process.argv.includes("--dark") ? "dark" : "light",
    body: k.plateHtml({ fig: "Fig 01", title: "Distribution board", hint: "Click a breaker", readout: "0.0 A", body: `<div class="iso-stage">${svg}</div>` }),
  });
  const pageOut = join(HERE, "db-board.preview.html");
  writeFileSync(pageOut, page);
  console.log("wrote", pageOut);
}
