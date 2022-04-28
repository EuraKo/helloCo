var container = document.getElementById('map');
const company_btns = document.querySelectorAll('.btn_company li');

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



let markerOption = [{
  title: 'HEAD OFFICE',
  latlng: new kakao.maps.LatLng(33.450701, 126.570667),
  imgSrc: 'src/img/marker1.png',
  imgSize: new kakao.maps.Size(50, 66),
  imgPos: { offset: new kakao.maps.Point(74, 66) },
  button: company_btns[0],
  address: '제주특별자치도 제주시 첨단로 242(우)63309',
  tel: '1899-1326'
}, {
  title: 'OFFICE PANKYO',
  latlng: new kakao.maps.LatLng(37.4020048, 127.1085146),
  imgSrc: 'img/marker1.png',
  imgSize: new kakao.maps.Size(232, 99),
  imgPos: { offset: new kakao.maps.Point(116, 99) },
  button: company_btns[0],
  address: '경기도 성남시 분당구 판교역로 235 에이치스퀘어 N동 7층 (우)13494',
  tel: '1577-3321'
}, {
  title: 'SERVICE CENTER',
  latlng: new kakao.maps.LatLng(37.4027251, 127.1073615),
  imgSrc: 'img/marker1.png',
  imgSize: new kakao.maps.Size(232, 99),
  imgPos: { offset: new kakao.maps.Point(116, 99) },
  button: company_btns[0],
  address: '경기도 성남시 분당구 판교역로 241번길 20 미래에셋 벤처타워 1층 (우)13494',
  tel: '1577-3754'
}]

// 마커 생성
var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
var marker = new kakao.maps.Marker({
  position: markerPosition,
  image: new kakao.maps.MarkerImage(markerOption[0].imgSrc, markerOption[0].imgSize, markerOption[0].imgPos)
});
marker.setMap(map);