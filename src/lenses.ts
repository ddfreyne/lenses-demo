// T: top-level object
// F: focused property of top-level object
export interface Lens<T, F> {
  get: (t: T) => F;
  set: (t: T, f: F) => T;
}

// -----------------------------------------------------------------------------
// private utility functions

const indexes = (len: number): number[] =>
  Array(len)
    .fill(null)
    .map((_, i) => i);

const removeAtBasic = <E extends any>(es: E[], i: number) => [
  ...es.slice(0, i),
  ...es.slice(i + 1)
];

// -----------------------------------------------------------------------------
// lens helper functions

export const compose = <T, S, F>(
  ts: Lens<T, S>,
  sf: Lens<S, F>
): Lens<T, F> => ({
  get: (t) => sf.get(ts.get(t)),
  set: (t, f) => ts.set(t, sf.set(ts.get(t), f))
});

// NOTE: Why the double function invocation?
//
// When creating a lens using `forProp`, we need to specify the top type
// (`Person`, in this case). If `forProp` only had a single function
// invocation, we’d have to specify both the top type as well as the focus
// type (`string` in this case) -- TypeScript doesn’t (yet) support partial
// type inference, but we can work around it by having two function
// invocations.
//
// See TypeScript issue #26242 for details:
// https://github.com/microsoft/TypeScript/issues/26242).
export const forProp = <T extends object>() => <P extends keyof T>(
  prop: P
): Lens<T, T[P]> => ({
  get: (t) => t[prop],
  set: (t, f) => ({ ...t, [prop]: f })
});

export const forIndex = <T extends any>(i: number): Lens<T[], T> => ({
  get: (t) => t[i],
  set: (t, f) => Object.assign([], t, { [i]: f })
});

export const makeArray = <T extends any, F>(lens: Lens<T, F[]>, len: number) =>
  indexes(len)
    .map((i) => forIndex<F>(i))
    .map((l) => compose(lens, l));

export const over = <T, F>(t: T, l: Lens<T, F>, fn: (f: F) => F): T =>
  l.set(t, fn(l.get(t)));

export const push = <T, F>(t: T, l: Lens<T, F[]>, f: F): T =>
  over(t, l, (fs) => [...fs, f]);

export const removeAt = <T, F>(t: T, l: Lens<T, F[]>, idx: number): T =>
  over(t, l, (fs) => removeAtBasic(fs, idx));
