const user = { name: "Hong", passwd: "xyz", addr: "Seoul" };
function getValueExceptInitial(k) {
  const { [k]: val } = user;
  // destructuring을 최대한 많이 쓴다면
  const [, ...rest] = [...val];
  let result = "";
  for (let i = 0; i < rest.length; i = i + 1) {
    result += rest[i];
  }
  return result;

  // return rest.join("");

  // 더 간결하게 작성한다면
  // return val.substring(1);
}

console.log(getValueExceptInitial("name")); //ong
console.log(getValueExceptInitial("passwd")); //yz
console.log(getValueExceptInitial("addr")); //eoul
