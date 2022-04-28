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
  let htmls = `
    <div class="inner">
      <button type="button" class="pop_cancle"><span>close</span></button>
      <div class="pop_cont">
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" ></iframe>
      </div>
    </div>
  `;
  showPop('youtube', htmls);
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