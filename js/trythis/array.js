const arr = [
  { name: "Suzanne" },
  { name: "Jim" },
  { name: "Trevor" },
  { name: "Amanda" },
];
arr.sort(); // arr은 바뀌지 않았습니다
console.log(arr);
arr.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA > nameB) {
    return 1;
  }
  if (nameA < nameB) {
    return -1;
  }

  return 0;
}); // arr은 name 프로퍼티의 알파벳 순으로 정렬됩니다.
console.log(arr);
arr.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA[1] < nameB[1]) {
    return 1;
  }
  if (nameA[1] > nameB[1]) {
    return -1;
  }

  return 0;
}); // arr은 name 프로퍼티의 두 번째 글자의 알파벳 역순으로 정렬됩니다.
console.log(arr);
console.log("-------------------");
const arr2 = [
  { name: "banana" },
  { name: "watermelon" },
  { name: "cherry" },
  { name: "kumon" },
  { name: "king" },
  { name: "apple" },
  { name: "grapefruit" },
];
console.log("Before sorting: ", arr2);
arr2.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA[0] === "K" && nameB[0] === "K") {
    return;
  }

  if (nameA > nameB) {
    return 1;
  }
  if (nameA < nameB) {
    return -1;
  }

  return 0;
}); // This sorts by names alphabetically, except those that start with k.
// Therefore, the words that start with k maintain the original order.
console.log("After sorting:", arr2);
console.log("----------------");

const o = { name: "Jerry" };
const arr3 = [1, 5, "a", o, true, 5, [1, 2], "9"];
console.log(arr3.indexOf(5)); //1
console.log(arr3.lastIndexOf(5)); //5
console.log(arr3.indexOf("a")); //2
console.log(arr3.lastIndexOf("a")); //2
console.log(arr3.indexOf({ name: "Jerry" })); //-1
console.log(arr3.indexOf(o)); //3
console.log(arr3.indexOf([1, 2])); //-1
console.log(arr3.indexOf("9")); //7
console.log(arr3.indexOf(9)); //-1

console.log(arr3.indexOf("a", 5)); //-1
console.log(arr3.indexOf(5, 5)); //5
console.log(arr3.lastIndexOf(5, 4)); //1
console.log(arr3.lastIndexOf(true, 3)); //-1
console.log("------------------");
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 5, // length가 3이므로 indexOf()에서 무시됩니다.
};
console.log(Array.prototype.indexOf.call(arrayLike, 2));
// 0
console.log(Array.prototype.indexOf.call(arrayLike, 5));
// -1
console.log("------------------");
const arr4 = [
  { id: 5, name: "Judith" },
  { id: 7, name: "Francis" },
];
console.log(arr4.findIndex((o) => o.id === 5)); //0
console.log(arr4.findIndex((o) => o.name === "Francis")); //1
console.log(arr4.findIndex((o) => o === 3)); //-1
console.log(arr4.findIndex((o) => o.id === 17)); //-1
console.log(arr4.find((o) => o.id === 5)); // { id: 5, name: "Judith" }
console.log(arr4.find((o) => o.id === 2)); // undefined
const arr5 = [1, 17, 16, 5, 4, 16, 10, 3, 49];
// Finds an integer in arr5 whose index is greater than 2 and is a squared integer.
console.log(arr5.find((x, i) => i > 2 && Number.isInteger(Math.sqrt(x)))); //4
console.log("------------------");
// find와 findIndex 그리고 some, every에 전달하는 함수의 this도 수정할 수 있습니다. 이를 이용해서 콜백 함수가 객체의 메서드인 것처럼 호출할 수 있습니다.
class Person {
  constructor(name) {
    this.name = name;
    this.id = Person.nextId++;
  }
}
Person.nextId = 0;
const jamie = new Person("Jamie"),
  juliet = new Person("Juliet"),
  peter = new Person("Peter"),
  jay = new Person("Jay");
const arr6 = [jamie, juliet, peter, jay];

// option 1: comparing the IDs directly
console.log(arr6.find((p) => p.id === juliet.id)); // Person { name: 'Juliet', id: 1 }
// option 2: using thisArg
console.log(
  arr6.find(function (p) {
    return p.id === this.id;
  }, juliet)
); // Person { name: 'Juliet', id: 1 }
console.log("------------------");
const cart = [
  { name: "Widget", price: 9.95 },
  { name: "Gadget", price: 22.95 },
];
const names = cart.map((x) => x.name);
console.log(names); //["Widget", "Gadget"]
const prices = cart.map((x) => x.price);
console.log(prices); //[9.95, 22.95]
const discountPrices = prices.map((x) => x * 0.8);
console.log(discountPrices); //[7.96, 18.36]
const cart2 = names.map((x, i) => ({ name: x, price: prices[i] })); // 객체를 괄호로 감싼 이유는, 이렇게 하지 않으면
// 화살표 표기법에서 객체 리터럴의 중괄호를 블록으로 판단하기 때문입니다.
console.log(cart2);
//[ { name: "Widget", price: 9.95 }, { name: "Gadget", price: 22.95 } ]
console.log("------------------");
const cards = [];
for (let suit of ["H", "C", "D", "S"]) {
  // heart, clover, diamond, spade
  for (let value = 1; value <= 13; value += 1) {
    cards.push({ suit, value });
  }
}
// value가 2인 카드
console.log(cards.filter((c) => c.value === 2));
// [
//   { suit: 'H', value: 2 },
//   { suit: 'C', value: 2 },
//   { suit: 'D', value: 2 },
//   { suit: 'S', value: 2 }
// ]
console.log(cards.filter((c) => c.value > 10 && c.suit === "H"));
// [
//   { suit: 'H', value: 11 },
//   { suit: 'H', value: 12 },
//   { suit: 'H', value: 13 }
// ]
function cardToString(c) {
  const suits = { H: "\u2665", C: "\u2663", D: "\u2666", S: "\u2660" };
  const values = { 1: "A", 11: "J", 12: "Q", 13: "K" };
  for (let i = 2; i <= 10; i = i + 1) values[i] = i;
  return values[c.value] + suits[c.suit];
}

