class Banner {
  constructor(elem) {
    this.init(elem);
    this.bindingEvent(elem);
  }

  init(elem) {
    // banner 
    this.$banner = document.querySelector(elem);
    this.$bannerCont = this.$banner.querySelector('.banner_cont');
    this.$bannerItem = this.$bannerCont.querySelectorAll('a');
    this.prev = this.$banner.querySelector('.banner_prev');
    this.next = this.$banner.querySelector('.banner_next');

    this.itemLen = this.$bannerItem.length; // 배너 개수
    this.itemW = this.$bannerItem[0].offsetWidth; // 배너 한개 넓이값
    this.enabledClick = true;
    this.bannerInit();

  }

  bannerInit() {
    this.$bannerCont.style.width = `${this.itemW * this.itemLen}px`;
    this.$bannerCont.prepend(this.$bannerCont.lastElementChild);
    this.$bannerCont.style.left = `${-this.itemW}px`;
  }

  bindingEvent(elem) {
    window.addEventListener('resize', e => {
      this.init(elem);
    })
    this.prev.addEventListener('click', e => {
      this.prevBtn();

    })
    this.next.addEventListener('click', e => {
      this.nextBtn();
    })
  }
  prevBtn() {
    if (this.enabledClick) {
      this.enabledClick = false;
      new Anime(this.$bannerCont, {
        prop: 'left',
        value: `0px`,
        duration: 300,
        callback: () => {
          this.$bannerCont.prepend(this.$bannerCont.lastElementChild);
          this.$bannerCont.style.left = `${-this.itemW}px`;
          this.enabledClick = true;
        }
      })

    }
  }

  nextBtn() {
    if (this.enabledClick) {
      this.enabledClick = false;
      new Anime(this.$bannerCont, {
        prop: 'left',
        value: `${-(this.itemW) * 2}px`,
        duration: 300,
        callback: () => {
          this.$bannerCont.append(this.$bannerCont.firstElementChild);
          this.$bannerCont.style.left = `${-this.itemW}px`;
          this.enabledClick = true;
        }
      })
    }
  }


}