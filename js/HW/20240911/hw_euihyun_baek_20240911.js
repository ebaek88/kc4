const assert = require("assert");

const hasPrime = (arr) => {
  loop1: for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === 2) {
      return true;
    }

    if (arr[i] > 1) {
      for (let j = 2; j * j <= arr[i]; j += 1) {
        if (arr[i] % j === 0) {
          continue loop1;
        }
      }
      return true;
    }
  }
  return false;
};

const hasPrime2 = (arr) => arr.some((elem) => isPrime(elem));

const isPrime = (n) => {
  if (n <= 1) {
    return false;
  }
  return Array(n)
    .fill(1)
    .map((elem, idx) => (elem = idx + 1))
    .filter((elem) => elem > 1 && elem * elem <= n)
    .every((elem) => n % elem !== 0);
};
// const result = isPrime(4);
// console.log(result);

const primeNumbers = (arr) => arr.filter((elem) => isPrime(elem));

const arr100 = Array(100)
  .fill(1)
  .map((elem, idx) => (elem = idx + 1));
// console.log(arr100);
// const input = [1, 2, 3];
// const result = hasPrime(input);
// console.log(result);

assert.strictEqual(hasPrime([-1, 0, 4, 101]), true);
assert.strictEqual(hasPrime2([-1, 0, 4, 101]), true);
assert.deepStrictEqual(
  primeNumbers(arr100),
  [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ]
);
