const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');
const list = gallery.querySelector('.list');
const items = list.querySelectorAll('li');

items.forEach((el, idx) => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showPop("src/img/HC-About-2.jpg", 'title', 'desc', "https://www.flickr.com/images/buddyicon.gif", 'owner_name');
  })
});

function showPop(img, title, desc, owner_img, owner_name) {
  const pop = document.createElement('aside');
  pop.classList.add('pop');
  let htmls = `
    <div class="inner">
      <button type="button" class="pop_cancle">x</button>
      <div class="pop_cont">
        <div class="pic">
          <img src="${img}">
        </div>
        <div class="cont">
          <h2 class="title">${title}</h2>
          <div class="owner">
            <img src="${owner_img}">
            <span>${owner_name}</span>
          </div>
          <div class="desc">${desc}</div>
        </div>
      </div>
    </div>
  `;
  pop.innerHTML = htmls;
  // body.append(pop);

}