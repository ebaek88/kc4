const hong = { id: 1, name: "Hong" };
const lee = { id: 2, name: "Lee" };
const empty = {};

function f1(user) {
  const { id, name } = user;
  console.log(id, name);
}

function f2({ id, name }) {
  console.log(id, name);
}

const f = ({ id, name }) => console.log(id, name);

function f4({ id: id = "abc", name: name = "efg" }) {
  console.log(id, name);
}

f1(hong); //1 Hong
f1(lee); //2 Lee
console.log();
f2(hong); //1 Hong
f2(lee); //2 Lee
console.log();
f(hong); //1 Hong
f(lee); //2 Lee
console.log();
f4(hong); //1 Hong
f4(lee); //2 Lee
f4(empty); //abc efg
