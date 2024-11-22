// 원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 또는 spread(...) 연산자를  사용하지 말고 작성하시오.
var assert = require("assert");
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
assert.notDeepStrictEqual(kim, newKim1);
assert.deepStrictEqual(newKim1, { ...newKim1 });

console.log("-----------------");

// 2) 이하 deep copy
function deepCopy(obj) {
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] !== "object" || obj[key] === null) {
      result[key] = obj[key];
    } else {
      result[key] = deepCopy(obj[key]);
    }
  }
  return result;
}
const kim2 = {
  nid: 3,
  nm: "Kim",
  addr: { city: "Pusan", addr: { city: "Daejeon" } },
};
const newKim2 = deepCopy(kim2);
assert.deepStrictEqual(newKim2, kim2);
newKim2.addr.addr.city = "Gwangju";
console.log(kim2.addr.addr.city !== newKim2.addr.addr.city); // true면 통과!
assert.notStrictEqual(newKim2.addr.addr.city, kim2.addr.addr.city);
assert.notDeepStrictEqual(newKim2, kim2);
