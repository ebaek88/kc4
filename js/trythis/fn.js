function f() {
  console.log("f.name=", f.name);
  console.log("f.length=", f.length);
  console.log("arguments=", arguments);
  console.log("new.target=", new.target);
}

new f(1, 2, 3);

const af = () => {
  console.log("f.name=", f.name);
  console.log("f.length=", f.length);
  console.log("arguments=", arguments);
  console.log("new.target=", new.target);
};

af(1, 2, 3);
