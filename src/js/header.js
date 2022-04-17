const gnbBtn = document.querySelector('.gnb_toggle');
const gnbBox = document.querySelector('.gnb_box');
const gnbCancle = document.querySelector('.gnb_cancle');

gnbBtn.addEventListener('click', e => {
  e.currentTarget.classList.add('on');
  gnbBox.classList.add('open');

});

gnbCancle.addEventListener('click', e => {
  gnbBtn.classList.remove('on');
  gnbBox.classList.remove('open');
})