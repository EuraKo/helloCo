const member = document.querySelector('.members');
const memberList = member.querySelector('.wrap');

// json 파일 불러오기
fetch('src/js/json/member.json')
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.err('err')
  })
  .then((json) => {

    json.list.forEach((arr) => {
      makeMember(arr);
    });
  })

// 멤버 리스트 생성
function makeMember(item) {
  const imgSrc = "src/img/members";
  const thisItem = item;
  const article = document.createElement('article');
  article.classList.add('member', 'team_' + thisItem.team);
  const imgBox = document.createElement('div');
  imgBox.classList.add('img_box');
  const pic = document.createElement('div');
  pic.classList.add('pic');
  const picImg = document.createElement('img');
  picImg.setAttribute('src', `${imgSrc}/${thisItem.img}`);
  pic.append(picImg);
  const teamName = document.createElement('div');
  teamName.classList.add('team_name');
  teamName.innerText = thisItem.teamName;
  const name = document.createElement('h2');
  name.innerText = thisItem.name;
  const rank = document.createElement('p');
  rank.innerText = thisItem.rank;

  imgBox.append(pic);
  imgBox.append(teamName);
  article.append(imgBox);
  article.append(name);
  article.append(rank);
  memberList.append(article);
}