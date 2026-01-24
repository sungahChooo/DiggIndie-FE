
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function makeKey(y: number, m0: number, d: number) {
  return `${y}-${pad2(m0 + 1)}-${pad2(d)}`;
}

export function uniqSorted(dates: Iterable<string>) {
  return Array.from(new Set(dates)).sort();
}

export function parseKey(key: string) {
  const [yy, mm, dd] = key.split("-").map((v) => Number(v));
  return new Date(yy, mm - 1, dd);
}

export function makeKeyFromDate(dt: Date) {
  return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`;
}

export function buildInclusiveRangeKeys(aKey: string, bKey: string) {
  const a = parseKey(aKey);
  const b = parseKey(bKey);

  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);

  const forward = a.getTime() <= b.getTime();
  const start = forward ? a : b;
  const end = forward ? b : a;

  const keys: string[] = [];
  const cur = new Date(start);

  while (cur.getTime() <= end.getTime()) {
    keys.push(makeKeyFromDate(cur));
    cur.setDate(cur.getDate() + 1);
  }

  return keys;
}

export function addDaysKey(key: string, delta: number) {
  const dt = parseKey(key);
  dt.setHours(0, 0, 0, 0);
  dt.setDate(dt.getDate() + delta);
  return makeKeyFromDate(dt);
}