// 1번 문제
const hong = { id: 1, name: "Hong" };
const lee = { id: 2, name: "Lee" };

function f1(user) {
  const { id, name } = user;
  console.log(id, name);
}

function f2({ id, name }) {
  console.log(id, name);
}

const f = ({ id, name }) => console.log(id, name);

f1(hong); //1 Hong
f1(lee); //2 Lee
console.log();
f2(hong); //1 Hong
f2(lee); //2 Lee
console.log();
f(hong); //1 Hong
f(lee); //2 Lee

// 2번 문제
const user = { id: 1, name: "Hong", passwd: "xxx", addr: "Seoul" };
// const { id: id, name: name, addr: addr } = user;
// const { ...user, passwd } = user;
// const userInfo = { id, name, addr };
const userInfo = { ...user, passwd };
console.log(userInfo);

// 3번 문제
const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];
let [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;
// 또 다른 방법
let {
  0: {
    0: { id: id1 },
  },
  1: {
    0: { id: id2 },
    1: { id: id3 },
  },
} = arr;
console.log(id1, id2, id3);

// 4번 문제
const user = { name: "Hong", passwd: "xyz", addr: "Seoul" };
function getValueExceptInitial(k) {
  const { [k]: val } = user;
  const [, ...rest] = [...val];
  return rest.join("");
}

console.log(getValueExceptInitial("name")); //ong
console.log(getValueExceptInitial("passwd")); //yz
console.log(getValueExceptInitial("addr")); //eoul
