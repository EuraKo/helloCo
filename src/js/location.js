var container = document.getElementById('map');
const company_btns = document.querySelectorAll('.btn_company li');
const mapCont = document.querySelector('.map_cont');
const officeName = mapCont.querySelector('h2');
const address = mapCont.querySelector('.address');
const tel = mapCont.querySelector('.tel a');
const form = document.querySelector('#sendMail');
const btnSubmit = document.querySelector('.btn_submit');

var options = { //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 컨트롤러 생성
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

var markerSize = new kakao.maps.Size(50, 66);
var markerPos = { offset: new kakao.maps.Point(25, 66) };

let markerOption = [{
  title: 'HEAD OFFICE',
  latlng: new kakao.maps.LatLng(33.450701, 126.570667),
  imgSrc: 'src/img/marker1.png',
  button: company_btns[0],
  address: '제주특별자치도 제주시 첨단로 242(우)63309',
  tel: '1899-1326'
}, {
  title: 'OFFICE PANKYO',
  latlng: new kakao.maps.LatLng(37.4020048, 127.1085146),
  imgSrc: 'src/img/marker1.png',
  button: company_btns[1],
  address: '경기도 성남시 분당구 판교역로 235 에이치스퀘어 N동 7층 (우)13494',
  tel: '1577-3321'
}, {
  title: 'SERVICE CENTER',
  latlng: new kakao.maps.LatLng(37.4027251, 127.1073615),
  imgSrc: 'src/img/marker2.png',
  button: company_btns[2],
  address: '경기도 성남시 분당구 판교역로 241번길 20 미래에셋 벤처타워 1층 (우)13494',
  tel: '1577-3754'
}]
initSettings();
// 마커 생성
function initSettings() {

  var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: new kakao.maps.MarkerImage(markerOption[0].imgSrc, markerSize, markerPos)
  });
  marker.setMap(map);

  officeName.innerText = markerOption[0].title;
  address.innerText = markerOption[0].address;
  tel.innerText = markerOption[0].tel;
  tel.setAttribute('href', 'tel:' + markerOption[0].tel);
}


for (let i = 0; i < markerOption.length; i++) {
  new kakao.maps.Marker({
      map: map,
      position: markerOption[i].latlng,
      title: markerOption[i].title,
      image: new kakao.maps.MarkerImage(markerOption[i].imgSrc, markerSize, markerPos)
    })
    // branch버튼을 클릭시 해당 위치로 이동, 버튼 활성화
  markerOption[i].button.onclick = (e) => {
    e.preventDefault();
    for (let k = 0; k < markerOption.length; k++) {
      markerOption[k].button.classList.remove('on');
    }
    markerOption[i].button.classList.add('on');
    moveTo(markerOption[i].latlng);
    officeName.innerText = markerOption[i].title;
    address.innerText = markerOption[i].address;
    tel.innerText = markerOption[i].tel;
    tel.setAttribute('href', 'tel:' + markerOption[i].tel);

  }
}

window.addEventListener('resize', () => {
    let active_btn = document.querySelector('.btn_company li.on');
    let active_index = active_btn.getAttribute('data-index');
    map.setCenter(markerOption[active_index].latlng);
  })
  // 지도 이동 함수정의
function moveTo(target) {
  var moveLatLon = target;
  map.panTo(moveLatLon);
};

btnSubmit.addEventListener('click', e => {
  if (!isTxt("name", 1)) e.preventDefault();
  if (!fullEmail("email")) e.preventDefault();
  if (!isTxt("comment", 10)) e.preventDefault();

  // 전송완료 메세지처리
  if (isTxt("name", 1) && fullEmail("email") && isTxt("comment", 10)) {
    e.preventDefault();
    if (document.querySelector('.alert')) return;
    const myalert = document.createElement('aside');
    myalert.classList.add('alert');
    myalert.innerText = '메일이 전송됐습니다.';

    document.body.append(myalert);
    setTimeout(() => {
      myalert.classList.add('on');
      setTimeout(() => {
        myalert.classList.remove('on');
        setTimeout(() => {
          myalert.remove();
        }, 500)
      }, 1000)
    }, 100)
  }

})