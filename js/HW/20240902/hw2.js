const user = { id: 1, name: "Hong", passwd: "xxx", addr: "Seoul" };
// let id, name, addr;
// const userInfo = ({ id, name, addr } = user);
// const { id, name, addr } = user;
// const userInfo = {
//   id,
//   name,
//   addr,
// };
// console.log(userInfo);

// const { id: id, name: name, addr: addr } = user;
// const userInfo = { id, name, addr };

const { passwd, ...userInfo } = user;
console.log(userInfo);
