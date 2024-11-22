// 9.1 프로퍼티 나열
// 9.1.1 for...in
// 배열에는 사용하기 적절하지 않음
const SYM = Symbol();
const o1 = { a: 1, b: 2, c: 3, [SYM]: 4 };
for (let prop in o1) {
  // for...in 루프에는 키가 심볼인 프로퍼티는 포함되지 않습니다.
  // 이 조건문은 상속된 프로퍼티가 for...in에 나타날 위험을 제거하기 위해 사용합니다.
  // 특히 다른 사람이 만든 객체의 프로퍼티를 나열하다 보면 예상치 못한 상황이 생길 수 있으므로 hasOwnProperty를 쓰는 습관을 들이길 권합니다.
  if (!o1.hasOwnProperty(prop)) {
    continue;
  }
  console.log(`${prop}: ${o1[prop]}`);
}
console.log();
// 9.1.2 Object.keys: 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환합니다.
// for...in과 달리 hasOwnProperty를 체크할 필요는 없습니다. 따라서 객체의 프로퍼티의 키를 배열로 가져와야 할 때는 Object.keys가 편리합니다.
const o2 = { apple: 1, xochitl: 2, balloon: 3, guitar: 4, xylophone: 5 };
Object.keys(o2)
  .filter((prop) => prop.match(/^x/))
  .forEach((prop) => console.log(`${prop}: ${o2[prop]}`));
console.log("----------------");
// 9.2 객체지향 프로그래밍
// 9.2.1 클래스와 인스턴스 생성
// JS에서는 다른 객체지향 언어와 달리 객체의 프로퍼티에 대한 접근제어자가 없다
// 따라서 이를 극복하는 방법은 다음과 같다
// 1) 클래스 프로퍼티를 '살짝 바꾸고' getter와 setter 메소드에서만 접근 및 수정할 수 있도록 제한
class Car1 {
  constructor(make, model) {
    this.make = make;
    this.model = model;
    this._userGears = ["P", "N", "R", "D"]; // 프로퍼티명 앞에 _를 붙여 외부에서 예상한 프로퍼티명으로 접근하지 못하게 방지함
    this._userGear = this._userGears[0];
  }

  get userGear() {
    return this._userGear;
  }
  set userGear(value) {
    if (this._userGears.indexOf(value) < 0)
      throw new Error(`Invalid gear: ${value}`);
    this._userGear = value;
  }

  shift(gear) {
    this.userGear = gear;
  } // _userGear에 직접 접근하는 대신 this.userGear는 위에 설정한 set 메소드를 통해 간접 조작함
}

const car1 = new Car1("Hyundai", "Casper");
// car1.userGear = "X";  //Error: Invalid gear: X
// 그러나 어떻게 알아내서 car._userGear = "x"; 로 조작하면 막아낼 법이 없다.

// 2) WeakMap 인스턴스 사용
const car2 = (function () {
  const carProps = new WeakMap();

  class Car2 {
    constructor(make, model) {
      this.make = make;
      this.model = model;
      this._userGears = ["P", "N", "R", "D"];
      carProps.set(this, { userGear: this._userGears[0] });
    }

    get userGear() {
      return carProps.get(this).userGear;
    }
    set userGear(value) {
      if (this._userGears.indexOf(value) < 0)
        throw new Error(`Invalid gear: ${value}`);
      carProps.get(this).userGear = value;
    }

    shift(gear) {
      this.userGear = gear;
    }
  }

  return Car2;
})(); // IIFE를 사용하여 WeakMap을 클로저로 감싸고 바깥에서 접근할 수 없게 했습니다.
// WeakMap은 클래스 외부에서 접근하면 안되는 프로퍼티를 안전하게 저장합니다.
// 3) 프로퍼티 이름에 심볼을 쓰는 방법. 그러나 심볼 프로퍼티 역시 접근이 불가능한 것은 아니므로 이 방법도 한계는 있습니다.

// 9.2.2 클래스는 함수다
// 자바스크립트에서 클래스는 사실 함수일 뿐이다. ES5에서는 Car클래스를 다음과 같이 만들었다.
function Car3(make, model) {
  this.make = make;
  this.model = model;
  this._userGears = ["P", "N", "R", "D"];
  this._userGear = this._userGears[0];
}

class Es6Car {}
function Es5Car() {}
console.log(typeof Es6Car); //function -> 클래스 자체는 사실 함수라는 것을 알 수 있다.
console.log(typeof Es5Car); //function
console.log("--------------");

// 9.2.3 프로토타입(prototype)

// 주의: 프로토타입이 console.log로 찍힐때 브라우저에서와 노드에서의 결과가 다르다...? 가급적이면 브라우저에서 결과확인하자.

