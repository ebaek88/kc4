let f;
{
  let o = { note: "Safe" };
  f = function () {
    // because function f is defined inside the block, the scope can be accessible even if f is called outside the scope
    return o;
  };
}
let oRef = f();
oRef.note = "Not so safe after all!";
console.log(oRef.note); //Not so safe after all!
console.log("-----------");
// IIFE
const f2 = (function () {
  let count = 0; // this variable cannot be access from the outside whatsoever.
  return function () {
    return `I have been called ${++count} time(s).`;
  };
})(); // now f2 = function(){return `I have been called ${++count} time(s).`;}
// the variable count cannot be accessed from the outside
console.log(f2()); // "I have been called 1 time(s)."
console.log(f2()); // "I have been called 2 time(s)."
console.log("-----------");
// IIFE can be useful to create a closure and return something from the closure

if (x !== 3) {
  console.log(y); //undefined
  var y = 5;
  if (y === 5) {
    var x = 3;
  }
  console.log(y); //5
}
if (x === 3) {
  console.log(y); //5
}
