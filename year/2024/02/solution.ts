function isSafe(report: number[]) {
  let lastDiff = null;

  for (let i = 1; i < report.length; i++) {
    const previous = report[i - 1];
    const current = report[i];

    if (current && previous) {
      const diff = current - previous;

      if (diff === 0) {
        return false;
      }

      if (Math.abs(diff) > 3) {
        return false;
      }

      if (lastDiff && Math.sign(lastDiff) !== Math.sign(diff)) {
        return false;
      }

      lastDiff = diff;
    }
  }

  return true;
}

function dampen(report: number[]) {
  for (let i = 0; i < report.length; i++) {
    const newReport = [...report.slice(0, i), ...report.slice(i + 1)];
    if (isSafe(newReport)) {
      return true;
    }
  }

  return false;
}

export function solve(input: string) {
  const reports = input
    .split("\n")
    .filter(Boolean)
    .map((it) => it.split(" ").map((level) => Number.parseInt(level)));

  let count1 = 0;
  let count2 = 0;

  for (const report of reports) {
    if (isSafe(report)) {
      count1++;
      count2++;
    } else {
      if (dampen(report)) {
        count2++;
      }
    }
  }

  return [count1, count2];
}