// 클래스의 인스턴스에서 사용할 수 있는 메서드라고 하면 그건 프로토타입 메서드를 말하는 겁니다.
// 프로토타입 메서드는 Car.prototype.shift 또는 Array.prototype.forEach 처럼 표기할 때가 많습니다.
// 최근에는 프로토타입 메서드를 #으로 표시하는 표기법도 널리 쓰입니다. Car.prototype.shift를 Car#shift로 쓰는것 처럼요.
// 모든 함수에는 prototype이라는 특별한 프로퍼티가 있습니다. [[prototype]] 내부 슬롯을 지칭하는듯.
// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는것이 원칙이나, [[prototype]]과 같은 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공한다 (__proto__).
// 또는 더 모던하게 Object.create(proto, [descriptors]), Object.getPrototypeOf(obj), Object.setPrototypeOf(obj, proto) 를 사용할 수 있다.

// new 키워드로 만든 새 객체는 생성자의 prototype 프로퍼티에 접근할 수 있습니다. 인스턴스는 생성자의 [[prototype]] 프로퍼티를 __proto__ 프로퍼티에 저장합니다.
// (일반 객체도 __proto__를 통해 [[prototype]]에 접근 가능한듯...?)
// 동적 디스패치(디스패치는 메서드 호출과 같은 의미): 객체의 프로퍼티나 메서드에 접근하려 할 때 그런 프로퍼티나 메서드가 존재하지 않으면
// 자바스크립트는 객체의 프로토타입에서 해당 프로퍼티나 메서드를 찾습니다.
// 클래스의 인스턴스는 모두 같은 프로토타입을 공유하므로 프로토타입에 프로퍼티나 메서드가 있다면 해당 클래스의 인스턴스는 모두 그 프로퍼티나 메서드에 접근할 수 있습니다.

// 인스턴스에서 메서드나 프로퍼티를 정의하면 프로토타입에 있는 것을 가리는 효과가 있습니다.
// 자바스크립트는 먼저 인스턴스를 체크하고 거기에 없으면 프로토타입을 체크하기 떄문입니다.

const car3 = new Car1();
const car4 = new Car1();
console.log(car3.shift === Car1.prototype.shift); //true
console.log(Object.getPrototypeOf(car3)); // Car1 프로토타입 객체를 출력(브라우저에서)
console.log(Object.getPrototypeOf(car3.__proto__)); // Object 프로토타입 객체를 출력(브라우저에서)
car3.shift("D"); // car3 객체에는 shift 메서드가 없지만(생성자 함수에 설정을 안해줬기 때문...?) car3의 프로토타입에서 그런 이름의 메서드가 존재하므로 사용 가능
// car3.shift("d");  //error
console.log(car3.userGear); //'D'
console.log(car3.shift === car4.shift); //true

car3.shift = function (gear) {
  this.userGear = gear.toUpperCase();
}; // car3에 shift 메서드를 추가하면 car3와 프로토타입에 같은 이름의 메서드가 존재하므로 car3.shift('d')를 호출하면 car3의 메서드가 호출되고 프로토타입의 메서드는 호출되지 않습니다.
console.log(car3.shift === Car1.prototype.shift); //false
console.log(car3.shift === car4.shift); //false
car3.shift("d");
console.log(car3.userGear); //'D'
console.log("----------------");

// 9.2.4 정적 메서드
// 정적 메서드에서 this는 인스턴스가 아니라 클래스 자체에 묶입니다.
// 하지만 일반적으로 정적 메서드는 this 대신 클래스 이름을 사용하는 것이 좋은 습관입니다.
class Car4 {
  static getNextVin() {
    return Car4.nextVin++; // this.nextVin++ 라고 써도 되지만, Car4를 앞에 쓰면 정적 메서드라는 점을 상기하기 쉽습니다.
  }

  constructor(make, model) {
    this.make = make;
    this.model = model;
    this.vin = Car4.getNextVin();
  }

  static areSimilar(car1, car2) {
    return car1.make === car2.make && car1.model === car2.model;
  }

  static areSame(car1, car2) {
    return car1.vin === car2.vin;
  }

  // Object의 toString 메서드를 오버라이드 함
  toString() {
    return `${this.make} ${this.model}: ${this.vin}`;
  }
}
Car4.nextVin = 0; // 자바스크립트는 static 접근제어자가 없어서 클래스변수를 선언할 때 클래스 바깥에서 선언...?

const car5 = new Car4("Tesla", "S");
const car6 = new Car4("Mazda", "3");
const car7 = new Car4("Mazda", "3");

console.log(car5.vin); //0
console.log(car6.vin); //1
console.log(car7.vin); //2

console.log(Car4.areSimilar(car5, car6)); //false
console.log(Car4.areSimilar(car6, car7)); //true
console.log(Car4.areSame(car6, car7)); //false
console.log(Car4.areSame(car6, car6)); //true
console.log("----------------");

