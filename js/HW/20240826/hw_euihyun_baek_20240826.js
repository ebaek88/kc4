// 연습문제 1
// for문을 이용하여 다음과 같이 정확한 숫자를 출력하는 코드를 작성하시오.
// 원래는 0.9 까지만 출력되어야 되는데 어느 순간부터 0.8이 0.7999999...가 되고 0.89999..., 0.9999....가 되어
// toFixed(1) 함수는 소수점 두 번째 자리에서 반올림 하므로 1.0이 출력될 수 있다.
for (let i = 0.1; i < 1; i = i + 0.1) {
  console.log(+i.toFixed(1)); //toFixed(1) 함수는 문자열을 반환하므로 숫자형으로 변환해야한다.
}

// 연습문제 2
// 1 ~ 10 사이의 정수에 대해 제곱근을 소숫점 3자리까지 출력하시오.

for (let i = 1; i <= 10; i++) {
  const temp = +Math.sqrt(i).toFixed(3);
  if (temp !== Math.floor(Math.sqrt(i))) {
    // 제곱근이 무리수인지 확인
    console.log(temp);
  }
}

// 연습문제 3
// 오늘 날짜의 요일을 출력하는 switch문을 사용해서 작성해 보고, switch문을 사용하지 않은 더 간단한 방법도 찾아보세요.

// 스위치 문 활용
const today = new Date();
switch (today.getDay()) {
  case 0:
    console.log("오늘은 일요일입니다.");
    break;
  case 1:
    console.log("오늘은 월요일입니다.");
    break;
  case 2:
    console.log("오늘은 화요일입니다.");
    break;
  case 3:
    console.log("오늘은 수요일입니다.");
    break;
  case 4:
    console.log("오늘은 목요일입니다.");
    break;
  case 5:
    console.log("오늘은 금요일입니다.");
    break;
  case 6:
    console.log("오늘은 토요일입니다.");
    break;
  default:
    console.log("요일이 아닙니다.");
}

// 스위치문 사용 X
const WEEK_NAMES = "일월화수목금토";
console.log(`오늘은 ${WEEK_NAMES[today.getDay()]}요일입니다.`);

// 연습문제 4
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
