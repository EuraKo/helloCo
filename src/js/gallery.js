const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');
const list = gallery.querySelector('.list ul');
const items = list.querySelectorAll('li');
const search = gallery.querySelector('.search');
const searchBtn = gallery.querySelector('.btn_search');
const loading = gallery.querySelector('.list_loading');

const base = 'https://www.flickr.com/services/rest/?';
const method = 'flickr.photos.search';
const key = 'b46a4e7f5822514ab2cbba273b4c9794';
const per_page = 9;
const format = 'json';

const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=foodstyling&privacy_filter=1`;


initList(url);
// 요소 클릭시 팝업 열리게
list.addEventListener('click', e => {
  e.preventDefault();
  if (e.target == list) return;
  console.log(e)
  const targetParent = e.target.closest('li');
  let mainImg = targetParent.querySelector('a').getAttribute('href');
  let title = targetParent.querySelector('.title').innerText;
  // let desc = targetParent.querySelector('.desc').innerText;
  let buddy = targetParent.querySelector('.img_owner').getAttribute('src');
  let owner = targetParent.querySelector('.owner span').innerText;
  if (targetParent) {


    showPop(mainImg, title, buddy, owner);
  }

})

// 팝업닫기
body.addEventListener('click', e => {
  hidePop(e);
})

// 검색
search.addEventListener('keyup', e => {
  if (e.keyCode === 13) searchText();
});

searchBtn.addEventListener('click', () => {
  searchText();
})

// 데이터 호출 및 돔생성
async function initList(url) {
  const data = await callData(url);
  if (data.length > 0) {
    list.classList.remove('no_list');
    list.classList.add('on');
    creatList(data);
    delayLoading();

  } else {
    notFoundText()
  }
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
    // console.log(item)
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

function showPop(img, title, owner_img, owner_name) {
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

function searchText() {
  let val = search.value;
  val = val.trim();
  const urlSearch = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${val}&privacy_filter=1`;
  list.classList.remove('on');
  if (val !== '') {
    // loading.style.display = 'block';
    list.classList.remove('no_list');
    initList(urlSearch);
  } else {
    list.classList.add('on');
    list.innerHTML = '';
    const noSearch = document.createElement('div');
    noSearch.classList.add('no_search');
    noSearch.append(`검색어가 없습니다.`);
    list.append(noSearch);
    list.classList.add('no_list');
  }
}

function notFoundText() {
  let val = search.value;

  list.innerHTML = '';
  const notfound = document.createElement('div');
  notfound.classList.add('notfound');
  notfound.innerHTML = `<span>"${val}"</span>에 대한 검색결과가 없습니다.`;
  list.append(notfound);
  list.classList.add('no_list');
  list.classList.add('on');
};

function delayLoading() {
  const imgs = list.querySelectorAll('img');
  const len = imgs.length;
  let count = 0;

  for (let el of imgs) {
    el.onload = () => {
      count++;
      if (count === len) { loading.style.display = 'none'; }
    }

    let profile = el.closest('li').querySelector('.owner img');
    el.onerror = () => {
      profile.setAttribute('src', 'src/img/logo-bg.png')
    }

  }
}