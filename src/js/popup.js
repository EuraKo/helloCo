function showPop(elem, htmls) {
  body.classList.add('scroll_hidden');
  const pop = document.createElement('aside');
  pop.classList.add('pop');
  pop.classList.add('pop_' + elem);
  pop.innerHTML = htmls;
  body.append(pop);
}

function hidePop(e) {
  let pop = body.querySelector('.pop');
  if (pop !== null) {
    let close = pop.querySelector('.pop_cancle');
    let closeSpan = close.querySelector('span');
    // 좀 더 간결한 코드?
    if (e.target === close || e.target === closeSpan) {
      pop.remove();
      body.classList.remove('scroll_hidden');
    }
  }
}