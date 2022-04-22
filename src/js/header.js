const header = document.querySelector('header');
const gnbBtn = document.querySelector('.gnb_toggle');
const gnbBox = document.querySelector('.gnb_box');
const gnbCancle = document.querySelector('.gnb_cancle');
const gnbInner = document.querySelector('.gnb_inner');
const gnbOverlay = document.querySelector('.gnb_overlay');

// 모바일 gnb 열기
gnbBtn.addEventListener('click', e => {
  e.currentTarget.classList.add('on');
  gnbBox.classList.add('open');
  setTimeout(() => {
    gnbOverlay.classList.add('fade_bg');
    setTimeout(() => {
      gnbInner.classList.add('mob_open');
    }, 300)
  }, 100)

});

// 모바일 gnb 닫기
gnbCancle.addEventListener('click', e => {
  gnbInner.classList.remove('mob_open');
  setTimeout(() => {
    gnbOverlay.classList.remove('fade_bg');
    setTimeout(() => {
      gnbBtn.classList.remove('on');
      gnbBox.classList.remove('open');
    }, 300)
  }, 300)
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
});

window.addEventListener('load', (e) => {
  const loading = document.querySelector('.loading');
  setTimeout(() => {
    loading.style.display = 'none';
  }, 2000)

});