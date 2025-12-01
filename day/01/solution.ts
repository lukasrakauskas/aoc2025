const INITIAL = 50;

function process(current: number, command: string): [number, number] {
  const direction = command.substring(0, 1);
  const sign = direction === "L" ? -1 : 1;
  const number = Number.parseInt(command.substring(1), 10);

  current += number * sign;
  let count = 0;

  while (current < 0) {
    current += 100;
    count++;
  }

  while (current > 99) {
    current -= 100;
    count++;
  }

  return [current, count];
}

export function solve(input: string) {
  const lines = input.split("\n");

  let code = INITIAL;
  let count1 = 0;
  let count2 = 0;
  let partial;

  for (const line of lines) {
    if (code === 0) {
      count1++;
    }

    [code, partial] = process(code, line);
    count2 += partial;
  }

  return [count1, count2];
}
