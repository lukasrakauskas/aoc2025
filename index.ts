import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    day: {
      type: "string",
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

if (day < 1 || day > 12) throw new Error("Not valid day");

const paddedDay = day.toString().padStart(2, "0");

const { solve } = (await import(`./day/${paddedDay}/solution.ts`)) as {
  solve: (input: string) => [unknown, unknown];
};

const file = Bun.file(`./day/${paddedDay}/input.txt`);
let input = await file.text();

if (input.length === 0) {
  const response = await fetch(
    `https://adventofcode.com/2025/day/${day}/input`,
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
const solution = solve(input).join(", ");
const time = performance.now() - start;

console.log(
  `Solution to day ${paddedDay} is ${solution} in ${time.toFixed(2)}ms`
);
