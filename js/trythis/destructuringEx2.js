// Object Destructuring
const user = { id: 1, name: "Hong", addr: { city: "Seoul", road: "길" } };
const { id: userId, name: userName } = user;
// const { id, addr } = user; const { city } = addr;
const {
  id,
  addr: { city: addrCity },
} = user;

const arr = [1, 2, 3, 4, 5]; // {0: 1, 1: 2, 2: 3, 3: 4, 4: 5}
const { 1: x1, 3: x2 } = arr; // x1 = 2, x2 = 4

const mainField = user.id > 5 ? "name" : "addr";
const { [mainField]: target } = user; // target = { city: 'Seoul', road: '길' }
// const { 'addr': ttt } = user; 가능
// target = 'Kim';     // Uncaught TypeError: Assignment to constant variable.
// const { name: target } = user;  // ONLY Browser Console Available!! ('이미 선언되었어요!')

const fn = ({ age }) => age;
const user1 = { id: 1, name: "P", age: 33 };
console.log(fn(user1)); //33

const { age2: age3 = fn(user1) } = { age2: 20 };
console.log(age3); //20

const u3 = { id: 3, name: "kim", addr: { id: 1, city: "Seoul" } };
let {
  id: idd,
  addr: { id: aid },
} = u3; // idd=3, aid=1
console.log(idd, aid); //3 1

const arr1 = [1, 2, [3, 4], [5, 6], { ax: 7, ay: 8 }, { ax: 9 }];
const [, x, [, y], z, , { ax }] = arr1; // x = 2, y = 4, z = [ 5, 6 ], ax = 9
console.log(x, y, z, ax); //2 4 [ 5, 6 ] 9

const { 1: p, 4: q } = arr1; //  p = 2, q = { ax: 7, ay: 8 }  ⇐ const [, p, , , q] = arr;
const [, , , , { ay: a1 }, { ax: a2 }] = arr1; // a1 = 8, a2 = 9
console.log(p, q, a1, a2); //2 { ax: 7, ay: 8 } 8 9

const [k, v] = Object.entries(user1); // const [k, v] = [ [ 'id', 1 ], [ 'name', 'P' ], [ 'age', 33 ] ];
console.log([k, v]); //[ [ 'id', 1 ], [ 'name', 'P' ] ]
