var a = 1; // 이 a는 module.this 스코프에 잡힌다...? module과 module.this는 다르다...?
this.a = 2; // 노드의 this는 모듈스코프에 잡힌다.
console.log(globalThis.a, this.a); //undefined 2

globalThis.name = "GlobalName";
// 화살표 함수의 this
const af = (name) => {
  this.name = name;
  this.if1 = function () {
    console.log("if1>>", this.name);
  };
  this.if2 = () => {
    console.log("if2>>", this.name);
  };
  return this;
};

const c = af("XXX");
c.if1();
c.if2();
