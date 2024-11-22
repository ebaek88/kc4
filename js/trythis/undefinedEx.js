// var a = undefined; 로 호이스팅됨
// let b = <notInitializedYet>; 로 호이스팅 됨
// let c = <notInitializedYet>; 로 호이스팅 됨
console.log(a); //undefined
console.log(b); //ReferenceError: Cannot access 'b' before initialization
console.log(c); //ReferenceError: Cannot access 'c' before initialization
let b = 1;
const c = 2;
