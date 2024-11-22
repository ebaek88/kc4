const arr2 = [1, 2, 3, 4, 5];

const ex1 = arr2.slice(1, 3);
console.log(ex1);

const ex2 = arr2.slice(2);
console.log(ex2);

const ex3 = arr2.splice(1, 3);
console.log(arr2);

const ex4 = arr2.splice(1, 0, ...ex3);
console.log(arr2);

// const ex5 = ex4.splice(2);
