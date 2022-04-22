var mainSwiper = new Swiper(".mainSwiper", {
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".mainSwiper .swiper-button-next",
    prevEl: ".mainSwiper .swiper-button-prev",
  },

});


var swiper = new Swiper(".rollingSwiper", {
  slidesPerView: 2,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    840: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});


window.addEventListener('load', () => {
  new Banner('.banner1');
  new Banner('.banner2');
  new Scroll();
});