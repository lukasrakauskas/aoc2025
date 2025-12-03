function findMaxSum(bank: number[]) {
  let maxIndex = 0;
  let firstMax = 0;

  for (let i = 0; i < bank.length - 1; i++) {
    const number = bank[i];

    if (number && firstMax < number) {
      maxIndex = i;
      firstMax = number;
    }
  }

  let secondMax = 0;

  for (let i = maxIndex + 1; i < bank.length; i++) {
    const number = bank[i];
    if (number && secondMax < number) {
      secondMax = number;
    }
  }

  return firstMax * 10 + secondMax;
}

function remove(array: number[], index: number) {
  if (index < 0 || index > array.length - 1) {
    return array;
  }

  for (let i = index; i < array.length; i++) {
    array[i] = array[i + 1] as number;
  }

  array.length--;

  return array;
}

function maxByRemoveUntilTwelve(bank: number[]) {
  let i = 0;

  while (bank.length > 12) {
    const current = bank[i];
    const next = bank[i + 1];

    if (current && next && current < next) {
      bank = remove(bank, i);
      i--;
    } else if (current && next == null) {
      bank = remove(bank, i);
      i--;
    } else {
      i++;
    }
  }

  return Number.parseInt(bank.join(""));
}

export function solve(input: string) {
  const lines = input.split("\n").filter(Boolean);
  const banks = lines.map((it) =>
    it.split("").map((num) => Number.parseInt(num))
  );

  let sum1 = 0;
  let sum2 = 0;

  for (const bank of banks) {
    sum1 += findMaxSum(bank);
    sum2 += maxByRemoveUntilTwelve(bank);
  }

  return [sum1, sum2];
}