// value가 2인 카드
console.log(cards.filter((c) => c.value === 2).map(cardToString)); //[ '2♥', '2♣', '2♦', '2♠' ]
// 하트의 킹, 퀸, 주니어
console.log(
  cards.filter((c) => c.value > 10 && c.suit === "H").map(cardToString)
); //[ 'J♥', 'Q♥', 'K♥' ]
console.log("------------------");
const arr7 = [5, 7, 2, 4];
const sum = arr7.reduce((a, x) => (a += x), 0);
console.log(sum); //18
// 누적값이 undefined로 시작한다면 reduce는 첫 번째 배열 요소를 초깃값으로 보고
// 두 번째 요소에서부터 함수를 호출합니다.
const sum2 = arr7.reduce((a, x) => (a += x)); // 앞 예제와 달리 초깃값이 생략됨.
console.log(sum2); //18
console.log();
const words = [
  "Beachball",
  "Rodeo",
  "Angel",
  "Aardvark",
  "Xylophone",
  "November",
  "Chocolate",
  "Papaya",
  "Uniform",
  "Joker",
  "Clover",
  "Bali",
];
const alphabetical = words.reduce((a, x) => {
  if (!a[x[0]]) a[x[0]] = []; // 객체에 x의 첫 번째 글자를 key로 갖는 프로퍼티가 없다면 빈 배열을 value로 갖는 그러한 프로퍼티를 생성.
  a[x[0]].push(x); // 객체에 x의 첫 번째 글자를 key로 갖는 프로퍼티가 있다면 그 배열에 x를 추가함.
  return a;
}, {});
console.log(alphabetical);
// {
//   B: [ 'Beachball', 'Bali' ],
//   R: [ 'Rodeo' ],
//   A: [ 'Angel', 'Aardvark' ],
//   X: [ 'Xylophone' ],
//   N: [ 'November' ],
//   C: [ 'Chocolate', 'Clover' ],
//   P: [ 'Papaya' ],
//   U: [ 'Uniform' ],
//   J: [ 'Joker' ]
// }
console.log();
const data = [3.3, 5, 7.2, 12, 4, 6, 10.3];
// Donald Knuth's algorithm to calculate standard deviation
const stats = data.reduce(
  (a, x) => {
    a.N++;
    let delta = x - a.mean;
    a.mean += delta / a.N;
    a.M2 += delta * (x - a.mean);
    return a;
  },
  { N: 0, mean: 0, M2: 0 }
);
if (stats.N > 2) {
  stats.variance = stats.M2 / (stats.N - 1);
  stats.stdev = Math.sqrt(stats.variance);
  console.log("variance:", stats.variance, "standard deviation:", stats.stdev);
}
console.log();
const longwords = words
  .reduce((a, w) => (w.length > 6 ? a + " " + w : a), "")
  .trim(); // trim() 을 해야 longwords의 맨 첫 글자가 빈 칸이 들어오는 것을 막을 수 있다.
console.log(longwords); //Beachball Aardvark Xylophone November Chocolate Uniform
console.log();
// map, filter, reduce는 삭제되거나 정의되지 않은 요소들에서 콜백 함수가 호출되지 않습니다.
const arr8 = Array(10).map(function (x) {
  return 5;
});
console.log(arr8); //[ <10 empty items> ]
const arr9 = [1, 2, 3, 4, 5];
delete arr9[2];
console.log(arr9.map((x) => 0)); //[ 0, 0, <1 empty item>, 0, 0 ]
console.log("------------------");
const arr10 = [1, null, "hello", "world", true, undefined];
delete arr10[3];
// join()의 매개변수가 생략됐을 때의 기본값은 쉼표다. 즉, 구분자의 기본값이 쉼표가 된다.
// 문자열 요소를 합칠 때 정의되지 않은 요소, 삭제된 요소, null, undefined는 모두 빈 문자열로 취급됩니다.
console.log(arr10.join()); //1,,hello,,true,
console.log(arr10.join("")); //1hellotrue
console.log(arr10.join(" -- ")); //1 --  -- hello --  -- true --
console.log();
const attributes = ["Nimble", "Perceptive", "Generous"];
const html = "<ul><li>" + attributes.join("</li><li>") + "</li></ul>";
console.log(html); //<ul><li>Nimble</li><li>Perceptive</li><li>Generous</li></ul>
console.log("------------------");
