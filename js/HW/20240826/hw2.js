// 1 ~ 10 사이의 정수에 대해 제곱근을 소숫점 3자리까지 출력하시오.

for (let i = 1; i <= 10; i++) {
  const temp = +Math.sqrt(i).toFixed(3);
  if (temp !== Math.floor(Math.sqrt(i))) {
    // 제곱근이 무리수인지 확인
    console.log(temp);
  }
}
