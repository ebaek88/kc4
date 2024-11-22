let x, y;
x = y = 9; // x = 9, y = 9
const z = (y++, x + y); // z = 19
x += y;
x %= y;
x &= y;
x ^= y; // x = x + y; x = x % y; x = x & y; x = x ^ y;

const u = { id: 1, name: "Hong", age: 29 }; // object
let { id, name, addr } = u; // let id = 1 <= let id = user.id; let addr = undefined;
let { id, ...info } = u; // id = 1, info = { name: 'Hong', age: 29 }
console.log(info);
let id, name;
// {id, name} = u;   // Error: JS는 표현식 안에 있지 않으면서 주요 코드 흐름 상에 있는 {...}를
// 코드 블록으로 인식함.
({ id, name } = u); // OK!

const arr = [1, 2, 3, 4, 5];
let [a, b, ...c] = arr; // let a = arr[0], b = arr[1], c = [3, 4, 5]
[a, b] = [b, a]; //  let t = a; a = b; b = t;

// Object Destructuring
const { id, name } = {id: 1, name: 'Hong'};
// Array / Iterator Destructuring
const [ a, b ] = [ 1, 2 ];
// Default value destructuring
const { id, name, addr = 'Seoul'} = {id: 1, name: 'Hong', add: 'Pusan'};
const [ a, b, c = 3] = [ 1, 2 ];
// Arguments Destructuring
function fn({a, b}) {...}
fn({a: 1, b: 2});
// Class Destructuring
const x = new A[1, 2];
const {a, b} = x;   // 클래스 멤버변수 명과 같아야 destructuring이 가능하다
// Array To Object Destructuring
arr = [1, 2];
const {'0': a1, '1': a2, length: a3 } = arr;   // {'0': a1, '1': a2, length: a3} = {'0': 1, '1': 2, length: 2}
// const {...rest} = arr; 이러면 length 프로퍼티는 안나옴