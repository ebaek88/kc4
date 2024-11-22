// ---------------- 1번 문제 --------------------------
const arr = [100, 200, 300, 400, 500, 600, 700];

// 1. for-in문을 사용하여 배열의 인덱스(키)를 출력하시오.
for (let key in arr) {
  console.log(key);
}
console.log("-----------------");
// 2. for-in문을 사용하여 배열의 원소(값)를 출력하시오. (of)
for (let key in arr) {
  console.log(arr[key]);
}
console.log("-----------------");

const obj = { name: "Kim", addr: "Yongsan", level: 1, role: 9, receive: false };

// 3. for-in문을 사용하여 프로퍼티 이름(키)을 출력하시오.
for (let key in obj) {
  console.log(key);
}
console.log("-----------------");
// 4. for-in문을 사용하여 프로퍼티 값을 출력하시오.
for (let key in obj) {
  console.log(obj[key]);
}
console.log("-----------------");
// 5. for-of문을 사용하여 프로퍼티 값을 출력하시오.
for (let value of Object.values(obj)) {
  console.log(value);
}
console.log("-----------------");
// 6. level 프로퍼티가 열거(entries)되지 않도록 설정하시오. (Object.defineProperty)
Object.defineProperty(obj, "level", { enumerable: false });
console.log(Object.getOwnPropertyDescriptor(obj, "level")); // level 프로퍼티는 더이상 열거되지 않음
console.log("-----------------");
// 7. role 프로퍼티는 읽기전용으로 설정하시오. (Object.defineProperty)
Object.defineProperty(obj, "role", { writable: false });
console.log(Object.getOwnPropertyDescriptor(obj, "role")); // role 프로퍼티는 더이상 수정될 수 없음

// -----------------------2번 문제---------------------------------
// 1. [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]] 배열을 객체로 만드시오. (makeObjectFromArray)
// => { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }
const arr2 = [
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
const arrToObj = makeObjectFromArray(arr2);
console.log("result:", arrToObj);

// 2. 위에서 만든 객체를 다시 배열로 만드시오. (makeArrayFromObject)

// { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }
// => [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]]

function makeArrayFromObject(obj) {
  let result = [];
  for (let [key, value] of Object.entries(obj)) {
    let elem = [key, value];
    result.push(elem);
  }

  return result;
}
const objToArr = makeArrayFromObject(arrToObj);
console.log("result:", objToArr);

// ------------------------------3번 문제--------------------------------
// 원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 또는 spread(...) 연산자를  사용하지 말고 작성하시오.

// 1) shallow copy
function shallowCopy(obj) {
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    result[key] = obj[key];
  }
  return result;
}
const kim = { nid: 3, nm: "Kim", addr: "Pusan" };
const newKim1 = shallowCopy(kim);
newKim1.addr = "Daegu";
console.log(kim.addr !== newKim1.addr); // true면 통과!

console.log("-----------------");

// 2) 이하 deep copy
function deepCopy(obj) {
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] !== "object") {
      result[key] = obj[key];
    } else {
      result[key] = deepCopy(obj[key]);
    }
  }
  return result;
}
const kim2 = { nid: 3, nm: "Kim", addr: { city: "Pusan" } };
const newKim2 = deepCopy(kim2);
newKim2.addr.city = "Daegu";
console.log(kim2.addr.city !== newKim2.addr.city); // true면 통과!
