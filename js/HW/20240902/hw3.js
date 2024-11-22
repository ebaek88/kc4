const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];
// const [arr0, arr1] = arr;
// const [obj1] = arr0;
// const { id: id1 } = obj1;
// const [obj2, obj3] = arr1;
// const { id: id2 } = obj2;
// const { id: id3 } = obj3;
// const { id: id2, id: id3 } = { obj2, obj3 };

// const [arr0, arr1] = arr;
// const [{ id: id1 }] = arr0;
// const [{ id: id2 }, { id: id3 }] = arr1;

// 방법 1
// let [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr;

// 또다른 방법
// let {
//   0: {
//     0: { id: id1 },
//   },
//   1: {
//     0: { id: id2 },
//     1: { id: id3 },
//   },
// } = arr;

// 또다른 방법 : Array의 flat 메소드 사용
let [{ id: id1 }, { id: id2 }, { id: id3 }] = arr.flat(Infinity);

console.log(id1, id2, id3);
