const vidList = document.querySelector('.list ul');
const key = 'AIzaSyBmkrTuDWtAo4Y49kWA9tJVe6DvS6usIkA';
const playlistId = 'PLlM8MQlXeretkxhYE_j0IpCmayhPTZdCF';
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResult=${num}`;
console.log(url)
initList(url)

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
  console.log(items);
  let htmls = '';
  items.map(item => {
    let vidId = item.snippet.resourceId.videoId;
    let tumb = item.snippet.thumbnails.medium.url;
    let title = item.snippet.title;
    let cont = item.snippet.description;
    let owner = item.snippet.videoOwnerChannelTitle;

    if (title.length > 20) {
      title = title.substr(0, 20) + '...';
    }
    if (cont.length > 40) {
      cont = cont.substr(0, 40) + '...';
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