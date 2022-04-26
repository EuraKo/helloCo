const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');
const list = gallery.querySelector('.list ul');
const items = list.querySelectorAll('li');

const base = 'https://www.flickr.com/services/rest/?';
const method = 'flickr.photos.search';
const key = 'b46a4e7f5822514ab2cbba273b4c9794';
const per_page = 9;
const format = 'json';

const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=foodstyling&privacy_filter=1`;


initList(url);
// 요소 클릭시 팝업 열리게
list.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target == list) return;

  const targetParent = e.target.closest('li');
  let mainImg = targetParent.querySelector('a').getAttribute('href');
  let title = targetParent.querySelector('.title').innerText;
  // let desc = targetParent.querySelector('.desc').innerText;
  let buddy = targetParent.querySelector('.img_owner').getAttribute('src');
  let owner = targetParent.querySelector('.owner span').innerText;
  if (targetParent) {


    showPop(mainImg, title, 'fsdjksjdfdfkjldskljdsfkljsfkljsdfklj', buddy, owner);
  }

})

// 팝업닫기
body.addEventListener('click', e => {
  hidePop(e);
})

// 데이터 호출 및 돔생성
async function initList(url) {
  const data = await callData(url);
  creatList(data);
}

// 데이터 불러오기
function callData(url) {
  return fetch(url)
    .then(data => {
      return data.json();
    })
    .catch((err) => {
      console.error(err);
    })
    .then(json => {
      // console.log(json)
      return json.photos.photo;
    })
}

function creatList(data) {
  let htmls = '';
  data.map(item => {
    console.log(item)
    htmls += `
      <li>
        <a href="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg">
          <div class="pic">
            <img src="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg" alt="">
          </div>
          <div class="cont">
            <div class="title">${item.title}</div>
            <div class="owner">
              <img src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg" class="img_owner" alt="">
              <span>${item.owner}</span>
            </div>
          </div>
        </a>
      </li>
    `;
  })

  list.innerHTML = htmls;
}

function showPop(img, title, desc, owner_img, owner_name) {
  body.classList.add('scroll_hidden');
  const pop = document.createElement('aside');
  pop.classList.add('pop');
  let htmls = `
    <div class="inner">
      <button type="button" class="pop_cancle"><span>close</span></button>
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