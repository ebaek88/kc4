let a = 1,
  b = 2;
let c = (a++, b++);
let d = (a--, b + a);
console.log(a, b, c, d);

const T = true,
  F = false;
let x = 1;
console.log(T || x++, T && x++, x); //true, true, 2 -> T || x++ 에서 T가 true이므로 short-circuit 발생
console.log(T && x++, F && x++, x);
