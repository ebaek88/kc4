// 다음과 같이 올바른 더하기 연산을 하는 addPoints 함수를 작성하시오.
// (단, 소숫점 자리수는 긴쪽에 맞춘다)

function addPoints(a, b) {
  // 1) 만약 두 수 모두 정수면 그냥 계산
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return a + b;
  }

  // 2) 그렇지 않은 경우
  // 우선 문자열로 변환
  const aToStr = String(a);
  const bToStr = String(b);
  let aToInt = 0;
  let bToInt = 0;
  let decimalLength = 0;

  // a와 b의 소숫점 아래 숫자길이 계산
  let aDecimalLength = aToStr.split(".")[1]?.length;
  let bDecimalLength = bToStr.split(".")[1]?.length;

  // 만약 한 쪽이 정수인 경우 aDecimalLength 또는 bDecimalLength가 undefined가 되므로 이에 대한 처리 필요
  if (aDecimalLength == undefined) {
    aDecimalLength = 0;
  }
  if (bDecimalLength == undefined) {
    bDecimalLength = 0;
  }

  // 소수점 아래 자리수가 긴 것을 decimalLength 변수에 저장한 뒤
  if (aDecimalLength >= bDecimalLength) {
    decimalLength = aDecimalLength;
  } else {
    decimalLength = bDecimalLength;
  }

  // 각 숫자에 10^decimalLength을 곱하여 정수로 변환하여 덧셈 계산
  aToInt = a * Math.pow(10, decimalLength);
  bToInt = b * Math.pow(10, decimalLength);
  const intResult = aToInt + bToInt;
  // 정수를 다시 10^-decimalLength를 곱하여 원래 자리수로 맞춤
  const result = +(intResult * Math.pow(10, -decimalLength)).toFixed(
    decimalLength
  );
  return result;
}

console.log(addPoints(0.21354, 0.1)); // 0.31354
console.log(addPoints(0.14, 0.28)); // 0.42
console.log(addPoints(0.34, 0.226)); // 0.566
console.log(addPoints(10.34, 200.226)); // 210.566
console.log(addPoints(0.143, -10.28)); // -10.137
console.log(addPoints(0.143, -10)); // -9.857
