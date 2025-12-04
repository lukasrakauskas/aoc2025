function findNeighbours(grid: string[][], x: number, y: number) {
  const neighbours = [];

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i == 0 && j == 0) {
        continue;
      }

      const neighbour = grid[x + i]?.[y + j];

      if (neighbour) {
        neighbours.push(neighbour);
      }
    }
  }

  return neighbours;
}

function getRollCount(list: string[]) {
  return list.filter((it) => it === "@").length;
}

function getAvailableRolls(grid: string[][]) {
  let positions = new Set<string>();

  for (let x = 0; x < grid.length; x++) {
    const line = grid[x];
    if (!line) continue;

    for (let y = 0; y < line.length; y++) {
      const cell = line[y];

      if (cell !== "@") {
        continue;
      }

      const neighbours = findNeighbours(grid, x, y);
      const rollCount = getRollCount(neighbours);

      if (rollCount < 4) {
        positions.add(`${x},${y}`);
      }
    }
  }

  return positions;
}

function removeRolls(grid: string[][], positions: Set<string>) {
  const coords = Array.from(positions).map((it) => {
    const [x, y] = it.split(",").map((num) => Number.parseInt(num)) as [
      number,
      number
    ];

    return { x, y };
  });

  for (const { x, y } of coords) {
    const line = grid[x];
    if (line) {
      line[y] = ".";
    }
  }
}

export function solve(input: string) {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));

  let totalRemoved = 0;
  let firstPositions = getAvailableRolls(grid);
  removeRolls(grid, firstPositions);
  totalRemoved += firstPositions.size;

  let positions;
  while ((positions = getAvailableRolls(grid)).size > 0) {
    removeRolls(grid, positions);
    totalRemoved += positions.size;
  }

  return [firstPositions.size, totalRemoved];
}
