import { TimelineMax } from 'gsap';
import { css } from '../_helpers';

class CTabs {
  constructor(el) {
    this.$block = $('.tabs');
    this.$tabNav = el.find('.tabs__nav').find('.tabs__btn');
    this.$tabItemContainer = el.find('.tabs__for');
    this.$tabItem = this.$tabItemContainer.find('.tabs__tab');

    if (this.$block.length) this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    if (!this.$tabNav.hasClass('js-disabled') && this.getActiveIndex() !== 0) {
      this.$tabItem.hide().eq(this.getActiveIndex()).show();
    }

    this.$tabNav.on('click', (ev) => {
      const currentIndex = this.getActiveIndex();
      const targetIndex = $(ev.currentTarget).index();

      this.changeTab(currentIndex, targetIndex);
    });
  }

  getActiveIndex() {
    let activeIndex = 0;

    this.$tabNav.each(function () {
      if ($(this).hasClass(css.active)) {
        activeIndex = $(this).index();
      }
    });

    return activeIndex;
  }

  changeTab(currentIndex, nextIndex) {
    const _this = this;
    const speed = 0.4;
    const $currentTabNav = this.$tabNav.eq(currentIndex);
    const $nextTabNav = this.$tabNav.eq(nextIndex);
    const $currentTab = this.$tabItem.eq(currentIndex);
    const $nextTab = this.$tabItem.eq(nextIndex);

    $currentTabNav.removeClass(css.active);
    $nextTabNav.addClass(css.active);
    TweenMax.to($currentTab, speed, {
      autoAlpha: 0,
      x: 30,
      clearProps: 'transform',
      onComplete() {
        const currentHeight = _this.$tabItemContainer.outerHeight();
        TweenMax.set(_this.$tabItemContainer, { height: currentHeight });
        $(this.target).hide();
        TweenMax.set($nextTab, { autoAlpha: 1 });
        $nextTab.show();

        TweenMax.staggerFromTo($nextTab.children(), speed, {
          autoAlpha: 0,
          x: 50
        }, {
          autoAlpha: 1,
          x: 0
        }, speed / 2);
        TweenMax.set(_this.$tabItemContainer, { height: 'auto' });
        TweenMax.from(_this.$tabItemContainer, speed, { height: currentHeight });
      }
    });
  }
}

/** tabs init */
const $tabs = $('.tabs');
$tabs.each((index, el) => {
  new CTabs($(el));
});
