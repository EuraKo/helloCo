const header = document.querySelector('header');
const gnbBtn = document.querySelector('.gnb_toggle');
const gnbBox = document.querySelector('.gnb_box');
const gnbCancle = document.querySelector('.gnb_cancle');

// 모바일 gnb 열기
gnbBtn.addEventListener('click', e => {
  e.currentTarget.classList.add('on');
  gnbBox.classList.add('open');

});

// 모바일 gnb 닫기
gnbCancle.addEventListener('click', e => {
  gnbBtn.classList.remove('on');
  gnbBox.classList.remove('open');
});

// 스크롤 시 헤더 변경
window.addEventListener('scroll', e => {
  let scroll = window.scrollY || window.pageXOffset;
  if (scroll > 80) {
    header.classList.add('scroll');
    header.querySelector('.logo img').setAttribute('src', 'src/img/HC-logo-circle.png');
  } else {
    header.classList.remove('scroll');
    header.querySelector('.logo img').setAttribute('src', 'src/img/HC-logo.png');
  }
})