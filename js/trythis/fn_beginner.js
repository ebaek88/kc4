function f(o) {
  o.message = "f에서 수정함"; // 함수 내부의 매개변수 o와 함수 바깥의 변수 o가 다르다. 그러나 여기까지는 둘이 같은 객체를 가리킨다.
  o = {
    message: "새로운 객체!",
  }; // 그러나 f 내부에서 o에 할당한 객체는 새로운, 전혀 다른 객체다. 여기부터 매개변수 o는 이 객체를 가리킨다.
  console.log(`f 내부: o.message="${o.message}" (할당 후)`);
}

let o = {
  message: "초기값",
};
console.log(`f를 호출하기 전: o.message="${o.message}"`); //f를 호출하기 전: o.message="초기값"
f(o); //f 내부: o.message="새로운 객체!" (할당 후)
console.log(`f를 호출한 다음: o.message="${o.message}"`); //f를 호출한 다음: o.message="f에서 수정함"
console.log("---------------");

// 자바스크립트는 매개변수가 함수의 차이를 나타내지는 않는다. 함수 f가 있다면 호출할 때 매개변수를 한 개 전달하든
// 열 개 전달하든 같은 함수를 호출하는 것이다. 정해진 매개변수에 값을 제공하지 않으면 임시적으로 undefined가 할당된다.
function f2(x) {
  return `in f2: x=${x}`;
}
console.log(f2()); //in f2: x=undefined
console.log("---------------");

// 매개변수에 스프레드 연산자 사용 예
function addPrefix(prefix, ...words) {
  // 나중에 더 좋은 방법을 배웁니다.
  const prefixedWords = [];
  for (let i = 0; i < words.length; i++) {
    prefixedWords[i] = prefix + words[i];
  }
  return prefixedWords;
}

console.log(addPrefix("con", "verse", "vex")); //[ 'converse', 'convex' ]
console.log("---------------");

const o1 = {
  name: "Wallace",
  speak() {
    return `My name is ${this.name}!`;
  },
};
// this가 o1에 묶인 이유는 speak가 o1의 프로퍼티여서가 아니라, o1에서 speak을 호출했기 때문이다.
console.log(o1.speak()); //My name is Wallace!
const speak = o1.speak;
console.log(speak === o.speak); //true
console.log(speak()); //My name is undefined!

const o2 = {
  name: "Julie",
  greetBackwards: function () {
    const self = this;
    function getReverseName() {
      let nameBackwards = "";
      for (let i = self.name.length - 1; i >= 0; i--) {
        // instead of this.name.length which refers to globalThis when self is nonexistent
        nameBackwards += self.name[i]; // instead of this.name[i] which refers to globalThis when self is nonexistent
      }
      return nameBackwards;
    }
    return `${getReverseName()} si eman ym ,olleH`;
  },
};
console.log(o2.greetBackwards()); //(self 지정을 안한다면)TypeError: Cannot read properties of undefined (reading 'length')
// o2.greetBackwards(); 가 실행될때 this는 객체 o2를 가리키지만
// 메소드 안에서 중첩 함수로 함수가 작성되었을 때 내부 함수의 this는 전역 객체를 가리킨다.
// 따라서 이를 방지하기 위해 다른 변수에(여기서는 self) this를 할당한다.
// 또는 화살표 함수를 써도 이 문제를 해결할 수 있다.
// 더 모던한 방법이 있는데, 이것은 본꿰 강의 참고 (2024.09.09 강의)

// 화살표 함수 사용하여 해결
const o3 = {
  name: "Julie",
  greetBackwards: function () {
    const getReverseName = () => {
      let nameBackwards = "";
      for (let i = this.name.length - 1; i >= 0; i--) {
        // instead of this.name.length which refers to globalThis when the function is defined by the form function(){}
        nameBackwards += this.name[i]; // instead of this.name[i] which refers to globalThis when the function is defined by the form function(){}
      }
      return nameBackwards;
    };
    return `${getReverseName()} si eman ym ,olleH`;
  },
};
console.log(o3.greetBackwards());
console.log("---------------");

const bruce = { name: "Bruce" };
const madeline = { name: "Madeline" };

// 이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용합니다.
function greet() {
  return `Hello, I'm ${this.name}!`;
}
// 함수를 호출하면서 call을 사용하고 this로 사용할 객체를 넘기면 해당 함수가 주어진 객체의 메서드인 것처럼 사용할 수 있다.
console.log(greet()); //"Hello, I'm undefined!" - this는 어디에도 묶이지 않았습니다.
console.log(greet.call(bruce)); //"Hello, I'm Bruce!" - this는 bruce입니다.
console.log(greet.call(madeline)); //"Hello, I'm Madeline!" - this는 madeline입니다.
// call의 첫 번째 매개변수는 this로 사용할 값이고, 매개변수가 더 있으면 그 매개변수는 호출하는 함수로 전달된다.
function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}

update.call(bruce, 1949, "singer");
// bruce는 이제 { name: "Bruce", birthYear: 1949, occupation: "singer" } 입니다.
update.call(madeline, 1942, "actress");
// madeline는 이제 { name: "Madeline", birthYear: 1942, occupation: "actress" } 입니다.
// apply는 call과 거의 동일하지만 매개변수를 배열로 받는 차이만 있다.
update.apply(bruce, [1944, "actor"]);
update.apply(madeline, [1918, "writer"]);
const arr = [2, 3, -5, 15, 7];
// Math.min, Math.max의 this값에 null을 쓴 이유는 Math.min과 Math.max가 this와 관계없이 동작하기 때문이다.
// 즉, 무엇을 넘기든 관계없다.
Math.min.apply(null, arr); //-5
Math.max.apply(null, arr); //15
// 또한 스프레드 연산자를 사용해도 apply와 같은 결과를 얻을 수 있다.
const newBruce = [1940, "martial artist"];
update.call(bruce, ...newBruce); // apply(bruce, newBruce)와 같습니다.
Math.min(...arr); //-5
Math.max(...arr); //15
// bind를 사용하면 함수의 this값을 영구히 바꿀 수 있다.
const updateBruce = update.bind(bruce);
updateBruce(1904, "actor");
// bruce는 이제 { name: "Bruce", birthYear: 1904, occupation: "actor" } 입니다.
updateBruce.call(madeline, 1274, "king");
// bruce는 이제 { name: "Bruce", birthYear: 1274, occupation: "king" } 입니다.
// madeline은 변하지 않습니다.
// bind에 매개변수를 넘기면 항상 그 매개변수를 받으면서 호출되는 새 함수를 만드는 효과가 있다.
const updateBruce1949 = update.bind(bruce, 1949);
updateBruce1949("singer, songwriter");
// bruce는 이제 { name: "Bruce", birthYear: 1949, occupation: "singer, songwriter" } 입니다.
console.log(bruce);
