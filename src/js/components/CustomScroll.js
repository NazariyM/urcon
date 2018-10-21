import 'malihu-custom-scrollbar-plugin';

class CustomScroll {
  constructor() {
    this.$block = $('.js-custom-scroll');

    if (this.$block.length) this.init();
  }

  init() {
    this.initScroll();
  }

  initScroll() {
    this.$block.mCustomScrollbar({
      callbacks: {
        onTotalScroll: () => {
          this.$block.addClass('is-scrolled');
        },
        onTotalScrollBack: () => {
          this.$block.removeClass('is-scrolled');
        },
        onTotalScrollOffset: 200,
        onTotalScrollBackOffset: 200
      }
    });
  }
}

export default new CustomScroll();
