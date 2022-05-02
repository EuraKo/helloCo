function isTxt(name, len) {
  if (len === undefined) len = 5;

  let input = form.querySelector(`[name=${name}]`);
  let txt = input.value;

  if (txt.length >= len) {
    const errMsgs = input.closest('.input_group').querySelectorAll('.err_msg');
    if (errMsgs.length > 0) errMsgs[0].remove();
    return true;
  } else {
    const errMsgs = input.closest('.input_group').querySelectorAll('.err_msg');
    if (errMsgs.length > 0) errMsgs[0].remove();

    const errMsg = document.createElement('p');
    errMsg.classList.add('err_msg');
    errMsg.append(`${len}글자이상 입력하세요.`);
    input.closest('.input_group').append(errMsg);
    return false;
  }
}

function isEmail(name, select) {
  let input = form.querySelector(`[name=${name}]`);
  let sel = form.querySelector(`[name=${select}]`);
  let txt = input.value;
  let txtTrim = txt.trim();
  let sel_idx = sel.options.selectedIndex;
  let sel_val = sel.options[sel_idx].value;
  console.log(sel_idx)

  let errMsgs = input.closest('.input_group').querySelector('.err_msg');
  if (errMsgs) errMsgs.remove();

  if (txtTrim === '') {
    const errMsgs = input.closest('.input_group').querySelectorAll('p');
    if (errMsgs.length > 0) input.closest('.input_group').querySelector('.err_msg').remove();

    const errMsg = document.createElement('p');
    errMsg.classList.add('err_msg');
    errMsg.append('이메일을 입력해주세요.');
    input.closest('.input_group').append(errMsg);
    return false;
  } else if (sel_val === '-') {
    const errMsgs = input.closest('.input_group').querySelectorAll('p');
    if (errMsgs.length > 0) input.closest('.input_group').querySelector('.err_msg').remove();

    const errMsg = document.createElement('p');
    errMsg.classList.add('err_msg');
    errMsg.append('메일 주소를 선택해 주세요');
    input.closest('.input_group').append(errMsg);
    return false;
  } else {

    return true;
  }
}

function fullEmail(name) {
  let input = form.querySelector(`[name=${name}]`);
  let txt = input.value;

  if (/@/.test(txt)) {
    const errMsgs = input.closest('.input_group').querySelectorAll('p');
    if (errMsgs.length > 0) input.closest('.input_group').querySelector('.err_msg').remove();
    return true;
  } else {
    const errMsgs = input.closest('.input_group').querySelectorAll('p');
    if (errMsgs.length > 0) input.closest('.input_group').querySelector('.err_msg').remove();

    const errMsg = document.createElement('p');
    errMsg.classList.add('err_msg');
    errMsg.append('@포함하여 입력해 주세요.');
    input.closest('.input_group').append(errMsg);
    return false;
  }
}

function isChecked(name) {
  let inputs = form.querySelectorAll(`[name=${name}]`);
  let isCheck = false;

  for (let el of inputs) {
    if (el.checked) isCheck = true;
  }
  const errMsgs = inputs[0].closest('.input_group').querySelectorAll('p');
  if (errMsgs.length > 0) inputs[0].closest('.input_group').querySelector('p').remove();
  const errMsg = document.createElement('p');

  if (isCheck) {
    return true;
  } else {
    errMsg.classList.add('err_msg');
    errMsg.append('하나 이상 체크해주세요');
    inputs[0].closest('.input_group').append(errMsg);
    return false;
  }
}


function isPwd(name1, name2, len) {
  let pwd1 = form.querySelector(`[name=${name1}]`);
  let pwd2 = form.querySelector(`[name=${name2}]`);

  let pwd1_val = pwd1.value;
  let pwd2_val = pwd2.value;

  let num = /[0-9]/.test(pwd1_val);
  let end = /[a-zA-Z]/.test(pwd1_val);
  let spc = /[~!@#$%^&**()_+?><]/.test(pwd1_val);

  let errMsgs = pwd2.closest('.input_group').querySelector('.err_msg');
  if (errMsgs) errMsgs.remove();
  // 비밀번호 일치여부
  if (pwd1_val !== pwd2_val) {
    let errMsg = document.createElement('p');
    errMsg.classList.add('err_msg');
    errMsg.append(`비밀번호가 동일하지 않습니다.`);
    pwd2.closest('.input_group').append(errMsg);
    return false;
  } else if (pwd1_val.length < len || !num || !end || !spc) {
    let errMsg = document.createElement('p');
    errMsg.classList.add('err_msg');
    errMsg.append(`${len}글자 이상 영문, 숫자, 특수문자를 포함하여 입력해주세요.`);
    pwd2.closest('.input_group').append(errMsg);
    return false;
  } else {
    const errMsgs = pwd2.closest('.input_group').querySelectorAll('.err_msg');
    if (errMsgs.length > 0) errMsgs[0].remove();
    return true;

  }
}