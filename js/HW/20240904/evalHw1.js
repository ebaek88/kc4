// 1) loop를 이용하여 작성
function fibonacci1(num) {
  let fibArray = new Array(num + 1).fill(0);

  //피보나치 시작
  for (let j = 1; j <= num; j = j + 1) {
    if (j == 0) {
      fibArray[j] = 0;
    } else if (j == 1) {
      fibArray[j] = 1;
    } else {
      fibArray[j] = fibArray[j - 2] + fibArray[j - 1];
    }
  }

  return fibArray[num];
}

// 2) 순수 재귀 이용하여 작성
function fibonacci2(num) {
  if (num == 0) {
    return 0;
  } else if (num == 1) {
    return 1;
  } else {
    return fibonacci2(num - 2) + fibonacci2(num - 1);
  }
}

// 3) memoization
function fibonacci3(num) {
  let fibArray = new Array(num + 1).fill(0);
  function insideFibonacci(num) {
    if (num == 0) {
      return fibArray[num];
    } else if (num == 1) {
      fibArray[num] = 1;
      return fibArray[num];
    } else {
      if (fibArray[num] != 0) {
        return fibArray[num];
      } else {
        fibArray[num] = insideFibonacci(num - 2) + insideFibonacci(num - 1);
        return fibArray[num];
      }
    }
  }
  return insideFibonacci(num);
}

console.log(fibonacci1(5)); //5
console.log(fibonacci1(7)); //13
console.log(fibonacci1(30)); //832040

console.log(fibonacci2(5)); //5
console.log(fibonacci2(7)); //13
console.log(fibonacci2(30)); //832040

console.log(fibonacci3(5)); //5
console.log(fibonacci3(7)); //13
console.log(fibonacci3(30)); //832040
