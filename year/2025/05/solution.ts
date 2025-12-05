type Range = [number, number];

// 0          100
// x1         y1
//     x2 y2

// 0          100
//     x1 y1
// x2         y2

// 0          100
//     x1          y1
// x2         y2

// 0          100
// x1         y1
//     x2          y2

function canJoinRanges([x1, y1]: Range, [x2, y2]: Range): boolean {
  if (x1 <= x2 && y2 <= y1 && x1 < y2 && x2 < y1) return true;
  if (x2 <= x1 && y1 <= y2 && x2 < y1 && x1 < y2) return true;
  if (x2 <= x1 && y2 <= y1 && x1 <= y2 && x2 < y1) return true;
  if (x1 <= x2 && y1 <= y2 && x2 <= y1 && x1 < y2) return true;

  return false;
}

function joinRanges([x1, y1]: Range, [x2, y2]: Range): Range {
  return [Math.min(x1, x2), Math.max(y1, y2)];
}

export function solve(input: string) {
  const [rangesText, ingredientsText] = input.split("\n\n") as [string, string];
  const ranges = rangesText
    .split("\n")
    .map(
      (it) => it.split("-").map((num) => Number.parseInt(num)) as Range | null
    );

  const ingredients = ingredientsText
    .split("\n")
    .filter(Boolean)
    .map((it) => Number.parseInt(it));

  let count1 = 0;

  ingredientCheck: for (const ingredient of ingredients) {
    for (const range of ranges) {
      const [x, y] = range ?? [0, 0];
      if (x <= ingredient && ingredient <= y) {
        count1++;
        continue ingredientCheck;
      }
    }
  }

  for (let i = 0; i < ranges.length; i++) {
    for (let j = 0; j < ranges.length; j++) {
      const first = ranges[i];
      const second = ranges[j];

      if (first && second && i !== j && canJoinRanges(first, second)) {
        ranges[i] = joinRanges(first, second);
        ranges[j] = null;
      }
    }
  }

  const count2 = ranges.reduce((count, range) => {
    if (range) {
      const [x, y] = range.sort();
      return count + (y - x) + 1;
    }
    return count;
  }, 0);

  return [count1, count2];
}
