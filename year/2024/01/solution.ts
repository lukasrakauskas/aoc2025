export function solve(input: string) {
  const lines = input.split("\n").filter(Boolean);

  const a = [];
  const b = [];
  const bMap: Record<number, number> = {};

  let distance = 0;
  let similarity = 0;

  for (const line of lines) {
    const [x, y] = line
      .split(" ")
      .filter(Boolean)
      .map((it) => Number.parseInt(it)) as [number, number];

    a.push(x);
    b.push(y);

    bMap[y] ??= 0;
    bMap[y] += 1;
  }

  a.sort();
  b.sort();

  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];

    if (x != null && y != null) {
      distance += Math.abs(x - y);
    }

    if (x != null) {
      const times = bMap?.[x] ?? 0;
      similarity += x * times;
    }
  }

  return [distance, similarity];
}
