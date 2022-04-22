class Scroll {
  constructor() {
    this.init();
    this.bindingEvent();
    this.scroll();
  }

  init() {
    this.sections = document.querySelectorAll('section');
    this.base = window.innerHeight / 2;
    this.arr_sectionH = [];
    this.sectionH();
  }

  bindingEvent() {
    window.addEventListener('resize', () => {
      this.sectionH();
    })
    window.addEventListener('scroll', e => {
      this.scroll();
    });
  }

  sectionH() {
    this.arr_sectionH = [];
    for (let arr of this.sections) {
      this.arr_sectionH.push(arr.offsetTop);
    }
  }
  scroll() {
    let scroll = window.scrollY || window.pageXOffset;
    this.sections.forEach((el, idx) => {
      if (scroll > this.arr_sectionH[idx] - this.base) {

        for (let el of this.sections) {
          el.classList.remove('main_scroll_on');
        }
        this.sections[idx].classList.add('main_scroll_on');
      }
    })
  }
}