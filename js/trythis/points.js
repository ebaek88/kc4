// for문을 이용하여 다음과 같이 정확한 숫자를 출력하는 코드를 작성하시오.
// 원래는 0.9 까지만 출력되어야 되는데 어느 순간부터 0.8이 0.7999999...가 되고 0.89999..., 0.9999....가 되어
// toFixed(1) 함수는 소수점 두 번째 자리에서 반올림 하므로 1.0이 출력될 수 있다.

function ex1() {
  for (let i = 0.1; i < 1; i = i + 0.1) {
    console.log(+i.toFixed(1)); //toFixed(1) 함수는 문자열을 반환하므로 숫자형으로 변환해야한다.
  }
}
ex1();

function ex2() {
  for (let i = 1; i <= 10; i += 1) {
    const sqrt = Math.sqrt(i);
    if (sqrt % 1 !== 0) {
      console.log(i, +(sqrt % 1).toFixed(3));
    }
  }
}
ex2();

const WEEK_NAMES = "일월화수목금토";
function ex3() {
  const wday = new Date().getDay();
  let wname;
  switch (wday) {
    case 0:
      wname = "일";
      break;
    case 1:
      wname = "월";
      break;
    case 2:
      wname = "화";
      break;
    case 3:
      wname = "수";
      break;
    case 4:
      wname = "목";
      break;
    case 5:
      wname = "금";
      break;
    case 6:
      wname = "토";
      break;
    default:
      wname = "Not Valid Day!";
      break;
  }

  console.log(`오늘은 ${wname}요일 입니다.`);

  // 스위치문 사용 x
  const today = new Date();
  console.log(`오늘은 ${WEEK_NAMES[today.getDay()]}요일입니다.`);
}
ex3();
