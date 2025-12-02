function isSequence(id: string) {
  if (id.length === 1) {
    return false;
  }

  const chars = id.split("");

  for (let index = 0; index < chars.length / 2 + 1; index++) {
    const part = id.substring(0, index);

    if (id.replaceAll(part, "").length === 0) {
      return true;
    }
  }

  return false;
}

export function solve(input: string) {
  const ranges = input.replace("\n", "").split(",");
  const pairs = ranges.map((it) =>
    it.split("-").map((it) => Number.parseInt(it))
  ) as [[number, number]];

  let sum1 = 0;
  let sum2 = 0;

  for (const pair of pairs) {
    for (let i = pair[0]; i <= pair[1]; i++) {
      const id = i.toString();

      if (isSequence(id)) {
        console.log(id);
        sum2 += i;
      }

      if (id.length % 2 !== 0) {
        continue;
      }

      const first = id.substring(0, id.length / 2);
      const second = id.substring(id.length / 2);

      if (first === second) {
        sum1 += i;
      }
    }
  }

  return [sum1, sum2];
}
