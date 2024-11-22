var assert = require("assert"); // 노드에서 제공하는 테스트 모듈...?
// 1. [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]] 배열을 객체로 만드시오. (makeObjectFromArray)
// => { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }
const arr = [
  ["A", 10, 20],
  ["B", 30, 40],
  ["C", 50, 60, 70],
];
function makeObjectFromArray(arr) {
  let result = {};
  for (let elem of arr) {
    for (let i = 0; i < elem.length; i += 1) {
      if (i == 0) {
        Object.defineProperty(result, elem[i], { value: [], enumerable: true });
      } else {
        result[elem[0]].push(elem[i]);
      }
    }
  }
  return result;
}

// function makeObjectFromArray2(arr) {
//   const result = Object.fromEntries(
//     arr.map(([key, ...values]) => [key, values])
//   );
//   return result;
// }
const arrToObj = makeObjectFromArray(arr);
console.log("result:", arrToObj);
assert.deepStrictEqual(
  arrToObj,
  { A: [10, 20], B: [30, 40], C: [50, 60, 70] },
  "arrToObj is not Equal !!"
);

// 2. 위에서 만든 객체를 다시 배열로 만드시오. (makeArrayFromObject)

// { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }
// => [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]]

function makeArrayFromObject(obj) {
  let result = [];
  for (let [key, value] of Object.entries(obj)) {
    let elem = [key, ...value]; // value는 배열이므로 spread 연산자로 펼져야 원하는 결과를 얻을 수 있다.
    result.push(elem);
  }

  return result;
}
const objToArr = makeArrayFromObject(arrToObj);
console.log("result:", objToArr);
