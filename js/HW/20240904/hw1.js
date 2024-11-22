function makeArray(num) {
  if (num <= 1) {
    return [num];
  } else {
    return [...makeArray(num - 1), num];
  }
}

function makeReverseArray(num) {
  if (num <= 1) {
    return [num];
  } else {
    return [num, ...makeReverseArray(num - 1)];
  }
}

const result1 = makeArray(10);
const result2 = makeReverseArray(10);
console.log(result1);
console.log(result2);
