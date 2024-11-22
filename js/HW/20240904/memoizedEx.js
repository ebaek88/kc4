function memoized(fn) {
  // 범용 memoization function
  const memoizedTable = {}; // {3: 3 * 2, 2: 2 * 1, 1: 1}
  return function B(k) {
    return memoizedTable[k] || (memoizedTable[k] = fn(k));
  };
}

const memoizedFactorial = memoized(function A(n) {
  memoizedFactorialRunCnt += 1;
  if (n === 1) return 1;
  return n * memoizedFactorial(n - 1);
});
let memoizedFactorialRunCnt = 0;
console.log(memoizedFactorial(3)); // B(3) ⇒ 6
// console.log(memoizedFactorial(5));
console.log(`runCnt=${memoizedFactorialRunCnt}`);
