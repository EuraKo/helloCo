function showPop(elem, htmls) {
  body.classList.add('scroll_hidden');
  const pop = document.createElement('aside');
  pop.classList.add('pop');
  pop.classList.add('pop_' + elem);
  pop.innerHTML = htmls;
  body.append(pop);
  setTimeout(() => {
    pop.style.transform = 'translateX(0)';

  }, 100)
}

function hidePop(e) {
  let pop = body.querySelector('.pop');
  if (pop !== null) {
    let close = pop.querySelector('.pop_cancle');
    let closeSpan = close.querySelector('span');
    if (e.target.closest('.pop_cancle')) {
      pop.style.transform = 'translateX(100%)';
      setTimeout(() => {
        pop.remove();
        body.classList.remove('scroll_hidden');
      }, 500)
    }
  }
  return;
}