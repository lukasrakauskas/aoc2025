export function solve(input: string) {
  const grid = input
    .split("\n")
    .filter(Boolean)
    .map((it) => it.split(""));

  const beamIndexes = new Set<number>();
  const timelineMap = new Map<number, number>(); // index, timeline count
  let splitCount = 0;

  function addTimeline(index: number, value = 1) {
    const count = timelineMap.get(index) ?? 0;
    timelineMap.set(index, count + value);
  }

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i]!;

    for (let j = 0; j < row.length; j++) {
      const cell = row[j]!;

      if (i === 0) {
        if (cell === "S") {
          beamIndexes.add(j);
          timelineMap.set(j, 1);
        }
      } else {
        if (cell === "." && beamIndexes.has(j)) {
          grid[i]![j] = "|";
        }
        if (cell === "^" && beamIndexes.has(j)) {
          beamIndexes.delete(j);
          splitCount++;
          const currentTimelines = timelineMap.get(j) ?? 0;
          timelineMap.delete(j);

          if (j - 1 >= 0) {
            beamIndexes.add(j - 1);
            addTimeline(j - 1, currentTimelines);
          }
          if (j + 1 < row.length) {
            beamIndexes.add(j + 1);
            addTimeline(j + 1, currentTimelines);
          }
        }
      }
    }
  }

  const timelineCount = timelineMap.values().reduce((a, b) => a + b, 0);

  return [splitCount, timelineCount];
}
