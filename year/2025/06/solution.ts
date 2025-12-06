export function solve(input: string) {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map((it) => it.split(" ").filter(Boolean));

  grid.reverse();

  const solutions: number[] = [];

  for (let i = 1; i < grid.length; i++) {
    const row = grid[i];
    if (!row) continue;

    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (!cell) continue;
      const value = Number.parseInt(cell);
      const action = grid[0]?.[j];
      if (!action) continue;

      solutions[j] ??= action === "+" ? 0 : 1;

      if (action === "+") {
        solutions[j] ??= 0;
        solutions[j]! += value;
      }

      if (action === "*") {
        solutions[j] ??= 1;
        solutions[j]! *= value;
      }
    }
  }

  const sum1 = solutions.reduce((a, b) => a + b, 0);

  const newgrid = input.split("\n").filter(Boolean);

  const rowLength = newgrid.length;
  const columnLength = newgrid[0]!.length;

  const list: { action?: "*" | "+"; numbers: number[] }[] = [];

  let index = 0;
  for (let i = 0; i < columnLength; i++) {
    let line = "";

    for (let j = 0; j < rowLength; j++) {
      const cell = newgrid[j]![i];
      line += cell;
    }

    const isEmpty = line.trim() === "";
    const isSum = line.endsWith("+");
    const isMultiply = line.endsWith("*");

    const value = Number.parseInt(line.substring(0, line.length - 1));

    if (isEmpty || Number.isNaN(value)) {
      index++;
      continue;
    }

    list[index] ??= { numbers: [] };
    list[index]!.numbers.push(value);

    if (isSum) list[index]!.action = "+";
    if (isMultiply) list[index]!.action = "*";
  }

  const sum2 = list.reduce((acc, curr) => {
    let value = curr.action === "+" ? 0 : 1;
    for (const num of curr.numbers) {
      if (curr.action === "+") {
        value += num;
      }
      if (curr.action === "*") {
        value *= num;
      }
    }

    return acc + value;
  }, 0);

  return [sum1, sum2];
}
