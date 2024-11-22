const assert = require("assert");

function ex1() {
  const dog = {
    name: "Maxx",
    showMyName() {
      console.log(`My name is ${this.name}.`);
    },
    whatsYourName() {
      // setTimeout(this.showMyName, 1000); //My name is undefined;
      //1) 화살표함수
      // setTimeout(() => this.showMyName(), 1000);
      //2) bind (또는 call, apply)
      // setTimeout(this.showMyName.bind(this), 1000);
    },
  };

  dog.whatsYourName();
}
// ex1();

function once(cb) {
  let done = false;
  return function (...args) {
    if (done) return; // 한 번 실행되면 콜백 실행안함
    done = true;
    return cb(...args);
  };
  // done = true;
}

const onceAgain = (cb, rebirth = 1000) => {
  let done = false;
  return (...args) => {
    if (done) {
      setTimeout(() => {
        done = false;
      }
      return;
    }
    done = true;
    return cb(...args);
  };
};

(function ex2_1() {
  const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
  console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
  console.log(fn(2, 7)); // undefined
  console.log(fn(3, 8)); // undefined
  assert.strictEqual(fn(1, 6), "금일 운행금지 차량은 끝번호 1, 6입니다!");
  assert.strictEqual(fn(2, 7), undefined);
  assert.strictEqual(fn(3, 8), undefined);
})();

(function ex2_2() {
  const fn = onceAgain(
    (x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`
  );
  console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
  console.log(fn(2, 7)); // undefined
  console.log(fn(3, 8)); // undefined
  assert.strictEqual(fn(1, 6), "금일 운행금지 차량은 끝번호 1, 6입니다!");
  assert.strictEqual(fn(2, 7), undefined);
  assert.strictEqual(fn(3, 8), undefined);
})();


(function ex3() {
  const before = () => console.log('before....');
  const after = () => console.log('after...');

  const someFn = (name, greeting) => console.log(`${greeting}, ${name}`);
  const someFn2 = (id, nickname, email, level) =>
    console.log(`${id}/${nickname}/${email}/${level}`);

  const template = cb => {
    return (...args) => {
      before();
      cb(...args);
      after();
    }
  };

  const temp = template(someFn);  // before → someFn → after 실행
  const temp2 = template(someFn2);  // before → someFn2 → after 실행

  temp('sico', 'hello');
  temp2(1, 'sico', 'sico@gmail.com', 5);
}());

function ex4() {
  const weeks = ['일', '월', '화', '수', '목', '금', '토'];
  let widx = -1;
  const getNextWeek = () => {
    widx += 1; // side-effect!
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };

  let cnt = 0;
  const intl = setInterval(() => {
    widx += 2; // side-effect!
    console.log('call', cnt, getNextWeek());
    if ((cnt += 1) === 8) clearInterval(intl);
  }, 1000);
}

function ex6() {
  function getDiffMillis(dt1, dt2) {
    const d1 = new Date(dt1);
    const { getTime: getTime1 } = d1;
    const d2 = new Date(dt2);
    const { getTime: getTime2 } = d2;
    return getTime1.call(d1) - getTime2.call(d2);
  }
  assert.strictEqual(getDiffMillis('2025-01-01', '2025-01-02'), -86400000);
}