let x = 2;
const r1 = x++ + x++; //5 -> same as ((x++) + (x++)) <=> (2 + (x++)) <=> (2 + 3) = 5
const r2 = ++x + ++x; //11 -> same as ((++x) + (++x)) <=> (5 + (++x)) <=> (5 + 6) = 11
const r3 = x++ + ++x; //14 -> same as ((x++) + (++x)) <=> (6 + (++x)) <=> (6 + 8) = 14
const r4 = ++x + x++; //18
console.log("r1=", r1);
console.log("r2=", r2);
console.log("r3=", r3);
console.log("r4=", r4);
console.log("----------------");
let y = 10;
const r5 = y-- + y--; //19
const r6 = --y + --y; //13
const r7 = y-- + --y; //10
const r8 = --y + y--; //6
console.log("r5=", r5);
console.log("r6=", r6);
console.log("r7=", r7);
console.log("r8=", r8);
console.log("----------------");
let aa = 3,
  bb;
aa += bb = (6 * 5) / 2;
// a += b = 15
// a += (b = 15)
// a += 15
// 18
console.log(aa);
let n = 0;
console.log("----------------");
while (true) {
  // this happens because all of the numbers in JS are double numbers.
  n += 0.1;
  // if (n === 0.3) break; // never true because n === 0.30000000000000004
  if (Math.abs(n - 0.3) < Number.EPSILON) break;
}
console.log(`Stopped at ${n}`);
console.log("----------------");
console.log(3 + 5 + "8"); //"88"
console.log("3" + 5 + 8); //"358"
console.log("----------------");
// truthy and falsy values
// Falsy values are all of the following :
// undefined
// null
// false
// 0
// NaN
// '' (empty string)

// The rest are all truthy values. Be aware, especially:
// - all the objects, including the ones that return false when valueOf() is called, are truthy
// - all the arrays, including the empty array ([]) (However, [] == false is true.)
// - Strings with spaces (e.g. " ")
// - The string "false"

// When operands that are not boolean type are used in && and || (T: truthy, F: falsy)
// x | y | x && y
// F | F |   x (falsy value)
// F | T |   x (falsy value)
// T | F |   y (falsy value)
// T | T |   y (truthy value)

// x | y | x || y
// F | F |   y (falsy value)
// F | T |   y (truthy value)
// T | F |   x (truthy value)
// T | T |   x (truthy value)
// However, when the operands are used with !(NOT) operator, it always returns true or false instead of truthy or falsy values.
const doIt = true;
let val = 0;
const result = doIt && val++; //0 instead of false. If doIt = false, result = false because val++ is not evaluated due to short-circuit.
console.log(result);
console.log("----------------");

// This pattern is very frequently used.
// Even an empty object is provided, it is truthy.
// Therefore, when suppliedOptions is an object, options refers to suppliedOptions.
// If suppliedOptions is null or undefined, options refers to the default object.
const suppliedOptions = null;
const options = suppliedOptions || { name: "Default" };
console.log(options);
console.log("----------------");

// when two expressions are linked by , the result of the latter is returned.
let xx = 0,
  yy = 10,
  zz;
zz = (xx++, yy++); //10 --> Since , has the lowest priority, () are used.
console.log(zz);
console.log("----------------");
const FLAG_EXECUTE = 1; //0b001
const FLAG_WRITE = 2; //0b010
const FLAG_READ = 4; //0b100
let p = FLAG_READ | FLAG_WRITE; //0b110
let hasWrite = p & FLAG_WRITE; //0b010 - 참 같은 값
let hasExecute = p & FLAG_EXECUTE; //0b000 - 거짓 같은 값
p = p ^ FLAG_WRITE; //0b100 -- 쓰기 플래그 토글 (이제 쓰기 권한이 없습니다)
p = p ^ FLAG_WRITE; //0b110 -- 쓰기 플래그 토글 (쓰기 권한이 다시 생겼습니다)

// 표현식 하나로 여러 플래그를 동시에 판단할 수 있다.
const hasReadOrExecute = p & (FLAG_READ | FLAG_EXECUTE);
// const hasReadAndExecute = p & (FLAG_READ | FLAG_EXECUTE) === FLAG_READ | FLAG_EXECUTE;
console.log(hasReadOrExecute); //4 === 0b100
// console.log(hasReadAndExecute);
console.log("----------------");
const obj = { b: 2, c: 3, d: 4 };
const { a, b, c } = obj;
console.log("a:", a, "b:", b, "c:", c);
const arr = [1, 2, 3, 4, 5];
let [xxx, yyy, ...rest] = arr;
console.log("xxx:", xxx, "yyy:", yyy, "rest:", rest);
console.log("----------------");
// shorthand of the equivalent if statement
let options2 = options2 || {};
// equivalent to
// let options2;
// if(!options2) options2 = {};
