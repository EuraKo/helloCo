const body = document.body;
const vidList = document.querySelector('.list ul');
const key = 'AIzaSyBmkrTuDWtAo4Y49kWA9tJVe6DvS6usIkA';
const playlistId = 'PLlM8MQlXeretkxhYE_j0IpCmayhPTZdCF';
const num = 12;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;
console.log(url)
initList(url)

vidList.addEventListener('click', e => {
  e.preventDefault();
  if (!e.target.closest('a')) return;
  let vidId = e.target.closest('a').getAttribute('href');
  showPop(vidId)
});

body.addEventListener('click', e => {
  hidePop(e);
});


async function initList(url) {
  const data = await callData(url);
  creatList(data);
}

function callData(url) {
  return fetch(url)
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.error(err);
    })
    .then(json => {
      return json.items;
    })
}

function creatList(items) {
  let htmls = '';
  items.map(item => {
    let vidId = item.snippet.resourceId.videoId;
    let tumb = item.snippet.thumbnails.medium.url;
    let title = item.snippet.title;
    let cont = item.snippet.description;
    let owner = item.snippet.videoOwnerChannelTitle;

    if (title.length > 30) {
      title = title.substr(0, 30) + '...';
    }
    if (cont.length > 60) {
      cont = cont.substr(0, 60) + '...';
    }

    htmls += `
      <li>
        <a href="${vidId}">
          <div class="pic">
            <img src="${tumb}" alt="">
          </div>
          <div class="cont">
            <div class="title">${title}</div>
            <div class="owner">${owner}</div>
            <div class="desc">${cont}</div>
          </div>
        </a>
      </li>
    `;
  });
  vidList.innerHTML = htmls;
}

function showPop(vidId) {
  body.classList.add('scroll_hidden');
  const pop = document.createElement('aside');
  pop.classList.add('pop');
  let htmls = `
    <div class="inner">
      <button type="button" class="pop_cancle"><span>close</span></button>
      <div class="pop_cont">
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" ></iframe>
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