// 9.2.5 상속
// 자바스크립트는 프로토타입 체인을 통해 상속을 구현한다.
// 객체의 프로토타입에서 메서드를 찾지 못하면 JS는 프로토타입의 프로토타입을 검색합니다.
// JS는 조건에 맞는 프로토타입을 찾을 때까지 프로토타입 체인을 계속 거슬러 올라갑니다. 조건에 맞는 프로토타입을 찾지 못하면 에러를 일으킵니다.
// 클래스의 계층 구조를 만들 떄 프로토타입 체인을 염두에 두면 효율적인 구조를 만들 수 있습니다.
// 즉, 프로토타입 체인에서 가장 적절한 위치에 메서드를 정의하는 겁니다.

class Vehicle {
  constructor() {
    this.passengers = [];
    console.log("Vehicle created");
  }

  addPassenger(p) {
    this.passengers.push(p);
  }
}

class Car5 extends Vehicle {
  constructor() {
    super(); // 서브클래스에서는 super를 반드시 호출해야 합니다. 호출하지 않으면 에러 발생.
    console.log("Car5 created");
  }

  deployAirbags() {
    console.log("BWOOSH!");
  }
}

const v = new Vehicle();
v.addPassenger("Frank");
v.addPassenger("Judy");
console.log(v.passengers); //["Frank", "Judy"]
const c = new Car5();
c.addPassenger("Alice"); // 서브클래스는 슈퍼클래스의 인스턴스 변수(멤버변수)와 메서드를 모두 상속받기 때문에 가능
c.addPassenger("Cameron");
console.log(c.passengers); //["Alice", "Cameron"]
// v.deployAirbags(); //error
c.deployAirbags(); //"BWOOSH!"
console.log("----------------");

// 9.2.6 다형성
// 다형성이란 단어는 객체지향 언어에서 여러 슈퍼클래스의 멤버인 인스턴스를 가리키는 말입니다.
// JS에는 객체가 클래스의 인스턴스인지 확인하는 instanceof 연산자가 있습니다.
// 이 연산자를 속일 수도 있지만, [[prototype]]과 __proto__ 프로퍼티에 손대지 않았다면 정확한 결과를 기대할 수 있습니다.
// JS의 모든 객체는 루트 클래스인 OBject의 인스턴스입니다. 즉, 객체 o에섯 o instanceof Object는 항상 true입니다.

class Motorcycle extends Vehicle {} // 자바처럼 생성자함수가 정의되지 않으면 자동으로 constructor() { super(); }를 생성해준다...?
const c1 = new Car5();
const m = new Motorcycle();
console.log(c1 instanceof Car5); //true
console.log(c1 instanceof Vehicle); //true
console.log(m instanceof Car5); //false
console.log(m instanceof Motorcycle); //true
console.log(m instanceof Vehicle); //true
console.log("----------------");

// 9.2.7 객체 프로퍼티 나열 다시 보기
// ES6 클래스를 설계 의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인이 아니라 인스턴스에 정의해야 합니다.
// 하지만 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 장치는 없으므로 확실히 확인하려면 항상 hasOwnProperty를 사용하는 편이 좋습니다.
class Super {
  constructor() {
    this.name = "Super";
    this.isSuper = true;
  }
}

// 유효하지만, 권장하지는 않습니다.
Super.prototype.sneaky = "not recommended!";

class Sub extends Super {
  constructor() {
    super();
    this.name = "Sub";
    this.isSub = true;
  }
}

const obj = new Sub();

for (let p in obj) {
  console.log(
    `${p}: ${obj[p]}` + (obj.hasOwnProperty(p) ? "" : " (inherited)")
  ); // name, isSuper, isSub 프로퍼티는 모두 프로토체인이 아니라 인스턴스에 정의됐습니다.
  // (super() 때문에 슈퍼클래스 생성자에서 선언한 프로퍼티는 서브클래스 인스턴스에서도 정의됩니다.)
  // 반면에 sneaky 프로퍼티는 슈퍼클래스의 프로토타입에 직접 정의했습니다.
}
// Object.keys를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할 수 있습니다.
console.log("----------------");

// 9.2.8 문자열 표현
// 자바의 toString과 유사. Object에 있는 toString메서드 대신 오버라이드 하는 것을 권장한다.
// 단, 클래스 정의 내에서 오버라이딩 해줘야한다 (this 떄문에 그리고 특정 인스턴스에만 오버라이딩 하면 그 인스턴스에서만 쓸 수 있으므로...?).
const car8 = new Car4("Audi", "A6");
console.log(car8.toString()); //Audi A6: 3
console.log(car8.__proto__); //Car4.prototype
console.log(Object.getPrototypeOf(Car5.prototype)); //Vehicle.prototype

const randomObj = {};
console.log(randomObj.__proto__); //Object.prototype
