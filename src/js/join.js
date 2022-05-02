const form = document.querySelector('#join');
const btnSubmit = form.querySelector('.btn_submit');
const radio = form.querySelectorAll('.radio');

btnSubmit.addEventListener('click', (e) => {
  if (!isTxt("userid", 5)) e.preventDefault();
  if (!isEmail('email', 'company')) e.preventDefault();
  if (!isChecked('gender')) e.preventDefault();
  if (!isPwd('pwd', 'pwd2', 12)) e.preventDefault();
});

radio.forEach((el) => {
  el.addEventListener('click', e => {
    // 이벤트 두번발생 : input과 label이 둘 다 클릭되야해서
    if (e.target.closest('label').classList.contains('on')) return;
    for (const radios of radio) radios.classList.remove('on');
    el.classList.add('on');
  })
})