// Minimal stubs for "three/tsl" so Rollup can resolve named exports some
// Three/Globe code paths reference. These are compile-time placeholders.

const passthrough = (x) => x;
const fn = (x) => x;

// Control/flow-ish helpers seen in imports
export const Fn = fn;
export const If = (_cond, thenVal, elseVal) => (thenVal ?? elseVal ?? null);
export const Loop = (..._args) => {};

// Node/value helpers
export const uniform = passthrough;
export const storage = passthrough;
export const float = (v = 0) => v;
export const instanceIndex = () => 0;

// Math-like nodes (simple JS fallbacks)
export const sqrt = Math.sqrt;
export const sin = Math.sin;
export const cos = Math.cos;
export const asin = Math.asin;
export const exp = Math.exp;
export const negate = (v) => -v;

// Allow wildcard/default imports
export default {};
