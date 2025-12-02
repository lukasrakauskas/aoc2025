import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    day: {
      type: "string",
    },
    year: {
      type: "string",
      default: new Date().getFullYear().toString(),
    },
  },
  strict: true,
  allowPositionals: true,
});

const SESSION = Bun.env.SESSION;

if (!SESSION) {
  throw new Error("No session provided");
}

const day = Number.parseInt(values.day ?? "-1");
const year = Number.parseInt(values.year);

if (day < 1 || day > 12) throw new Error("Not valid day");

const paddedDay = day.toString().padStart(2, "0");

const { solve } = (await import(`./year/${year}/${paddedDay}/solution.ts`)) as {
  solve: (input: string) => [unknown, unknown];
};

const file = Bun.file(`./year/${year}/${paddedDay}/input.txt`);
let input = await file.text();

if (input.length === 0) {
  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        Cookie: `session=${SESSION}`,
        "User-Agent": "bun-fetch-aoc/1.0 (+https://github.com/lukasrakauskas)",
      },
    }
  );
  const data = await response.text();
  input = data;
  await Bun.write(file, data);
}

const start = performance.now();
const solution = solve(input).join("\n");
const end = performance.now();

const took = (end - start).toFixed(2);

console.log(
  `Solution of year ${year} and day ${paddedDay} is:\n\n${solution}\n\nSolved in ${took}ms`
);
